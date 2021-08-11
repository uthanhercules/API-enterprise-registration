const yup = require('../functions/yup');

const registerSchema = yup.object().shape({
  name: yup.string().required(),
  login: yup.string().max(50).required(),
  password: yup.string().required(),
});

module.exports = { registerSchema };
