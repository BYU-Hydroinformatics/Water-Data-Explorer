-- DO $$
-- BEGIN
-- --   DECLARE password_super CHAR;
-- --   DECLARE password_normal CHAR;
-- --   SET password_super = :'TETHYS_DB_SUPERUSER_PASSWORD';
-- --   SET password_normal = :'TETHYS_DB_PASSWORD';
--   IF DATABASE_PRINCIPAL_ID('tethys_super') IS NULL THEN
--     -- Create tethys_super role
--     CREATE USER tethys_super WITH CREATEDB CREATEROLE LOGIN INHERIT PASSWORD :'TETHYS_DB_SUPERUSER_PASSWORD';
--   END IF;
--   IF DATABASE_PRINCIPAL_ID('tethys_default') IS NULL THEN
--     -- Create tethys_super role
--     CREATE USER tethys_default WITH PASSWORD :'TETHYS_DB_PASSWORD';
--   END IF;
--   IF DB_ID('tethys_super') IS NOT NULL THEN
--     -- Create database tethys_super and tethys_default
--     CREATE DATABASE tethys_super OWNER postgres;
--     -- This line is important to avoid the error of must be member of role "tethys_super"
--     GRANT tethys_super TO postgres;
--   END IF;
--   IF DB_ID('tethys_default') IS NOT NULL THEN
--     -- Create database tethys_super and tethys_default
--     CREATE DATABASE tethys_default;
--   END IF;
-- END; 
-- $$ 


-- Create tethys_super role
CREATE USER tethys_super WITH CREATEDB CREATEROLE LOGIN INHERIT PASSWORD :'TETHYS_DB_SUPERUSER_PASSWORD';

-- Create tethys default role
CREATE USER tethys_default WITH PASSWORD :'TETHYS_DB_PASSWORD';

-- Create database tethys_super and tethys_default
CREATE DATABASE tethys_super OWNER postgres;

-- I am not sure if it is necessary to have an owner for the tethys_default database.
CREATE DATABASE tethys_default;

-- This line is important to avoid the error of must be member of role "tethys_super"
GRANT tethys_super TO postgres