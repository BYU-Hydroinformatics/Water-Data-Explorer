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
    array_variables_codes = []
    array_variables_lengths = []
    array_keywords_hydroserver=[]


    if(isinstance(object_methods,(dict))):
        print("adding to the methodID as a dict")
        variable_name_ = object_methods['variable']['variableName']
        array_keywords_hydroserver.append(variable_name_)

        array_variables_codes.append(object_methods['variable']['variableCode']['#text'])
        array_variables_lengths.append(object_methods['valueCount'])

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
            array_keywords_hydroserver.append(variable_name_)
            array_variables_lengths.append(object_method['valueCount'])
            array_variables_codes.append(object_method['variable']['variableCode']['#text'])


            if 'method' in object_method:
                object_with_methods_and_variables[variable_name_]= object_method['method']['@methodID']
            else:
                object_with_methods_and_variables[variable_name_]= None
            # print(object_method['source'])
            object_with_descriptions_and_variables[variable_name_]= object_method['source'];
            object_with_time_and_variables[variable_name_]= object_method['variableTimeInterval'];
            print(object_with_methods_and_variables)


    #
    # array_variables = keywords_json['variablesResponse']['variables']['variable']
    # array_keywords_hydroserver=[]
    # array_variables_codes = []
    # array_variables_lengths = []
    # length_values = 0
    #
    #
    # if isinstance(array_variables,type([])):
    #     print("array type")
    #     ijj = 0
    #     for words in array_variables:
    #         print(ijj)
    #         print(words['variableName'])
    #         variable_text = words['variableName']
    #         code_variable = words['variableCode']['#text']
    #         start_date = ""
    #         end_date = ""
    #         variable_desc = network + ':' + code_variable
    #         print("variable_desc")
    #         print(variable_desc)
    #         print(site_desc)
    #         try:
    #             values = client.service.GetValues(
    #                 site_desc, variable_desc, start_date, end_date, "")
    #
    #             values_dict = xmltodict.parse(values)  # Converting xml to dict
    #             values_json_object = json.dumps(values_dict)
    #             values_json = json.loads(values_json_object)
    #             # print(values_json)
    #             # print(values_json.keys())
    #             if 'timeSeriesResponse' in values_json:
    #             # if values_json['timeSeriesResponse'] is not None:
    #                 times_series = values_json['timeSeriesResponse'][
    #                     'timeSeries']  # Timeseries object for the variable
    #                 # print(times_series)
    #                 print(times_series['values'])
    #                 if times_series['values'] is not None:
    #                     length_values= len(times_series['values']['value'])
    #                     print(variable_text," ", length_values )
    #                 else:
    #                     length_values = 0
    #                     print("NO variables in ", variable_text," ", length_values )
    #             ## Addition for the WHOS PLATA ##
    #             else:
    #                 times_series = values_json['wml1:timeSeriesResponse'][
    #                     'wml1:timeSeries']  # Timeseries object for the variable
    #                 # print(times_series)
    #                 if times_series['wml1:values'] is not None:
    #                     length_values= len(times_series['wml1:values']['wml1:value'])
    #                     print(variable_text," ", length_values )
    #                 else:
    #                     length_values = 0
    #                     print(variable_text," ", length_values )
    #
    #
    #             array_variables_lengths.append(length_values)
    #
    #
    #             array_keywords_hydroserver.append(words['variableName'])
    #             array_variables_codes.append(words['variableCode']['#text'])
    #             ijj=ijj+1
    #         except Exception as e:
    #             exc_type, exc_obj, exc_tb = sys.exc_info()
    #             fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    #             print("The class value is not in the response ",exc_type, fname, exc_tb.tb_lineno)
    #             # words_to_search[name] = array_keywords_hydroserver
    # if isinstance(array_variables,dict):
    #     print("dict")
    #     print(array_variables['variableName'])
    #
    #     variable_text = array_variables['variableName']
    #     code_variable = array_variables['variableCode']['#text']
    #     start_date = ""
    #     end_date = ""
    #     variable_desc = network + ':' + code_variable
    #     try:
    #         values = client.service.GetValues(
    #             site_desc, variable_desc, start_date, end_date, "")
    #         # print(values)
    #
    #         values_dict = xmltodict.parse(values)  # Converting xml to dict
    #         values_json_object = json.dumps(values_dict)
    #         values_json = json.loads(values_json_object)
    #         if 'timeSeriesResponse' in values_json:
    #         # if values_json['timeSeriesResponse'] is not None:
    #             times_series = values_json['timeSeriesResponse'][
    #                 'timeSeries']  # Timeseries object for the variable
    #             # print(times_series)
    #             if times_series['values'] is not None:
    #                 length_values= len(times_series['values']['value'])
    #                 print(variable_text," ", length_values )
    #             else:
    #                 length_values = 0
    #                 print(variable_text," ", length_values )
    #         ## Addition for the WHOS PLATA ##
    #         else:
    #             times_series = values_json['wml1:timeSeriesResponse'][
    #                 'wml1:timeSeries']  # Timeseries object for the variable
    #             # print(times_series)
    #             if times_series['wml1:values'] is not None:
    #                 length_values= len(times_series['wml1:values']['wml1:value'])
    #                 print(variable_text," ", length_values )
    #             else:
    #                 length_values = 0
    #                 print(variable_text," ", length_values )
    #
    #
    #         array_variables_lengths.append(length_values)
    #
    #         array_keywords_hydroserver.append(array_variables['variableName'])
    #         array_variables_codes.append(array_variables['variableCode']['#text'])
    #     except Exception as e:
    #         exc_type, exc_obj, exc_tb = sys.exc_info()
    #         fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    #         print("The class value is not in the response ",exc_type, fname, exc_tb.tb_lineno)

    return_obj['variables']=array_keywords_hydroserver
    return_obj['codes']=array_variables_codes
    return_obj['counts'] = array_variables_lengths
    return_obj['methodsIDs']= object_with_methods_and_variables
    return_obj['description'] = object_with_descriptions_and_variables
    return_obj['times_series'] = object_with_time_and_variables
    ## SAFE GUARD TO SEE THE RESPONSE OF THE SITE INFO##
    # return_obj['siteInfo']= site_info_Mc_json

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
    start_date = dates_request[0]
    end_date = dates_request[1];
    actual_methodsID = request.GET.get('actual_method')

    variable_desc = network + ':' + code_variable
    print(variable_desc)
    site_desc = network + ':' + site_code
    print(site_desc)
    print("printing methodsIDS")
    print(actual_methodsID)
    print(request.GET)


    client = Client(hs_url)  # Connect to the HydroServer endpoint
    # # print(client)
    # site_info_Mc = client.service.GetSiteInfo(site_desc)
    # site_info_Mc_dict = xmltodict.parse(site_info_Mc)
    # site_info_Mc_json_object = json.dumps(site_info_Mc_dict)
    # site_info_Mc_json = json.loads(site_info_Mc_json_object)

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
            print(times_series['values'])
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

    time_pd, values_pd = zip(*graph_json["values2"])
    pds={}
    pds['time'] = time_pd
    pds['value'] = values_pd
    df_interpolation= pd.DataFrame(pds,columns = ["time","value"])
    df_interpolation2= pd.DataFrame(pds,columns = ["time","value"])
    print(df_interpolation.dtypes)
    df_interpolation.loc[df_interpolation.value < 0] = np.NaN
    df_interpolation.replace(0, np.nan, inplace=True)
    df_interpolation['time'] = pd.to_datetime(df_interpolation['time'])
    df_interpolation = df_interpolation.set_index('time').resample('D').mean()
    df_interpolation['value'] = df_interpolation['value'].interpolate()
    df_interpolation.reset_index(level=0, inplace=True)
    print(df_interpolation)
    print(df_interpolation2)
    listVals = df_interpolation['value'].to_list()
    listTimes = df_interpolation['time'].to_list()
    dataInterpolated = []
    #a count for the number of interpolated can be introduced
    for t,v in zip(listTimes,listVals):
        dataInterpolated.append([t,v])
    graph_json['interpolation']=dataInterpolated
    # print(time_pd)
    # print(values_pd)
    print("done with get_values_graph_hs")

    return JsonResponse(return_obj)
