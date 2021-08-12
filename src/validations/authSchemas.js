const yup = require('../functions/yup');

const registerSchema = yup.object().shape({
  cnpj: yup.number().required(),
});

module.exports = { registerSchema };
