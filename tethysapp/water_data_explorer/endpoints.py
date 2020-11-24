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
from sqlalchemy import Table, Column, Integer, String, MetaData,update
from sqlalchemy.orm import mapper
from .model import Base, Catalog, HISCatalog, Groups, HydroServer_Individual


from tethys_sdk.gizmos import TimeSeries, SelectInput, DatePicker, TextInput, GoogleMapView
from tethys_sdk.permissions import permission_required, has_permission

from .model import Catalog, HISCatalog
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

def get_variables_hs(request):
    list_catalog={}
    print("inside the keywordsgroup function")
    specific_group=request.GET.get('group')
    hs_actual = request.GET.get('hs')

    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)

    session = SessionMaker()  # Initiate a session
    hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver

    for hydroservers in hydroservers_group:
        name = hydroservers.title
        if hs_actual == name:
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

            if isinstance(array_variables,type([])):
                # print("inside the list iption")
                for words in array_variables:
                    array_keywords_hydroserver.append(words['variableName'])

            if isinstance(array_variables,dict):
                array_keywords_hydroserver.append(array_variables['variableName'])


            variables_show = array_keywords_hydroserver

    list_catalog["variables"] = variables_show
    print("------------------------------------------")

    return JsonResponse(list_catalog)

def get_available_sites(request):
    # print("Catalog_group function in controllers.py")
    # print("--------------------------------------------------------------------")
    specific_group=request.GET.get('group')
    specific_hydroserver = request.GET.get('hs')
    specific_variables = request.GET.getlist('variables[]')
    safety_check_limit = len(specific_variables)
    safety_check_intial = 0
    print("this is the specific varibales in the beginnign")
    print(specific_variables)
    print(request.GET)
    # print(specific_group)
    # print(request.GET)
    list_catalog = {}
    return_obj={}

    # print("catalogs_groups controllers.py FUNCTION inside")

    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)

    # print(SessionMaker)
    session = SessionMaker()  # Initiate a session
    hydroservers_group = session.query(Groups).filter(Groups.title == specific_group)[0].hydroserver
    h1=session.query(Groups).join("hydroserver")
    hs_list = []
    for hydroservers in hydroservers_group:
        if hydroservers.title ==specific_hydroserver:
            print("this is the one selecting hs")
            name = hydroservers.title
            print(name)

            # print(hydroservers.title)
            # print(hydroservers.url)
            layer_obj = {}

            layer_obj["title"] = hydroservers.title
            layer_obj["url"] = hydroservers.url.strip()
            client = Client(layer_obj["url"])  # Connect to the HydroServer endpoint
            # print(client)
            keywords = client.service.GetVariables('[:]')
            keywords_dict = xmltodict.parse(keywords)
            keywords_dict_object = json.dumps(keywords_dict)

            keywords_json = json.loads(keywords_dict_object)
            # print(client)
            layer_obj["siteInfoJSON"] =json.loads(hydroservers.siteinfo)
            layer_obj["siteInfo"] =hydroservers.siteinfo
            for site in layer_obj["siteInfoJSON"]:

                sitecode = site['sitecode']
                site_name= site['sitename']
                network = site["network"]
                layer_obj2={}
                layer_obj2['sitecode']=sitecode
                layer_obj2['sitename']=site_name
                layer_obj2['network']=network
                layer_obj2['latitude']=site['latitude']
                layer_obj2['longitude']=site['longitude']
                print("THIS IS THE ACTUAL SITE")
                print(layer_obj2['sitename'])
                site_desc = network + ":" + sitecode
                site_info_Mc = client.service.GetSiteInfo(site_desc)
                site_info_Mc_dict = xmltodict.parse(site_info_Mc)
                site_info_Mc_json_object = json.dumps(site_info_Mc_dict)
                site_info_Mc_json = json.loads(site_info_Mc_json_object)
                # print(site_info_Mc_json)
                print(site_info_Mc_json['sitesResponse']['site']['seriesCatalog'])

                # print("GETSITESINFO FUNCTION")
                # print(object_methods)
                object_with_methods_and_variables = {}
                object_with_descriptions_and_variables = {}
                object_with_time_and_variables = {}
                object_methods= {}
                if 'series' in site_info_Mc_json['sitesResponse']['site']['seriesCatalog']:
                    object_methods= site_info_Mc_json['sitesResponse']['site']['seriesCatalog']['series']

                    if(isinstance(object_methods,(dict))):
                        # print("adding to the methodID as a dict")
                        variable_name_ = object_methods['variable']['variableName']
                        ## this part was added for the WHOS plata broker endpoint ##
                        if 'method' in object_methods:
                            object_with_methods_and_variables[variable_name_]= object_methods['method']['@methodID']
                        else:
                            object_with_methods_and_variables[variable_name_]= None
                        ## end of the part for WHOS plata
                        object_with_descriptions_and_variables[variable_name_]= object_methods['source'];
                        object_with_time_and_variables[variable_name_]= object_methods['variableTimeInterval'];
                        # print(object_with_methods_and_variables)
                    else:
                        for object_method in object_methods:
                            # print("adding to the methodID as an arraylist")
                            variable_name_ = object_method['variable']['variableName']
                            if 'method' in object_method:
                                object_with_methods_and_variables[variable_name_]= object_method['method']['@methodID']
                            else:
                                object_with_methods_and_variables[variable_name_]= None
                            # print(object_method['source'])
                            object_with_descriptions_and_variables[variable_name_]= object_method['source'];
                            object_with_time_and_variables[variable_name_]= object_method['variableTimeInterval'];
                            # print(object_with_methods_and_variables)



                array_variables=keywords_json['variablesResponse']['variables']['variable']
                array_keywords_hydroserver=[]
                array_variables_codes = []
                array_variables_lengths = []
                length_values = 0


                if isinstance(array_variables,type([])):
                    print("array type")
                    ijj = 0
                    for words in array_variables:
                        # print(ijj)
                        print("variable name")
                        print(words['variableName'])
                        variable_text = words['variableName']
                        print("compared to the following")
                        print(specific_variables)
                        if variable_text in specific_variables:
                            print("TRUE compared")

                            safety_check_intial = safety_check_intial + 1
                            print("we are in the varaible specified")
                            code_variable = words['variableCode']['#text']
                            start_date = ""
                            end_date = ""
                            variable_desc = network + ':' + code_variable

                            # print("variable_desc")
                            # print("varaible in list")
                            # print(variable_desc)
                            # print(site_desc)
                            try:
                                values = client.service.GetValues(
                                    site_desc, variable_desc, start_date, end_date, "")

                                values_dict = xmltodict.parse(values)  # Converting xml to dict
                                values_json_object = json.dumps(values_dict)
                                values_json = json.loads(values_json_object)
                                # print(values_json)
                                # print(values_json.keys())
                                if 'timeSeriesResponse' in values_json:
                                # if values_json['timeSeriesResponse'] is not None:
                                    times_series = values_json['timeSeriesResponse'][
                                        'timeSeries']  # Timeseries object for the variable
                                    # print(times_series)
                                    if times_series['values'] is not None:
                                        length_values= len(times_series['values']['value'])
                                        print("this is the length value")
                                        print(variable_text," ", length_values )
                                        hs_list.append(layer_obj2)

                                    else:
                                        length_values = 0
                                        print(variable_text," ", length_values )
                                ## Addition for the WHOS PLATA ##
                                else:
                                    times_series = values_json['wml1:timeSeriesResponse'][
                                        'wml1:timeSeries']  # Timeseries object for the variable
                                    # print(times_series)
                                    if times_series['wml1:values'] is not None:
                                        length_values= len(times_series['wml1:values']['wml1:value'])
                                        print(variable_text," ", length_values )
                                        hs_list.append(layer_obj2)

                                    else:
                                        length_values = 0
                                        print(variable_text," ", length_values )


                                array_variables_lengths.append(length_values)


                                array_keywords_hydroserver.append(words['variableName'])
                                array_variables_codes.append(words['variableCode']['#text'])
                                ijj=ijj+1

                            except Exception as e:
                                print("OOPS",e.__class__)
                        # else:
                        #     if layer_obj2 in hs_list:
                        #         hs_list.remove(layer_obj2)

                        # words_to_search[name] = array_keywords_hydroserver


                if isinstance(array_variables,dict):
                    print("dict")
                    print("variable_name")
                    print(array_variables['variableName'])
                    print("compared to the following")
                    print(specific_variables)

                    variable_text = array_variables['variableName']
                    if variable_text in specific_variables:
                        print("TRUE compared")
                        safety_check_intial = safety_check_intial + 1
                        code_variable = array_variables['variableCode']['#text']
                        start_date = ""
                        end_date = ""
                        variable_desc = network + ':' + code_variable

                        try:
                            values = client.service.GetValues(
                                site_desc, variable_desc, start_date, end_date, "")
                            # print(values)

                            values_dict = xmltodict.parse(values)  # Converting xml to dict
                            values_json_object = json.dumps(values_dict)
                            values_json = json.loads(values_json_object)
                            if 'timeSeriesResponse' in values_json:
                            # if values_json['timeSeriesResponse'] is not None:
                                times_series = values_json['timeSeriesResponse'][
                                    'timeSeries']  # Timeseries object for the variable
                                # print(times_series)
                                if times_series['values'] is not None:
                                    length_values= len(times_series['values']['value'])
                                    print(variable_text," ", length_values )
                                    hs_list.append(layer_obj2)

                                else:
                                    length_values = 0
                                    # print(variable_text," ", length_values )
                            ## Addition for the WHOS PLATA ##
                            else:
                                times_series = values_json['wml1:timeSeriesResponse'][
                                    'wml1:timeSeries']  # Timeseries object for the variable
                                # print(times_series)
                                if times_series['wml1:values'] is not None:
                                    length_values= len(times_series['wml1:values']['wml1:value'])
                                    print(variable_text," ", length_values )
                                    hs_list.append(layer_obj2)

                                else:
                                    length_values = 0
                                    print(variable_text," ", length_values )


                            array_variables_lengths.append(length_values)

                            array_keywords_hydroserver.append(array_variables['variableName'])
                            array_variables_codes.append(array_variables['variableCode']['#text'])
                        except Exception as e:
                            print("OOPS",e.__class__)

                return_obj['variables']=array_keywords_hydroserver
                return_obj['codes']=array_variables_codes
                return_obj['counts'] = array_variables_lengths
                return_obj['methodsIDs']= object_with_methods_and_variables
                return_obj['description'] = object_with_descriptions_and_variables
                return_obj['times_series'] = object_with_time_and_variables
                return_obj['siteInfo']= site_info_Mc_json
    print("Safety check limit")
    print(safety_check_limit)
    print("Safety check initial")
    print(safety_check_intial)
    if safety_check_intial >= safety_check_limit:
        list_catalog["hydroserver"] = hs_list
    else:
        list_catalog["hydrosever"] = []
    print("Finished the get_available_sites")
    return JsonResponse(list_catalog)

def get_hydroserver_info(request):
    specific_group = request.GET.get('group')
    specific_hs = request.GET.get('hs')
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
            response_obj["siteInfo"] = json.loads(hydroservers.siteinfo)

    return JsonResponse(response_obj)

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
                client = Client(url, timeout= 500)

                sites = client.service.GetSites('[:]')
                print(type(sites))
                sites_json={}
                if isinstance(sites, str):
                    print("here")
                    sites_dict = xmltodict.parse(sites)
                    sites_json_object = json.dumps(sites_dict)
                    sites_json = json.loads(sites_json_object)
                else:
                    sites_json_object = suds_to_json(sites)
                    sites_json = json.loads(sites_json_object)

                # Parsing the sites and creating a sites object. See auxiliary.py
                print("-------------------------------------")
                # print(sites_json)
                sites_object = parseJSON(sites_json)
                # print(sites_object)
                # converted_sites_object=[x['sitename'].decode("UTF-8") for x in sites_object]

                # sites_parsed_json = json.dumps(converted_sites_object)
                sites_parsed_json = json.dumps(sites_object)
                difference = len(sites_object) - difference
                hydroservers.siteinfo = sites_parsed_json
                return_obj["siteInfo"] = json.loads(sites_parsed_json)
                return_obj["sitesAdded"]= difference

        session.commit()
        session.close()


    else:
        return_obj['message'] = 'This request can only be made through a "POST" AJAX call.'

    return JsonResponse(return_obj)



######*****************************************************************************************################
######**ADD A HYDROSERVER TO THE SELECTED GROUP OF HYDROSERVERS THAT WERE CREATED BY THE USER *################
######*****************************************************************************************################
def soap_group(request):
    print("inside SOAP function")
    return_obj = {}
    if request.is_ajax() and request.method == 'POST':
        print("inside first if statement of SOAP function")
        url = request.POST.get('soap-url')
        print(url)
        title = request.POST.get('soap-title')
        title = title.replace(" ", "")
        print(title)
        group = request.POST.get('actual-group')
        print(group)
        # Getting the current map extent
        true_extent = request.POST.get('extent')

        client = Client(url, timeout= 500)
        # True Extent is on and necessary if the user is trying to add USGS or
        # some of the bigger HydroServers.
        if true_extent == 'on':
            extent_value = request.POST['extent_val']
            print("Extent",extent_value)
            return_obj['zoom'] = 'true'
            return_obj['level'] = extent_value
            ext_list = extent_value.split(',')
            # Reprojecting the coordinates from 3857 to 4326 using pyproj
            inProj = Proj(init='epsg:3857')
            outProj = Proj(init='epsg:4326')
            minx, miny = ext_list[0], ext_list[1]
            maxx, maxy = ext_list[2], ext_list[3]
            x1, y1 = transform(inProj, outProj, minx, miny)
            x2, y2 = transform(inProj, outProj, maxx, maxy)
            bbox = client.service.GetSitesByBoxObject(
                x1, y1, x2, y2, '1', '')
            # Get Sites by bounding box using suds
            # Creating a sites object from the endpoint. This site object will
            # be used to generate the geoserver layer. See utilities.py.
            wml_sites = parseWML(bbox)
            # wml_sites = xmltodict.parse(bbox)
            print(wml_sites)
            sites_parsed_json = json.dumps(wml_sites)

            return_obj['title'] = title
            return_obj['url'] = url
            return_obj['siteInfo'] = sites_parsed_json
            return_obj['group']= group
            return_obj['status'] = "true"

            SessionMaker = app.get_persistent_store_database(
                Persistent_Store_Name, as_sessionmaker=True)
            session = SessionMaker()
            hydroservers_group = session.query(Groups).filter(Groups.title == group)[0]
            # hydroservers_g = session.query(Groups).filter(Groups.title == group)
            print(hydroservers_group.title)
            print(hydroservers_group.description)

            hs_one = HydroServer_Individual(title=title,
                             url=url,
                             siteinfo=sites_parsed_json)

            hydroservers_group.hydroserver.append(hs_one)
            print(hydroservers_group.hydroserver)
            session.add(hydroservers_group)
            session.commit()
            session.close()

        else:
            return_obj['zoom'] = 'false'
            # Get a list of all the sites and their respective lat lon.
            sites = client.service.GetSites('[:]')
            # sites = client.service.GetSites('')
            print("this are the sites")
            print(sites)
            print(type(sites))
            sites_json={}
            if isinstance(sites, str):
                print("here")
                sites_dict = xmltodict.parse(sites)
                sites_json_object = json.dumps(sites_dict)
                sites_json = json.loads(sites_json_object)
            else:
                sites_json_object = suds_to_json(sites)
                sites_json = json.loads(sites_json_object)

            # Parsing the sites and creating a sites object. See auxiliary.py
            print("-------------------------------------")
            # print(sites_json)
            sites_object = parseJSON(sites_json)
            # print(sites_object)
            # converted_sites_object=[x['sitename'].decode("UTF-8") for x in sites_object]

            # sites_parsed_json = json.dumps(converted_sites_object)
            sites_parsed_json = json.dumps(sites_object)


            return_obj['title'] = title
            return_obj['url'] = url
            return_obj['siteInfo'] = sites_parsed_json
            return_obj['group'] = group
            return_obj['status'] = "true"
            # print("this is the return on=bject")
            # print(return_obj)
            SessionMaker = app.get_persistent_store_database(
                Persistent_Store_Name, as_sessionmaker=True)
            session = SessionMaker()
            # hydroservers_groups = session.query(Groups).all()
            # for hydro_group in hydroservers_groups:
            #     if hydro_group.title ==group:
            #         print(hydro_group)
            # print(hydroservers_group)
            hydroservers_group = session.query(Groups).filter(Groups.title == group)[0]
            # hydroservers_g = session.query(Groups).filter(Groups.title == group)
            print(hydroservers_group.title)
            print(hydroservers_group.description)

            hs_one = HydroServer_Individual(title=title,
                             url=url,
                             siteinfo=sites_parsed_json)

            hydroservers_group.hydroserver.append(hs_one)
            print(hydroservers_group.hydroserver)
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
    print("delete_group_hydroserver_function in controllers.py")
    list_catalog = {}
    print("--------------------------------------------")
    SessionMaker = app.get_persistent_store_database(
        Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()

    # Query DB for hydroservers
    print(request.POST)
    if request.is_ajax() and request.method == 'POST':
        print(type(request.POST))
        print(request.POST.getlist('server'))
        titles=request.POST.getlist('server')
        group = request.POST.get('actual-group')

        print(type(titles))
        # title = request.POST['server']
        i=0;
        hydroservers_group = session.query(Groups).filter(Groups.title == group)[0].hydroserver

        # for title in titles:
        #     hydroservers = session.query(Catalog).filter(Catalog.title == title).delete(
        #         synchronize_session='evaluate')  # Deleting the record from the local catalog
        #     session.commit()
        #     session.close()
        #
        #     # Returning the deleted title. To let the user know that the particular
        #     # title is deleted.
        #     i_string=str(i);
        #     # list["title"] = title
        #     list[i_string] = title
        #     i=i+1
        for title in titles:
            hydroservers_group = session.query(HydroServer_Individual).filter(HydroServer_Individual.title == title).delete(
                synchronize_session='evaluate')  # Deleting the record from the local catalog
            session.commit()
            session.close()

            # Returning the deleted title. To let the user know that the particular
            # title is deleted.
            i_string=str(i);
            # list["title"] = title
            list_catalog[i_string] = title
            i=i+1
    return JsonResponse(list_catalog)
