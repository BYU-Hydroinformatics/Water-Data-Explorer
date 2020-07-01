import xmltodict
import logging
import sys
import os
import json
from .auxiliary import *
import xml.etree.ElementTree as ET
import psycopg2
from owslib.waterml.wml11 import WaterML_1_1 as wml11
from suds.client import Client  # For parsing WaterML/XML
from suds.xsd.doctor import Import, ImportDoctor
# from suds.sudsobject import SudObject
from json import dumps, loads
from pyproj import Proj, transform  # Reprojecting/Transforming coordinates
from datetime import datetime
from .model import Groups, HydroServer_Individual


Persistent_Store_Name = 'catalog_db'
logging.getLogger('suds.client').setLevel(logging.CRITICAL)
def addHydroservers(url,title,group):
    client = Client(url, timeout= 800)
    sites = client.service.GetSites('[:]')
    # sites = client.service.GetSites('')
    sites_json={}
    if isinstance(sites, str):
        sites_dict = xmltodict.parse(sites)
        sites_json_object = json.dumps(sites_dict)
        sites_json = json.loads(sites_json_object)
    else:
        sites_json_object = suds_to_json(sites)
        sites_json = json.loads(sites_json_object)

    # Parsing the sites and creating a sites object. See auxiliary.py
    sites_object = parseJSON(sites_json)

    # sites_parsed_json = json.dumps(converted_sites_object)
    sites_parsed_json = json.dumps(sites_object)

    SessionMaker = app.get_persistent_store_database(
        Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()

    hydroservers_group = session.query(Groups).filter(Groups.title == group)[0]

    hs_one = HydroServer_Individual(title=title,
                     url=url,
                     siteinfo=sites_parsed_json)

    hydroservers_group.hydroserver.append(hs_one)
    session.add(hydroservers_group)
    session.commit()
    session.close()
