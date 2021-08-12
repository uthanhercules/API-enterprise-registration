## Enterprise Registration API
Project made for a selection process. It is a REST API with authentication where users can register Brazilian companies through their cnpjs. 

## Technology

Here are the technologies used in this project.

-   NodeJs
    -   Express
    -   Nodemon
    -   JSON Web Token
    -   PG
    -   Crypto
    -   Dotenv
    -   Node-Fetch
    -   Yup
    -   Yup-Locales
    -   Knex
    -   ESLint
-   JavaScript
-   PostgreSQL

## Features

-   Create a new Client
-   Login
-   List all enterprises of the logged user
-   Register a new enterprise for the logged user
-   Edit a enterprise of the logged user
-   Delete a enterprise of the logged user

## No Auth Endpoints

### `/register`
Here you can register a new user with all data going on a JSON body.

input
```json
{
	"name": "Uthan",
	"email": "uthan@email.com",
	"password": "1234567890"
}
```

output:
```json
"Usuário registrado com sucesso!"
```

output if invalid:
```json
"Error message"
```
 
### `/login`
Here you can login a user with all data going on a JSON body.

input
```json
{
	"email": "uthan@email.com",
	"password": "123456"
}
```

output:
```json
{
  "user": {
    "ID": X,
    "Name": "Uthan",
    "Email": "uthan@email.com"
  },
  "userToken": "jwtToken"
}
```

output if invalid:
```json
"E-mail ou senha inválidos."
```

## Auth Endpoints
The information of the user cames from userToken on Header.

### `/enterprises`
Takes the ID from user and returns all registers with his ID.

output:
```json
[
  {
    "id": 4,
    "client_id": 2,
    "cnpj": "45997418000153",
    "hq": true,
    "active": true,
    "mei": false,
    "social_name": "COCA COLA INDUSTRIAS LTDA",
    "fantasy_name": "",
    "register_date": "2005-11-03",
    "cnae_number": 1099699,
    "cnae_description": "Fabricação de outros produtos alimentícios não especificados anteriormente",
    "secondary_cnaes": {
      "codigo": 1096100,
      "descricao": "Fabricação de alimentos e pratos prontos"
    },
    "social_capital": 150458420,
    "cep": "22250040",
    "address": "PRAIA DE BOTAFOGO, 374. ANDAR 12 PARTE. BOTAFOGO, RIO DE JANEIRO - RJ",
    "phone": [
      "21  99333639",
      ""
    ],
    "fax": "",
    "partners": [
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 2,
        "nome_socio": "SIMONE PASSINI GROSSMANN",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 5,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "2019-02-26",
        "cpf_representante_legal": "",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 0
      },
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 2,
        "nome_socio": "LUIZ CLAUDIO GUIDA VALMONT",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 5,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "2019-02-26",
        "cpf_representante_legal": "",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 0
      },
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 2,
        "nome_socio": "PEDRO RIOS COUTINHO",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 5,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "2019-02-26",
        "cpf_representante_legal": "",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 0
      },
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 2,
        "nome_socio": "FLAVIO MATTOS DOS SANTOS",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 5,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "2019-02-26",
        "cpf_representante_legal": "",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 0
      },
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 2,
        "nome_socio": "HENRIQUE GNANI BRAUN",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 5,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "2016-11-17",
        "cpf_representante_legal": "",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 0
      },
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 2,
        "nome_socio": "ALEXANDRE FERNANDES DELGADO",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 5,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "2015-07-21",
        "cpf_representante_legal": "",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 0
      },
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 1,
        "nome_socio": "COCA COLA INTERAMERICAN CORPORATION",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 37,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "1998-09-10",
        "cpf_representante_legal": "01307230709",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 17
      },
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 1,
        "nome_socio": "THE COCA COLA EXPORT CORPORATION",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 37,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "1998-09-10",
        "cpf_representante_legal": "06081303705",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 17
      },
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 2,
        "nome_socio": "FLAVIO GALDO CAMELIER",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 5,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "2019-02-26",
        "cpf_representante_legal": "",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 0
      },
      {
        "cnpj": "45997418000153",
        "identificador_de_socio": 2,
        "nome_socio": "LUIS PHELIPE MEDINA CARVALHO DE CASTRO",
        "cnpj_cpf_do_socio": "",
        "codigo_qualificacao_socio": 5,
        "percentual_capital_social": 0,
        "data_entrada_sociedade": "2019-02-26",
        "cpf_representante_legal": "",
        "nome_representante_legal": "",
        "codigo_qualificacao_representante_legal": 0
      }
    ]
  }
]
```

output if invalid:
```json
"Você não tem empresas registradas."
```

### `/enterprises/create`
Register a new enterprise for the logged user.

input
```json
{
	"cnpj": 45997418000153
}
```

output:
```json
"Empresa registrada com sucesso!"
```

output if invalid:
```json
"Error message"
```

### `/enterprises/edit/:id`
Edit a enterprise of the logged user. The body only carries the data that will be updated.

input
```json
{
	"any_data_to_update": 1234567890
}
```

output:
```json
"Registro de ID X editado com sucesso!"
```

output if invalid:
```json
"A empresa com o ID requisitado não existe."
```

### `/enterprises/delete/:id`
Delete a enterprise of the logged user.

output:
```json
"Registro deletado com sucesso!"
```

output if invalid:
```json
"A empresa com o ID requisitado não existe."
```