
<p align="center">
<img align= "center" src="https://drive.google.com/uc?export=view&id=1ACAkrm6PsfdWzXnpMOL4uwfKwbTqqkQZ" width="20%" height="20%"/>
</p>

<h1 align="center"> Water Data Explorer (WDE)</h1>

<p align="center">
<img align= "center" src="https://img.shields.io/badge/license-BSD%203--Clause-yellow.svg" width="20%" height="20%"/>
</p>

## Why Adopting the WDE

There has been a growing recognition in recent years of the need for standardized means for sharing water data on the web. One response to this need was the development of the Consortium of Universities for the Advancement of Hydrologic Science (CUAHSI) Hydrologic Information System (HIS) and its accompanying WaterOneFlow and WaterML protocols. To date, the primary means for accessing data shared using these protocols has been limited the Microsoft Windows HydroDesktop software, the WaterML R package, and the web based CUAHSI HydroClient which serves as an access point to the CUAHSI HIS database. We recognized the need for a new web-based tool for accessing data from any system that support WaterOneFlow and WaterML and that could be customized for local or regional web application portals, giving access to the most locally-relevant portions of the HIS database, and providing a means for international government agencies, research teams, and others to make use of the accompanying protocols on a locally managed web application. To fill this need, we developed the open source, lightweight, installable web application, The Water Data Explorer (WDE) which supports any WaterOneFlow service and can be localized ), as a web application developed in the Tethys Platform Framework.


## WDE Functionality

 It provides users the ability to customize the application for different regions containing WaterOneFlow web services, which facilitates different versions of the WDE regionally. The WDE also provides three main functionalities as a client component for the different Software Oriented Architecture (SOA) systemssupports: data discovery, data visualization, and data download for the selected WaterOneFlow services. The WDE’s design is organized by WaterOneFlowconsists of three different levels of information ( catalog, specific data server, and individual measurement stations. A server admin can specify which datasets an individual instance of the WDE supports and end users can use the application to access data from the specified datasets. ) that allow the application to organize the data response of the WaterOneFlow web services methods. In designing the WDE, We also modularized the core WaterOneFlow access code into a new open source Python package called “pywaterml” which provides the  package was created to connect to provide a more generic and re-usable code for the different WaterOneFlow web services from the SOA systems, and to execute their different methods used by WDE to discover, visualize, and download data.


## Getting Started

In order to get started

### Prerequisites

The Water Data Explorer is an Tethys application that will need to have the Tethys platform installed before it can be installed.

Documentation for installing the Tethys Platform can be found [here](http://docs.tethysplatform.org/en/stable/installation.html)

The following packages are the requirements for the WDE,but they do not need to be installed manually becuase the WDE manages to installs them automatically. They can be found in the [install.yml](https://github.com/BYU-Hydroinformatics/Water-Data-Explorer/blob/master/install.yml)

```
conda:
  channels:
    - conda-forge
  packages:
    - requests
    - fiona
    - geojson
    - pyproj
    - shapely
    - owslib
    - sqlalchemy
    - psycopg2
    - suds-jurko
    - xmltodict
    - pyshp
    - geopandas

pip:
  - pywaterml
```

### Developer Installation

The Developer installation of the WDE is easy and it can be done with the following steps:


```bash

cd <APP_SOURCES_ROOT>

cd git clone <CLONE_URL>

conda activate tethys

tethys install

tethys syncstores water_data_explorer

```

Detail explanation for installing apps with the Tethys Framework can be found [here](http://docs.tethysplatform.org/en/stable/installation/application.html)

The application can also be installed with the Tethys WareHouse application. Steps can be found [here](https://tethys-app-warehouse.readthedocs.io/en/latest/)


## Production Installation

The Production installation of the WDE needs to have a tethys platform isntalled in the server where you plan to install the WDE.
Docmumentation for installing the Tethys platform can be found [here](http://docs.tethysplatform.org/en/stable/installation/production.html)

```bash

conda activate tethys


sudo mkdir -p <APP_SOURCES_ROOT>
sudo chown $USER <APP_SOURCES_ROOT>

cd <APP_SOURCES_ROOT>

sudo git clone <CLONE_URL>
cd <APP_SOURCES_ROOT>/<APP_DIR>

tethys install

sudo chown -R $USER <STATIC_ROOT>
sudo chown -R $USER <TETHYS_WORKSPACES_ROOT>

tethys manage collectall

sudo chown -R <NGINX_USER>: <STATIC_ROOT>
sudo chown -R <NGINX_USER>: <TETHYS_WORKSPACES_ROOT>

sudo supervisorctl restart all

tethys syncstores all

```
The application can also be installed with the Tethys WareHouse application. Steps can be found [here](https://tethys-app-warehouse.readthedocs.io/en/latest/)


## Built With

* [Tethys Platform](http://docs.tethysplatform.org/en/stable/index.html) - The web framework used

## Contributing

Please feel free to clone the repo and contribute to it :)


## Authors

* **Elkin Giovanni Romero** - *Finishing work* - [romer8](https://github.com/romer8)
* **Daniel Ames** - *Contribuitor* - [danames](https://github.com/danames)
* **Sarva Pulla** - *Initial work* - [SarvaPulla](https://github.com/SarvaPulla)
* **Rohit Khatta** - *Initial work* - [rfun](https://github.com/rfun)


## License

This project is licensed under the BSD 3-Clause License
