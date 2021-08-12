CREATE DATABASE enterprise_catalog;

CREATE TABLE client(
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email VARCHAR(50) NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE enterprise (
  id SERIAL NOT NULL PRIMARY KEY,
  cnpj NUMERIC(14) NOT NULL,
  hq BOOLEAN NOT NULL,
  active BOOLEAN NOT NULL,
  mei BOOLEAN NOT NULL,
  social_name TEXT NOT NULL,
  fantasy_name TEXT NOT NULL,
  register_date TEXT NOT NULL,
  cnae_number INT NOT NULL,
  cnae_description TEXT NOT NULL,
  secondary_cnaes JSON,
  social_capital INT NOT NULL,
  cep NUMERIC(8) NOT NULL,
  address TEXT NOT NULL,
  phone INT NOT NULL,
  partners JSON
);