import xmltodict
import logging
import sys
import os
import json
import pandas as pd
import numpy as np

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.conf import settings

from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData
from sqlalchemy.orm import mapper
from .model import Base, Groups, HydroServer_Individual


from tethys_sdk.gizmos import TimeSeries, SelectInput, DatePicker, TextInput, GoogleMapView
from tethys_sdk.permissions import permission_required, has_permission

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


from django.http import JsonResponse, HttpResponse
from .app import WaterDataExplorer as app

Persistent_Store_Name = 'catalog_db'

logging.getLogger('suds.client').setLevel(logging.CRITICAL)

@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    can_define_boundary = has_permission(request, 'block_map')

    boundaryEndpoint = app.get_custom_setting('Boundary Geoserver Endpoint')
    boundaryWorkspace = app.get_custom_setting('Boundary Workspace Name')
    boundaryLayer = app.get_custom_setting('Boundary Layer Name')
    boundaryMovement = app.get_custom_setting('Boundary Movement')
    boundaryColor = app.get_custom_setting('Boundary Color')
    boundaryWidth = app.get_custom_setting('Boundary Width')
    nameViews = app.get_custom_setting('Views Names')
    logoInst = app.get_custom_setting('InstitutionLogo')
    context = {
     "geoEndpoint": boundaryEndpoint,
     "geoWorkspace": boundaryWorkspace,
     "geoLayer": boundaryLayer,
     "geoMovement":boundaryMovement,
     "geoColor": boundaryColor,
     "geoWidth":boundaryWidth,
     'can_delete_hydrogroups': has_permission(request, 'delete_hydrogroups'),
     'can_block_map': has_permission(request, 'block_map'),
     'views_names': nameViews,
     'logo_institucion': logoInst
    }

    return render(request, 'water_data_explorer/home.html', context)
