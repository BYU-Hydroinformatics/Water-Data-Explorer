import xmltodict
import logging
import sys
import os
import json
import pandas as pd
import numpy as np
import pywaterml.waterML as pwml

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

Persistent_Store_Name = 'catalog_db'
logging.basicConfig(level=logging.INFO)
logging.getLogger('suds.client').setLevel(logging.DEBUG)

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

        group_obj['title']=title
        group_obj['description']= description
        url_catalog = request.POST.get('url')
        group_hydroservers=Groups(title=title, description=description)
        session.add(group_hydroservers)
        session.commit()
        session.close()

        if url_catalog:
            try:
                # url_catalog = unquote(url_catalog)
                print("THIS ", url_catalog)
                url_catalog2 = url_catalog + "?WSDL"
                client = Client(url_catalog2, timeout= 500)
                logging.getLogger('suds.client').setLevel(logging.DEBUG)

                service_info = client.service.GetWaterOneFlowServiceInfo()
                # print(logging.getLogger('suds.client').setLevel(logging.DEBUG))
                # print(logging.getLogger('suds.client').setLevel(logging.CRITICAL))
                services = service_info.ServiceInfo
                views = giveServices(services)
                group_obj['views'] = addMultipleViews(views,title)
            except Exception as e:
                services = parseService(url_catalog)
                views = giveServices(services)
                print(views)
                group_obj['views'] = addMultipleViews(views,title)

    else:
        group_obj[
            'message'] = 'There was an error while adding th group.'


    return JsonResponse(group_obj)

def giveServices(services):
    hs_list = []
    for i in services:
        hs = {}
        url = i['servURL']
        title = i['Title']
        try:
            print("Testing %s" % (url))
            url_client = Client(url)
            hs['url'] = url
            hs['title'] = title
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
            # # print(sites_object)
            # # converted_sites_object=[x['sitename'].decode("UTF-8") for x in sites_object]
            #
            # # sites_parsed_json = json.dumps(converted_sites_object)
            sites_object = water.GetSites()

            sites_parsed_json = json.dumps(sites_object)

            return_obj['title'] = hs['title']
            return_obj['url'] = hs['url']
            return_obj['siteInfo'] = sites_parsed_json
            return_obj['group'] = group
            return_obj['status'] = "true"

            ret_object.append(ret_object)

            SessionMaker = app.get_persistent_store_database(
                Persistent_Store_Name, as_sessionmaker=True)
            session = SessionMaker()

            hydroservers_group = session.query(Groups).filter(Groups.title == group)[0]
            # hydroservers_g = session.query(Groups).filter(Groups.title == group)
            print(hydroservers_group.title)
            print(hydroservers_group.description)

            hs_one = HydroServer_Individual(title=hs['title'],
                             url=hs['url'],
                             siteinfo=sites_parsed_json)

            hydroservers_group.hydroserver.append(hs_one)
            print(hydroservers_group.hydroserver)
            session.add(hydroservers_group)
            session.commit()
            session.close()

#CHANGE LAST
        except (suds.WebFault, KeyError) as detail:
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
