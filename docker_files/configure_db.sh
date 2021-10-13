#!bin/bash
source "${CONDA_HOME}"/bin/activate tethys
PGPASSWORD="$POSTGRES_PASSWORD" psql --host="$TETHYS_DB_HOST" --port="$TETHYS_DB_PORT" --username=postgres --dbname=postgres --file=fix.sql
