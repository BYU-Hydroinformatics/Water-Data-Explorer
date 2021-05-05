=========================
Water Data Explorer (WDE)
=========================


Introduction
************
In recent years, there has been a growing recognition of the need for standardized ways of sharing water data on the web. In response to this need, the Consortium of Universities for the Advancement of Hydrologic Science (CUAHSI) Hydrologic Information System (HIS) has been developed along with the standardized WaterOneFlow web services and WaterML data exchange format. To access data that are shared using the WaterOneFlow services and WaterML format, the already developed tools exist such as the Microsoft Windows HydroDesktop software (link), the WaterML R package(link), and the web-based CUAHSI HydroClient (link) which serves as an access point to the CUAHSI HIS database.

Water Data Explorer (WDE) is a newly developed web-based tool allowing a broad range of users to discover, access, visualize, and download data from any Information System that makes available water data in WaterML format through WaterOneFlow services. WDE is designed in a way that allows users to customize it for local or regional web portals.



WDE Overview
************

WDE is an open-source web application providing users with the functionalities of data discovery, data access, data visualization, and data downloading from any Information System that makes available water data in WaterML format through WaterOneFlow web services. WDE  can be installed by any organization and will occupy minimal server space.

User Interface
------------------

To organize and manage various WaterOneFlow web services, WDE uses Data Views that are organized in Catalogs.

Screenshot WDE highlighting the left side of the interface (Transboundary Basins), (Countries)
Arrows backwards, not going to the stations Figure 4

Each Data View contains a set of data that is accessible through a specific WaterOneFlow web service.

The stations for which data are accessible through a specific Data View are displayed on the WDE map interface along with a legend of the respective Data Views.

Screenshot of WDE highlighting the map and legend. Highlight legend and the VIEW that is displayed, and also highlight the stations displayed.

For each Station/Platform, a set of metadata is available in the Graphs Panel of the WDE User Interface. Also, for each Station/Platform, the table of observed variables is available and includes variable names, units, and interpolation types.

Screenshot of data variables

Station/Platform time series data can be plotted as “Scatter” or “Whisker and Box” plots, and be downloaded in CSV, OGC NetCDF (CF conventions), OGC WaterML 2.0 and CUAHSI WaterML 1.0 formats for any available time period of interest in the Time Series Plots section.

Screenshot of a USA site, highlight the set of metadata,
Screenshot of a USA site, highlight Plot,

Developers
----------

WDE has been developed by Elkin Giovanni Romero Bustamante at the Hydroinformatics laboratory at BYU.
The Hydroinformatics laboratory focuses on delivering different software products and services for water
modeling. Some of the most important works include: Global streamflow Forecast Services API, creation of
the Tethys Platform, and Hydroserver Lite. The most recent publications and works can be found on the
official BYU Hydroinformatics website.

Source Code
-----------
The WDE source code is available on Github:
* https://github.com/BYU-Hydroinformatics/Water-Data-Explorer 
