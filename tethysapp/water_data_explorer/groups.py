import xmltodict
import logging
import sys
import os
import json
import pandas as pd
import geopandas as gpd
import numpy as np
import sys
sys.path.append("/home/elkin/Projects/condaPackages/pywaterml")
import pywaterml.waterML as pwml
import shapely.speedups
from urllib.error import HTTPError
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.conf import settings

from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData
from sqlalchemy.orm import mapper
from .model import Base, Catalog, HISCatalog, Groups, HydroServer_Individual


from tethys_sdk.gizmos import TimeSeries, SelectInput, DatePicker, TextInput, GoogleMapView
from tethys_sdk.permissions import permission_required, has_permission

from .model import Catalog, HISCatalog
from .auxiliary import *

import xml.etree.ElementTree as ET
import psycopg2
from owslib.waterml.wml11 import WaterML_1_1 as wml11
import suds
from suds.client import Client  # For parsing WaterML/XML
from suds.xsd.doctor import Import, ImportDoctor
from suds.transport import TransportError
# from suds.WebFault import webFault
# from suds.sudsobject import SudObject
from json import dumps, loads
from pyproj import Proj, transform  # Reprojecting/Transforming coordinates
from datetime import datetime
from urllib.parse import unquote
from .endpoints import *
from django.http import JsonResponse, HttpResponse
from .app import WaterDataExplorer as app
from tethys_sdk.workspaces import app_workspace

from shapely.geometry import Point, Polygon
Persistent_Store_Name = 'catalog_db'
# logging.basicConfig(level=logging.INFO)
# logging.getLogger('suds.client').setLevel(logging.DEBUG)

@app_workspace
def available_regions(request, app_workspace):
    shapely.speedups.enable()
    countries_geojson_file_path = os.path.join(app_workspace.path, 'countries.geojson')
    countries_gdf = gpd.read_file(countries_geojson_file_path)
    countries_series = countries_gdf.loc[:,'geometry']
    print(countries_gdf)
    print(type(countries_gdf))
    print(type(countries_series))
    print(countries_series)

    polys = gpd.GeoSeries({
        'foo': Polygon([(5, 5), (5, 13), (13, 13), (13, 5)]),
        'bar': Polygon([(10, 10), (10, 15), (15, 15), (15, 10)]),
    })
    print(polys)
    ret_object = {}
    list_regions = []
    SessionMaker = app.get_persistent_store_database(
        Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()

    region_list = []
    hydroserver_lat_list = []
    hydroserver_long_list = []
    hydroserver_name_list = []

    if request.method == 'GET' and 'group' not in request.GET:
        hydroservers_selected = session.query(HydroServer_Individual).all()
    else:
        specific_group=request.GET.get('group')
        print(specific_group)
        hydroservers_selected = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
    # for server in session.query(HydroServer_Individual).all():
    for server in hydroservers_selected:
        sites = json.loads(server.siteinfo)
        ls_lats = []
        ls_longs = []
        site_names = []
        # print(sites)
        for site in sites:
            ls_lats.append(site['latitude'])
            ls_longs.append(site['longitude'])
            site_names.append(site['sitename'])
        hydroserver_lat_list.append(ls_lats)
        hydroserver_long_list.append(ls_longs)
        hydroserver_name_list.append(site_names)


    for indx in range(0,len(hydroserver_name_list)):
        df = pd.DataFrame({'SiteName': hydroserver_name_list[indx],'Latitude': hydroserver_lat_list[indx],'Longitude': hydroserver_long_list[indx]})
        gdf = gpd.GeoDataFrame(geometry=gpd.points_from_xy(df.Longitude, df.Latitude), index = hydroserver_name_list[indx])
        print(gdf)
        # for key, geom in countries_series.items():
        #     print(key, geom)
        print("STOPS")
        gdf = gdf.assign(**{str(key): gdf.within(geom) for key, geom in countries_series.items()})
        print(gdf)
        trues_onlys = gdf.copy()
        trues_onlys = trues_onlys.drop(['geometry'],axis=1)
        print(trues_onlys)
        # trues_onlys = gdf.loc[:,gdf.any()]
        trues_onlys = trues_onlys.loc[:,trues_onlys.any()]
        countries_index = list(trues_onlys.columns)
        print(countries_index)
        countries_index = [x for x in countries_index if x != 'geometry']
        countries_index = [int(i) for i in countries_index]
        print(countries_index)
        countries_selected = countries_gdf.iloc[countries_index]
        list_countries_selected = list(countries_selected['name'])
        print(list_countries_selected)
        for coun in list_countries_selected:
            if coun not in region_list:
                region_list.append(coun)
        # print(countries_selected)
        # break
        # gdf.assign(**{key: gdf.within(geom) for key, geom in countries_gdf.items()})
        # pip_mask = gdf.within(countries_gdf.loc[0,'geometry'])
        # values_mask = pip_mask.values
        # print(pip_mask)
        # print("STOP")
        # if True in values_mask:
            # continue
        # for index, row in countries_gdf.iterrows():
        #     print("INSIDE")
        #     print(row)
        #     if row['name'] == "Uruguay":
        #         # row.reset_index(drop=True, inplace=True)
        #         pip_mask = gdf.within(row.loc[0,'geometry'])
        #         print(pip_mask)
    print(region_list)
    ret_object['countries'] = region_list
    return JsonResponse(ret_object)


def available_variables(request):
    # Query DB for hydroservers
    SessionMaker = app.get_persistent_store_database(
        Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()

    if request.method == 'GET' and 'group' not in request.GET:
        hydroservers_groups = session.query(HydroServer_Individual).all()
    else:
        specific_group=request.GET.get('group')
        hydroservers_groups = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver


    # hydroservers_groups = session.query(Groups).all()
    varaibles_list = {}
    hydroserver_variable_list = []

    for server in hydroservers_groups:
        print("URL", server.url.strip())
        water = pwml.WaterMLOperations(url = server.url.strip())
        hs_variables = water.GetVariables()['variables']
        print(hs_variables)
        for hs_variable in hs_variables:
            if hs_variable['variableName'] not in hydroserver_variable_list:
                hydroserver_variable_list.append(hs_variable['variableName'])

    varaibles_list["variables"] = hydroserver_variable_list
    return JsonResponse(varaibles_list)

def available_services(request):
    url_catalog = request.GET.get('url')
    hs_services = {}
    if url_catalog:
        try:
            # url_catalog = unquote(url_catalog)
            # print("THIS ", url_catalog)
            url_catalog2 = url_catalog + "?WSDL"
            client = Client(url_catalog2, timeout= 500)
            # logging.getLogger('suds.client').setLevel(logging.DEBUG)

            service_info = client.service.GetWaterOneFlowServiceInfo()
            services = service_info.ServiceInfo
            views = giveServices(services)
            hs_services['services'] = views
        except Exception as e:
            # print("I AM HERE OR NOT")
            services = parseService(url_catalog)
            # print(services)
            views = giveServices(services)
            # print(views)
            hs_services['services'] = views
    return JsonResponse(hs_services)



######*****************************************************************************************################
######***********************CREATE AN EMPTY GROUP OF HYDROSERVERS ****************************################
######*****************************************************************************************################
def create_group(request):
    group_obj={}
    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()  # Initiate a session
    # Query DB for hydroservers
# http://gs-service-production.geodab.eu/gs-service/services/essi/view/whos-plata/hiscentral.asmx/GetWaterOneFlowServiceInfo?
# http://gs-service-production.geodab.eu/gs-service/services/essi/view/whos-plata/hiscentral.asmx?WSDL
# http://gs-service-production.geodab.eu/gs-service/services/essi/view/whos-plata/hiscentral.asmx
    # print(request.POST)
    if request.is_ajax() and request.method == 'POST':
        print("inside first if statement of create group")
        description = request.POST.get('textarea')

        # print(description)
        title = request.POST.get('addGroup-title')
        url_catalog = request.POST.get('url')

        selected_services = []
        for key, value in request.POST.items():
            print(key)
            if value not in (title, description,url_catalog):
                # selected_services.append(value.replace("_"," "))
                selected_services.append(value)

        # selected_services = request.POST.get('server')
        print(selected_services)

        group_obj['title']= title.translate ({ord(c): "_" for c in "!@#$%^&*()[]{};:,./<>?\|`~-=+"})
        group_obj['description']= description
        # url_catalog = request.POST.get('url')
        group_hydroservers=Groups(title=title, description=description)
        session.add(group_hydroservers)
        session.commit()
        session.close()

        if url_catalog:
            try:
                print("NORMAL")
                url_catalog = unquote(url_catalog)
                print("THIS ", url_catalog)
                url_catalog2 = url_catalog + "?WSDL"
                # client = zeep.Client(url_catalog2)
                client = Client(url_catalog2, timeout= 500)
                service_info = client.service.GetWaterOneFlowServiceInfo()
                services = service_info.ServiceInfo
                print("selected_services", selected_services)
                views = giveServices(services,selected_services)
                print("DONE WITH VIEWS IN GETSITEINFO")
                print(views)
                group_obj['views'] = addMultipleViews(views,title)
                print("DONE WITH MULTIPLEVIEWS IN GETSITEINFO")
            except Exception as e:
                print("EXCEPT")
                services = parseService(url_catalog)
                views = giveServices(services,selected_services)
                print("DONE WITH VIEWS IN EXCEPTION")
                print(views)
                group_obj['views'] = addMultipleViews(views,title)
                print("DONE WITH MULTIPLEVIEWS IN EXCEPTION")


    else:
        group_obj['message'] = 'There was an error while adding th group.'

    # print(group_obj['views'])
    return JsonResponse(group_obj)

def giveServices(services,filter_serv=None):
    hs_list = []
    for i in services:
        # print(i)
        hs = {}
        url = i['servURL']
        if not url.endswith('?WSDL'):
            url = url + "?WSDL"
        title = i['Title']
        print(title)
        description = "None was provided by the organiation in charge of the Web Service"
        if 'aabstract' in i:
            # print("THERE IS ABSTRACH")
            description = i['aabstract']
        if filter_serv is not None:
            print(filter_serv,"not none")
            if title in filter_serv:
                print(title, filter_serv)
                try:
                    print("Testing %s" % (url))
                    url_client = Client(url)
                    hs['url'] = url
                # selected_services.append(value.replace("_"," "))
                    hs['title'] = title

                    hs['description'] = description
                    hs_list.append(hs)
                    print("%s Works" % (url))
                except Exception as e:
                    print(e)
                    hs['url'] = url
                    print("%s Failed" % (url))
                    # error_list.append(hs)
                # hs_list['servers'] = hs_list
                # list['errors'] = error_list
        else:
            try:
                print("Testing %s" % (url))
                url_client = Client(url)
                hs['url'] = url
                hs['title'] = title
                hs['description'] = description
                hs_list.append(hs)
                print("%s Works" % (url))
            except Exception as e:
                print(e)
                hs['url'] = url
                print("%s Failed" % (url))
                # error_list.append(hs)
            # hs_list['servers'] = hs_list
            # list['errors'] = error_list

    return hs_list

def addMultipleViews(hs_list,group):
    ret_object = []
    for hs in hs_list:
        # new_url = hs['url'] + "?WSDL"
        new_url = hs['url']
        water = pwml.WaterMLOperations(url = new_url)

        return_obj = {}
        print("********************")
        print(hs)
        try:
            # # response = urllib.request.urlopen(new_url)
            #
            # # print(response.getcode())
            # print(new_url)
            # client = Client(new_url, timeout= 500)
            # sites = client.service.GetSites('[:]')
            # # sites = client.service.GetSites('')
            # print("this are the sites")
            # print(sites)
            # print(type(sites))
            # sites_json={}
            # if isinstance(sites, str):
            #     print("here")
            #     sites_dict = xmltodict.parse(sites)
            #     sites_json_object = json.dumps(sites_dict)
            #     sites_json = json.loads(sites_json_object)
            # else:
            #     sites_json_object = suds_to_json(sites)
            #     sites_json = json.loads(sites_json_object)
            #
            # # Parsing the sites and creating a sites object. See auxiliary.py
            # print("-------------------------------------")
            # # print(sites_json)
            # sites_object = parseJSON(sites_json)

            # print(sites_object)
            # converted_sites_object=[x['sitename'].decode("UTF-8") for x in sites_object]
            # sites_parsed_json = json.dumps(converted_sites_object)
            sites_object = water.GetSites()
            print(sites_object)
            sites_parsed_json = json.dumps(sites_object)
            print(sites_parsed_json)
 # http://gs-service-production.geodab.eu/gs-service/services/essi/view/whos-country/hiscentral.asmx
            return_obj['title'] = hs['title'].translate ({ord(c): "_" for c in "!@#$%^&*()[]{};:,./<>?\|`~-=+"})
            return_obj['url'] = hs['url']
            return_obj['description'] = hs['description']
            return_obj['siteInfo'] = sites_parsed_json
            return_obj['group'] = group
            return_obj['status'] = "true"

            ret_object.append(return_obj)

            SessionMaker = app.get_persistent_store_database(
                Persistent_Store_Name, as_sessionmaker=True)
            session = SessionMaker()

            hydroservers_group = session.query(Groups).filter(Groups.title == group)[0]
            # hydroservers_g = session.query(Groups).filter(Groups.title == group)
            print(hydroservers_group.title)
            print(hydroservers_group.description)

            hs_one = HydroServer_Individual(title=hs['title'],
                             url=hs['url'],
                             description=hs['description'],
                             siteinfo=sites_parsed_json)

            hydroservers_group.hydroserver.append(hs_one)
            print(hydroservers_group.hydroserver)
            session.add(hydroservers_group)
            session.commit()
            session.close()

#CHANGE LAST
        except (suds.WebFault, KeyError, TypeError, ValueError) as detail:
            # place = hs['url'].split("gs-view-source(")
            # place = place[1].split(")")[0]
            # new_url = "http://gs-service-production.geodab.eu/gs-service/services/essi/view/" + place + "/cuahsi_1_1.asmx"
            print("Invalid WSDL service",detail)
            continue


    return ret_object

######*****************************************************************************************################
######************RETRIEVES THE GROUPS OF HYDROSERVERS THAT WERE CREATED BY THE USER **********################
######*****************************************************************************************################

def get_groups_list(request):
    list_catalog = {}
    print("get_groups_list controllers.py FUNCTION inside")

    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)

    print(SessionMaker)
    session = SessionMaker()  # Initiate a session


    # Query DB for hydroservers
    hydroservers_groups = session.query(Groups).all()

    hydroserver_groups_list = []
    for group in hydroservers_groups:
        layer_obj = {}
        layer_obj["title"] = group.title
        layer_obj["description"] = group.description

        hydroserver_groups_list.append(layer_obj)
    # A json list object with the HydroServer metadata. This object will be
    # used to add layers to the catalog table on the homepage.
    list_catalog["hydroservers"] = hydroserver_groups_list
    print("----------------------------------------------")
    print("----------------------------------------------")
    print("----------------------------------------------")
    print(list_catalog)
    print("----------------------------------------------")
    print("----------------------------------------------")
    print("----------------------------------------------")
    list2={}
    array_example=[]
    for server in session.query(HydroServer_Individual).all():
        layer_obj = {}
        layer_obj["title"] = server.title
        layer_obj["url"] = server.url
        array_example.append(layer_obj)

    list2["servers"] =array_example
    print(list2)

    return JsonResponse(list_catalog)

######*****************************************************************************************################
##############################LOAD THE HYDROSERVERS OF AN SPECIFIC GROUP#######################################
######*****************************************************************************************################
def catalog_group(request):
    # print("Catalog_group function in controllers.py")
    # print("--------------------------------------------------------------------")
    specific_group=request.GET.get('group')
    # print(specific_group)
    # print(request.GET)
    list_catalog = {}
    # print("catalogs_groups controllers.py FUNCTION inside")

    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)

    # print(SessionMaker)
    session = SessionMaker()  # Initiate a session
    hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
    h1=session.query(Groups).join("hydroserver")
    hs_list = []
    for hydroservers in hydroservers_group:
        name = hydroservers.title
        # print(hydroservers.title)
        # print(hydroservers.url)
        layer_obj = {}
        layer_obj["title"] = hydroservers.title
        layer_obj["url"] = hydroservers.url.strip()
        layer_obj["siteInfo"] = hydroservers.siteinfo
        hs_list.append(layer_obj)

    list_catalog["hydroserver"] = hs_list
    print("------------------------------------------")
    # print("printing the lsit of hydroservers of the group")
    # print(list)

    return JsonResponse(list_catalog)

######*****************************************************************************************################
############################## DELETE A GROUP OF HYDROSERVERS #############################
######*****************************************************************************************################
@permission_required('delete_hydrogroups')
def delete_group(request):
    print("delete_group function controllers.py")
    print("--------------------------------------------")
    list_catalog = {}
    list_groups ={}
    list_response = {}
    SessionMaker = app.get_persistent_store_database(
        Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()
    print(request.POST)
    if request.is_ajax() and request.method == 'POST':
        groups=request.POST.getlist('groups[]')
        list_groups['groups']=groups
        list_response['groups']=groups
        print(groups)
        i=0
        arrayTitles = []
        for group in session.query(Groups).all():
            print(group.title)

        for group in groups:
            print("print the group",session.query(Groups).filter(Groups.title == group).first())
            hydroservers_group = session.query(Groups).filter(Groups.title == group)[0].hydroserver
            print("printing hydroserver_groups")
            print(hydroservers_group)
            for server in hydroservers_group:
                title=server.title
                arrayTitles.append(title)
                print(server.title)
                i_string=str(i);
                # list["title"] = title
                list_catalog[i_string] = title
                # session.delete(server)
                # server.delete(synchronize_session='evaluate')
                # session.commit()
                # session.close()
                i=i+1
            print(session.query(Groups).filter(Groups.title == group).first().id)
            hydroservers_group = session.query(Groups).filter(Groups.title == group).first()
            session.delete(hydroservers_group)
            session.commit()
            session.close()
        list_response['hydroservers']=arrayTitles


    return JsonResponse(list_response)

@app_workspace
def catalog_filter(request,app_workspace):
    ret_obj = {}
    print("inside first if statement of create group")
    countries = request.GET.getlist('countries')
    count_new = []
    var_new = []
    for count in countries:
        count_new.append(count.replace("_"," "))
    countries = count_new
    print(countries)
    variables = request.GET.getlist('variables')
    for varia in variables:
        var_new.append(varia.replace("_"," "))
    variables = var_new
    print(variables)
    # shapely.speedups.enable()
    countries_geojson_file_path = os.path.join(app_workspace.path, 'countries.geojson')
    hs_filtered_region = filter_region(countries_geojson_file_path,countries)
    hs_filtered_variable = filter_variable(variables)
    print("hs_filtered_region",hs_filtered_region)
    print("hs_filtered_variable",hs_filtered_variable)
    intersection_hs = []
    if len(hs_filtered_region) > 0 and len(hs_filtered_variable) > 0:
        intersection_hs = list(set(hs_filtered_region) & set(hs_filtered_variable))
    if len(hs_filtered_region) > 0:
        intersection_hs = hs_filtered_region
    if len(hs_filtered_variable) > 0:
        intersection_hs = hs_filtered_variable
    print(intersection_hs)
    ret_obj['hs'] = intersection_hs
    # countries_gdf = gpd.read_file(countries_geojson_file_path)
    # countries_gdf = countries_gdf[countries_gdf['name'].isin(countries)]
    # print(countries_gdf)
    return JsonResponse(ret_obj)


def filter_region(countries_geojson_file_path,list_countries, actual_group = None):
    region_list = []
    if len(list_countries) > 0:
        shapely.speedups.enable()
        # countries_geojson_file_path = os.path.join(app_workspace.path, 'countries.geojson')
        countries_gdf = gpd.read_file(countries_geojson_file_path)
        countries_gdf2 = countries_gdf[countries_gdf['name'].isin(list_countries)]
        countries_series = countries_gdf2.loc[:,'geometry']
        # print(countries_gdf2)
        SessionMaker = app.get_persistent_store_database(
            Persistent_Store_Name, as_sessionmaker=True)
        session = SessionMaker()
        hydroserver_lat_list = []
        hydroserver_long_list = []
        hydroserver_name_list = []
        servers = []
        if actual_group is None:
            hydroservers_selected = session.query(HydroServer_Individual).all()
        else:
            specific_group = actual_group
            print(specific_group)
            hydroservers_selected = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver

        for server in hydroservers_selected:
            servers.append(server.title)
            sites = json.loads(server.siteinfo)
            ls_lats = []
            ls_longs = []
            site_names = []
            for site in sites:
                ls_lats.append(site['latitude'])
                ls_longs.append(site['longitude'])
                site_names.append(site['sitename'])
            hydroserver_lat_list.append(ls_lats)
            hydroserver_long_list.append(ls_longs)
            hydroserver_name_list.append(site_names)

        for indx in range(0,len(hydroserver_name_list)):
            df = pd.DataFrame({'SiteName': hydroserver_name_list[indx],'Latitude': hydroserver_lat_list[indx],'Longitude': hydroserver_long_list[indx]})
            gdf = gpd.GeoDataFrame(geometry=gpd.points_from_xy(df.Longitude, df.Latitude), index = hydroserver_name_list[indx])
            # print(gdf)

            gdf = gdf.assign(**{str(key): gdf.within(geom) for key, geom in countries_series.items()})
            trues_onlys = gdf.copy()
            trues_onlys = trues_onlys.drop(['geometry'],axis=1)

            trues_onlys = trues_onlys.loc[:,trues_onlys.any()]
            # print('trues')
            # print(trues_onlys)
            countries_index = list(trues_onlys.columns)
            countries_index = [x for x in countries_index if x != 'geometry']
            countries_index = [int(i) for i in countries_index]
            # print("indices")
            # print(countries_index)
            countries_selected = countries_gdf.iloc[countries_index]
            # print("selected")
            # print(countries_selected)
            list_countries_selected = list(countries_selected['name'])
            # print(list_countries_selected)
            if len(list_countries_selected) > 0:
                # region_list.append(servers[indx])
                # region_list.append(session.query(HydroServer_Individual).all()[indx].title)
                region_list.append(hydroservers_selected[indx].title)

    # print(region_list)
    return region_list
def filter_variable(variables_list, actual_group = None):
    hs_list = []
    if len(variables_list) > 0:
        list_catalog={}
        SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
        session = SessionMaker()  # Initiate a session
        if actual_group is None:
            hydroservers_selected = session.query(HydroServer_Individual).all()
        else:
            specific_group = actual_group
            print(specific_group)
            hydroservers_selected = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
        hs_list = []
        for hydroservers in hydroservers_selected:
            name = hydroservers.title
            water = pwml.WaterMLOperations(url = hydroservers.url.strip())
            variables_sever = water.GetVariables()['variables']
            df_variables = pd.DataFrame.from_dict(variables_sever)
            variables_array = df_variables['variableName'].tolist()
            print("**************************88")
            print(variables_array)
            print(variables_list)
            print("**************************88")

            check = any(item in variables_array for item in variables_list)
            if check is True:
                hs_list.append(name)

    return hs_list

@app_workspace
def get_variables_for_country(request,app_workspace):


    response_obj = {}
    countries = request.GET.getlist('countries[]')
    print(countries)
    variables_hs = []
    countries_geojson_file_path = os.path.join(app_workspace.path, 'countries.geojson')
    if request.method == 'GET' and 'group' in request.GET:
        specific_group=request.GET.get('group')
        hs_filtered_region = filter_region(countries_geojson_file_path,countries,actual_group = specific_group )
    else:
        hs_filtered_region = filter_region(countries_geojson_file_path,countries)
    print(hs_filtered_region)
    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()


    for hs in hs_filtered_region:
        hs_url = session.query(HydroServer_Individual).filter(HydroServer_Individual.title == hs)[0].url
        # print(hs_url)
        water = pwml.WaterMLOperations(url = hs_url)
        variables_sever = water.GetVariables()['variables']
        df_variables = pd.DataFrame.from_dict(variables_sever)
        variables_array = df_variables['variableName'].tolist()
        for vari in variables_array:
            variables_hs.append(vari)
    response_obj['variables'] = variables_hs
    return JsonResponse(response_obj)

######*****************************************************************************************################
############################## Function to retrieve the keywords for all the selected groups #############################
######*****************************************************************************************################
def keyWordsForGroup(request):
    list_catalog={}
    print("inside the keywordsgroup function")
    specific_group=request.GET.get('group')

    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)

    # print(SessionMaker)
    session = SessionMaker()  # Initiate a session
    hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
    # h1=session.query(Groups).join("hydroserver")
    hs_list = []
    words_to_search={};

    for hydroservers in hydroservers_group:
        name = hydroservers.title
        # print(hydroservers.title)
        # print(hydroservers.url)
        layer_obj = {}
        layer_obj["title"] = hydroservers.title
        layer_obj["url"] = hydroservers.url.strip()
        print(layer_obj["url"])
        layer_obj["siteInfo"] = hydroservers.siteinfo
        client = Client(url = hydroservers.url.strip(), timeout= 500)
        # client = Client(url = hydroservers.url.strip(), plugins =[schema_doctor], autoblend=True)

        keywords = client.service.GetVariables('[:]')

        keywords_dict = xmltodict.parse(keywords)
        keywords_dict_object = json.dumps(keywords_dict)

        keywords_json = json.loads(keywords_dict_object)
        # Parsing the sites and creating a sites object. See utilities.py
        print("-------------------------------------")
        # print(sites_json)
        print(type(keywords_json))
        print(keywords_dict.keys())
        # print(keywords_json['variablesResponse']['variables']['variable'])
        array_variables=keywords_json['variablesResponse']['variables']['variable']
        array_keywords_hydroserver=[]
        print(type(array_variables))
        # print(array_variables)

        if isinstance(array_variables,type([])):
            # print("inside the list iption")
            for words in array_variables:
                array_keywords_hydroserver.append(words['variableName'])
        if isinstance(array_variables,dict):
            array_keywords_hydroserver.append(array_variables['variableName'])

        words_to_search[name] = array_keywords_hydroserver
        print(words_to_search)
        # print(type(keywords_json['variablesResponse']['variables']['variable']))
        # layer_obj['keywords']=keywords_json
        # print(keywords_json)

        hs_list.append(layer_obj)

    list_catalog["hydroserver"] = hs_list
    list_catalog["keysSearch"] = words_to_search
    print("------------------------------------------")
    # print(len(hs_list))
    # print(list)
    return JsonResponse(list_catalog)
