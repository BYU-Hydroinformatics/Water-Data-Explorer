# Use our Tethyscore base docker image as a parent image
FROM tethysplatform/tethys-core:master

###############################
# DEFAULT ENVIRONMENT VARIABLES
###############################

## IF YOU USE CLUSTERS, GS, AND CONDOR PLEASE UNCOMMENT

# ENV TETHYS_CLUSTER_IP 172.17.0.1
# ENV TETHYS_CLUSTER_USERNAME condor
# ENV TETHYS_CLUSTER_PKEY_FILE ${TETHYS_PERSIST}/keys/condorkey
# ENV TETHYS_CLUSTER_PKEY_PASSWORD please_dont_use_default_passwords
# ENV TETHYS_GS_PROTOCOL http
# ENV TETHYS_GS_HOST 172.17.0.1
# ENV TETHYS_GS_PORT 8181
# ENV TETHYS_GS_PROTOCOL_PUB https
# ENV TETHYS_GS_HOST_PUB 172.17.0.1
# ENV TETHYS_GS_PORT_PUB 443
# ENV TETHYS_GS_USERNAME admin
# ENV TETHYS_GS_PASSWORD geoserver
# ENV CONDORPY_HOME ${TETHYS_HOME}/tethys

ENV APP_DB_HOST ${TETHYS_DB_HOST}
ENV APP_DB_PORT ${TETHYS_DB_PORT}
ENV APP_DB_USERNAME ${TETHYS_DB_SUPERUSER}
ENV APP_DB_PASSWORD ${TETHYS_DB_SUPERUSER_PASS}


##################################
# PRODUCTION ENVIRONMENT VARIABLES
##################################
ENV ASGI_PROCESSES 1
ENV CHANNEL_LAYERS_BACKEND "channels_redis.core.RedisChannelLayer"
ENV CHANNEL_LAYERS_CONFIG "\"{\"hosts\": [[127.0.0.1, 6379]]}\""



#########
# SETUP #
#########
# Speed up APT installs
RUN echo "force-unsafe-io" > /etc/dpkg/dpkg.cfg.d/02apt-speedup \
 && echo "Acquire::http {No-Cache=True;};" > /etc/apt/apt.conf.d/no-cache \
 && echo "Acquire::Check-Valid-Until false;" > /etc/apt/apt.conf.d/no-check-valid
# Install APT Package
RUN apt-get update -qq && apt-get -yqq install gcc libgdal-dev g++ libhdf5-dev > /dev/null
# Quiet pip installs
RUN mkdir -p $HOME/.config/pip && echo "[global]\nquiet = True" > $HOME/.config/pip/pip.conf

RUN mkdir /tethys_apps && cd /tethys_apps && git clone https://github.com/BYU-Hydroinformatics/Water-Data-Explorer.git

## UNCOMMENT TO USE THE VERSION FOR INMET ##

RUN git init && git fetch
RUN git checkout -b inmet-WDE

RUN mkdir -p ${TETHYS_PERSIST}/keys
###########
# INSTALL #
###########

RUN /bin/bash -c ". ${CONDA_HOME}/bin/activate tethys \
  ; cd /tethys_apps/Water-Data-Explorer \
  ; tethys install -N"



######################################################
# CHANGE THE PROXY TIME REPLACING THE NGINX TEMPLATE #
######################################################

ADD nginx /usr/lib/tethys/tethys/tethys_cli/gen_templates/

############################################
# ADD SPECIAL CONFIGURATIONS TO THE PORTAL #
############################################

RUN /bin/bash -c ". ${CONDA_HOME}/bin/activate tethys \
  ; tethys settings -s TETHYS_PORTAL_CONFIG.ENABLE_OPEN_PORTAL ${ENABLE_OPEN_PORTAL} \
  ; tethys settings -s TETHYS_PORTAL_CONFIG.BYPASS_TETHYS_HOME_PAGE ${BYPASS_TETHYS_HOME_PAGE} \
  ; tethys settings -s LOCKOUT_CONFIG.AXES_FAILURE_LIMIT ${AXES_FAILURE_LIMIT}"

#########
# CHOWN #
#########
RUN export NGINX_USER=$(grep 'user .*;' /etc/nginx/nginx.conf | awk '{print $2}' | awk -F';' '{print $1}') \
  ; find ${TETHYSAPP_DIR} ! -user ${NGINX_USER} -print0 | xargs -0 -I{} chown ${NGINX_USER}: {} \
  ; find ${WORKSPACE_ROOT} ! -user ${NGINX_USER} -print0 | xargs -0 -I{} chown ${NGINX_USER}: {} \
  ; find ${STATIC_ROOT} ! -user ${NGINX_USER} -print0 | xargs -0 -I{} chown ${NGINX_USER}: {} \
  ; find ${TETHYS_PERSIST}/keys ! -user ${NGINX_USER} -print0 | xargs -0 -I{} chown ${NGINX_USER}: {} \
  ; find ${TETHYS_HOME}/tethys ! -user ${NGINX_USER} -print0 | xargs -0 -I{} chown ${NGINX_USER}: {}


#########################
# CONFIGURE ENVIRONMENT #
#########################
EXPOSE 80


################
# COPY IN SALT #
################

## Be sure to be inside the docker_files folder ##
ADD /salt/ /srv/salt/

#######
# RUN #
#######
CMD bash run.sh
