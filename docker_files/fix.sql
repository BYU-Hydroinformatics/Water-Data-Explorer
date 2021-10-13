
-- Create tethys_super role
CREATE USER tethys_super WITH CREATEDB CREATEROLE LOGIN INHERIT PASSWORD 'passpass';

-- Create tethys default role
CREATE USER tethys_default WITH PASSWORD 'passpass';

-- Create database tethys_super and tethys_default
CREATE DATABASE tethys_super OWNER postgres;

-- I am not sure if it is necessary to have an owner for the tethys_default database.
CREATE DATABASE tethys_default;

-- This line is important to avoid the error of must be member of role "tethys_super"
GRANT tethys_super TO postgres
