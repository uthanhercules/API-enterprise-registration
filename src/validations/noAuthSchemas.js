const yup = require('../functions/yup');

const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().max(50).email().required(),
  password: yup.string().required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().max(50).email().required(),
  password: yup.string().required(),
});

const loginVerifySchema = yup.object().shape({
  userToken: yup.string().required(),
});

module.exports = { registerSchema, loginSchema, loginVerifySchema };
