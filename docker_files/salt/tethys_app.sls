{% set ALLOWED_HOST = salt['environ.get']('ALLOWED_HOST') %}
{% set CONDA_HOME = salt['environ.get']('CONDA_HOME') %}
{% set CONDA_ENV_NAME = salt['environ.get']('CONDA_ENV_NAME') %}
{% set TETHYS_HOME = salt['environ.get']('TETHYS_HOME') %}
{% set TETHYS_PERSIST = salt['environ.get']('TETHYS_PERSIST') %}
{% set TETHYSAPP_DIR = salt['environ.get']('TETHYSAPP_DIR') %}
{% set APP_DB_HOST = salt['environ.get']('TETHYS_DB_HOST') %}
{% set APP_DB_PASSWORD = salt['environ.get']('TETHYS_DB_SUPERUSER_PASS') %}
{% set APP_DB_PORT = salt['environ.get']('TETHYS_DB_PORT') %}
{% set APP_DB_USERNAME = salt['environ.get']('TETHYS_DB_SUPERUSER') %}
{% set BYPASS_TETHYS_HOME_PAGE = salt['environ.get']('BYPASS_TETHYS_HOME_PAGE') %}
{% set ENABLE_OPEN_PORTAL = salt['environ.get']('ENABLE_OPEN_PORTAL') %}


{% set PS_SERVICE_NAME = 'wde' %}

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

Link_Persistent_Stores_Database:
  cmd.run:
    - name: ". {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys link persistent:{{ PS_SERVICE_NAME }} water_data_explorer:ps_database:catalog_db"
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Sync_App_Persistent_Stores:
  cmd.run:
    - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys syncstores all
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Making_Portal_Open:
  cmd.run:
    - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys settings --set BYPASS_TETHYS_HOME_PAGE "${BYPASS_TETHYS_HOME_PAGE}" --set ENABLE_OPEN_PORTAL "${ENABLE_OPEN_PORTAL}"
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Changing_Upload_Size:
  cmd.run:
    - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys settings --set DATA_UPLOAD_MAX_MEMORY_SIZE "${DATA_UPLOAD_MAX_MEMORY_SIZE}" --set DATA_UPLOAD_MAX_NUMBER_FIELDS "${DATA_UPLOAD_MAX_NUMBER_FIELDS}"
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Add_analitycal_config:
  cmd.run:
    - name: . {{ CONDA_HOME }}/bin/activate {{ CONDA_ENV_NAME }} && tethys settings --set ANALYTICS_CONFIG.GOOGLE_ANALYTICS_GTAG_PROPERTY_ID "${GOOGLE_ANALYTICS_GTAG_PROPERTY_ID}"
    - shell: /bin/bash
    - unless: /bin/bash -c "[ -f "${TETHYS_PERSIST}/water_data_explorer_setup_complete" ];"

Flag_Complete_Setup:
  cmd.run:
    - name: touch ${TETHYS_PERSIST}/water_data_explorer_setup_complete
    - shell: /bin/bash