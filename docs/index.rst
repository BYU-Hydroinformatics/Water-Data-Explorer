.. Water Data Explorer documentation master file, created by
   sphinx-quickstart on Tue Mar 23 10:07:14 2021.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.


.. image:: images/wde.png
   :width: 100
   :align: center


Water Data Explorer
===================


The Water Data Explorer provides users the ability to customize the application for different regions containing WaterOneFlow web services, which facilitates different versions of the WDE regionally. The WDE also provides three main functionalities as a client component for the different Software Oriented Architecture (SOA) systemssupports: data discovery, data visualization, and data download for the selected WaterOneFlow services. The WDE’s design is organized by WaterOneFlowconsists of three different levels of information ( catalog, specific data server, and individual measurement stations. A server admin can specify which datasets an individual instance of the WDE supports and end users can use the application to access data from the specified datasets. ) that allow the application to organize the data response of the WaterOneFlow web services methods. In designing the WDE, We also modularized the core WaterOneFlow access code into a new open source Python package called “pywaterml” which provides the package was created to connect to provide a more generic and re-usable code for the different WaterOneFlow web services from the SOA systems, and to execute their different methods used by WDE to discover, visualize, and download data.

.. toctree::
   :maxdepth: 2
   :caption: Table of contents:

   Customizing the WDE <customization>
   Discovering WHOS Views <discovering1>
   Discovering Customized Views <discovering2>
   Analyzing Customized Views <analyzing>
   Visualizing Time Series Observation <visualizing>
   Donwloading Time Series Data <downloading>

Indices
=======
* :ref:`search`
