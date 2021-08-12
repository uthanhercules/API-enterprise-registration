const jwtSecret = process.env.PASSWORD_SECRET;
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const knex = require('../database/connection');
const { errors } = require('../errors/enterprise');

const createEnterprise = async (req, res) => {
  const { cnpj } = req.body;
  try {
    // eslint-disable-next-line camelcase
    const { ID: client_id } = jwt.verify(req.header('userToken'), jwtSecret);
    const enterprise = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    const validation = await enterprise.json();

    if (validation.message) {
      return res.status(400).json(validation.message);
    }

    const enterprises = await knex('enterprise').where({ client_id, cnpj: Number(validation.cnpj) });

    if (enterprises.length > 0) {
      return res.status(400).json(errors.alreadyExists);
    }

    let isHq = false;
    let isActive = false;
    let isMei = false;

    if (validation.identificador_matriz_filial === 1) {
      // eslint-disable-next-line no-unused-vars
      isHq = true;
    }

    if (validation.situacao_cadastral === 2) {
      // eslint-disable-next-line no-unused-vars
      isActive = true;
    }

    if (validation.opcao_pelo_mei) {
      isMei = true;
    }

    const {
      // eslint-disable-next-line camelcase
      descricao_tipo_logradouro, logradouro, numero, complemento, bairro, municipio, uf,
    } = validation;

    // eslint-disable-next-line no-unused-vars
    const enterpriseRegister = await knex('enterprise').insert({
      client_id,
      cnpj: Number(validation.cnpj),
      hq: isHq,
      active: isActive,
      mei: isMei,
      social_name: validation.razao_social,
      fantasy_name: validation.nome_fantasia,
      register_date: validation.data_situacao_cadastral,
      cnae_number: validation.cnae_fiscal,
      cnae_description: validation.cnae_fiscal_descricao,
      secondary_cnaes: JSON.stringify(validation.cnaes_secundarias[0]),
      social_capital: validation.capital_social,
      cep: Number(validation.cep),
      // eslint-disable-next-line camelcase
      address: `${descricao_tipo_logradouro} ${logradouro}, ${numero}. ${complemento}. ${bairro}, ${municipio} - ${uf}`,
      phone: JSON.stringify([validation.ddd_telefone_1, validation.ddd_telefone_2]),
      fax: validation.ddd_fax,
      partners: JSON.stringify(validation.qsa),
    });
    return res.json('Empresa registrada com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// eslint-disable-next-line arrow-body-style
const readEnterprises = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { ID: client_id } = jwt.verify(req.header('userToken'), jwtSecret);
    const enterprises = await knex('enterprise').where({ client_id });

    if (enterprises.length === 0) {
      return res.status(200).json('Não há empresas registradas.');
    }

    return res.status(200).json(enterprises);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateEnterprise = async (req, res) => {
  const { id } = req.params;

  try {
    // eslint-disable-next-line camelcase
    const { ID: client_id } = jwt.verify(req.header('userToken'), jwtSecret);
    const enterprises = await knex('enterprise').where({ client_id, id });

    if (enterprises.length === 0) {
      return res.status(404).json(errors.noRegister);
    }

    const enterprise = await knex('enterprise').select('*').where({ id });

    if (enterprise.length === 0) {
      return res.status(404).json(errors.noRegister);
    }

    await knex('enterprise').update(req.body).where({ id });
    return res.status(200).json(`Registro de ID ${id} editado com sucesso!`);
  } catch (error) {
    const emptyBody = error.message.split(' ').includes('Empty');

    if (emptyBody) {
      return res.status(400).json(errors.noBody);
    }

    return res.status(400).json(error.message);
  }
};

const deleteEnterprise = async (req, res) => {
  const { id } = req.params;

  try {
    // eslint-disable-next-line camelcase
    const { ID: client_id } = jwt.verify(req.header('userToken'), jwtSecret);
    const enterprises = await knex('enterprise').where({ client_id, id });

    if (enterprises.length === 0) {
      return res.status(404).json(errors.noRegister);
    }

    const enterprise = await knex('enterprise').select('*').where({ id });

    if (enterprise.length === 0) {
      return res.status(404).json(errors.noRegister);
    }

    await knex('enterprise').delete().where({ id });
    return res.status(200).json('Registro deletado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  createEnterprise, readEnterprises, updateEnterprise, deleteEnterprise,
};
