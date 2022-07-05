import logging
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .auxiliary import *

from tethys_sdk.permissions import login_required,has_permission

from .app import WaterDataExplorer as app

Persistent_Store_Name = 'catalog_db'

logging.getLogger('suds.client').setLevel(logging.CRITICAL)

@login_required()

def home(request):
    """
    Controller for the app home page.
    """
    boundaryEndpoint = app.get_custom_setting('Boundary Geoserver Endpoint')
    boundaryWorkspace = app.get_custom_setting('Boundary Workspace Name')
    boundaryLayer = app.get_custom_setting('Boundary Layer Name')
    boundaryMovement = app.get_custom_setting('Boundary Movement')
    boundaryColor = app.get_custom_setting('Boundary Color')
    boundaryWidth = app.get_custom_setting('Boundary Width')
    nameViews = app.get_custom_setting('Views Names')
    logoInst = app.get_custom_setting('InstitutionLogo')
    gtagCode = app.get_custom_setting('GA_MEASUREMENT_ID')

    context = {
     "geoEndpoint": boundaryEndpoint,
     "geoWorkspace": boundaryWorkspace,
     "geoLayer": boundaryLayer,
     "geoMovement":boundaryMovement,
     "geoColor": boundaryColor,
     "geoWidth":boundaryWidth,
     'can_delete_hydrogroups': has_permission(request, 'delete_hydrogroups'),
     'can_block_map': has_permission(request, 'block_map'),
     'can_download':has_permission(request, 'can_download'),
     'views_names': nameViews,
     'logo_institucion': logoInst,
     'gtagcode': gtagCode
    }

    return render(request, 'water_data_explorer/home.html', context)
