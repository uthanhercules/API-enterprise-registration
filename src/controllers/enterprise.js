const knex = require('../database/connection');
const { errors } = require('../errors/enterprise');

const createEnterprise = async (req, res) => {};

// eslint-disable-next-line arrow-body-style
const readEnterprises = async (req, res) => {
  const enterprises = await knex('enterprise');
  return res.status(200).json(enterprises);
};

const updateEnterprise = async (req, res) => {};

const deleteEnterprise = async (req, res) => {
  const { id } = req.params;
  const enterprise = await knex('enterprise').select('*').where({ id });

  if (enterprise.length === 0) {
    return res.status(404).json(errors.noRegister);
  }

  await knex('enterprise').delete().where({ id });
  return res.status(200).json('Registro deletado com sucesso!');
};

module.exports = {
  createEnterprise, readEnterprises, updateEnterprise, deleteEnterprise,
};
