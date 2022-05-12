import functools
import inspect
import json
import os
import shutil
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as et
import zipfile
from datetime import *

import fiona
import geojson
import pyproj
import shapefile as sf
import shapely.geometry
import shapely.ops
import xmltodict
from suds.client import Client
from suds.sudsobject import asdict

from .app import WaterDataExplorer as app

extract_base_path = "/tmp"


def GetSites_WHOS(url):
    try:
        client = Client(url, timeout=500)
        sites = client.service.GetSites("[:]")

        sites_json = {}
        if isinstance(sites, str):
            sites_dict = xmltodict.parse(sites)
            sites_json_object = json.dumps(sites_dict)
            sites_json = json.loads(sites_json_object)
        else:
            sites_json_object = json.dumps(recursive_asdict(sites))
            sites_json = json.loads(sites_json_object)

        sites_object = parseJSON(sites_json)

        return sites_object

    except Exception as error:
        print(error)
        sites_object = {}

    return sites_object


def checkCentral(centralUrl):
    # Currently just checking if its a valid endpoint.
    url = centralUrl + "/GetWaterOneFlowServiceInfo"
    response = urllib.request.urlopen(url)

    return response.getcode() == 200


def parseService(centralUrl):
    url = centralUrl + "/GetWaterOneFlowServiceInfo"
    response = urllib.request.urlopen(url)
    data = response.read()
    parse_xml = et.fromstring(data)

    services = []
    for item in parse_xml:
        newService = {}

        for child in item:
            if child.tag == "{http://hiscentral.cuahsi.org/20100205/}servURL":
                newService["servURL"] = child.text
            if child.tag == "{http://hiscentral.cuahsi.org/20100205/}Title":
                newService["Title"] = child.text
            if child.tag == "{http://hiscentral.cuahsi.org/20100205/}organization":
                newService["organization"] = child.text
            if child.tag == "{http://hiscentral.cuahsi.org/20100205/}aabstract":
                newService["aabstract"] = child.text

        services.append(newService)

    return services


# Function for parsing a raw xml file. This function is not really used as
# REST is not supported.
def parseSites(xml):
    response = urllib.request.urlopen(xml)
    data = response.read()

    parse_xml = et.fromstring(data)
    hs_sites = []
    for child in parse_xml:
        for items in child:
            get_contents = items.tag
            # Narrowing down to the DataInputs tag
            if get_contents.find("siteInfo") != -1:
                for location in items:
                    descriptor = location.tag
                    if descriptor.find("siteName") != -1:
                        site_name = location.text
                        hs_json = {}
                        hs_json["sitename"] = site_name
                        hs_json["service"] = "REST"
                        # print "Site Name: "+site_name
                    if descriptor.find("siteCode") != -1:
                        site_code = location.text
                        # print "Site Code: "+site_code
                        source = location.get("network")
                        hs_json["network"] = source
                        hs_json["sitecode"] = site_code
                    if descriptor.find("elevation") != -1:
                        elevation = location.text
                        # print "Elevation: " + elevation
                        hs_json["elevation"] = elevation
                    for geoLocation in location:
                        for coords in geoLocation:
                            latlon = coords.tag
                            if latlon.find("latitude") != -1:
                                latitude = coords.text
                                # print "Latitude: " + latitude
                                hs_json["latitude"] = latitude
                            if latlon.find("longitude") != -1:
                                longitude = coords.text
                                # print "Longitude: " + longitude
                                hs_json["longitude"] = longitude
                hs_sites.append(hs_json)

    return hs_sites


# Function for creating a list of json dictionary objects. Each json
# dictionary object has site metadata such latitude, longitude, sitecode,
# and network.


def parseOWS(wml):
    hs_sites = []
    for site in wml.sites:
        hs_json = {}
        site_name = site.name
        # Encoding is important to ensure that you can accomodate sitenames
        # with special characters.
        site_name = site_name.encode("utf-8")
        site_code = site.codes[0]
        latitude = site.latitudes
        longitude = site.longitudes
        network = site.site_info.elevation

        hs_json["sitename"] = site_name

        hs_json["latitude"] = latitude
        hs_json["longitude"] = longitude
        hs_json["sitecode"] = site_code
        hs_json["network"] = network
        hs_json["service"] = "SOAP"
        hs_sites.append(hs_json)

    return hs_sites


def recursive_asdict(d):
    """Convert Suds object into serializable format."""
    out = {}
    for k, v in asdict(d).items():
        if hasattr(v, "__keylist__"):
            out[k] = recursive_asdict(v)
        elif isinstance(v, list):
            out[k] = []
            for item in v:
                if hasattr(item, "__keylist__"):
                    out[k].append(recursive_asdict(item))
                else:
                    out[k].append(item)
        else:
            out[k] = v
    return out


def suds_to_json(data):
    # Converting suds object to json
    return json.dumps(recursive_asdict(data))


# Function for parsing the sites within a given bounding box


def parseWML(bbox):
    hs_sites = []
    bbox_json = recursive_asdict(bbox)  # Convert bounding box to json

    # If there are multiple sites, create a list of of dictionaries with
    # metadata
    if type(bbox_json["site"]) is list:
        for site in bbox_json["site"]:
            hs_json = {}
            site_name = site["siteInfo"]["siteName"]
            # site_name = site_name.encode("utf-8")
            latitude = site["siteInfo"]["geoLocation"]["geogLocation"]["latitude"]
            longitude = site["siteInfo"]["geoLocation"]["geogLocation"]["longitude"]
            network = site["siteInfo"]["siteCode"][0]["_network"]
            sitecode = site["siteInfo"]["siteCode"][0]["value"]

            hs_json["sitename"] = site_name
            hs_json["latitude"] = latitude
            hs_json["longitude"] = longitude
            hs_json["sitecode"] = sitecode
            hs_json["network"] = network
            hs_json["service"] = "SOAP"
            hs_sites.append(hs_json)
    else:  # If there is just one site within the bounding box, add that site as dictionary object
        hs_json = {}
        site_name = bbox_json["site"]["siteInfo"]["siteName"]
        # site_name = site_name.encode("utf-8")
        latitude = bbox_json["site"]["siteInfo"]["geoLocation"]["geogLocation"][
            "latitude"
        ]
        longitude = bbox_json["site"]["siteInfo"]["geoLocation"]["geogLocation"][
            "longitude"
        ]
        network = bbox_json["site"]["siteInfo"]["siteCode"][0]["_network"]
        sitecode = bbox_json["site"]["siteInfo"]["siteCode"][0]["value"]

        hs_json["sitename"] = site_name
        hs_json["latitude"] = latitude
        hs_json["longitude"] = longitude
        hs_json["sitecode"] = sitecode
        hs_json["network"] = network
        hs_json["service"] = "SOAP"
        hs_sites.append(hs_json)

    return hs_sites


# Function for parsing all the sites within a HydroServer


def parseJSON(json):
    hs_sites = []
    sites_object = None
    # This is to handle the WMO la Plata endpoints ##
    try:
        if "sitesResponse" in json:
            sites_object = json["sitesResponse"]["site"]

            # If statement is executed for multiple sites within the HydroServer, if there is a single site then it goes to the else statement
            # Parse through the HydroServer and each site with its metadata as a
            # dictionary object to the hs_sites list
            if type(sites_object) is list:
                for site in sites_object:
                    hs_json = {}
                    latitude = site["siteInfo"]["geoLocation"]["geogLocation"][
                        "latitude"
                    ]
                    longitude = site["siteInfo"]["geoLocation"]["geogLocation"][
                        "longitude"
                    ]
                    site_name = site["siteInfo"]["siteName"]
                    site_name = site_name.encode("utf-8")
                    network = site["siteInfo"]["siteCode"]["@network"]
                    sitecode = site["siteInfo"]["siteCode"]["#text"]
                    siteID = site["siteInfo"]["siteCode"]["@siteID"]
                    hs_json["country"] = "No Data was Provided"
                    try:
                        sitePorperty_Info = site["siteInfo"]["siteProperty"]

                        if type(sitePorperty_Info) is list:
                            for props in sitePorperty_Info:
                                if props["@name"] == "Country":
                                    hs_json["country"] = props["#text"]
                        else:
                            if str(sitePorperty_Info["@name"]) == "Country":
                                hs_json["country"] = str(sitePorperty_Info["#text"])
                                # print(return_obj['country'])
                    except Exception as e:
                        print(e)
                        hs_json["country"] = "No Data was Provided"
                    hs_json["sitename"] = site_name.decode("UTF-8")
                    hs_json["latitude"] = latitude
                    hs_json["longitude"] = longitude
                    hs_json["sitecode"] = sitecode
                    hs_json["network"] = network
                    hs_json["fullSiteCode"] = network + ":" + sitecode
                    hs_json["siteID"] = siteID
                    hs_json["service"] = "SOAP"
                    hs_sites.append(hs_json)
            else:
                hs_json = {}
                latitude = sites_object["siteInfo"]["geoLocation"]["geogLocation"][
                    "latitude"
                ]
                longitude = sites_object["siteInfo"]["geoLocation"]["geogLocation"][
                    "longitude"
                ]
                site_name = sites_object["siteInfo"]["siteName"]
                site_name = site_name.encode("utf-8")
                network = sites_object["siteInfo"]["siteCode"]["@network"]
                sitecode = sites_object["siteInfo"]["siteCode"]["#text"]
                siteID = sites_object["siteInfo"]["siteCode"]["@siteID"]

                hs_json["country"] = "No Data was Provided"
                try:
                    sitePorperty_Info = sites_object["siteInfo"]["siteProperty"]

                    if type(sitePorperty_Info) is list:
                        for props in sitePorperty_Info:
                            if props["@name"] == "Country":
                                hs_json["country"] = props["#text"]
                    else:
                        if str(sitePorperty_Info["@name"]) == "Country":
                            hs_json["country"] = str(sitePorperty_Info["#text"])
                            # print(return_obj['country'])
                except Exception as e:
                    print(e)
                    hs_json["country"] = "No Data was Provided"
                hs_json["sitename"] = site_name.decode("UTF-8")
                hs_json["latitude"] = latitude
                hs_json["longitude"] = longitude
                hs_json["sitecode"] = sitecode
                hs_json["network"] = network
                hs_json["fullSiteCode"] = network + ":" + sitecode
                hs_json["siteID"] = siteID
                hs_json["service"] = "SOAP"
                hs_sites.append(hs_json)
    except ValueError:
        print(
            "There is a discrepancy in the structure of the response. It is possible that the respond object does not contain the sitesResponse attribute"
        )

    return hs_sites


# Function for adding the sites to a geoserver as a layer.


def genShapeFile(input, title, hs_url):
    try:
        file_name = "hs_sites"
        temp_dir = tempfile.mkdtemp()  # Create a temp dir
        file_location = temp_dir + "/" + file_name
        w = sf.Writer(sf.POINT)  # Writing a new shapefile
        # Define the shapefile fields
        w.field("sitename")
        w.field("sitecode")
        w.field("network")
        w.field("service")
        w.field("url", "C", 200)
        # w.field('elevation')

        # For each site within the sites object, retrieve their location and
        # add them to the shapefile with the respective metadata.

        for item in input:
            w.point(float(item["longitude"]), float(item["latitude"]))
            site_name = item["sitename"]
            site_name.decode("utf-8")
            w.record(
                item["sitename"],
                item["sitecode"],
                item["network"],
                item["service"],
                hs_url,
                "Point",
            )

        w.save(file_location)  # Save the shapefile
        prj = open("%s.prj" % file_location, "w")  # Creating a projection file
        # Projection of the file is EPSG 4326
        epsg = 'GEOGCS["WGS84",DATUM["WGS_1984",SPHEROID["WGS84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'
        prj.write(epsg)
        prj.close()

        # Listing all the files within the temp dir
        file_list = os.listdir(temp_dir)
        zip_file_full_path = temp_dir + "/" + "shapefile.zip"

        # Zipping all the files in the temp directory
        with zipfile.ZipFile(zip_file_full_path, "a") as myzip:
            for fn in file_list:
                shapefile_fp = temp_dir + "/" + fn  # tif full path
                new_file_name = title + os.path.splitext(fn)[1]
                myzip.write(shapefile_fp, arcname=new_file_name)

        # Connecting to geoserver
        spatial_dataset_engine = app.get_spatial_dataset_service(
            "primary_geoserver", as_engine=True
        )
        layer_metadata = {}

        # Connect to a workspace called catalog. If there is no workspace,
        # create one.
        ws_name = "catalog"

        # Check if Workspace Exists:

        result = spatial_dataset_engine.get_workspace(ws_name)

        if result["success"]:
            print("Workspace " + ws_name + " Exists")
        else:
            print("Creating workspace: " + ws_name)
            result = spatial_dataset_engine.create_workspace(
                workspace_id=ws_name, uri="www.servir.org", debug=False
            )
            if result["success"]:
                print("Created workspace " + ws_name + " successfully")
            else:
                print("Creating workspace " + ws_name + " failed")

        store_id = ws_name + ":" + title  # Creating the geoserver storeid

        result = None

        result = spatial_dataset_engine.create_shapefile_resource(
            store_id=store_id,
            shapefile_zip=zip_file_full_path,
            overwrite=True,
            debug=False,
        )  # Adding the zipshapefile to geoserver as a layer

        if result["success"]:
            print("Created store " + title + " successfully")
        else:
            print("Creating store " + title + " failed")

        # Returning the layer name and the extents for that layer. This data
        # will be used to add the geoserver layer to the openlayers3 map.
        layer_metadata["layer"] = store_id

        layer_metadata["extents"] = {
            "minx": result["result"]["latlon_bbox"][0],
            "miny": result["result"]["latlon_bbox"][2],
            "maxx": result["result"]["latlon_bbox"][1],
            "maxy": result["result"]["latlon_bbox"][3],
            "crs": result["result"]["latlon_bbox"][4],
        }

        return layer_metadata

    except Exception:
        print("Unexpected error:", sys.exc_info())
        return False
    # finally:
    # # Delete the temp dir after uploading the shapefile
    # if temp_dir is not None:
    #     if os.path.exists(temp_dir):
    #         shutil.rmtree(temp_dir)


# Function for parsing the GLDAS data


def parse_gldas_data(file):
    data = []
    data_flag_text = "Date&Time"
    found_data = False
    file = file.split("\n")
    s_lines = []

    # Parsing the text file.
    for line in file:
        if data_flag_text in line:
            found_data = True  # skip the line that says Date&Time
            continue
        if found_data:
            s_lines.append(line)  # Append all the lines to the empty list

    try:
        if len(s_lines) < 1:
            raise Exception
    except Exception as e:
        raise e

    # Parsing the lines with data
    for row in s_lines:
        row_ls = row.strip().replace(" ", "-", 1).split()

        try:
            if len(row_ls) == 2:
                date = row_ls[0]
                val = row_ls[1]
                date_val_pair = [datetime.strptime(date, "%Y-%m-%d-%HZ"), float(val)]
                # Adding the date and value to the data list
                data.append(date_val_pair)
        except Exception as e:
            print(str(e), "Exception")
            continue

    return data


# Generate gldas options from the gldas_config.txt file


def gen_gldas_dropdown():
    gldas_options = []
    gldas_config_file = inspect.getfile(inspect.currentframe()).replace(
        "utilities.py", "public/data/gldas_config.txt"
    )

    with open(gldas_config_file, mode="r") as f:
        f.readline()
        for line in f:
            linevals = line.split("|")
            var_name = linevals[1]
            var_units = linevals[2]
            display_str = var_name + " " + var_units
            value_str = str(line)
            gldas_options.append([display_str, value_str])

    return gldas_options


# Reverse Geocoding the lat and lon to get the name of the location


def get_loc_name(lat, lon):

    geo_coords = str(lat) + "," + str(lon)
    geo_api = "http://maps.googleapis.com/maps/api/geocode/json?latlng={0}&sensor=true".format(
        geo_coords
    )
    open_geo = urllib.request.urlopen(geo_api)
    open_geo = open_geo.read()
    location_json = json.loads(open_geo, "utf-8")
    # Formatted address as returned by the google api
    name = location_json["results"][0]["formatted_address"]
    # Be sure to encode it to take special characters into consideration
    name = name.encode("utf-8")
    return name


def check_digit(num):
    num_str = str(num)
    if len(num_str) < 2:
        num_str = "0" + num_str
    return num_str


# Function for retrieving the values from the Climate Serv API


def process_job_id(url, operation_type_var):

    open_data_url = urllib.request.urlopen(url)
    read_data_response = open_data_url.read()
    # Converting the response to json
    data_json = json.loads(read_data_response)
    graph_values = []
    for i in data_json["data"]:

        time = int(i["epochTime"])

        if operation_type_var == "max":
            value = i["value"]["max"]
        elif operation_type_var == "min":
            value = i["value"]["min"]
        elif operation_type_var == "avg":
            value = i["value"]["avg"]

        # Adding the time and its corresponding value to a list. This list will
        # be used by the tethys Timeseries gizmo.
        graph_values.append([datetime.fromtimestamp(time), value])

    return graph_values


# Function for dynamically generating the date ranges for the GLDAS variables


def get_gldas_range():
    range = {}
    try:
        # Get the begin and end dates as the sort key is slightly different
        begin_url1 = "https://cmr.earthdata.nasa.gov/search/granules?short_name=GLDAS_NOAH025SUBP_3H&version=001&page_size=1&sort_key=start_date"
        open_begin_url1 = urllib.request.urlopen(begin_url1)
        read_begin_url1 = open_begin_url1.read()
        begin_url1_data = xmltodict.parse(read_begin_url1)
        begin_url2 = begin_url1_data["results"]["references"]["reference"]["location"]

        open_begin_url2 = urllib.request.urlopen(begin_url2)
        read_begin_url2 = open_begin_url2.read()
        begin_url2_data = xmltodict.parse(read_begin_url2)
        start_date = begin_url2_data["Granule"]["Temporal"]["RangeDateTime"][
            "BeginningDateTime"
        ]
        start_date = start_date.split("T")[0]
        # start_date = datetime.strptime(start_date, '%Y-%m-%d').strftime('%Y-%m-%d')
        end_url1 = "https://cmr.earthdata.nasa.gov/search/granules?short_name=GLDAS_NOAH025SUBP_3H&version=001&page_size=1&sort_key=-start_date"
        open_end_url1 = urllib.request.urlopen(end_url1)
        read_end_url1 = open_end_url1.read()
        end_url1_data = xmltodict.parse(read_end_url1)
        end_url2 = end_url1_data["results"]["references"]["reference"]["location"]

        open_end_url2 = urllib.request.urlopen(end_url2)
        read_end_url2 = open_end_url2.read()
        end_url2_data = xmltodict.parse(read_end_url2)
        end_date = end_url2_data["Granule"]["Temporal"]["RangeDateTime"][
            "BeginningDateTime"
        ]

        end_date_str = end_date.split("T")[0]
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
        first = end_date.replace(day=1)
        lastMonth = first - timedelta(days=1)
        end_date = lastMonth.strftime("%Y-%m-%d")
        range = {"start": start_date, "end": end_date, "success": "success"}
    except Exception:
        range = {"start": "2010-08-08", "end": "2016-10-10", "fail": "fail"}

    return range


# Functino for getting the Climate Serv seasonal forecast date range
def get_sf_range():
    try:
        scenario_url = (
            "http://limateserv.servirglobal.net/chirps/getClimateScenarioInfo/"
        )
        response = urllib.request.urlopen(scenario_url)
        read_response = response.read()
        data_json = json.loads(read_response)
        capability = data_json["climate_DataTypeCapabilities"][0][
            "current_Capabilities"
        ]
        capability = json.loads(capability)
        start_date = capability["startDateTime"]
        end_date = capability["endDateTime"]
        start_date = datetime.strptime(start_date, "%Y_%m_%d").strftime("%m/%d/%Y")
        end_date = datetime.strptime(end_date, "%Y_%m_%d").strftime("%m/%d/%Y")
        range = {"start": start_date, "end": end_date}
        return range
    except Exception:
        range = {"start": "00/00/0000", "end": "00/00/0000"}
        return range


# Function for getting the climate serv seasonal forecast scenario


def get_climate_scenario(ensemble, variable):

    scenario_url = "http://climateserv.servirglobal.net/chirps/getClimateScenarioInfo/"
    response = urllib.request.urlopen(scenario_url)
    read_response = response.read()
    data_json = json.loads(read_response)

    for i in data_json["climate_DatatypeMap"]:
        if i["climate_Ensemble"] == ensemble:
            for j in i["climate_DataTypes"]:
                if j["climate_Variable_Label"] == variable:
                    data_type_number = j["dataType_Number"]
                    return data_type_number


# Convert uploaded shapefile into geojson object


def convert_shp(files):
    geojson_string = ""
    try:
        temp_dir = (
            tempfile.mkdtemp()
        )  # Create temp dir and save the uploaded files there
        for f in files:
            f_name = f.name
            f_path = os.path.join(temp_dir, f_name)

            with open(f_path, "wb") as f_local:
                f_local.write(f.read())

        # Parse through the temp dir for a shapefile
        for file in os.listdir(temp_dir):
            if file.endswith(".shp"):  # Read the shapefile and tranform it
                f_path = os.path.join(temp_dir, file)
                omit = ["SHAPE_AREA", "SHAPE_LEN"]

                with fiona.open(f_path) as source:
                    project = functools.partial(
                        pyproj.transform,
                        pyproj.Proj(**source.crs),
                        pyproj.Proj(init="epsg:3857"),
                    )
                    features = []
                    for f in source:
                        shape = shapely.geometry.shape(f["geometry"])
                        projected_shape = shapely.ops.transform(project, shape)

                        # Remove the properties we don't want
                        props = f["properties"]  # props is a reference
                        for k in omit:
                            if k in props:
                                del props[k]

                        feature = geojson.Feature(
                            id=f["id"], geometry=projected_shape, properties=props
                        )  # Creating the geojson object based on the shapefile properties
                        features.append(feature)
                    fc = geojson.FeatureCollection(features)

                    geojson_string = geojson.dumps(fc)  # Return the geojson string

    except Exception:
        return "error"
    finally:
        if temp_dir is not None:
            # Remove the temp dir after uploading.
            if os.path.exists(temp_dir):
                shutil.rmtree(temp_dir)

    return geojson_string
