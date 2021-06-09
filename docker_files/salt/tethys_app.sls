{% set ALLOWED_HOST = salt['environ.get']('ALLOWED_HOST') %}
{% set CONDA_HOME = salt['environ.get']('CONDA_HOME') %}
{% set CONDA_ENV_NAME = salt['environ.get']('CONDA_ENV_NAME') %}
{% set TETHYS_HOME = salt['environ.get']('TETHYS_HOME') %}
{% set TETHYS_PERSIST = salt['environ.get']('TETHYS_PERSIST') %}
{% set TETHYSAPP_DIR = salt['environ.get']('TETHYSAPP_DIR') %}
{% set APP_DB_HOST = salt['environ.get']('APP_DB_HOST') %}
{% set APP_DB_PASSWORD = salt['environ.get']('APP_DB_PASSWORD') %}
{% set APP_DB_PORT = salt['environ.get']('APP_DB_PORT') %}
{% set APP_DB_USERNAME = salt['environ.get']('APP_DB_USERNAME') %}

# {% set TETHYS_GS_HOST = salt['environ.get']('TETHYS_GS_HOST') %}
# {% set TETHYS_GS_PASSWORD = salt['environ.get']('TETHYS_GS_PASSWORD') %}
# {% set TETHYS_GS_PORT = salt['environ.get']('TETHYS_GS_PORT') %}
# {% set TETHYS_GS_USERNAME = salt['environ.get']('TETHYS_GS_USERNAME') %}
# {% set TETHYS_GS_PROTOCOL = salt['environ.get']('TETHYS_GS_PROTOCOL') %}
# {% set TETHYS_GS_HOST_PUB = salt['environ.get']('TETHYS_GS_HOST_PUB') %}
# {% set TETHYS_GS_PORT_PUB = salt['environ.get']('TETHYS_GS_PORT_PUB') %}
# {% set TETHYS_GS_PROTOCOL_PUB = salt['environ.get']('TETHYS_GS_PROTOCOL_PUB') %}
# {% set TETHYS_CLUSTER_IP = salt['environ.get']('TETHYS_CLUSTER_IP') %}
# {% set TETHYS_CLUSTER_USERNAME = salt['environ.get']('TETHYS_CLUSTER_USERNAME') %}
# {% set TETHYS_CLUSTER_PKEY_FILE = salt['environ.get']('TETHYS_CLUSTER_PKEY_FILE') %}
# {% set TETHYS_CLUSTER_PKEY_PASSWORD = salt['environ.get']('TETHYS_CLUSTER_PKEY_PASSWORD') %}

{% set PS_SERVICE_NAME = 'wde' %}
# {% set GS_SERVICE_NAME = 'tethys_geoserver' %}

Pre_WaterDataExplorer_Settings:
  cmd.run:
    - name: cat {{ TETHYS_HOME }}/tethys/tethys_portal/settings.py
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Sync_Apps:
  cmd.run:
    - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys db sync
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Remove_Persistent_Stores_Database:
  cmd.run:
    - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys services remove persistent {{ PS_SERVICE_NAME }} -f
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Create_Persistent_Stores_Database:
  cmd.run:
    - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys services create persistent -n {{ PS_SERVICE_NAME }} -c {{ APP_DB_USERNAME }}:{{ APP_DB_PASSWORD }}@{{ APP_DB_HOST }}:{{ APP_DB_PORT }}"
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Remove_Schedulers:
#   cmd.run:
#     - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys schedulers remove -f remote_cluster"
#     - shell: /bin/bash
#     - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Create_Schedulers:
#   cmd.run:
#     - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys schedulers create-condor -n remote_cluster -e ${TETHYS_CLUSTER_IP} -u ${TETHYS_CLUSTER_USERNAME} -f ${TETHYS_CLUSTER_PKEY_FILE} -k ${TETHYS_CLUSTER_PKEY_PASSWORD}"
#     - shell: /bin/bash
#     - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Remove_Spatial_Dataset_Service:
#   cmd.run:
#     - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys services remove spatial {{ GS_SERVICE_NAME }} -f
#     - shell: /bin/bash
#     - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Create_Spatial_Dataset_Service:
#   cmd.run:
#     - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys services create spatial -n {{ GS_SERVICE_NAME }} -c {{ TETHYS_GS_USERNAME }}:{{ TETHYS_GS_PASSWORD }}@{{ TETHYS_GS_PROTOCOL }}://{{ TETHYS_GS_HOST }}:{{ TETHYS_GS_PORT }} -p {{ TETHYS_GS_PROTOCOL_PUB }}://{{ TETHYS_GS_HOST_PUB }}:{{ TETHYS_GS_PORT_PUB }}"
#     - shell: /bin/bash
#     - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Link_Persistent_Stores_Database:
  cmd.run:
    - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys link persistent:{{ PS_SERVICE_NAME }} water_data_explorer:ps_database:catalog_db"
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Link_Persistent_Stores_Connection:
#   cmd.run:
#     - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys link persistent:{{ PS_SERVICE_NAME }} water_data_explorer:ps_connection:model_db_1"
#     - shell: /bin/bash
#     - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Link_Existing_Model_Databases:
#   cmd.run:
#     - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && water_data_explorer linkdbs"
#     - shell: /bin/bash
#     - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Link_Spatial_Dataset_Service:
#   cmd.run:
#     - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys link spatial:{{ GS_SERVICE_NAME }} water_data_explorer:ds_spatial:primary_geoserver"
#     - shell: /bin/bash
#     - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Sync_App_Persistent_Stores:
  cmd.run:
    - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys syncstores all
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Init_WaterDataExplorer:
#   cmd.run:
#     - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && water_data_explorer init {{ TETHYS_GS_PROTOCOL }}://{{ TETHYS_GS_USERNAME }}:{{ TETHYS_GS_PASSWORD }}@{{ TETHYS_GS_HOST }}:{{ TETHYS_GS_PORT }}/geoserver/rest/"
#     - shell: /bin/bash
#     - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Collect_Static:
#   cmd.run:
#     - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && cat {{ TETHYS_HOME }}/tethys/tethys_portal/settings.py && tethys manage collectstatic --noinput
#     - shell: /bin/bash
#
# Collect_Workspaces:
#   cmd.run:
#     - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && cat {{ TETHYS_HOME }}/tethys/tethys_portal/settings.py && tethys manage collectworkspaces
#     - shell: /bin/bash

# Make_Key_Directory:
#   cmd.run:
#     - name: mkdir -p {{ TETHYS_PERSIST }}/keys
#     - shell: /bin/bash
#     - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

# Copy_Condor_Key:
#   cmd.run:
#     - name: ls /tmp/keys && cp /tmp/keys/condorkey-root ${TETHYS_CLUSTER_PKEY_FILE} && chown www-data ${TETHYS_CLUSTER_PKEY_FILE}
#     - shell: /bin/bash
#     - onlyif: /bin/bash -c "[ -f "/tmp/keys/condorkey-root" ];"
#     - unless: /bin/bash -c "[ -f "${TETHYS_CLUSTER_PKEY_FILE}" ];"

Flag_Complete_Setup:
  cmd.run:
    - name: touch ${TETHYS_PERSIST}/water_data_explorer_setup_complete
    - shell: /bin/bash
