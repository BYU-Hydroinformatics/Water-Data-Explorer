import xmltodict
import logging
import json
import pandas as pd
import pywaterml.waterML as pwml
from datetime import datetime

from django.template.loader import render_to_string
from tethys_sdk.routing import controller

from suds.client import Client  # For parsing WaterML/XML
from django.http import JsonResponse

Persistent_Store_Name = 'catalog_db'



@controller(name='get-values-hs', url='get-values-hs/')
def get_values_hs(request):
    """
    Get metadata of a given site using the WaterOneFlow GetSiteInfo function .

    Args:
        request object containing
            - service url from site
            - network from site
            - site code
                        return_obj['country'] = []
                        return_obj['variables'] =[]
                        return_obj['units'] = []
                        return_obj['codes'] = []
                        return_obj['organization'] = []
                        return_obj['times_series'] = []
                        return_obj['geolo'] = []
                        return_obj['timeUnitName'] = []
                        return_obj['TimeSupport'] = []
                        return_obj['dataType'] = []

    Returns:
        json object containing the following information:
            - country: array containing country of origin of site.
            - variables: array containing variables names of site.
            - units: array containing unit names.
            - codes: array containing variable codes ofsite .
            - organization: array containing the organization of the given sites.
            - times_seris: array containing time series of a given site.
            - geolo: array containing geolocation of the given site.
            - timeUnitName: array containing time units used for the time series.
            - timeSupport: array containing booleans that indicates if the variables support time.
    """
    return_obj = {}
    hs_url = request.POST.get('hs_url')
    # print(hs_url)
    site_code = request.POST.get('code')
    network = request.POST.get('network')
    site_desc = network + ':' + site_code

    # SessionMaker = app.get_persistent_store_database(Persistent_Store_Name, as_sessionmaker=True)
    # session = SessionMaker()  # Initiate a session
    client = Client(hs_url)
    try:
        response_info = GetSiteInfo(client, site_desc)['siteInfo']
        df = pd.DataFrame.from_dict(response_info)

        if df.empty:
            return_obj['country'] = []
            return_obj['variables'] = []
            return_obj['units'] = []
            return_obj['codes'] = []
            return_obj['organization'] = []
            return_obj['times_series'] = []
            return_obj['geolo'] = []
            return_obj['timeUnitName'] = []
            return_obj['TimeSupport'] = []
            return_obj['dataType'] = []
            return JsonResponse(return_obj)
        pd.set_option('display.max_columns', None)
        return_obj['country'] = df['country'].tolist()[0]
        return_obj['variables'] = df['variableName'].tolist()
        return_obj['units'] = df['unitAbbreviation'].tolist()
        return_obj['codes'] = df['variableCode'].tolist()
        return_obj['timeUnitName'] = df['timeUnitName'].tolist()
        return_obj['timeSupport'] = df['timeSupport'].tolist()
        return_obj['dataType'] = df['dataType'].tolist()

        obj_var_desc = {}
        obj_var_times_s = {}
        for vari, desc, times_s in zip(df['variableCode'].tolist(), df['organization'].tolist(),
                                       df['variableTimeInterval'].tolist()):
            obj_var_desc[vari] = desc
            obj_var_times_s[vari] = times_s
        return_obj['organization'] = obj_var_desc
        return_obj['times_series'] = obj_var_times_s
        return_obj['geolo'] = df['geolocation'].tolist()[0]
        return JsonResponse(return_obj)
    except Exception:
        return JsonResponse(return_obj)


@controller(name='get-values-graph-hs', url='get-values-graph-hs/')
def get_values_graph_hs(request):
    """
    Get the time series of a given site using the WaterOneFlow GetValues function .

    Args:
        request object containing
            - service url from site
            - network from site
            - variable code from site
            - timeframe from site
            - site code

    Returns:
        json object containing the following information:
            - graphs: array containing time series values.
            - interpolation: array containing interpolation timeseries.
            - unit_name: array containing unit names.
            - variablesname: array containing variable names.
            - timeUnitName: array containing time unit names.
    """
    return_obj = {}
    hs_url = request.POST.get('hs_url')
    site_code = request.POST.get('code')
    network = request.POST.get('network')
    code_variable = request.POST.get('code_variable')
    dates_request = request.POST.getlist('timeFrame[]')
    start_date = dates_request[0]
    end_date = dates_request[1]
    variable_desc = network + ':' + code_variable
    site_desc = network + ':' + site_code
    water = pwml.WaterMLOperations(url=hs_url)
    values = water.GetValues(site_desc, variable_desc, start_date, end_date, format='json')
    # print(values)
    df = pd.DataFrame.from_dict(values['values'])
    # print(df)
    if df.empty:
        return_obj['graphs'] = []
        return_obj['interpolation'] = []
        return_obj['unit_name'] = []
        return_obj['variablename'] = []
        return_obj['timeUnitName'] = []
        return JsonResponse(return_obj)

    variable_name = df['variableName'].tolist()[0]
    unit_name = df['unitAbbreviation'].tolist()[0]
    time_unit_name = df['timeUnitName'].tolist()[0]
    time_series_vals = df['dataValue'].tolist()
    time_series_timeUTC = df['dateTime'].tolist()
    return_obj['graphs'] = list(zip(time_series_timeUTC, time_series_vals))
    return_obj['interpolation'] = water.GetInterpolation(values)
    return_obj['unit_name'] = unit_name
    return_obj['variablename'] = variable_name
    return_obj['timeUnitName'] = time_unit_name
    dict_xml = []

    for gps_ in return_obj['graphs']:
        chunk_xml = {}
        chunk_xml['DateTimeUTC'] = gps_[0]
        chunk_xml['DataValue'] = gps_[1]
        dict_xml.append(chunk_xml)

    current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    my_vals = values['values'][0]

    context = {
        "data_values": dict_xml,
        "current_date": current_date,
        "init_date": time_series_timeUTC[0],
        "final_date": time_series_timeUTC[-1],
        "network": network,
        "code_variable": code_variable,
        "code_site": site_code,
        "site_name": my_vals["siteName"],
        "unitAbbreviation": my_vals["unitAbbreviation"],
        "latitude_longitude": f'{my_vals["latitude"]} {my_vals["longitude"]}',
        "site_id": my_vals["siteID"],
        "dataType": my_vals["dataType"],
    }

    template_renderizado = render_to_string('water_data_explorer/wml2_values_template.xml', context)
    return_obj['template_renderizado'] = template_renderizado
    return JsonResponse(return_obj)


@controller(name='get-xml', url='get-xml/')
def get_xml(request):
    """
    Get the xml in WaterML.1.0 format of a given site.

    Args:
        request object containing
            - service url from site
            - network from site
            - variable code from site
            - timeframe from site

    Returns:
        waterML text containing the following data of the seleceted site from the WaterOneFlow web service

    """
    return_obj = {}

    hs_url = request.POST.get('hs_url')

    site_code = request.POST.get('code')
    network = request.POST.get('network')
    code_variable = request.POST.get('code_variable')
    dates_request = request.POST.getlist('timeFrame[]')
    start_date = dates_request[0]
    end_date = dates_request[1]

    variable_desc = network + ':' + code_variable
    site_desc = network + ':' + site_code

    water = pwml.WaterMLOperations(url=hs_url)

    return_obj['waterml'] = water.GetValues(site_desc, variable_desc,  start_date, end_date, format='waterml')

    return JsonResponse(return_obj)


"""
Extracted from the WaterML.py source code in the pywaterML package, but customized to meet the requirements of the WDE
"""


def GetSiteInfo(client, site_full_code, format="json"):
    """
    Get the information of a given site. GetSiteInfo() function is similar to the GetSiteInfo() WaterML function.

    Args:
        site_full_code: A string representing the full code of the given site following the structure
            - site_full_code = site network + ":" + site code
        format: format of the response (json, csv or waterML)

    Returns:

        A json, csv or waterML file containing the following data of the seleceted site from the WaterOneFlow web
        service:
            - siteName: Name of the site.
            - siteCode: Code of the site.
            - network: observation network that the site belongs to
            - fullVariableCode: The full variable code, for example: SNOTEL:SNWD.Use this value as the variableCode
                parameter in GetValues().
            - siteID: ID of the site
            - latitude: latitude of the site
            - longitude: longitude of the site
            - variableName: Name of the variable
            - unitName: Name of the units of the values associated to the given variable and site
            - unitAbbreviation: unit abbreviation of the units from the values associated to the given variable and site
            - dataType: Type of data
            - noDataValue: value associated to lack of data.
            - isRegular: Boolean to indicate whether the observation measurements and collections regular
            - timeSupport: Boolean to indicate whether the values support time
            - timeUnitName: Time Units associated to the observation
            - timeUnitAbbreviation: Time units abbreviation
            - sampleMedium: the sample medium, for example water, atmosphere, soil.
            - speciation: The chemical sample speciation (as nitrogen, as phosphorus..)
            - beginningDateTimeUTC: The UTC date and time of the first available
            - EndDateTimeUTC: The UTC date and time of the last available
            - beginningDateTime: The local date and time of the first available
            - EndDateTime: The local date and time of the last available
            - censorCode: The code for censored observations.  Possible values are nc (not censored), gt(greater than),
              lt (less than), nd (non-detect), pnq (present but not quantified)
            - methodCode: The code of the method or instrument used for the observation
            - methodID: The ID of the sensor or measurement method
            - qualityControlLevelCode: The code of the quality control level.  Possible values are -9999(Unknown),
                0 (Raw data), 1 (Quality controlled data), 2 (Derived products), 3 (Interpretedproducts),
                4 (Knowledge products)
            - qualityControlLevelID: The ID of the quality control level. Usually 0 means raw data and 1 means quality
                controlled data.
            - sourceCode: The code of the data source.
            - timeOffSet: The difference between local time and UTC time in hours.

    Example::

        url_testing = "http://hydroportal.cuahsi.org/para_la_naturaleza/cuahsi_1_1.asmx?WSDL"
        water = WaterMLOperations(url = url_testing)
        sites = water.GetSites()
        firstSiteFullSiteCode = sites[0]['fullSiteCode']
        siteInfo = water.GetSiteInfo(firstSiteFullSiteCode)
    """
    return_array = []
    try:
        site_info_Mc = client.service.GetSiteInfo(site_full_code)
        if format == 'waterml':
            return site_info_Mc
        site_info_Mc_dict = xmltodict.parse(site_info_Mc)
        site_info_Mc_json_object = json.dumps(site_info_Mc_dict)
        site_info_Mc_json = json.loads(site_info_Mc_json_object)

        try:
            object_methods = site_info_Mc_json['sitesResponse']['site']['seriesCatalog']['series']
            object_siteInfo = site_info_Mc_json['sitesResponse']['site']['siteInfo']
            return_array = []
            if(isinstance(object_methods, (dict))):
                return_obj = _getSiteInfoHelper(object_siteInfo, object_methods)
                return_array.append(return_obj)

            else:
                for object_method in object_methods:
                    return_obj = _getSiteInfoHelper(object_siteInfo, object_method)
                    return_array.append(return_obj)
            if format == "json":
                json_response = {
                    'siteInfo': return_array
                }
                return json_response
            elif format == "csv":
                df = pd.DataFrame.from_dict(return_array)
                csv_siteInfo = df.to_csv(index=False)
                return csv_siteInfo
            else:
                return print("the only supported formats are json, csv, and waterml")
        except KeyError:
            return_array = []
            if format == "json":
                json_response = {
                    'siteInfo': return_array
                }
                return json_response
            elif format == "csv":
                df = pd.DataFrame.from_dict(return_array)
                csv_siteInfo = df.to_csv(index=False)
                return csv_siteInfo
            else:
                return print("the only supported formats are json, csv, and waterml")
    except Exception as error:
        return return_array
        print(error)

    return return_array


"""
Extracted from the AuxiliaryMod in the pywaterML package.
"""


def _getSiteInfoHelper(object_siteInfo, object_methods):
    """
    Helper function to parse and store the content of two dictionaries:

        - object_methods = GetSiteInfoResponse ['sitesResponse']['site']['seriesCatalog']['series']
        - object_siteInfo = GetSiteInfoResponse ['sitesResponse']['site']['siteInfo']

    Both dictionaries containing the response from the GetSiteInfo at store the following content into a new dictionary:

        - siteName: Name of the site.
        - siteCode: Code of the site.
        - network: observation network that the site belongs to
        - fullVariableCode: The full variable code, for example: SNOTEL:SNWD.Use this value as the variableCode
            parameter in GetValues().
        - siteID: ID of the site
        - latitude: latitude of the site
        - longitude: longitude of the site
        - variableName: Name of the variable
        - unitName: Name of the units of the values associated to the given variable and site
        - unitAbbreviation: unit abbreviation of the units from the values associated to the given variable and site
        - dataType: Type of data
        - noDataValue: value associated to lack of data.
        - isRegular: Boolean to indicate whether the observation measurements and collections regular
        - timeSupport: Boolean to indicate whether the values support time
        - timeUnitName: Time Units associated to the observation
        - timeUnitAbbreviation: Time units abbreviation
        - sampleMedium: the sample medium, for example water, atmosphere, soil.
        - speciation: The chemical sample speciation (as nitrogen, as phosphorus..)
        - beginningDateTimeUTC: The UTC date and time of the first available
        - EndDateTimeUTC: The UTC date and time of the last available
        - beginningDateTime: The local date and time of the first available
        - EndDateTime: The local date and time of the last available
        - censorCode: The code for censored observations.  Possible values are nc (not censored), gt(greater than),
          lt (less than), nd (non-detect), pnq (present but not quantified)
        - methodCode: The code of the method or instrument used for the observation
        - methodID: The ID of the sensor or measurement method
        - qualityControlLevelCode: The code of the quality control level.  Possible values are -9999(Unknown),
            0 (Raw data), 1 (Quality controlled data), 2 (Derived products), 3 (Interpretedproducts),
            4 (Knowledge products)
        - qualityControlLevelID: The ID of the quality control level. Usually 0 means raw data and 1 means quality
            controlled data.
        - sourceCode: The code of the data source.
        - timeOffSet: The difference between local time and UTC time in hours.

    Args:
        object_siteInfo: Contains metadata associated to the site.
        object_methods: Contains a list of <series>, which are unique combinations of site, variable and time
        intervals that specify a sequence of observations.
    Returns:
        return_obj: python dictionary containing data from the GetSiteInfo response.
    """
    return_obj = {}

    try:
        sitePorperty_Info = object_siteInfo['siteProperty']
        return_obj['country'] = "No Data was Provided"
        if type(sitePorperty_Info) is list:
            for props in sitePorperty_Info:
                if props['@name'] == 'Country':
                    return_obj['country'] = props['#text']
        else:
            if str(sitePorperty_Info['@name']) == 'Country':
                return_obj['country'] = str(sitePorperty_Info['#text'])
                # print(return_obj['country'])
    except Exception:
        # print(e)
        return_obj['country'] = "No Data was Provided"
    try:
        # return_obj['siteName'] = object_siteInfo['siteName']
        siteName = object_siteInfo['siteName'].encode("utf-8")
        # return_object['siteName'] = siteName
        return_obj['siteName'] = siteName.decode("utf-8")
    except Exception:
        return_obj['siteName'] = "No Data was Provided"

    try:
        return_obj['latitude'] = object_siteInfo['geoLocation']['geogLocation']['latitude']
    except Exception:
        return_obj['latitude'] = "No Data was Provided"

    try:
        return_obj['longitude'] = object_siteInfo['geoLocation']['geogLocation']['longitude']
    except Exception:
        return_obj['longitude'] = "No Data was Provided"

    try:
        return_obj['geolocation'] = object_siteInfo['geoLocation']['geogLocation']
    except Exception:
        return_obj['geolocation'] = "No Data was Provided"

    try:
        return_obj['network'] = object_siteInfo['siteCode']['@network']
    except Exception:
        return_obj['network'] = "No Data was Provided"

    try:
        return_obj['siteCode'] = object_siteInfo['siteCode']['#text']
    except Exception:
        return_obj['siteCode'] = "No Data was Provided"

    try:
        return_obj['fullSiteCode'] = return_obj['network'] + ":" + return_obj['siteCode']
    except Exception:
        return_obj['fullSiteCode'] = "No Data was Provided"

    try:
        return_obj['variableName'] = object_methods['variable']['variableName']
    except Exception:
        return_obj['variableName'] = "No Data was Provided"

    try:
        return_obj['variableCode'] = object_methods['variable']['variableCode']['#text']
    except Exception:
        return_obj['variableCode'] = "No Data was Provided"

    try:
        return_obj['fullVariableCode'] = return_obj['network'] + ":" + return_obj['variableCode']
    except Exception:
        return_obj['fullVariableCode'] = "No Data was Provided"

    try:
        return_obj['variableCount'] = object_methods['valueCount']
    except Exception:
        return_obj['variableCount'] = "No Data was Provided"

    try:
        return_obj['dataType'] = object_methods['variable']['dataType']
    except Exception:
        return_obj['dataType'] = "No Data was Provided"

    try:
        return_obj['valueType'] = object_methods['variable']['valueType']
    except Exception:
        return_obj['valueType'] = "No Data was Provided"

    try:
        return_obj['generalCategory'] = object_methods['variable']['generalCategory']
    except Exception:
        return_obj['generalCategory'] = "No Data was Provided"

    try:
        return_obj['noDataValue'] = object_methods['variable']['noDataValue']
    except Exception:
        return_obj['noDataValue'] = "No Data was Provided"

    try:
        return_obj['sampleMedium'] = object_methods['variable']['sampleMedium']
    except Exception:
        return_obj['sampleMedium'] = "No Data was Provided"

    try:
        return_obj['speciation'] = object_methods['variable']['speciation']
    except Exception:
        return_obj['speciation'] = "No Data was Provided"
    try:
        return_obj['timeUnitAbbreviation'] = object_methods['variable']['timeScale']['unit']['unitAbbreviation']
    except Exception:
        return_obj['timeUnitAbbreviation'] = "No Data was Provided"

    try:
        return_obj['timeUnitName'] = object_methods['variable']['timeScale']['unit']['unitName']
    except Exception:
        return_obj['timeUnitName'] = "No Data was Provided"

    try:
        return_obj['timeUnitType'] = object_methods['variable']['timeScale']['unit']['unitType']
    except Exception:
        return_obj['timeUnitType'] = "No Data was Provided"

    try:
        return_obj['timeSupport'] = object_methods['variable']['timeScale']['timeSupport']
    except Exception:
        return_obj['timeSupport'] = "No Data was Provided"

    try:
        return_obj['isRegular'] = object_methods['variable']['timeScale']['@isRegular']
    except Exception:
        return_obj['isRegular'] = "No Data was Provided"

    try:
        return_obj['unitAbbreviation'] = object_methods['variable']['unit']['unitAbbreviation']
    except Exception:
        return_obj['unitAbbreviation'] = "No Data was Provided"

    try:
        return_obj['unitName'] = object_methods['variable']['unit']['unitName']
    except Exception:
        return_obj['unitName'] = "No Data was Provided"

    try:
        return_obj['unitType'] = object_methods['variable']['unit']['unitType']
    except Exception:
        return_obj['unitType'] = "No Data was Provided"

    if 'method' in object_methods:
        return_obj['methodID'] = object_methods['method']['@methodID']
        return_obj['methodDescription'] = object_methods['method']['methodDescription']
    else:
        return_obj['methodID'] = "No Method Id was provided"
        return_obj['methodDescription'] = "No Method Description was provided"

    try:
        return_obj['qualityControlLevelID'] = object_methods['qualityControlLevel']['@qualityControlLevelID']
    except Exception:
        return_obj['qualityControlLevelID'] = "No Data was Provided"

    try:
        return_obj['definition'] = object_methods['qualityControlLevel']['definition']
    except Exception:
        return_obj['definition'] = "No Data was Provided"

    try:
        return_obj['qualityControlLevelCode'] = object_methods['qualityControlLevel']['qualityControlLevelCode']
    except Exception:
        return_obj['qualityControlLevelCode'] = "No Data was Provided"

    try:
        return_obj['citation'] = object_methods['source']['citation']
    except Exception:
        return_obj['citation'] = "No Data was Provided"

    try:
        return_obj['organization'] = object_methods['source']['organization']
    except Exception:
        return_obj['organization'] = "No Data was Provided"

    try:
        return_obj['description'] = object_methods['source']['sourceDescription']
    except Exception:
        return_obj['description'] = "No Data was Provided"

    try:
        return_obj['beginDateTime'] = object_methods['variableTimeInterval']['beginDateTime']
    except Exception:
        return_obj['beginDateTime'] = "No Data was Provided"

    try:
        return_obj['endDateTime'] = object_methods['variableTimeInterval']['endDateTime']
    except Exception:
        return_obj['endDateTime'] = "No Data was Provided"

    try:
        return_obj['beginDateTimeUTC'] = object_methods['variableTimeInterval']['beginDateTimeUTC']
    except Exception:
        return_obj['beginDateTimeUTC'] = "No Data was Provided"

    try:
        return_obj['endDateTimeUTC'] = object_methods['variableTimeInterval']['endDateTimeUTC']
    except Exception:
        return_obj['endDateTimeUTC'] = "No Data was Provided"
    try:
        return_obj['variableTimeInterval'] = object_methods['variableTimeInterval']
    except Exception:
        return_obj['variableTimeInterval'] = "No Data was Provided"

    return return_obj
