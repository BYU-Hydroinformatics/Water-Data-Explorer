import xmltodict
import logging
import sys
import os
import json

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
    print("entering the home function")
    # if can_define_boundary:
    boundaryEndpoint = app.get_custom_setting('Boundary Geoserver Endpoint')
    boundaryWorkspace = app.get_custom_setting('Boundary Workspace Name')
    boundaryLayer = app.get_custom_setting('Boundary Layer Name')
    boundaryMovement = app.get_custom_setting('Boundary Movement')
    boundaryColor = app.get_custom_setting('Boundary Color')
    boundaryWidth = app.get_custom_setting('Boundary Width')
    print(boundaryEndpoint)
    print(type(boundaryEndpoint))
    context = {
     "geoEndpoint": boundaryEndpoint,
     "geoWorkspace": boundaryWorkspace,
     "geoLayer": boundaryLayer,
     "geoMovement":boundaryMovement,
     "geoColor": boundaryColor,
     "geoWidth":boundaryWidth,
     'can_delete_hydrogroups': has_permission(request, 'delete_hydrogroups'),
     'can_block_map': has_permission(request, 'block_map')
    }
    # else:
    #     context = {
    #      'can_delete_hydrogroups': has_permission(request, 'delete_hydrogroups'),
    #      'can_block_map': has_permission(request, 'block_map')
    #     }
    # context = {}
    return render(request, 'water_data_explorer/home.html', context)


def get_his_server(request):
    server = {}
    if request.is_ajax() and request.method == 'POST':
        url = request.POST['select_server']
        server['url'] = url
    return JsonResponse(server)

def his(request):
    list_catalog = {}
    hs_list = []
    error_list = []
    logging.getLogger('suds.client').setLevel(logging.CRITICAL)
    his_url = "http://hiscentral.cuahsi.org/webservices/hiscentral.asmx?WSDL"
    client = Client(his_url)
    searchable_concepts = client.service.GetSearchableConcepts()
    service_info = client.service.GetWaterOneFlowServiceInfo()
    # print service_info.ServiceInfo[0].servURL
    services = service_info.ServiceInfo
    for i in services:
        hs = {}
        url = i.servURL
        try:
            print("Testing %s" % (url))
            url_client = Client(url)
            hs['url'] = url
            hs_list.append(hs)
            print("%s Works" % (url))
        except Exception as e:
            print(e)
            hs['url'] = url
            print("%s Failed" % (url))
            error_list.append(hs)
        list_catalog['servers'] = hs_list
        list_catalog['errors'] = error_list

    context = {"hs_list": hs_list, "error_list": error_list}

    return render(request, 'water_data_explorer/his.html', context)


# Retrieve all the list of Hydroservers that have been added to the dataBase..
def catalog(request):
    list_catalog = {}
    print("catalogs controllers.py FUNCTION inside")

    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)

    # print("------------------------------------------")
    # print(Persistent_Store_Name)
    print(SessionMaker)
    session = SessionMaker()  # Initiate a session
    # conn = psycopg2.connect("dbname='catalog_db' user='tethys_super' host='localhost' port='5436' password='pass'")
    # cur = conn.cursor()
    # cur.execute("select * from information_schema.tables where table_name=%s", ('mytable',))
    # print("this is the value")
    # print(bool(cur.rowcount))

    # Query DB for hydroservers
    hydroservers = session.query(Catalog).all()
    print(hydroservers)

    hs_list = []
    for server in hydroservers:
        layer_obj = {}
        layer_obj["title"] = server.title
        layer_obj["url"] = server.url.strip()
        layer_obj["siteInfo"] = server.siteinfo

        hs_list.append(layer_obj)
    # A json list object with the HydroServer metadata. This object will be
    # used to add layers to the catalog table on the homepage.
    list_catalog["hydroserver"] = hs_list

    return JsonResponse(list_catalog)

def delete(request):

    list_catalog = {}

    SessionMaker = app.get_persistent_store_database(
        Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()

    # Query DB for hydroservers
    print(request.POST)
    if request.is_ajax() and request.method == 'POST':
        print(type(request.POST))
        print(request.POST.getlist('server'))
        titles=request.POST.getlist('server')
        print(type(titles))
        # title = request.POST['server']
        i=0;
        for title in titles:
            hydroservers = session.query(Catalog).filter(Catalog.title == title).delete(
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

def add_central(request):

    return_obj = {}
    print("function add_central")
    if request.is_ajax() and request.method == 'POST':
        print("here in if statemetn")
        url = request.POST['url']
        title = request.POST['title']

        if url.endswith('/'):
            url = url[:-1]

        if(checkCentral(url)):
            return_obj['message'] = 'Valid HIS Central Found'
            return_obj['status'] = True
            # Add to the database

            SessionMaker = app.get_persistent_store_database(
                Persistent_Store_Name, as_sessionmaker=True)
            session = SessionMaker()
            hs_one = HISCatalog(title=title, url=url)
            session.add(hs_one)
            session.commit()
            session.close()
        else:
            return_obj['message'] = 'Not a valid HIS Central Catalog'
            return_obj['status'] = False
    else:
        return_obj[
            'message'] = 'This request can only be made through a "POST" AJAX call.'
        return_obj['status'] = False

    return JsonResponse(return_obj)

######*****************************************************************************************################
######***********************CREATE AN EMPTY GROUP OF HYDROSERVERS ****************************################
######*****************************************************************************************################
def create_group(request):
    group_obj={}
    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
    session = SessionMaker()  # Initiate a session

    # Query DB for hydroservers

    # print(request.POST)
    if request.is_ajax() and request.method == 'POST':
        print("inside first if statement of create group")
        description = request.POST.get('textarea')

        # print(description)
        title = request.POST.get('addGroup-title')
        group_obj['title']=title
        group_obj['description']=description
        group_hydroservers=Groups(title=title, description=description)
        session.add(group_hydroservers)
        session.commit()
        session.close()

    else:
        group_obj[
            'message'] = 'There was an error while adding th group.'


    return JsonResponse(group_obj)

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
            # print(session.query(Groups).filter(Groups.title == group).first())
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
                # print(words['variableName'])
                # variable_text = words['variableName']
                # code_variable = words['variableCode']['#text']
                # start_date = ""
                # end_date = ""
                # network = "hola"
                # variable_desc = network + ':' + code_variable
                # site_desc = "hols"
                # print("variable_desc")
                # print(variable_desc)
                # print(site_desc)
                # try:
                #     values=client.service.GetValues(site_desc,variable_desc,start_date,end_date,"")
                #
                #     values_dict = xmltodict.parse(values)  # Converting xml to dict
                #     values_json_object = json.dumps(values_dict)
                #     values_json = json.loads(values_json_object)
                #     # print(values_json)
                #     # print(values_json.keys())
                #     if 'timeSeriesResponse' in values_json:
                #     # if values_json['timeSeriesResponse'] is not None:
                #         times_series = values_json['timeSeriesResponse'][
                #             'timeSeries']  # Timeseries object for the variable
                #         # print(times_series)
                #         if times_series['values'] is not None:
                #             length_values= len(times_series['values']['value'])
                #             print(variable_text," ", length_values )
                #             array_keywords_hydroserver.append(words['variableName'])
                #
                #         else:
                #             length_values = 0
                #             print(variable_text," ", length_values )
                #     ## Addition for the WHOS PLATA ##
                #     else:
                #         times_series = values_json['wml1:timeSeriesResponse'][
                #             'wml1:timeSeries']  # Timeseries object for the variable
                #         # print(times_series)
                #         if times_series['wml1:values'] is not None:
                #             length_values= len(times_series['wml1:values']['wml1:value'])
                #             print(variable_text," ", length_values )
                #             array_keywords_hydroserver.append(words['variableName'])
                #
                #         else:
                #             length_values = 0
                #             print(variable_text," ", length_values )
                # except Exception as e:
                #     print("OOPS",e.__class__)
                # print("priting words")
                # print(type(words))
                # print(words)
                # print(words.get('variableName'))
                # print(words['variableName'])

                # array_keywords_hydroserver.append(words['variableName'])
            # words_to_search[name] = array_keywords_hydroserver
        if isinstance(array_variables,dict):
            array_keywords_hydroserver.append(array_variables['variableName'])

            # variable_text = array_variables['variableName']
            # code_variable = array_variables['variableCode']['#text']
            # start_date = ""
            # end_date = ""
            # network = "hola"
            # site_desc = "hols"
            #
            # # site_desc = network + ':' + site_code
            #
            # variable_desc = network + ':' + code_variable
            # try:
            #     values = client.service.GetValues(site_desc, variable_desc, start_date, end_date, "")
            # # print(values)
            #
            #     values_dict = xmltodict.parse(values)  # Converting xml to dict
            #     values_json_object = json.dumps(values_dict)
            #     values_json = json.loads(values_json_object)
            #     if 'timeSeriesResponse' in values_json:
            #     # if values_json['timeSeriesResponse'] is not None:
            #         times_series = values_json['timeSeriesResponse'][
            #             'timeSeries']  # Timeseries object for the variable
            #         # print(times_series)
            #         if times_series['values'] is not None:
            #             length_values= len(times_series['values']['value'])
            #             print(variable_text," ", length_values )
            #             array_keywords_hydroserver.append(array_variables['variableName'])
            #
            #         else:
            #             length_values = 0
            #             print(variable_text," ", length_values )
            #     ## Addition for the WHOS PLATA ##
            #     else:
            #         times_series = values_json['wml1:timeSeriesResponse'][
            #             'wml1:timeSeries']  # Timeseries object for the variable
            #         # print(times_series)
            #         if times_series['wml1:values'] is not None:
            #             length_values= len(times_series['wml1:values']['wml1:value'])
            #             print(variable_text," ", length_values )
            #             array_keywords_hydroserver.append(array_variables['variableName'])
            #
            #         else:
            #             length_values = 0
            #             print(variable_text," ", length_values )
            # except Exception as e:
            #     print("OOPS",e.__class__)

            # array_keywords_hydroserver.append(array_variables['variableName'])


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

def get_values_hs(request):
    list_catalog={}
    return_obj={}
    print(request)
    # hs_name = request.GET.get('hs_name')
    hs_url = request.GET.get('hs_url')
    # site_name = request.GET.get('site_name')
    site_code =  request.GET.get('code')
    network = request.GET.get('network')
    # network = "whos-plata"
    site_desc = network + ':' + site_code



    SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)

    # print(SessionMaker)
    session = SessionMaker()  # Initiate a session
    # hydroservers_group = session.query(HydroServer_Individual).filter(Groups.title == hs_name)
    client = Client(hs_url)

    # print(client)
    keywords = client.service.GetVariables('[:]')
    keywords_dict = xmltodict.parse(keywords)
    keywords_dict_object = json.dumps(keywords_dict)

    keywords_json = json.loads(keywords_dict_object)

    site_info_Mc = client.service.GetSiteInfo(site_desc)
    site_info_Mc_dict = xmltodict.parse(site_info_Mc)
    site_info_Mc_json_object = json.dumps(site_info_Mc_dict)
    site_info_Mc_json = json.loads(site_info_Mc_json_object)
    print(site_info_Mc_json)
    object_methods= site_info_Mc_json['sitesResponse']['site']['seriesCatalog']['series']
    print("GETSITESINFO FUNCTION")
    print(object_methods)
    object_with_methods_and_variables = {}
    object_with_descriptions_and_variables = {}
    object_with_time_and_variables = {}
    if(isinstance(object_methods,(dict))):
        print("adding to the methodID as a dict")
        variable_name_ = object_methods['variable']['variableName']
        ## this part was added for the WHOS plata broker endpoint ##
        if 'method' in object_methods:
            object_with_methods_and_variables[variable_name_]= object_methods['method']['@methodID']
        else:
            object_with_methods_and_variables[variable_name_]= None
        ## end of the part for WHOS plata
        object_with_descriptions_and_variables[variable_name_]= object_methods['source'];
        object_with_time_and_variables[variable_name_]= object_methods['variableTimeInterval'];
        print(object_with_methods_and_variables)
    else:
        for object_method in object_methods:
            print("adding to the methodID as an arraylist")
            variable_name_ = object_method['variable']['variableName']
            if 'method' in object_method:
                object_with_methods_and_variables[variable_name_]= object_method['method']['@methodID']
            else:
                object_with_methods_and_variables[variable_name_]= None
            # print(object_method['source'])
            object_with_descriptions_and_variables[variable_name_]= object_method['source'];
            object_with_time_and_variables[variable_name_]= object_method['variableTimeInterval'];
            print(object_with_methods_and_variables)



    array_variables=keywords_json['variablesResponse']['variables']['variable']
    array_keywords_hydroserver=[]
    array_variables_codes = []
    array_variables_lengths = []
    length_values = 0


    if isinstance(array_variables,type([])):
        print("array type")
        ijj = 0
        for words in array_variables:
            print(ijj)
            print(words['variableName'])
            variable_text = words['variableName']
            code_variable = words['variableCode']['#text']
            start_date = ""
            end_date = ""
            variable_desc = network + ':' + code_variable
            print("variable_desc")
            print(variable_desc)
            print(site_desc)
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
                        print(variable_text," ", length_values )
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
                    else:
                        length_values = 0
                        print(variable_text," ", length_values )


                array_variables_lengths.append(length_values)


                array_keywords_hydroserver.append(words['variableName'])
                array_variables_codes.append(words['variableCode']['#text'])
                ijj=ijj+1
            except Exception as e:
                print("OOPS",e.__class__)
        # words_to_search[name] = array_keywords_hydroserver
    if isinstance(array_variables,dict):
        print("dict")
        print(array_variables['variableName'])

        variable_text = array_variables['variableName']
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
                else:
                    length_values = 0
                    print(variable_text," ", length_values )

            #
            # times_series = values_json['timeSeriesResponse'][
            #     'timeSeries']  # Timeseries object for the variable
            # # print(times_series)
            # if times_series['values'] is not None:
            #
            #     length_values= len(times_series['values']['value'])
            #     print(variable_text," ", length_values )
            # else:
            #     length_values = 0
            #     print(variable_text," ", length_values )



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

    print("finished with the get_values_hs")
    return JsonResponse(return_obj)

def get_values_graph_hs(request):
    print("inside the get_values_graph_hs")
    list_catalog={}
    return_obj={}
    print("Inside the get_values_graphs function")
    print(request)

    hs_url = request.GET.get('hs_url')
    print(hs_url)

    site_code =  request.GET.get('code')
    print(site_code)
    network = request.GET.get('network')
    # variable_text = request.GET.get('variable')
    code_variable =request.GET.get ('code_variable')
    dates_request = request.GET.getlist('timeFrame[]')
    print(dates_request)
    start_date = dates_request[0];
    end_date = dates_request[1];
    actual_methodsID = request.GET.get('actual_method');

    variable_desc = network + ':' + code_variable
    print(variable_desc)
    site_desc = network + ':' + site_code
    print(site_desc)
    print("printing methodsIDS")
    print(actual_methodsID)
    print(request.GET)


    client = Client(hs_url)  # Connect to the HydroServer endpoint
    # print(client)
    site_info_Mc = client.service.GetSiteInfo(site_desc)
    site_info_Mc_dict = xmltodict.parse(site_info_Mc)
    site_info_Mc_json_object = json.dumps(site_info_Mc_dict)
    site_info_Mc_json = json.loads(site_info_Mc_json_object)

    values = client.service.GetValues(
        site_desc, variable_desc, start_date, end_date, "")
    # print(values)
    values_dict = xmltodict.parse(values)  # Converting xml to dict
    values_json_object = json.dumps(values_dict)
    values_json = json.loads(values_json_object)
    times_series = {}
    if 'timeSeriesResponse' in values_json:

        times_series = values_json['timeSeriesResponse'][
            'timeSeries']  # Timeseries object for the variable

        return_obj['values'] = times_series
        # print(site_info_Mc_json)

        if times_series['values'] is not None:

            return_obj['values'] = times_series

            graph_json = {}  # json object that will be returned to the front end
            graph_json["variable"] = times_series['variable']['variableName']
            graph_json["unit"]=""
            if times_series['variable']['unit']['unitAbbreviation'] is not None:
                graph_json["unit"] = times_series[
                    'variable']['unit']['unitAbbreviation']
            print(times_series)
            print("UNITS ERROR")
            print(graph_json)
            graph_json["title"] = times_series['variable']['variableName'] + " (" + graph_json["unit"] + ") vs Time"
            for j in times_series['values']:  # Parsing the timeseries
                print("first for loop")
                print(j)

                data_values = []
                data_values2 = []
                if j == "value":

                    print(type((times_series['values']['value'])))

                    if type(times_series['values']['value']) is list:
                        print("it is a list the timeseries")
                        print(len(times_series['values']['value']))
                        count = 0
                        for k in times_series['values']['value']:
                            # print(k)
                            return_obj['k']= k

                            try:

                                if k['@methodCode'] == actual_methodsID:
                                    count = count + 1
                                    time = k['@dateTimeUTC']
                                    time1 = time.replace("T", "-")


                                    time_split = time1.split("-")
                                    year = int(time_split[0])
                                    month = int(time_split[1])
                                    day = int(time_split[2])
                                    hour_minute = time_split[3].split(":")
                                    hour = int(hour_minute[0])
                                    minute = int(hour_minute[1])
                                    value = float(str(k['#text']))
                                    date_string = datetime(
                                        year, month, day, hour, minute)

                                    date_string_converted = date_string.strftime("%Y-%m-%d %H:%M:%S")
                                    # print(date_string_converted)
                                    data_values2.append([date_string_converted,value])
                                    data_values2.sort()
                                    time_stamp = calendar.timegm(
                                        date_string.utctimetuple()) * 1000
                                    data_values.append([time_stamp, value])
                                    data_values.sort()
                                graph_json["values2"] = data_values2
                                graph_json["count"] = count
                            except KeyError:  # The Key Error kicks in when there is only one timeseries
                                count = count + 1
                                time = k['@dateTimeUTC']
                                time1 = time.replace("T", "-")
                                time_split = time1.split("-")
                                year = int(time_split[0])
                                month = int(time_split[1])
                                day = int(time_split[2])
                                hour_minute = time_split[3].split(":")
                                hour = int(hour_minute[0])
                                minute = int(hour_minute[1])
                                value = float(str(k['#text']))
                                date_string = datetime(
                                    year, month, day, hour, minute)
                                # print(date_string)
                                data_values2.append([date_string,value])
                                data_values2.sort()
                                time_stamp = calendar.timegm(
                                    date_string.utctimetuple()) * 1000
                                data_values.append([time_stamp, value])
                                data_values.sort()
                            graph_json["values2"] = data_values2
                            graph_json["count"] = count
                            return_obj['graphs']=graph_json

                    else:  # The else statement is executed is there is only one value in the timeseries
                        try:
                            print("not list the time series then")
                            print(type(times_series))

                            if times_series['values']['value']['@methodCode'] == actual_methodsID:
                                time = times_series['values'][
                                    'value']['@dateTimeUTC']
                                time1 = time.replace("T", "-")
                                time_split = time1.split("-")
                                year = int(time_split[0])
                                month = int(time_split[1])
                                day = int(time_split[2])
                                hour_minute = time_split[3].split(":")
                                hour = int(hour_minute[0])
                                minute = int(hour_minute[1])
                                value = float(
                                    str(times_series['values']['value']['#text']))

                                date_string = datetime(
                                    year, month, day, hour, minute)
                                print(date_string)

                                data_values2.append([date_string,value])
                                data_values2.sort()
                                time_stamp = calendar.timegm(
                                    date_string.utctimetuple()) * 1000
                                data_values.append([time_stamp, value])
                                data_values.sort()
                                graph_json["values2"] = data_values2

                                # graph_json["values"] = data_values
                                graph_json["count"] = 1
                                return_obj['graphs']=graph_json

                        except KeyError:
                            time = times_series['values'][
                                'value']['@dateTimeUTC']
                            time1 = time.replace("T", "-")
                            time_split = time1.split("-")
                            year = int(time_split[0])
                            month = int(time_split[1])
                            day = int(time_split[2])
                            hour_minute = time_split[3].split(":")
                            hour = int(hour_minute[0])
                            minute = int(hour_minute[1])
                            value = float(
                                str(times_series['values']['value']['#text']))
                            date_string = datetime(
                                year, month, day, hour, minute)
                            # print(date_string)

                            time_stamp = calendar.timegm(
                                date_string.utctimetuple()) * 1000
                            data_values.append([time_stamp, value])
                            data_values.sort()

                            data_values2.append([date_string,value])
                            data_values2.sort()
                            graph_json["values2"] = data_values2
                            graph_json["count"] = 1
                            return_obj['graphs']=graph_json

    else:
        times_series = values_json['wml1:timeSeriesResponse'][
            'wml1:timeSeries']  # Timeseries object for the variable

        print(times_series)
        return_obj['values'] = times_series
        # print(site_info_Mc_json)

        if times_series['wml1:values'] is not None:


            return_obj['values'] = times_series

            graph_json = {}  # json object that will be returned to the front end
            graph_json["variable"] = times_series['wml1:variable']['wml1:variableName']
            graph_json["unit"]=""
            if times_series['wml1:variable']['wml1:unit']['wml1:unitAbbreviation'] is not None:
                graph_json["unit"] = times_series[
                    'wml1:variable']['wml1:unit']['wml1:unitAbbreviation']


            graph_json["title"] = times_series['wml1:variable']['wml1:variableName'] + " (" + graph_json["unit"] + ") vs Time"
            for j in times_series['wml1:values']:  # Parsing the timeseries
                print("first for loop")
                print(j)

                data_values = []
                data_values2 = []
                if j == "wml1:value":

                    print(type((times_series['wml1:values']['wml1:value'])))

                    if type(times_series['wml1:values']['wml1:value']) is list:
                        print("it is a list the timeseries")
                        print(len(times_series['wml1:values']['wml1:value']))
                        count = 0
                        for k in times_series['wml1:values']['wml1:value']:
                            # print(k)
                            return_obj['k']= k

                            try:

                                if k['@methodCode'] == actual_methodsID:
                                    count = count + 1
                                    time = k['@dateTimeUTC']
                                    time1 = time.replace("T", "-")


                                    time_split = time1.split("-")
                                    year = int(time_split[0])
                                    month = int(time_split[1])
                                    day = int(time_split[2])
                                    hour_minute = time_split[3].split(":")
                                    hour = int(hour_minute[0])
                                    minute = int(hour_minute[1])
                                    value = float(str(k['#text']))
                                    date_string = datetime(
                                        year, month, day, hour, minute)

                                    date_string_converted = date_string.strftime("%Y-%m-%d %H:%M:%S")
                                    # print(date_string_converted)
                                    data_values2.append([date_string_converted,value])
                                    data_values2.sort()
                                    time_stamp = calendar.timegm(
                                        date_string.utctimetuple()) * 1000
                                    data_values.append([time_stamp, value])
                                    data_values.sort()
                                graph_json["values2"] = data_values2
                                graph_json["count"] = count
                            except KeyError:  # The Key Error kicks in when there is only one timeseries
                                print("The Key Error kicks in because there was only one timespace")
                                count = count + 1
                                time = k['@dateTimeUTC']
                                time1 = time.replace("T", "-")
                                time_split = time1.split("-")
                                year = int(time_split[0])
                                month = int(time_split[1])
                                day = int(time_split[2])
                                hour_minute = time_split[3].split(":")
                                hour = int(hour_minute[0])
                                minute = int(hour_minute[1])
                                value = float(str(k['#text']))
                                date_string = datetime(
                                    year, month, day, hour, minute)
                                # print(date_string)
                                data_values2.append([date_string,value])
                                data_values2.sort()
                                time_stamp = calendar.timegm(
                                    date_string.utctimetuple()) * 1000
                                data_values.append([time_stamp, value])
                                data_values.sort()
                            graph_json["values2"] = data_values2
                            graph_json["count"] = count
                            return_obj['graphs']=graph_json

                    else:  # The else statement is executed is there is only one value in the timeseries
                        try:
                            print("not list the time series then")
                            print(type(times_series))

                            if times_series['values']['value']['@methodCode'] == actual_methodsID:
                                time = times_series['values'][
                                    'value']['@dateTimeUTC']
                                time1 = time.replace("T", "-")
                                time_split = time1.split("-")
                                year = int(time_split[0])
                                month = int(time_split[1])
                                day = int(time_split[2])
                                hour_minute = time_split[3].split(":")
                                hour = int(hour_minute[0])
                                minute = int(hour_minute[1])
                                value = float(
                                    str(times_series['values']['value']['#text']))

                                date_string = datetime(
                                    year, month, day, hour, minute)
                                print(date_string)

                                data_values2.append([date_string,value])
                                data_values2.sort()
                                time_stamp = calendar.timegm(
                                    date_string.utctimetuple()) * 1000
                                data_values.append([time_stamp, value])
                                data_values.sort()
                                graph_json["values2"] = data_values2

                                # graph_json["values"] = data_values
                                graph_json["count"] = 1
                                return_obj['graphs']=graph_json

                        except KeyError:
                            time = times_series['values'][
                                'value']['@dateTimeUTC']
                            time1 = time.replace("T", "-")
                            time_split = time1.split("-")
                            year = int(time_split[0])
                            month = int(time_split[1])
                            day = int(time_split[2])
                            hour_minute = time_split[3].split(":")
                            hour = int(hour_minute[0])
                            minute = int(hour_minute[1])
                            value = float(
                                str(times_series['values']['value']['#text']))
                            date_string = datetime(
                                year, month, day, hour, minute)
                            # print(date_string)

                            time_stamp = calendar.timegm(
                                date_string.utctimetuple()) * 1000
                            data_values.append([time_stamp, value])
                            data_values.sort()

                            data_values2.append([date_string,value])
                            data_values2.sort()
                            graph_json["values2"] = data_values2
                            graph_json["count"] = 1
                            return_obj['graphs']=graph_json

    print("done with get_values_graph_hs")
    return JsonResponse(return_obj)

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
                object_methods= site_info_Mc_json['sitesResponse']['site']['seriesCatalog']['series']
                # print("GETSITESINFO FUNCTION")
                # print(object_methods)
                object_with_methods_and_variables = {}
                object_with_descriptions_and_variables = {}
                object_with_time_and_variables = {}
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

    if safety_check_intial == safety_check_limit:
        list_catalog["hydroserver"] = hs_list
    else:
        list_catalog["hydrosever"] = []

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
