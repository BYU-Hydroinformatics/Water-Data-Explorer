=========================
Water Data Explorer (WDE)
=========================


Introduction
************
In recent years, there has been a growing recognition of the need for standardized ways of sharing water data on the web. In response to this need, the
Consortium of Universities for the Advancement of Hydrologic Science (CUAHSI) Hydrologic Information System (HIS) has been developed along with the standardized
WaterOneFlow web services and WaterML data exchange format. To access data that are shared using the WaterOneFlow services and WaterML format,
the already developed tools exist such as the Microsoft Windows HydroDesktop software (link), the WaterML R package(link), and the web-based CUAHSI HydroClient (link)
which serves as an access point to the CUAHSI HIS database.

Water Data Explorer (WDE) is a newly developed tool allowing a broad range of users to discover, access, visualize, and download data from any
Information System that makes available water data in WaterML format through WaterOneFlow services. WDE is designed in a way that allows users to
customize it for local or regional web portals.


WDE Overview
************

WDE is an open-source application providing users with the functionalities of data discovery, data access, data visualization,
and data downloading from any Information System that makes available water data in WaterML format through WaterOneFlow web services.
WDE can be installed by any organization and will occupy minimal server space.

WDE User Interface
------------------

To organize and manage various WaterOneFlow web services, WDE uses Data Views organized in Catalogs.

Screenshot WDE highlighting the left side of the interface (Transboundary Basins), (Countries)
Arrows backwards, not going to the stations Figure 4

Each Data View contains a set of data that is accessible through a specific WaterOneFlow web service  published by a specific data provider.

The stations for which data are accessible through a specific Data View are displayed on the WDE map interface along with a legend of the respective Data Views.

Screenshot of WDE highlighting the map and legend. Highlight legend and the VIEW that is displayed, and also highlight the stations displayed.

For each station, a set of metadata is available in the Station/Platform Information section of the WDE User Interface. Also, for each Station/Platform, the table of observed variables is available and includes variable names, units, and interpolation types.

Screenshot of data variables

Station/Platform time series data can be plotted and downloaded for any available time period of interest in the Station/Platform Plots section. The available formats are: CSV, OGC NetCDF (CF conventions), OGC WaterML 2.0 and CUAHSI WaterML 1.0.

Screenshot of a USA site, highlight the set of metadata,
Screenshot of a USA site, highlight Plot,
