/*****************************************************************************
 * FILE:                utilitiesGraphs.js
 * BEGGINING DATE:      16 Jun 2021
 * ENDING DATE:         ---------------
 * AUTHOR:              Giovanni Romero Bustamante
 * COPYRIGHT:           (c) Brigham Young University 2020
 * LICENSE:             MIT
 *
 *****************************************************************************/
/**
 * getValuesHelperJS2 function.
 * <p> Helper function to parse and store the content of the dictionary response from the GetValues at the level (['timeSeriesResponse']['timeSeries']['values']['value']) into a new dictionary. The data stored into this dictionary from the GetValues response is the following: </p>
 * <ol style="list-style: none;">
 * <li> siteName: Name of the site. </li>
 * <li> siteCode: Code of the site. </li>
 * <li> network: observation network that the site belongs to </li>
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
 * </ol>
 * @param {object} times_series - A string param
 * @param {object} return_object - JS dictionary that will store the data from teh GetValues response.
 * @return {object} return_object: JS dictionary containing data from the GetValues response.
 *
 * */
getValuesHelperJS2 = function (times_series,return_object){

  try{
      try{
        let siteName = times_series['sourceInfo']['siteName'];
        return_object['siteName'] = siteName;
      }
      catch(e){
        return_object['siteName'] = "No Data was Provided";
      }

      try{
        return_object['siteCode'] = times_series['sourceInfo']['siteCode']['#text'];

      }
      catch(e){
        return_object['siteCode'] = "No Data was Provided";
      }

      try{
        return_object['network'] = times_series['sourceInfo']['siteCode']['attr']['@network']
      }
      catch(e){
        return_object['network'] = "No Data was Provided";
      }

      try{
        return_object['siteID'] = times_series['sourceInfo']['siteCode']['attr']['@siteID'];

      }
      catch(e){
        return_object['siteID'] = "No Data was Provided";

      }
      try{
        return_object['latitude'] = times_series['sourceInfo']['geoLocation']['geogLocation']['latitude'];

      }
      catch(e){
        return_object['latitude'] = "No Data was Provided";

      }
      try{
        return_object['longitude'] = times_series['sourceInfo']['geoLocation']['geogLocation']['longitude'];

      }
      catch(e){
        return_object['longitude'] = "No Data was Provided";

      }
      try{
        return_object['variableName'] = times_series['variable']['variableName'];

      }
      catch(e){
        return_object['variableName'] =  "No Data was Provided";

      }
      try{
        return_object["unitName"] = times_series['variable']['unit']['unitName'];

      }
      catch(e){
        return_object['unitName'] = "No Data was Provided";

      }
      try{
        if (times_series['variable']['unit']['unitAbbreviation']){
          return_object["unitAbbreviation"] = times_series['variable']['unit']['unitAbbreviation'];
        }
        else{
          return_object['unitAbbreviation'] = "No Data was Provided";
        }
      }
      catch(e){
        return_object['unitAbbreviation'] = "No Data was Provided";
      }
      try{
        return_object['dataType'] = times_series['variable']['dataType'];

      }
      catch(e){
        return_object['dataType'] = "No Data was Provided";
      }
      try{
        return_object['noDataValue'] = times_series['variable']['noDataValue'];
      }
      catch(e){
        return_object['noDataValue'] = "No Data was Provided";
      }
      try{
        return_object["isRegular"] = times_series['variable']['timeScale']['attr']['@isRegular'];

      }
      catch(e){
        return_object['isRegular'] = "No Data was Provided";

      }
      try{
        return_object['timeSupport'] = times_series['variable']['timeScale']['timeSupport']

      }
      catch(e){
        return_object['timeSupport'] = "No Data was Provided"

      }
      try{
        return_object['timeUnitName'] = times_series['variable']['timeScale']['unit']['unitName'];

      }
      catch(e){
        return_object['timeUnitName'] = "No Data was Provided";

      }
      try{
        return_object['timeUnitAbbreviation'] = times_series['variable']['timeScale']['unit']['unitAbbreviation'];

      }
      catch(e){
        return_object['timeUnitAbbreviation'] = "No Data was Provided";

      }
      try{
        return_object['sampleMedium'] = times_series['variable']['sampleMedium'];

      }
      catch(e){
        return_object['sampleMedium'] = "No Data was Provided";

      }
      try{
        return_object['speciation'] = times_series['variable']['speciation'];
        if(return_object['speciation'] == undefined){
          return_object['speciation'] = "No Data was Provided";
        }

      }
      catch(e){
        return_object['speciation'] = "No Data was Provided";

      }

  }
  catch(e){
    console.log(e);
    return return_object
  }

  return return_object
}
/**
 * getValuesHelperJS function.
 * <p> Helper function to parse and store the content of the dictionary response from the GetValues at the level (['timeSeriesResponse']['timeSeries']['values']['value']) into a new dictionary. The data stored into this dictionary from the GetValues response is the following: </p>
 * <ol style="list-style: none;">
 * <li> dateTimeUTC: The UTC time of the observation. </li>
 * <li> dateTime: The local date/time of the observation. </li>
 * <li> dataValue: Data value from the observation. </li>
 * <li> censorCode: The code for censored observations.  Possible values are nc (not censored), gt(greater than), lt (less than), nd (non-detect), pnq (present but not quantified) </li>
 * <li> methodCode: The code of the method or instrument used for the observation </li>
 * <li> qualityControlLevelCode: The code of the quality control level.  Possible values are -9999(Unknown), 0 (Raw data), 1 (Quality controlled data), 2 (Derived products), 3 (Interpretedproducts), 4 (Knowledge products) </li>
 * <li> sourceCode: The code of the data source </li>
 * <li> timeOffSet: The difference between local time and UTC time in hours. </li>
 * </ol>
 * @param {object} object - GetValues response dictionary at level -> (['timeSeriesResponse']['timeSeries']['values']['value'])
 * @param {object} return_obJ - JS dictionary that will store the data from teh GetValues response.
 * @return {object} return_obj: JS dictionary containing data from the GetValues response.
 *
 * */
getValuesHelperJS = function(k,return_obj){
  // #UTC TIME
  try{
      let timeUTC = k['attr']['@dateTimeUTC'];

      return_obj['dateTimeUTC'] = timeUTC ;

  }
  catch(e){
    return_obj['dateTimeUTC'] = "No Date UTC found";
  }

  // #not UTC time
  try{
    let time = k['attr']['@dateTime']

    return_obj['dateTime'] = time;
  }
  catch(e){
    return_obj['dateTime'] = "No Date found";
  }

  // #Value
  try{
    let value = parseFloat(k['#text']);
    return_obj['dataValue'] = value;
  }
  catch(e){
    return_obj['dataValue'] = "No Data Provided";

  }

  // #@censorCode
  try{
    let censorCode = k['@censorCode'];
    if(censorCode == undefined){
      censorCode = "No Data Provided";
    }
    return_obj['censorCode'] = censorCode;

  }
  catch(e){
    return_obj['censorCode'] = "No Data Provided";
  }

  // #methodCode
  try{
    let methodCode = k['@methodCode'];
    if(methodCode == undefined){
      methodCode = "No Data Provided";
    }
    return_obj['methodCode'] = methodCode;
  }
  catch{
    return_obj['methodCode']= "No Data Provided";
  }
  // #qualityControlLevel
  try{
    let qualityControlLevelCode= k['@qualityControlLevelCode'];
    if(qualityControlLevelCode == undefined){
      qualityControlLevelCode = "No Data Provided";
    }
    return_obj['qualityControlLevelCode'] = qualityControlLevelCode;
  }

  catch(e){
    return_obj['qualityControlLevelCode'] = "No Data Provided";
  }

  // #SourceCode
  try{
    let sourceCode = k['attr']['@sourceCode'];
    return_obj['sourceCode'] = sourceCode;
  }
  catch(e){
    return_obj['sourceCode'] = "No Data Provided";

  }

  // #TimeOffSet
  try{
      let timeOffSet = k['attr']['@timeOffset']
      return_obj['timeOffSet'] = timeOffSet
  }
  catch(e){
    return_obj['timeOffset'] = "No Data Provided";
  }

  return return_obj

}
/**
 * getValuesJS function.
 *  Function to retrieve time series for a specific variable for a given site suing the xml response from the GetValues function
 * @param {string} xmlData - xml string from the Getavalues response
 * @param {string} methodCode - methodcode used in the Getvalues function
 * @param {string} qualityControlLevelCode - qualityControlLevel used in the Getvalues function
 * @return {object} return_array: array containing data from the GetValues response.
 *
 * */
getValuesJS = function(xmlData, methodCode, qualityControlLevelCode){
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
  console.log(jsonObj);
  var times_series = {};
  try{
    let values_json = jsonObj['soap:Envelope']['soap:Body'];
    if(values_json.hasOwnProperty("TimeSeriesResponse")){
      let times_series = values_json["TimeSeriesResponse"]['timeSeriesResponse']['timeSeries'];
      if (times_series['values']){
        let keys_values = Object.keys(times_series['values']);

        for(let i = 0; i < keys_values.length; ++i){
          let j = keys_values[i];
          if (j == "value"){
            if(Array.isArray(times_series['values']['value'])){
              let json_response = {};
              for (let z = 0; z < times_series['values']['value'].length; ++z ){
                let  k = times_series['values']['value'][z];
                try{
                  if (k['@methodCode'] == methodCode && methodCode){
                    json_response = getValuesHelperJS2(times_series,json_response)
                    json_response = getValuesHelperJS(k,json_response)
                    return_array.append(json_response)
                    json_response = {}
                  }

                  if (k['@qualityControlLevelCode'] == qualityControlLevelCode && qualityControlLevelCode){
                    json_response = getValuesHelperJS2(times_series,json_response)
                    json_response = getValuesHelperJS(k,json_response)
                    return_array.append(json_response)
                    json_response = {}
                  }

                  else{
                    json_response = getValuesHelperJS2(times_series,json_response)
                    json_response = getValuesHelperJS(k,json_response)
                    return_array.push(json_response)
                    json_response = {}
                  }

                }
                //The Key Error kicks in when there is only one timeseries
                catch(e){
                  console.log(e);
                  json_response = getValuesHelperJS2(times_series,json_response)
                  json_response = getValuesHelperJS(k,json_response)
                  return_array.push(json_response)
                  json_response = {}
                }

              }
            }
            //The else statement is executed is there is only one value in the timeseries
            else{
              let k = times_series['values']['value'];
              try{
                if (k['@methodCode'] == methodCode && methodCode){
                  json_response = {}
                  json_response = getValuesHelperJS2(times_series,json_response)
                  json_response = getValuesHelperJS(k,json_response)
                  return_array.push(json_response)
                }


                if(k['@qualityControlLevelCode'] == qualityControlLevelCode && qualityControlLevelCode){
                  json_response = {}
                  json_response = getValuesHelperJS2(times_series,json_response)
                  json_response = getValuesHelperJS(k,json_response)
                  return_array.push(json_response)
                }


                else{
                  json_response = getValuesHelperJS2(times_series,json_response)
                  json_response = getValuesHelperJS(k,json_response)
                  return_array.push(json_response)
                }


              }
              catch(e){
                console.log(e);
                json_response = {}
                json_response = getValuesHelperJS2(times_series,json_response)
                json_response = getValuesHelperJS(k,json_response)
                return_array.push(json_response)
              }


            }
          }

        }

      }

    }
    return return_array

  }
  catch(e){
    console.log(e);
    return_array = []
    return return_array
  }
}

/**
 * Function get_values_graph_hs:
 * plots time series of a given variable and site.
 * @param {object} values - array containing the different values and metadata from the GetValues function
 * @return {object} return_obj: object after being converted to a dataframe for the GetValues function
 *
 */
get_values_graph_hs = function(values){
  let list_catalog = {}
  let return_obj = {}
  if(values.length == 0 ){
    return_obj['graphs'] = []
    return_obj['interpolation'] = []
    return_obj['unit_name'] = []
    return_obj['unit_abbr'] = []
    return_obj['variablename'] = []
    return_obj['timeUnitName'] = []
    return return_obj
  }
  df = new dfd.DataFrame(values);
  let variable_name = df['variableName']['data'][0];
  let unit_abbr = df['unitAbbreviation']['data'][0];
  let unit_name = df['unitName']['data'][0];
  let time_unit_name = df['timeUnitName']['data'][0];
  let time_series_vals = df['dataValue']['data'];
  let time_series_timeUTC = df['dateTime']['data'];
  return_obj['graphs'] = [];
  let double_come = []
  for(let i= 0; i< time_series_timeUTC.length; i++){
    if(!double_come.includes(time_series_timeUTC[i])){
      // console.log("si hay error ");
      return_obj['graphs'].push([time_series_timeUTC[i], time_series_vals[i]]);
    }
    double_come.push(time_series_timeUTC[i])
  }

  return_obj['unit_name'] = unit_name
  return_obj['unit_abbr'] = unit_abbr
  return_obj['variablename'] = variable_name
  return_obj['timeUnitName'] = time_unit_name
  return return_obj
};

/**
 * Function select_variable_change:
 * plots time series of a given variable and site.
 * @return {void} A good string
 *
 */
select_variable_change = function(){
  try{
    // ARRAY CREATION FOR END AND START TIME //
    let arrayTime = [];
    let start_date_object =  $('#datetimepicker6').datepicker('getDates')[0];
    let start_date_string = start_date_object.toISOString().split("T")[0];

    let end_date_object = $('#datetimepicker7').datepicker('getDates')[0];
    let end_date_string = end_date_object.toISOString().split("T")[0];

    let chart_type= $("#type_graph_select2").val();
    let selectedItem = $('#variables_graph').val();
    let selectedItemText = $('#variables_graph option:selected').text();

    arrayTime.push(start_date_string);
    arrayTime.push(end_date_string);

    // REQUEST OBJECT CREATION FOR THE FUNCTION //

    let object_request_variable={};
    object_request_variable['timeFrame'] = arrayTime;
    object_request_variable['code_variable']= object_request_graphs['code_variable'];
    object_request_variable['hs_url'] =  object_request_graphs['hs_url'];
    object_request_variable['code'] =  object_request_graphs['code'];
    object_request_variable['network'] =  object_request_graphs['network'];

    // CHECK TO NOT SELECT THE FIRST DROPDOWN OPTION "SELECT VARIABLE"//
      if(selectedItem !== "0"){

        $("#graphAddLoading").css({left:'0',bottom:"0",right:"0",top:"0", margin:"auto", position:'fixed',"z-index": 9999});
        $("#graphAddLoading").removeClass("hidden");


        let url_base = object_request_variable['hs_url'].split("?")[0];

        let make_sure_not_mc = url_base.split("//");

        if(make_sure_not_mc[0] != document.location.protocol){
          url_base = document.location.protocol + "//" + make_sure_not_mc[1];
        }


        let SITE_S = object_request_variable['code'];
        let VARIABLE_S = object_request_variable['code_variable'];
        let BEGINDATE_S = start_date_string.replace(" ","T");
        let ENDDATE_S = end_date_string.replace(" ","T");
        let url_final = `${url_base}?request=GetValuesObject&site=${SITE_S}&variable=${VARIABLE_S}&beginDate=${BEGINDATE_S}&endDate=${ENDDATE_S}&format=WML1`;

        console.log(url_final);
          $.ajax({
            type:"GET",
            url:url_final,
            dataType: "text",
            success: function(xmlData){
              try{
                let parseValuesData = getValuesJS(xmlData,null,null);
                let result1 = {};
                result1 = get_values_graph_hs(parseValuesData);

                console.log(result1);
                if(result1['graphs'].length > 0){
                  //GRAPHS VALUES//
                let time_series_array = result1['graphs'];

                // MAKE THE ARRAY FOR X VALUES
                let x_array = [];
                time_series_array.forEach(function(x){
                    x_array.push(x[0]);
                  })

                // MAKE THE ARRAY FOR Y VALUES
                let y_array=[]
                time_series_array.forEach(function(y){
                    if(y[1]===-9999){
                      y_array.push(null)
                    }
                    else{
                      y_array.push(y[1]);
                    }

                  })

                  // NAME TITLE //
                   let title_graph = "";
                   if (result1['variablename'] != "No Data was Provided"){
                     title_graph = `${result1['variablename']}`;
                     title_graph = title_graph.replace(',', ' ');
                   }
                   // UNITS X AXIS //
                   // let units_x = `${result1['variablename']} (${result1['unit_name']})` ;
                   let units_x = "";
                   if (result1['unit_abbr'] == "No Data was Provided" && result1['unit_name'] == "No Data was Provided" ){
                     units_x = "";
                   }
                   if(result1['unit_name'] !="No Data was Provided" && result1['unit_abbr'] == "No Data was Provided"){
                     units_x = `${result1['unit_name']}`;
                   }
                   if(result1['unit_abbr'] !="No Data was Provided" && result1['unit_name'] == "No Data was Provided"){
                     units_x = `${result1['unit_abbr']}`;
                   }
                   if(result1['unit_abbr'] != "No Data was Provided" && result1['unit_name'] != "No Data was Provided"){
                     units_x = `${result1['unit_abbr']}`;
                   }

                   // UNITS Y AXIS //
                   let units_y = `${result1['timeUnitName']}`;
                   if (result1['timeUnitName'] == "No Data was Provided"){
                     units_y = "Time";
                   }

                   // VARIABLE NAME //
                   let variable_name_legend = `${result1['variablename']}`;

                   // TYPE CHART //
                   let type= "scatter";

                   // MAKING THE REQUEST OBJECT FOR DOWNLOAD CALLED "active_map_feature_graphs" //
                   active_map_feature_graphs['scatter']['x_array'] = x_array;
                   active_map_feature_graphs['scatter']['y_array'] = y_array;
                   active_map_feature_graphs['scatter']['title_graph'] = title_graph;
                   active_map_feature_graphs['scatter']['units_x'] = units_x;
                   active_map_feature_graphs['scatter']['units_y'] = units_y;
                   active_map_feature_graphs['scatter']['variable_name_legend'] = variable_name_legend;
                   active_map_feature_graphs['scatter']['type'] = type;

                   // defining the Whiskers and plot //
                   active_map_feature_graphs['whisker']['y_array'] = y_array;
                   active_map_feature_graphs['whisker']['title_graph'] = title_graph;
                   active_map_feature_graphs['whisker']['type'] = "whisker";

                  if(chart_type ==="Scatter"){
                    initialize_graphs(x_array,y_array,title_graph,units_y, units_x,variable_name_legend,type);

                    $("#download_dropdown").unbind('change');
                    $("#download_dropdown").unbind('change');
                    let funcDown = function(){
                      try{
                        let selectedDownloadType = $('#download_dropdown').val();
                        let selectedDownloadTypeText = $('#download_dropdown option:selected').text();
                        // IF TO AVOID 'DONWLOAD' VALUE IN THE DROPDOWN//
                        if(selectedDownloadType != "Download"){
                          // IF TO AVOID 'CSV' VALUE IN THE DROPDOWN//
                          if(selectedDownloadType == "CSV" ){
                            var csvData = [];
                            var header = [units_y,`${title_graph}(${units_x})`] //main header.
                            csvData.push(header);
                            for (var i = 0; i < x_array.length; i++){ //data
                              var line = [x_array[i],y_array[i]];
                              csvData.push(line);
                            }
                            // var csvFile = csvData.map(e=>e.map(a=>'"'+((a||"").toString().replace(/"/gi,'""'))+'"').join(",")).join("\r\n"); //quote all fields, escape quotes by doubling them.
                            var csvFile = csvData.map(e => e.join(",")).join("\n"); //quote all fields, escape quotes by doubling them.
                            var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
                            var link = document.createElement("a");
                            var url = URL.createObjectURL(blob);
                            link.setAttribute("href", url);
                            link.setAttribute("download", `${object_request_variable['code_variable']}_${object_request_graphs['variable']}` + ".csv");
                            link.style.visibility = 'hidden';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            $.notify(
                                {
                                    message: `Download completed for the ${object_request_graphs['variable']} variable in CSV format`
                                },
                                {
                                    type: "sucess",
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
                          // IF TO AVOID 'WaterML1.0' VALUE IN THE DROPDOWN//
                          else if(selectedDownloadType == "WaterML1.0" ){
                            $("#graphAddLoading").removeClass("hidden");
                            // let url_base = object_request_variable['hs_url'].split("?")[0];
                            let SITE = object_request_variable['code'];
                            let VARIABLE = object_request_variable['code_variable'];
                            let BEGINDATE = x_array[0].replace(" ","T");
                            let ENDDATE = x_array[x_array.length -1].replace(" ","T");
                            let url_download = `${url_base}?request=GetValuesObject&site=${SITE}&variable=${VARIABLE}&beginDate=${BEGINDATE}&endDate=${ENDDATE}&format=WML1`;
                            //console.log(url_download)
                            fetch(url_download).then(res => res.blob()) // Gets the response and returns it as a blob
                              .then(blob => {
                                var pom = document.createElement('a');
                                var filename = `${object_request_variable['code_variable']}_${object_request_graphs['variable']}.xml`;
                                var pom = document.createElement('a');
                                // var bb = new Blob([xmltext], {type: 'application/octet-stream'});
                                // pom.setAttribute('href', window.URL.createObjectURL(bb));
                                pom.setAttribute('href', window.URL.createObjectURL(blob));
                                pom.setAttribute('download', filename);

                                pom.dataset.downloadurl = ['application/octet-stream', pom.download, pom.href].join(':');
                                pom.draggable = true;
                                pom.classList.add('dragout');
                                pom.click();
                                $("#graphAddLoading").addClass("hidden");

                                $.notify(
                                    {
                                        message: `Download completed for the ${object_request_graphs['variable']} variable in WaterML 1.0 format`
                                    },
                                    {
                                        type: "success",
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
                            }).
                            catch(error =>{

                               console
                               $.ajax({
                                 type:"POST",
                                 url: `get-xml/`,
                                 dataType: "JSON",
                                 data: object_request_variable,
                                 success: function(result1){
                                   var xmltext = result1['waterml'];
                                   var pom = document.createElement('a');
                                   var filename = `${object_request_variable['code_variable']}_${object_request_graphs['variable']}.xml`;
                                   var pom = document.createElement('a');
                                   var bb = new Blob([xmltext], {type: 'application/octet-stream'});
                                   pom.setAttribute('href', window.URL.createObjectURL(bb));
                                   pom.setAttribute('download', filename);

                                   pom.dataset.downloadurl = ['application/octet-stream', pom.download, pom.href].join(':');
                                   pom.draggable = true;
                                   pom.classList.add('dragout');
                                   pom.click();
                                   $("#graphAddLoading").addClass("hidden");

                                   $.notify(
                                       {
                                           message: `Download completed for the ${object_request_graphs['variable']} variable in WaterML 1.0 format`
                                       },
                                       {
                                           type: "success",
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

                                 },
                                 error:function(){
                                   $("#graphAddLoading").addClass("hidden");

                                   $.notify(
                                       {
                                           message: `Something went wrong when Downloading the data for the ${object_request_graphs['variable']} in WaterML 1.0 format`
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

                            });

                          }
                          // IF TO AVOID 'WaterML2.0' VALUE IN THE DROPDOWN//
                          else if(selectedDownloadType == "WaterML2.0" ){
                            $("#graphAddLoading").removeClass("hidden");
                            // let url_base = object_request_variable['hs_url'].split("?")[0];
                            let SITE = object_request_variable['code'];
                            let VARIABLE = object_request_variable['code_variable'];
                            let BEGINDATE = x_array[0].replace(" ","T");
                            let ENDDATE = x_array[x_array.length -1].replace(" ","T");
                            let url_download = `${url_base}?request=GetValuesObject&site=${SITE}&variable=${VARIABLE}&beginDate=${BEGINDATE}&endDate=${ENDDATE}&format=WML2`;
                            fetch(url_download).then(res => res.blob()) // Gets the response and returns it as a blob
                              .then(blob => {
                                var pom = document.createElement('a');
                                var filename = `${object_request_variable['code_variable']}_${object_request_graphs['variable']}.xml`;
                                var pom = document.createElement('a');
                                pom.setAttribute('href', window.URL.createObjectURL(blob));
                                pom.setAttribute('download', filename);

                                pom.dataset.downloadurl = ['application/octet-stream', pom.download, pom.href].join(':');
                                pom.draggable = true;
                                pom.classList.add('dragout');
                                pom.click();
                                $("#graphAddLoading").addClass("hidden");

                                $.notify(
                                    {
                                        message: `Download completed for the ${object_request_graphs['variable']} variable in WaterML 2.0 format`
                                    },
                                    {
                                        type: "success",
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
                            }).
                            catch(error =>{ console
                              try{
                                var xmlFile = result1['template_renderizado'];
                                var blob = new Blob([xmlFile], { type: 'text/plain;charset=utf-8;' });
                                var link = document.createElement("a");
                                var url = URL.createObjectURL(blob);
                                link.setAttribute("href", url);
                                link.setAttribute("download", title_graph.replace(/[^a-z0-9_.-]/gi,'_') + ".xml");
                                link.dataset.downloadurl = ['application/octet-stream', link.download, link.href].join(':');
                                link.draggable = true;
                                link.classList.add('dragout');
                                link.click();


                                $("#graphAddLoading").addClass("hidden");

                                $.notify(
                                    {
                                        message: `There Service ${object_request_variable['hs_url']} does not provide WaterML 2.0 downloads, but the WDE provides ones `
                                    },
                                    {
                                        type: "success",
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
                              catch(e){
                                $("#graphAddLoading").addClass("hidden");

                                $.notify(
                                    {
                                        message: `Something went wrong when Downloading the data for the ${object_request_graphs['variable']} in WaterML 2.0 format`
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

                            });
                          }
                          // IF TO AVOID 'NetCDF' VALUE IN THE DROPDOWN//
                          else if(selectedDownloadType == "NetCDF" ){
                            $("#graphAddLoading").removeClass("hidden");
                            // let url_base = object_request_variable['hs_url'].split("?")[0];
                            let SITE = object_request_variable['code'];
                            let VARIABLE = object_request_variable['code_variable'];
                            let BEGINDATE = x_array[0].replace(" ","T");
                            let ENDDATE = x_array[x_array.length -1].replace(" ","T");
                            let url_download = `${url_base}?request=GetValuesObject&site=${SITE}&variable=${VARIABLE}&beginDate=${BEGINDATE}&endDate=${ENDDATE}&format=NetCDF`;
                            fetch(url_download).then(res => res.blob()) // Gets the response and returns it as a blob
                              .then(blob => {
                                var pom = document.createElement('a');
                                var filename = `${object_request_variable['code_variable']}_${object_request_graphs['variable']}.nc`;
                                var pom = document.createElement('a');
                                pom.setAttribute('href', window.URL.createObjectURL(blob));
                                pom.setAttribute('download', filename);

                                pom.dataset.downloadurl = ['application/octet-stream', pom.download, pom.href].join(':');
                                pom.draggable = true;
                                pom.classList.add('dragout');
                                pom.click();
                                $("#graphAddLoading").addClass("hidden");

                                $.notify(
                                    {
                                        message: `Download completed for the ${object_request_graphs['variable']} variable in NetCDF format`
                                    },
                                    {
                                        type: "success",
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
                            }).
                            catch(error =>{ console
                              $("#graphAddLoading").addClass("hidden");

                              $.notify(
                                  {
                                      message: `There Service ${object_request_variable['hs_url']} does not provide NetCDF downloads`
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
                            });
                          }
                        }
                      }
                      catch(e){
                        console.log(e);
                        $("#graphAddLoading").addClass("hidden");

                        $.notify(
                            {
                                message: `There was a problem downloading the file for the Service ${object_request_variable['hs_url']}`
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

                    }


                    $("#download_dropdown").change(funcDown);
                  }


                  if(chart_type ==="Whisker and Box"){

                    initialize_graphs(undefined,y_array,title_graph,undefined, undefined,undefined,"whisker");
                  }
                  $("#graphAddLoading").addClass("hidden")

               }
               else{
                 let title_graph=  `${object_request_graphs['site_name']} - ${selectedItemText} No Data Available`
                 initialize_graphs([],[],title_graph,"","","","scatter");
                 $("#graphAddLoading").addClass("hidden")
                 $.notify(
                     {
                         message: `The variable does not contain any data, Sorry`
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
                console.log(e);
                $("#graphAddLoading").addClass("hidden")
                $.notify(
                    {
                        message: `Unable to retrieve the data for the selected variable`
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
             console.log(error);
             let title_graph=  `${object_request_graphs['site_name']} - ${selectedItemText}
             No Data Available`
             initialize_graphs([],[],title_graph,"","","","scatter");
             $("#graphAddLoading").addClass("hidden")
             $.notify(
                 {
                     message: `There is an error retrieving the values for the ${selectedItem} variable `
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
    }
    catch(e){
      console.log(e);
      $.notify(
          {
              message: `Unable to retrieve the data for the selected variable`
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
  }

$("#update_graphs").on("click",select_variable_change);
