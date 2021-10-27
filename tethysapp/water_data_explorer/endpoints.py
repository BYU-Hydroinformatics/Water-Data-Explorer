import xmltodict
import logging
import sys
import os
import json
import pandas as pd
import numpy as np
import geopandas as gpd
import shapely.speedups

from shapely.geometry import Point, Polygon


from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.conf import settings

from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData,update
from sqlalchemy.orm import mapper
from .model import Base, Groups, HydroServer_Individual


from tethys_sdk.gizmos import TimeSeries, SelectInput, DatePicker, TextInput, GoogleMapView
from tethys_sdk.permissions import permission_required, has_permission

from .auxiliary import *
import xml.etree.ElementTree as ET
import psycopg2
from owslib.waterml.wml11 import WaterML_1_1 as wml11
from json import dumps, loads
from pyproj import Proj, transform  # Reprojecting/Transforming coordinates
from datetime import datetime


from django.http import JsonResponse, HttpResponse
from .app import WaterDataExplorer as app
from tethys_sdk.workspaces import app_workspace

Persistent_Store_Name = 'catalog_db'


def get_download_hs(request):
    hs_name = request.POST.get('hs_name')
    hs_url = request.POST.get('hs_url')
    variable_hs = request.POST.get('variable_hs')
    site_hs = request.POST.get('site_hs')
    url = ('https://gist.githubusercontent.com/romer8/89c851014afb276b0f20cb61c9c731f6/raw/a0ee55ca83e75f34f26eb94bd52941cc2a2199cd/pywaterml_template.ipynb')
    contents = requests.get(url).text
    #print(len(contents))
    nb = json.loads(contents)

    nb['cells'][1]['source'][0] = f'# {hs_name} \n'
    nb['cells'][5]['source'][0] = f'WOF_URL = "{hs_url}" \n'
    nb['cells'][5]['source'][1] = f'VARIABLE = {variable_hs} \n'
    nb['cells'][5]['source'][2] = f'SITE = {site_hs} \n'

    #convert to notebbok again#
    content_string = json.dumps(nb)

    return JsonResponse(nb)



def get_variables_hs(request):
    list_catalog={}
    #print("get_variables_hs Function")
    specific_group=request.POST.get('group')
    hs_actual = request.POST.get('hs')
    hs_actual = hs_actual.replace('-', ' ')
    #print("HS", hs_actual)
    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)

    session = SessionMaker()  # Initiate a session
    hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver

    for hydroservers in hydroservers_group:
        name = hydroservers.title
        if hs_actual == name:
            keywords_response = json.loads(hydroservers.variables)

    list_catalog["variables_code"] = keywords_response['variables_codes']
    list_catalog["variables_name"] = keywords_response['variables']
    list_catalog["variables_unit_abr"] = keywords_response['variables_unit_abr']
    list_catalog["variables_timesupport"] = keywords_response['variables_timesupport']
    list_catalog["variables_time_abr"] = keywords_response['variables_time_abr']


    return JsonResponse(list_catalog)

def get_available_sites(request):
    if request.method=='POST':
        specific_group=request.POST.get('group')
        specific_hydroserver = request.POST.get('hs')
        specific_variables = request.POST.getlist('variables[]')
        safety_check_limit = len(specific_variables)
        safety_check_intial = 0
        list_catalog = {}
        return_obj={}
        SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)

        session = SessionMaker()  # Initiate a session
        hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
        h1=session.query(Groups).join("hydroserver")
        hs_list = []

        for hydroservers in hydroservers_group:
            if hydroservers.title ==specific_hydroserver:
                water = pwml.WaterMLOperations(url = hydroservers.url.strip())
                sites = json.loads(hydroservers.siteinfo)
                sitesFiltered = water.GetSitesByVariable(specific_variables)['sites']
                hs_list = sitesFiltered
    list_catalog["hydroserver"] = hs_list

    return JsonResponse(list_catalog)

def get_hydroserver_info(request):
    specific_group = request.POST.get('group')
    specific_hs = request.POST.get('hs')
    response_obj = {}
    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()  # Initiate a session
    hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
    h1=session.query(Groups).join("hydroserver")
    hs_list = []
    for hydroservers in hydroservers_group:
        name = hydroservers.title
        if name == specific_hs:
            response_obj["url"] = hydroservers.url.strip()
            response_obj["title"] = hydroservers.title
            # response_obj["description"] = hydroservers.description
            response_obj["siteInfo"] = json.loads(hydroservers.siteinfo)

    return JsonResponse(response_obj)


def save_variables_data(request):
    return_obj = {}
    if request.is_ajax() and request.method == 'POST':
        specific_group = request.POST.get('group')
        specific_hs = request.POST.get('hs')
        variables = request.POST.get('variables')
        response_obj = {}
        SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
        session = SessionMaker()  # Initiate a session
        hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
        h1=session.query(Groups).join("hydroserver")
        hs_list = []
        for hydroservers in hydroservers_group:
            name = hydroservers.title
            url = hydroservers.url
            if name == specific_hs:

                varaibles_list = {}
                hydroserver_variable_list = []
                hydroserver_variable_code_list = []
                hydroserver_variable_abbr_list = []
                hydroserver_variable_timeSupport_list = []
                hydroserver_variable_timeUnit_list = []
                for hs_variable in json.loads(variables):
                    hydroserver_variable_list.append(hs_variable['variableName'])
                    hydroserver_variable_code_list.append(hs_variable['variableCode'])
                    hydroserver_variable_abbr_list.append(hs_variable['unitAbbreviation'])
                    hydroserver_variable_timeSupport_list.append(hs_variable['timeSupport'])
                    hydroserver_variable_timeUnit_list.append(hs_variable['timeUnitAbbreviation'])

                varaibles_list["variables"] = hydroserver_variable_list
                varaibles_list["variables_codes"] = hydroserver_variable_code_list
                varaibles_list["variables_unit_abr"] = hydroserver_variable_abbr_list
                varaibles_list["variables_timesupport"] = hydroserver_variable_timeSupport_list
                varaibles_list["variables_time_abr"] = hydroserver_variable_timeUnit_list
                # variable_json = varaibles_list
                variable_json = json.dumps(varaibles_list)
                return_obj['variables'] = variable_json
                hydroservers.variables = variable_json


        session.commit()
        session.close()

    else:
        return_obj['message'] = 'This request can only be made through a "POST" AJAX call.'

    return JsonResponse(return_obj)

def save_sites_data(request):
    return_obj = {}
    difference = 0

    if request.is_ajax() and request.method == 'POST':
        # print(request.POST)
        specific_group = request.POST.get('group')
        specific_hs = request.POST.get('hs')
        sites = request.POST.get('sites')
        response_obj = {}
        SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
        session = SessionMaker()  # Initiate a session
        hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
        h1=session.query(Groups).join("hydroserver")
        hs_list = []
        for hydroservers in hydroservers_group:
            name = hydroservers.title
            url = hydroservers.url
            if name == specific_hs:
                difference = len(json.loads(hydroservers.siteinfo))

                sites_parsed_json = sites
                countries_json = json.dumps(available_regions_2(request,siteinfo = sites_parsed_json))


                hydroservers.siteinfo = sites_parsed_json
                hydroservers.countries = countries_json
                difference = len(json.loads(sites)) - difference
                return_obj["siteInfo"] = json.loads(sites_parsed_json)
                return_obj["sitesAdded"]= difference
                return_obj["url"] = hydroservers.url

        session.commit()
        session.close()

    else:
        return_obj['message'] = 'This request can only be made through a "POST" AJAX call.'

    return JsonResponse(return_obj)


def save_new_sites_data(request):
    return_obj = {}
    print("entering save_new_sites function")
    try:
        if request.is_ajax() and request.method == 'POST':
            specific_group = request.POST.get('group')
            specific_hs = request.POST.get('hs')
            # sites = request.POST.get('sites')
            url_service =request.POST.get('url')
            description = request.POST.get('description')
            response_obj = {}
            SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
            session = SessionMaker()  # Initiate a session
            # hydroservers_group = session.query(Groups).filter(Groups.title == specific_group).first()
            hs_one = session.query(HydroServer_Individual).join(Groups).filter(Groups.title == specific_group).filter(HydroServer_Individual.title == specific_hs).first()

            print(f'saving to {specific_group}')
            return_obj['title'] = specific_hs
            return_obj['url'] = url_service
            return_obj['description'] = description
            return_obj['siteInfo'] = hs_one.siteinfo
            # return_obj['siteInfo'] = sites
            return_obj['group'] = specific_group
            # countries_json = json.dumps(available_regions_2(request,siteinfo = sites))
            #
            # hs_one = HydroServer_Individual(title=specific_hs,
            #                  url=url_service,
            #                  description = description,
            #                  siteinfo=sites,
            #                  variables = "{}",
            #                  countries = countries_json )

            # print(f'created new view {hs_one.title}')
            # hydroservers_group.hydroserver.append(hs_one)
            # session.add(hydroservers_group)
            session.commit()
            session.close()
            # print(f'new view {hs_one.title} saved')

        else:
            return_obj['message'] = 'This request can only be made through a "POST" AJAX call.'

        return JsonResponse(return_obj)
    except Exception as error:
        print(error)
        return JsonResponse(return_obj)

def save_only_sites_stream(request):
    return_obj = {}
    object_countries = {}
    updated_sites = []
    try:
        if request.is_ajax() and request.method == 'POST':
            specific_group = request.POST.get('group')
            specific_hs = request.POST.get('hs')
            sites = request.POST.get('sites')
            url_hs = request.POST.get('url')
            description_hs = request.POST.get('description')
            # last = request.POST.get('islast')
            response_obj = {}
            SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
            session = SessionMaker()  # Initiate a session
            hydroserver_group = session.query(HydroServer_Individual).join(Groups).filter(Groups.title == specific_group).filter(HydroServer_Individual.title == specific_hs).first()

            countries_json = available_regions_2(request,siteinfo = sites)

            if hydroserver_group:
                old_json_countries = json.loads(hydroserver_group.countries)
                # print(countries_json)
                # print(old_json_countries)
                joined_count = list(set(countries_json['countries'] + old_json_countries['countries']))
                object_countries['countries'] = joined_count

                old_sites = json.loads(hydroserver_group.siteinfo)
                new_sites = json.loads(sites)
                updated_sites = json.dumps(old_sites + new_sites)

                hydroserver_group.siteinfo = updated_sites
                hydroserver_group.countries = json.dumps(object_countries)
                return_obj['success'] = f'{len(old_sites)+ len(new_sites)} sites saved to the database'
            else:
                hydroservers_group = session.query(Groups).filter(Groups.title == specific_group).first()

                hs_one = HydroServer_Individual(title=specific_hs,
                                 url = url_hs,
                                 description = description_hs,
                                 siteinfo = sites,
                                 variables = "{}",
                                 countries = json.dumps(countries_json))
                hydroservers_group.hydroserver.append(hs_one)
                session.add(hydroservers_group)
                return_obj['success'] = f'{len(json.loads(sites))} sites saved to the database'

            session.commit()
            session.close()
            # print(f'new view {hs_one.title} saved')

        else:
            return_obj['error'] = 'This request can only be made through a "POST" AJAX call.'

        return JsonResponse(return_obj)
    except Exception as error:
        print(error)
        return_obj['error'] = 'there is a problem'
        return JsonResponse(return_obj)
def upload_hs(request):
    return_obj = {}
    difference = 0

    if request.is_ajax() and request.method == 'POST':
        specific_group = request.POST.get('group')
        specific_hs = request.POST.get('hs')
        response_obj = {}
        SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
        session = SessionMaker()  # Initiate a session
        hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
        h1=session.query(Groups).join("hydroserver")
        hs_list = []
        for hydroservers in hydroservers_group:
            name = hydroservers.title
            url = hydroservers.url
            if name == specific_hs:
                difference = len(json.loads(hydroservers.siteinfo))
                sites = GetSites_WHOS(url)
                sites_parsed_json = json.dumps(sites)
                countries_json = json.dumps(available_regions_2(request,siteinfo = sites_parsed_json))

                variable_json = json.dumps(available_variables_2(url))

                hydroservers.siteinfo = sites_parsed_json
                hydroservers.variables = variable_json
                hydroservers.countries = countries_json

                difference = len(sites) - difference
                return_obj["siteInfo"] = json.loads(sites_parsed_json)
                return_obj["sitesAdded"]= difference
                return_obj["url"] = hydroservers.url

        session.commit()
        session.close()


    else:
        return_obj['message'] = 'This request can only be made through a "POST" AJAX call.'

    return JsonResponse(return_obj)

def available_regions_2(request,siteinfo):
    shapely.speedups.enable()
    countries_geojson_file_path = os.path.join(app.get_app_workspace().path, 'countries3.geojson')
    countries_gdf = gpd.read_file(countries_geojson_file_path)
    countries_series = countries_gdf.loc[:,'geometry']
    ret_object = {}
    list_regions = []

    region_list = []
    hydroserver_lat_list = []
    hydroserver_long_list = []
    hydroserver_name_list = []
    hydroserver_country_list = []

    sites = json.loads(siteinfo)
    ls_lats = []
    ls_longs = []
    site_names = []
    countries_list = []
    for site in sites:
        ls_lats.append(site['latitude'])
        ls_longs.append(site['longitude'])
        site_names.append(site['fullSiteCode'])
        if site['country'] != "No Data was Provided":
            countries_list.append(site['country'])
    hydroserver_lat_list.append(ls_lats)
    hydroserver_long_list.append(ls_longs)
    hydroserver_name_list.append(site_names)
    hydroserver_country_list.extend(countries_list)

    if (len(hydroserver_country_list) > 0):
        ret_object['countries'] = list(set(hydroserver_country_list))
        return ret_object

    list_countries_stations = {}
    for indx in range(0,len(hydroserver_name_list)):
        df = pd.DataFrame({'SiteName': hydroserver_name_list[indx],'Latitude': hydroserver_lat_list[indx],'Longitude': hydroserver_long_list[indx]})
        gdf = gpd.GeoDataFrame(geometry=gpd.points_from_xy(df.Longitude, df.Latitude), index = hydroserver_name_list[indx])
        gdf = gdf.assign(**{str(key): gdf.within(geom) for key, geom in countries_series.items()})
        trues_onlys = gdf.copy()
        trues_onlys = trues_onlys.drop(['geometry'],axis=1)
        trues_onlys = trues_onlys.loc[:,trues_onlys.any()]
        countries_index = list(trues_onlys.columns)
        trues_onlys_copy = trues_onlys.copy()
        countries_index = [x for x in countries_index if x != 'geometry']

        countries_index2 = [int(i) for i in countries_index]
        countries_selected = countries_gdf.iloc[countries_index2]
        list_countries_selected = list(countries_selected['admin'])
        for coun in list_countries_selected:
            if coun not in region_list:
                region_list.append(coun)

    ret_object['countries'] = region_list
    return ret_object

def available_variables_2(url):
    varaibles_list = {}
    hydroserver_variable_list = []
    hydroserver_variable_code_list = []
    water = pwml.WaterMLOperations(url = url)
    hs_variables = water.GetVariables()['variables']
    for hs_variable in hs_variables:
        hydroserver_variable_list.append(hs_variable['variableName'])
        hydroserver_variable_code_list.append(hs_variable['variableCode'])

    varaibles_list["variables"] = hydroserver_variable_list
    varaibles_list["variables_codes"] = hydroserver_variable_code_list
    return varaibles_list

######*****************************************************************************************################
######**ADD A HYDROSERVER TO THE SELECTED GROUP OF HYDROSERVERS THAT WERE CREATED BY THE USER *################
######*****************************************************************************************################

def soap_group(request):
    return_obj = {}
    if request.is_ajax() and request.method == 'POST':
        url = request.POST.get('soap-url')
        title = request.POST.get('soap-title')
        # title = title.replace(" ", "")
        # title = title.translate ({ord(c): "_" for c in "!@#$%^&*()[]{};:,./<>?\|`~-=+"})
        group = request.POST.get('actual-group')
        description = request.POST.get('textarea')
        # Getting the current map extent
        true_extent = request.POST.get('extent')

        if "?WSDL" not in url:
            url = url + "?WSDL"
        water = pwml.WaterMLOperations(url = url)
        if true_extent == 'on':
            extent_value = request.POST['extent_val']
            return_obj['zoom'] = 'true'
            return_obj['level'] = extent_value
            ext_list = extent_value.split(',')
            sitesByBoundingBox = water.GetSitesByBoxObject(ext_list,'epsg:3857')
            countries_json = available_regions_2(request,sites_parsed_json)
            variable_json = available_variables_2(url)

            return_obj['title'] = title
            return_obj['url'] = url
            return_obj['description'] = description

            return_obj['siteInfo'] = sitesByBoundingBox
            return_obj['group']= group
            return_obj['status'] = "true"

            SessionMaker = app.get_persistent_store_database(
                Persistent_Store_Name, as_sessionmaker=True)
            session = SessionMaker()
            hydroservers_group = session.query(Groups).filter(Groups.title == group)[0]
            hs_one = HydroServer_Individual(title=title,
                             url=url,
                             description = description,
                             siteinfo=sites_parsed_json,
                             variables = variable_json,
                             countries = countries_json )

            hydroservers_group.hydroserver.append(hs_one)
            session.add(hydroservers_group)
            session.commit()
            session.close()

        else:

            return_obj['zoom'] = 'false'

            sites = GetSites_WHOS(url)
            sites_parsed_json = json.dumps(sites)
            countries_json = json.dumps(available_regions_2(request,siteinfo = sites_parsed_json))

            variable_json = json.dumps(available_variables_2(url))

            return_obj['title'] = title
            return_obj['url'] = url
            return_obj['description'] = description
            return_obj['siteInfo'] = sites
            return_obj['group'] = group
            return_obj['status'] = "true"
            SessionMaker = app.get_persistent_store_database(
                Persistent_Store_Name, as_sessionmaker=True)
            session = SessionMaker()
            hydroservers_group = session.query(Groups).filter(Groups.title == group)[0]


            hs_one = HydroServer_Individual(title=title,
                             url=url,
                             description = description,
                             siteinfo=sites_parsed_json,
                             variables = variable_json,
                             countries = countries_json )

            hydroservers_group.hydroserver.append(hs_one)
            session.add(hydroservers_group)
            session.commit()
            session.close()

    else:
        return_obj[
            'message'] = 'This request can only be made through a "POST" AJAX call.'

    return JsonResponse(return_obj)

######*****************************************************************************************################
############################## DELETE THE HYDROSERVER OF AN SPECIFIC GROUP ####################################
######*****************************************************************************************################
def delete_group_hydroserver(request):
    list_catalog = {}
    SessionMaker = app.get_persistent_store_database(
        Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()

    # Query DB for hydroservers
    if request.is_ajax() and request.method == 'POST':
        titles=request.POST.getlist('server')
        group = request.POST.get('actual-group')

        i=0;
        hydroservers_group = session.query(Groups).filter(Groups.title == group)[0].hydroserver

        for title in titles:
            hydroservers_group = session.query(HydroServer_Individual).filter(HydroServer_Individual.title == title).delete(
                synchronize_session='evaluate')  # Deleting the record from the local catalog
            session.commit()
            session.close()

            # Returning the deleted title. To let the user know that the particular
            # title is deleted.
            i_string=str(i);
            list_catalog[i_string] = title
            i=i+1
    return JsonResponse(list_catalog)
