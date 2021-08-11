const express = require('express');
const { verifyLogin } = require('./middleware/loginFIlter');
const { userLogin, createUser } = require('./controllers/user');
const {
  createEnterprise, readEnterprises, updateEnterprise, deleteEnterprise,
} = require('./controllers/enterprise');

const route = express();

route.post('/login', userLogin);
route.post('/register', createUser);

route.use(verifyLogin);
route.get('/enterprises', readEnterprises);
route.post('/enterprises/create', createEnterprise);
route.patch('/enterprises/edit/:id', updateEnterprise);
route.delete('/enterprises/delete/:id', deleteEnterprise);

module.exports = route;
