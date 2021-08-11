const jwtSecret = process.env.PASSWORD_SECRET;
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validations/noAuthSchemas');
const { encrypt, decrypt } = require('../functions/passwordHandle');
const { errors } = require('../errors/user');
const knex = require('../database/connection');

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    await loginSchema.validate(req.body);
    const users = await knex('client').select('email');

    if (users.length === 0) {
      return res.status(400).json(errors.userDontExist);
    }

    const user = await knex.select('*').from('client').where({ email });
    const userPassword = decrypt(JSON.parse(user[0].password));

    if (password !== userPassword) {
      return res.status(400).json(errors.authError);
    }

    const userToken = jwt.sign({
      ID: user[0].id,
      Name: user[0].name,
      Email: user[0].email,
    }, jwtSecret, { expiresIn: '1h' });

    const authUser = {
      user: {
        ID: user[0].id,
        Name: user[0].name,
        Email: user[0].email,
      },
      userToken,
    };

    return res.status(200).json(authUser);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const createUser = async (req, res) => {
  const { name, email } = req.body;
  let { password } = req.body;

  try {
    await registerSchema.validate(req.body);
    const users = await knex('client').select('email');

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
