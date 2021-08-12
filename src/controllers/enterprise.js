const jwtSecret = process.env.PASSWORD_SECRET;
const jwt = require('jsonwebtoken');
const knex = require('../database/connection');
const { errors } = require('../errors/enterprise');

const createEnterprise = async (req, res) => {};

// eslint-disable-next-line arrow-body-style
const readEnterprises = async (req, res) => {
  const { ID } = jwt.verify(req.header('userToken'), jwtSecret);
  try {
    const enterprises = await knex('enterprise').where({ client_id: ID });
    return res.status(200).json(enterprises);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateEnterprise = async (req, res) => {
  const { id } = req.params;
  const { ID } = jwt.verify(req.header('userToken'), jwtSecret);

  try {
    const enterprises = await knex('enterprise').where({ client_id: ID, id });

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
  const { ID } = jwt.verify(req.header('userToken'), jwtSecret);

  try {
    const enterprises = await knex('enterprise').where({ client_id: ID, id });

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
