const jwtSecret = process.env.PASSWORD_SECRET;
const jwt = require('jsonwebtoken');
const knex = require('../database/connection');
const { loginVerifySchema } = require('../validations/noAuthSchemas');
const { errors } = require('../errors/user');

// eslint-disable-next-line consistent-return
const verifyLogin = async (req, res, next) => {
  const userToken = req.header('userToken');

  try {
    await loginVerifySchema.validate({ userToken });
    const { Email } = jwt.verify(userToken, jwtSecret);
    const user = await knex('client').select('*').where({ email: Email });

    if (user.length === 0) {
      return res.status(401).json(errors.needLogin);
    }

    next();
  } catch (error) {
    if (error.message === 'invalid token') {
      return res.status(401).json(errors.needLogin);
    }

    if (error.message === 'jwt expired') {
      return res.status(400).json(errors.needLogin);
    }

    return res.status(400).json(error.message);
  }
};

module.exports = { verifyLogin };
