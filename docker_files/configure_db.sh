#!bin/bash
source "${CONDA_HOME}"/bin/activate tethys
PGPASSWORD="$POSTGRES_PASSWORD" psql --set=TETHYS_DB_SUPERUSER_PASSWORD="$TETHYS_DB_SUPERUSER_PASS" --set=TETHYS_DB_PASSWORD="$TETHYS_DB_PASSWORD" --host="$TETHYS_DB_HOST" --port="$TETHYS_DB_PORT" --username=postgres --dbname=postgres --file=fix.sql
