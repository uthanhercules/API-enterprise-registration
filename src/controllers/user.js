const { registerSchema } = require('../validations/noAuthSchemas');
const { encrypt } = require('../functions/passwordHandle');
const { errors } = require('../errors/createUser');
const knex = require('../database/connection');

const userLogin = async (req, res) => {};

const createUser = async (req, res) => {
  const { name, email } = req.body;
  let { password } = req.body;

  try {
    await registerSchema.validate(req.body);
    const users = await knex.select('email').from('client');

    if (users.length > 0) {
      return res.status(400).json(errors.loginAlreadyExists);
    }

    password = encrypt(password);
    // eslint-disable-next-line no-unused-vars
    const newUser = await knex('client').insert({ name, email, password });
    return res.status(200).json('Usuário registrado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { userLogin, createUser };
