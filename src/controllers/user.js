const { registerSchema } = require('../validations/noAuthSchemas');

const login = async (req, res) => {};

const createUser = async (req, res) => {
  try {
    await registerSchema.validate(req.body);
    return res.status(200).json('Ok');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { login, createUser };
