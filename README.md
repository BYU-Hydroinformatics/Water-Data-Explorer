
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

The following packages are the requirements for the WDE. The Tethys Platform  manages to installs them automatically using the [install.yml](https://github.com/BYU-Hydroinformatics/Water-Data-Explorer/blob/master/install.yml)

```
conda:
  skip: true
  conda:
    channels:
      - conda-forge
    packages:
      - geojson
      - xmltodict
      - pyshp
      - geopandas
      - suds-community
      - pywaterml

  pip:

post:
```
However, the install.yml file in the WDE skips the installation of the dependencies. You need to install the requirements manually using the [requirements.txt](https://github.com/BYU-Hydroinformatics/Water-Data-Explorer/blob/master/requirements.txt). We recommend using mamba to have a fast and efficient installation of the dependencies:

```
conda install -n <tethys_env_name> mamba -c conda-forge
conda activate <tethys_env_name>
mamba install --file requirements.txt -c conda-forge
```
After installing the dependencies, you can install the WDE application:

```
tethys install -d # for development
tethys install # for production
```


The application can also be installed with the Tethys WareHouse application. Steps can be found [here](https://tethys-app-store.readthedocs.io)


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
