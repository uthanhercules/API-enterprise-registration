const knex = require('../database/connection');

const createEnterprise = async (req, res) => {};

// eslint-disable-next-line arrow-body-style
const readEnterprises = async (req, res) => {
  const enterprises = await knex('enterprise');

  return res.status(200).json(enterprises);
};

const updateEnterprise = async (req, res) => {};

const deleteEnterprise = async (req, res) => {};

module.exports = {
  createEnterprise, readEnterprises, updateEnterprise, deleteEnterprise,
};
