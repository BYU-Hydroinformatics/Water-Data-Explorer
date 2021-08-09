/*****************************************************************************
 * FILE:                sites.js
 * BEGGINING DATE:      16 Jun 2021
 * ENDING DATE:         ---------------
 * AUTHOR:              Giovanni Romero Bustamante
 * COPYRIGHT:           (c) Brigham Young University 2020
 * LICENSE:             MIT
 *
 *****************************************************************************/

/**
* getSiteInfoHelperJS function.
* Helper function to parse and store the content of two dictionaries:
* <p> object_methods = GetSiteInfoResponse ['sitesResponse']['site']['seriesCatalog']['series'] </p>
* <p> object_siteInfo = GetSiteInfoResponse ['sitesResponse']['site']['siteInfo'] </p>
* <p> Both dictionaries containing the response from the GetSiteInfo at store the following content into a new dictionary: </p>
* <ol style="list-style: none;">
* <li> siteName: Name of the site. </li>
* <li> siteCode: Code of the site. </li>
* <li> network: observation network that the site belongs to </li>
* <li> fullVariableCode: The full variable code, for example: SNOTEL:SNWD.Use this value as the variableCode parameter in GetValues(). </li>
* <li> siteID: ID of the site </li>
* <li> latitude: latitude of the site </li>
* <li> longitude: longitude of the site </li>
* <li> variableName: Name of the variable </li>
* <li> unitName: Name of the units of the values associated to the given variable and site </li>
* <li> unitAbbreviation: unit abbreviation of the units from the values associated to the given variable and site </li>
* <li> dataType: Type of data </li>
* <li> noDataValue: value associated to lack of data. </li>
* <li> isRegular: Boolean to indicate whether the observation measurements and collections regular </li>
* <li> timeSupport: Boolean to indicate whether the values support time </li>
* <li> timeUnitName: Time Units associated to the observation </li>
* <li> timeUnitAbbreviation: Time units abbreviation </li>
* <li> sampleMedium: the sample medium, for example water, atmosphere, soil. </li>
* <li> speciation: The chemical sample speciation (as nitrogen, as phosphorus..) </li>
* <li> beginningDateTimeUTC: The UTC date and time of the first available </li>
* <li> EndDateTimeUTC: The UTC date and time of the last available </li>
* <li> beginningDateTime: The local date and time of the first available </li>
* <li> EndDateTime: The local date and time of the last available </li>
* <li> censorCode: The code for censored observations.  Possible values are nc (not censored), gt(greater than), lt (less than), nd (non-detect), pnq (present but not quantified) </li>
* <li> methodCode: The code of the method or instrument used for the observation </li>
* <li> methodID: The ID of the sensor or measurement method </li>
* <li> qualityControlLevelCode: The code of the quality control level.  Possible values are -9999(Unknown), 0 (Raw data), 1 (Quality controlled data), 2 (Derived products), 3 (Interpretedproducts), 4 (Knowledge products) </li>
* <li> qualityControlLevelID: The ID of the quality control level. Usually 0 means raw data and 1 means quality controlled data. </li>
* <li> sourceCode: The code of the data source. </li>
* <li> timeOffSet: The difference between local time and UTC time in hours. </li>
* </ol>
* @param {object} object_siteInfo - Contains metadata associated to the site.
* @param {object} object_methods - Contains a list of <series>, which are unique combinations of site, variable and time intervals that specify a sequence of observations.
* @return {object} return_obj: python dictionary containing data from the GetSiteInfo response.
*
* */
getSiteInfoHelperJS = function(object_siteInfo,object_methods){

  let return_obj = {}

  try{
    sitePorperty_Info = object_siteInfo['siteProperty']
    return_obj['country'] = "No Data was Provided"
    if (Array.isArray(sitePorperty_Info)){
      sitePorperty_Info.forEach(function(props){
        if (props['attr']['@name'] == 'Country'){
          return_obj['country'] = props['#text'];
        }
      })
    }

    else{
      if (sitePorperty_Info['attr']['@name'] == 'Country'){
        return_obj['country'] = sitePorperty_Info['#text'];
      }
    }

  }
  catch(e){
    // console.log(e);
    return_obj['country'] = "No Data was Provided";
  }


  try{
    siteName = object_siteInfo['siteName']
    return_obj['siteName'] = siteName
  }

  catch(e){
    // console.log(e);
    return_obj['siteName'] = "No Data was Provided";
  }

  try{
    return_obj['latitude'] = object_siteInfo['geoLocation']['geogLocation']['latitude'];
  }
  catch(e){
    // console.log(e);
    return_obj['latitude'] = "No Data was Provided";
  }

  try{
    return_obj['longitude'] = object_siteInfo['geoLocation']['geogLocation']['longitude'];

  }
  catch(e){
    // console.log(e);
    return_obj['longitude'] = "No Data was Provided";
  }

  try{
    return_obj['geolocation'] = object_siteInfo['geoLocation']['geogLocation'];

  }
  catch(e){
    // console.log(e);
    return_obj['geolocation'] = "No Data was Provided";
  }

  try{
      return_obj['network'] = object_siteInfo['siteCode']['attr']['@network'];

  }
  catch(e){
    // console.log(e);
     return_obj['network'] = "No Data was Provided";
  }
  try{
    return_obj['siteCode'] = object_siteInfo['siteCode']['#text'];
  }
  catch(e){
    // console.log(e);
    return_obj['siteCode'] = "No Data was Provided";
  }

  try{
    return_obj['fullSiteCode'] = return_obj['network'] + ":" + return_obj['siteCode'];
  }
  catch(e){
    return_obj['fullSiteCode'] = "No Data was Provided";
  }

  try{
    return_obj['variableName'] = object_methods['variable']['variableName'];
  }
  catch(e){
    return_obj['variableName'] = "No Data was Provided";

  }
  try{
    return_obj['variableCode'] = object_methods['variable']['variableCode']['#text'];
  }
  catch(e){
    return_obj['variableCode'] = "No Data was Provided";
  }
  try{
    return_obj['fullVariableCode'] = return_obj['network'] + ":" + return_obj['variableCode'];
  }
  catch(e){
    return_obj['fullVariableCode'] = "No Data was Provided";
  }
  try{
    return_obj['variableCount'] = object_methods['valueCount'];
  }
  catch(e){
    return_obj['variableCount'] = "No Data was Provided";
  }
  try{
    return_obj['dataType'] = object_methods['variable']['dataType'];
  }
  catch(e){
    return_obj['dataType'] = "No Data was Provided";
  }
  try{
    return_obj['valueType'] = object_methods['variable']['valueType'];
  }
  catch(e){
    return_obj['valueType'] = "No Data was Provided";
  }

  try{
    return_obj['generalCategory'] = object_methods['variable']['generalCategory'];
  }
  catch(e){
    return_obj['generalCategory'] = "No Data was Provided";
  }

  try{
    return_obj['noDataValue'] = object_methods['variable']['noDataValue'];
  }
  catch(e){
    return_obj['noDataValue'] = "No Data was Provided";
  }

  try{
    return_obj['sampleMedium'] = object_methods['variable']['sampleMedium'];
  }
  catch(e){
    return_obj['sampleMedium'] = "No Data was Provided";
  }

  try{
    return_obj['speciation'] = object_methods['variable']['speciation'];
  }
  catch(e){
    return_obj['speciation'] = "No Data was Provided";
  }
  try{
    return_obj['timeUnitAbbreviation'] = object_methods['variable']['timeScale']['unit']['unitAbbreviation'];
  }
  catch(e){
    return_obj['timeUnitAbbreviation'] = "No Data was Provided";
  }

  try{
    return_obj['timeUnitName'] = object_methods['variable']['timeScale']['unit']['unitName'];

  }
  catch(e){
    return_obj['timeUnitName'] = "No Data was Provided";

  }

  try{
    return_obj['timeUnitType'] = object_methods['variable']['timeScale']['unit']['unitType'];
  }
  catch(e){
    return_obj['timeUnitType'] = "No Data was Provided";

  }

  try{
    return_obj['timeSupport'] = object_methods['variable']['timeScale']['timeSupport'];
  }
  catch(e){
    return_obj['timeSupport'] = "No Data was Provided";
  }

  try{
    return_obj['isRegular'] = object_methods['variable']['timeScale']['attr']['@isRegular'];
  }
  catch(e){
    return_obj['isRegular'] = "No Data was Provided";
  }

  try{
    return_obj['unitAbbreviation'] = object_methods['variable']['unit']['unitAbbreviation'];
  }
  catch(e){
    return_obj['unitAbbreviation'] = "No Data was Provided";
  }

  try{
    return_obj['unitName'] = object_methods['variable']['unit']['unitName'];
  }
  catch(e){
    return_obj['unitName'] = "No Data was Provided";
  }

  try{
    return_obj['unitType'] = object_methods['variable']['unit']['unitType'];
  }
  catch(e){
    return_obj['unitType'] = "No Data was Provided"
  }

  if ('method' in object_methods){
    return_obj['methodID'] = object_methods['method']['@methodID']
    return_obj['methodDescription'] = object_methods['method']['methodDescription']
  }

  else{
    return_obj['methodID'] = "No Method Id was provided";
    return_obj['methodDescription'] = "No Method Description was provided";
  }

  try{
    return_obj['qualityControlLevelID'] = object_methods['qualityControlLevel']['@qualityControlLevelID'];
  }
  catch(e){
    return_obj['qualityControlLevelID'] = "No Data was Provided";
  }

  try{
    return_obj['definition'] = object_methods['qualityControlLevel']['definition'];
  }
  catch(e){
    return_obj['definition'] = "No Data was Provided";
  }

  try{
    return_obj['qualityControlLevelCode'] = object_methods['qualityControlLevel']['qualityControlLevelCode'];
  }
  catch(e){
    return_obj['qualityControlLevelCode'] = "No Data was Provided";
  }

  try{
    return_obj['citation'] = object_methods['source']['citation'];

  }
  catch(e){
    return_obj['citation'] = "No Data was Provided";
  }

  try{
    return_obj['organization'] = object_methods['source']['organization'];
  }
  catch(e){
    return_obj['organization'] = "No Data was Provided";
  }

  try{
    return_obj['description'] = object_methods['source']['sourceDescription'];
  }
  catch(e){
    return_obj['description'] = "No Data was Provided";
  }

  try{
    return_obj['beginDateTime'] = object_methods['variableTimeInterval']['beginDateTime'];
  }
  catch(e){
    return_obj['beginDateTime'] = "No Data was Provided";
  }

  try{
    return_obj['endDateTime'] = object_methods['variableTimeInterval']['endDateTime'];
  }
  catch(e){
    return_obj['endDateTime'] = "No Data was Provided";
  }

  try{
    return_obj['beginDateTimeUTC'] = object_methods['variableTimeInterval']['beginDateTimeUTC'];
  }
  catch(e){
  }
  return_obj['beginDateTimeUTC'] = "No Data was Provided";

  try{
    return_obj['endDateTimeUTC'] = object_methods['variableTimeInterval']['endDateTimeUTC'];
  }
  catch(e){
    return_obj['endDateTimeUTC'] = "No Data was Provided";
  }
  try{
    return_obj['variableTimeInterval'] = object_methods['variableTimeInterval'];
  }
  catch(e){
    return_obj['variableTimeInterval'] = "No Data was Provided";
  }

  return return_obj


}

/**
 * getSitesInfoJS function.
 * Function to retrieve metadata for a specific site using the xml response from the GetSiteInfo function
 * @param {string} xmlData - xml string from the Getavalues response
 * @return {object} return_array: array containing data from the GetSite Method response.
 *
 * */
getSitesInfoJS = function(xmlData){
  let return_obj;
  let return_array = []
  var options = {
      attributeNamePrefix : "@",
      attrNodeName: "attr", //default is 'false'
      textNodeName : "#text",
      ignoreAttributes : false,
      ignoreNameSpace : false,
      allowBooleanAttributes : true,
      parseNodeValue : true,
      parseAttributeValue : true,
      trimValues: true,
      cdataTagName: "__cdata", //default is 'false'
      cdataPositionChar: "\\c",
      parseTrueNumberOnly: false,
      arrayMode: false, //"strict"
      attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
      tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
      stopNodes: ["parse-me-as-string"]
  };
  var result = parser.validate(xmlData);
  if (result !== true) console.log(result.err);
  var jsonObj = parser.parse(xmlData,options);
  // console.log(jsonObj);
  try{
    let firstObject = jsonObj['soap:Envelope']['soap:Body']['GetSiteInfoObjectResponse']['sitesResponse'];
    // console.log(firstObject);
    let object_methods = firstObject['site']['seriesCatalog']['series'];
    let object_siteInfo = firstObject['site']['siteInfo'];
    if (object_methods.constructor == Object) {
      return_obj = getSiteInfoHelperJS(object_siteInfo,object_methods);
      return_array.push(return_obj);
    }
    if(Array.isArray(object_methods)){
      object_methods.forEach(function(object_method){
        return_obj = getSiteInfoHelperJS(object_siteInfo,object_method);
        return_array.push(return_obj);
      })
    }
    return return_array

  }
  catch(e){
    // console.log(e);
    return_array = []
    return return_array
  }
}

/**
 * getSiteInfoObjectParsableJS function.
 * Function to parse the metadata for a specific site using the response from the getSitesInfoJS function.
 * @param {object} getSiteInfoObjectParse - array containing data from the GetSite Method response.
 * @return {object} return_obj: object that has the different metadata for the given site.
 *
 * */
getSiteInfoObjectParsableJS = function(getSiteInfoObjectParse){
  let return_obj = {}
  try{

    if (getSiteInfoObjectParse.length == 0){
      return_obj['country'] = [];
      return_obj['variables'] =[];
      return_obj['units'] = [];
      return_obj['codes'] = [];
      return_obj['organization'] = [];
      return_obj['times_series'] = [];
      return_obj['geolo'] = [];
      return_obj['timeUnitName'] = [];
      return_obj['TimeSupport'] = [];
      return_obj['dataType'] = [];
      return return_obj
    }
    df = new dfd.DataFrame(getSiteInfoObjectParse);
    // console.log(df['geolocation']);

    return_obj['country'] = df['country']['data'][0]
    return_obj['variables'] = df['variableName']['data']
    return_obj['units'] = df['unitAbbreviation']['data']
    return_obj['codes'] = df['variableCode']['data']
    return_obj['timeUnitName'] = df['timeUnitName']['data']
    return_obj['timeSupport'] = df['timeSupport']['data']
    return_obj['dataType'] = df['dataType']['data']

    let obj_var_desc = {}
    let obj_var_times_s = {}
    for (let i =0; i<df['variableName']['data'].length; ++i ){
      obj_var_desc[df['variableName']['data'][i]] = df['organization']['data'][i];
      obj_var_times_s[df['variableCode']['data'][i]]  = JSON.parse(df['variableTimeInterval']['data'][i]);
    }
    return_obj['organization'] = obj_var_desc;
    return_obj['times_series'] = obj_var_times_s;
    return_obj['geolo'] = JSON.parse(df['geolocation']['data'][0]);
    return return_obj
  }
  catch(e){
    console.log(e);
    return return_obj
  }
}

/**
 * activate_layer_values function.
 * Function to get metadata from a site after clicking on a site.
 * @return {void}
 *
 * */
activate_layer_values = function (){
  try{
    map.on('singleclick', function(evt) {
       $('#variables_graph').selectpicker('setStyle', 'btn-primary');
       evt.stopPropagation();
       $("#graphs").empty();
       let object_request={};
       // MAKE THE POINT LAYER FOR THE MAP //
       var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature2, layer) {
           if(feature2){

             if(layersDict['selectedPointModal']){
               map.removeLayer(layersDict['selectedPointModal'])
               map.updateSize()
             }

             if(layersDict['selectedPoint']){
               map.removeLayer(layersDict['selectedPoint'])
               map.updateSize()
             }

             let actual_Source = new ol.source.Vector({})
             actual_Source.addFeature(feature2);
             let vectorLayer = new ol.layer.Vector({
                 source: actual_Source,
                 style:  new ol.style.Style({
                     image: new ol.style.Circle({
                         radius: 6,
                         stroke: new ol.style.Stroke({
                             color: "black",
                             width: 4
                         }),
                         fill: new ol.style.Fill({
                             color: `#FF0000`
                         })
                     })
                 })
             })
             layersDict['selectedPoint'] = vectorLayer;

             map.addLayer(vectorLayer);
           }
           return feature2;
       });
       // IF THE FEATURE EXTITS THEN DO THE FOLLOWING//
      if (feature) {

        initialize_graphs([],[],"No Variable was Selected","","","","scatter");
        active_map_feature_graphs={
          'scatter':{},
          'bar':{},
          'pie':{},
          'whisker':{}
        }
        let feature_single = feature.values_.features[0]
        object_request['hs_url']=feature_single.values_['hs_url'];
        object_request['code']=feature_single.values_['code'];
        object_request['network']=feature_single.values_['network'];
        let url_base = feature_single.values_['hs_url'].split("?")[0];
        let url_request;
        let SITE = feature_single.values_['code'];
        // SITE = 'B6940B585CE66AD1D5E33075197668BE487A1CDB';
        let make_sure_not_mc = url_base.split("//");

        if(make_sure_not_mc[0] != document.location.protocol){
          url_base = document.location.protocol + "//" + make_sure_not_mc[1];
        }

        url_request = `${url_base}?request=GetSiteInfoObject&site=${SITE}`;
        console.log(url_request);
        $("#GeneralLoading").removeClass("hidden");
        $('#sG').bootstrapToggle('on');
        $.ajax({
          type:"GET",
          url:url_request,
          dataType: "text",
          success: function(xmlData){
            // console.log(xmlData);
            let getSiteInfoObjectParse = getSitesInfoJS(xmlData);
            // console.log(getSiteInfoObjectParse);
            let result =getSiteInfoObjectParsableJS(getSiteInfoObjectParse);
            // console.log(result);
            try{
              // MAKE THE METADATA OF THE SITE TO LOAD IN THE FIRST SLIDE //
              let description_site = document.getElementById('siteDes');
              if (result.hasOwnProperty('codes') && result['codes'].length > 0){
                let geolocations = result['geolo'];
                let country_name = result['country'];
                if(country_name == null){
                  country_name = "No Data Provided"
                }
                let lats = parseFloat(geolocations['latitude']);
                if(lats == null){
                  lats = "No Data Provided"
                }
                let lons = parseFloat(geolocations['longitude']);
                if(lons == null){
                  lons = "No Data Provided"
                }
                let new_lat = "No Data Provided"
                let new_lon = "No Data Provided"
                if(lats != null && lons != null ){
                  new_lat = toDegreesMinutesAndSeconds(lats);
                  new_lon = toDegreesMinutesAndSeconds(lons);
                }


                let organization_name = result['organization'][Object.keys(result['organization'])[0]];
                if(organization_name == null){
                  organization_name = "No Data Provided";
                }

                description_site.innerHTML =
                  ` <p> <span>Station/Platform Name: </span> ${feature_single.values_['name']}<p>
                    <p> <span> Territory of origin of data:</span> ${country_name}<p>
                    <p> <span> Supervising Organization:</span> ${organization_name} <p>
                    <p> <span> Geospatial Location:</span> lat: ${new_lat} lon: ${new_lon} <p>`

                // MAKE THE TABLE METADATA OF THE SITE TO LOAD IN THE FIRST SLIDE //

                let table_begin =
                  `<br>
                  <p><i>Table of Variables</i></p>
                  <table id="siteVariableTable" class="table table-striped table-hover table-condensed">
                      <tr class="danger">
                        <th>Observed Variables</th>
                        <th>Unit</th>
                        <th>Interpolation Type</th>
                      </tr>`;

                //SORT THERESULT FROM THE AJAX RESPONSE FOR SOME ATTRIBUTES //

                //1) combine the arrays:
                 var list_e = [];
                 for (var j = 0; j <result['variables'].length; j++)
                     list_e.push({'variables_name': result['variables'][j], 'units': result['units'][j],'interpolation': result['dataType'][j] ,'timeSupport':result['timeSupport'][j],'timeUnits':result['timeUnitName'][j],'codes':result['codes'][j]});

                 //2) sort:
                 list_e.sort(function(a, b) {
                     return ((a.variables_name < b.variables_name) ? -1 : ((a.variables_name == b.variables_name) ? 0 : 1));

                 });
                 //3) separate them back out:
                 let parsed_table = {
                   variables:[],
                   units:[],
                   dataType:[],
                   timeUnitName:[],
                   timeSupport:[],
                   codes:[]
                 };

                 for (var k = 0; k < list_e.length; k++) {
                     parsed_table['variables'].push(list_e[k].variables_name);
                     parsed_table['units'].push(list_e[k].units);
                     parsed_table['dataType'].push(list_e[k].interpolation);
                     parsed_table['timeUnitName'].push(list_e[k].timeUnits);
                     parsed_table['timeSupport'].push(list_e[k].timeSupport);
                     parsed_table['codes'].push(list_e[k].codes);
                 }
                //WRITTING TO TABLE IN THE SLIDE //

                for(let i=0; i<parsed_table['variables'].length ; ++i){
                  let variable_new = parsed_table['variables'][i];
                  let variable_code_new = parsed_table['codes'][i];
                  if(variable_new == null){
                    variable_new = "No Data Provided"
                  }
                  let variable_unit = parsed_table['units'][i];
                  if(variable_unit == null){
                    variable_unit = "No Data Provided"
                  }
                  let aggregation_dur = `${parsed_table['timeSupport'][i]} ${parsed_table['timeUnitName'][i]}`;
                  if(aggregation_dur == null){
                    aggregation_dur = "No Data Provided"
                  }
                  let time_serie_range = result['times_series'][variable_code_new];

                  let begin_date = time_serie_range['beginDateTime'].split('T')[0];
                  if(begin_date == null){
                    begin_date = "No Data Provided"
                  }
                  let end_date = time_serie_range['endDateTime'].split('T')[0];
                  if(end_date == null){
                    end_date = "No Data Provided"
                  }
                  let interpolation_type = result['dataType'][i];
                  if(interpolation_type == null){
                    interpolation_type = "No Data Provided"
                  }
                  let newRow =
                  `
                  <tr>
                    <th>${variable_new}</th>
                    <th>${variable_unit}</th>
                    <th>${interpolation_type}</th>
                  </tr>
                  `
                  table_begin = table_begin + newRow;
                }

                table_begin = table_begin + `</table>`;
                $("#table_div").html(table_begin);

                //  MAKE THE SECOND SLIDE TO MAKE THE DROPDOWN MENU AND ALSO DATES//
                // 1 empty the dropdown for variables//
                evt.stopPropagation();
                $("#variables_graph").empty();
                $("#variables_graph").selectpicker("refresh");

                // 2 make the dropdown with the variables //
                let variables = result['variables'];
                let code_variable =result['codes'];
                let variable_select = $("#variables_graph");
                let i = 1;
                let array_variables=[]
                let option_variables;
                let option_beginning= `<option value= 0 selected= "selected" > Select Variable </option>`;
                variable_select.append(option_beginning)

                variables.forEach(function(variable){
                  let option;
                  let option_begin;
                    array_variables.push(variable);
                    if(i === 1){

                      option_begin = `<option value=${i}>${variable} </option>`;
                      variable_select.append(option_begin)

                    }
                    else{
                      option = `<option value=${i} >${variable} </option>`;

                    }
                    variable_select.append(option)

                    variable_select.selectpicker("refresh");
                    i = i+1;
                });

                //3. Bind the events to the dropdown //
                $("#variables_graph").unbind('change');

                $('#variables_graph').bind('change', function(e){
                  try{
                    variable_select.selectpicker("refresh");
                    var selectedItem = $('#variables_graph').val() -1;
                    var selectedItemText = $('#variables_graph option:selected').text();
                    $("#GeneralLoading").removeClass("hidden");
                    let object_request2 = {};
                    object_request2['hs_name']=feature_single.values_['hs_name'];
                    object_request2['site_name']=feature_single.values_['name'];
                    object_request2['hs_url']=feature_single.values_['hs_url'];
                    object_request2['code']=feature_single.values_['code'];
                    object_request2['network']=feature_single.values_['network'];
                    object_request2['variable']=selectedItem;
                    object_request2['code_variable']= code_variable[`${selectedItem}`];
                    object_request2['times_series'] = result['times_series'];
                    time_series_cache = result['times_series'];
                    object_request2['variables_array']=result['variables'];
                    object_request_graphs = JSON.parse(JSON.stringify(object_request2));


                    let start_dateUTC = result['times_series'][Object.keys(result['times_series'])[selectedItem]]['beginDateTimeUTC']
                    let dateUTC_start = new Date(start_dateUTC)
                    let starts = start_dateUTC.split("T");
                    let starts_no_seconds = starts[1].split(":");
                    let end_dateUTC = result['times_series'][Object.keys(result['times_series'])[selectedItem]]['endDateTimeUTC']
                    let dateUTC_end = new Date(end_dateUTC)

                    let ends = end_dateUTC.split("T");

                    let ends_no_seconds = ends[1].split(":");

                    // THIS IS NECESARRY TO RESET THE DATES OTHERWISE IT IS GOING TO HAVE EMPTY SPACES..
                    $('#datetimepicker6').datepicker('setStartDate', null);
                    $('#datetimepicker6').datepicker('setEndDate', null);
                    $('#datetimepicker7').datepicker('setStartDate',null);
                    $('#datetimepicker7').datepicker('setEndDate',null);

                    //@KrunchMuffin I found a workaround this issue:
                    //Before setting the value remove the limitation (endDate)
                    // Set the value
                    //Restore the limitation (endDate)
                    //
                    // Maybe it will work for you also
                    // https://github.com/uxsolutions/bootstrap-datepicker/issues/2292#issuecomment-341496634

                    $('#datetimepicker6').datepicker('update', dateUTC_start);
                    $('#datetimepicker7').datepicker('update', dateUTC_end);
                    $('#datetimepicker6').datepicker('setStartDate', dateUTC_start);
                    $('#datetimepicker6').datepicker('setEndDate', dateUTC_end);
                    $('#datetimepicker7').datepicker('setStartDate',dateUTC_start);
                    $('#datetimepicker7').datepicker('setEndDate',dateUTC_end);
                    $("#GeneralLoading").addClass("hidden");

                  }
                  catch(e){
                    console.log(e);
                    $("#GeneralLoading").addClass("hidden");
                  }

                });

                 $("#GeneralLoading").addClass("hidden");
                 $("#siteName_title").empty();

              }
              else{
                description_site.innerHTML =
                  ` <p> <em> Station/Platform Name:</em> ${feature_single.values_['name']}<p>`

                $("#GeneralLoading").addClass("hidden");
                $.notify(
                    {
                        message: `The ${feature_single.values_['name']} site does not contain any variable`
                    },
                    {
                        type: "info",
                        allow_dismiss: true,
                        z_index: 20000,
                        delay: 5000,
                        animate: {
                          enter: 'animated fadeInRight',
                          exit: 'animated fadeOutRight'
                        },
                        onShow: function() {
                            this.css({'width':'auto','height':'auto'});
                        }
                    }
                )
              }
            }
            catch(e){
              $("#GeneralLoading").addClass("hidden");
              console.log(e);
              $.notify(
                  {
                      message: `The is an error retriving the complete data of the station/platform `
                  },
                  {
                      type: "danger",
                      allow_dismiss: true,
                      z_index: 20000,
                      delay: 5000,
                      animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                      },
                      onShow: function() {
                          this.css({'width':'auto','height':'auto'});
                      }
                  }
              )
            }



          },
          error: function(xhr, status, error){
            $("#GeneralLoading").addClass("hidden");

            $.notify(
                {
                    message: `There is an error to retrieve the values for the ${feature_single.values_['name']} site `
                },
                {
                    type: "danger",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 5000,
                    animate: {
                      enter: 'animated fadeInRight',
                      exit: 'animated fadeOutRight'
                    },
                    onShow: function() {
                        this.css({'width':'auto','height':'auto'});
                    }
                }
            )
          }

        })

      }
    });
  }
  catch(error){
    $("#GeneralLoading").addClass("hidden");
    $.notify(
        {
            message: `Unable to retrieve information of the selected site`
        },
        {
            type: "info",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
            },
            onShow: function() {
                this.css({'width':'auto','height':'auto'});
            }
        }
    )
  }

}
