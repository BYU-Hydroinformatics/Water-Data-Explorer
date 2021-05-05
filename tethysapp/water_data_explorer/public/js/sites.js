/*
************ FUNCTION NAME: ACTIVATE_LAYER_VALUES **********************
************ PURPOSE: THE FUNCTIONS RETRIEVES THE DATA FROM THE LAYERS WHEN ONE MAKES A CLICK ***********
*/
activate_layer_values = function (){
  try{
    map.on('singleclick', function(evt) {
      $('#variables_graph').selectpicker('setStyle', 'btn-primary');

      evt.stopPropagation();
      $("#graphs").empty();
      let object_request={};
      var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature2, layer) {
          //you can add a condition on layer to restrict the listener
          if(feature2){

            if(layersDict['selectedPointModal']){
              map.removeLayer(layersDict['selectedPointModal'])
              map.updateSize()
            }

            if(layersDict['selectedPoint']){
              map.removeLayer(layersDict['selectedPoint'])
              // delete layersDict[title]
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
      if (feature) {

        initialize_graphs([],[],"No Variable was Selected","","","","scatter");
        active_map_feature_graphs={
          'scatter':{},
          'bar':{},
          'pie':{},
          'whisker':{}
        }
        let feature_single = feature.values_.features[0]
        // $("#siteName_title").html("Site Information");
        object_request['hs_url']=feature_single.values_['hs_url'];
        object_request['code']=feature_single.values_['code'];
        object_request['network']=feature_single.values_['network'];

        $("#GeneralLoading").removeClass("hidden");
        $('#sG').bootstrapToggle('on');
        $.ajax({
          type:"GET",
          url: `get-values-hs`,
          dataType: "JSON",
          data: object_request,
          success: function(result){
            console.log(result)
            try{
              let description_site = document.getElementById('siteDes')
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

                let table_begin =
                  `<br>
                  <p><i>Table of Variables</i></p>
                  <table id="siteVariableTable" class="table table-striped table-hover table-condensed">
                      <tr class="danger">
                        <th>Observed Variables</th>
                        <th>Unit</th>
                        <th>Interpolation Type</th>
                      </tr>`;
                  //1) combine the arrays:
                 var list_e = [];
                 for (var j = 0; j <result['variables'].length; j++)
                     list_e.push({'variables_name': result['variables'][j], 'units': result['units'][j],'interpolation': result['dataType'][j] ,'timeSupport':result['timeSupport'][j],'timeUnits':result['timeUnitName'][j]});

                 //2) sort:
                 list_e.sort(function(a, b) {
                     return ((a.variables_name < b.variables_name) ? -1 : ((a.variables_name == b.variables_name) ? 0 : 1));

                 });

                 //3) separate them back out:
                 for (var k = 0; k < list_e.length; k++) {
                     result['variables'][k] = list_e[k].variables_name;
                     result['units'][k] = list_e[k].units;
                     result['dataType'][k] = list_e[k].interpolation;
                     result['timeUnitName'][k] = list_e[k].timeUnits;
                     result['timeSupport'][k] = list_e[k].timeSupport;
                 }
                for(let i=0; i<result['variables'].length ; ++i){
                  let variable_new = result['variables'][i];
                  if(variable_new == null){
                    variable_new = "No Data Provided"
                  }
                  let variable_unit = result['units'][i];
                  if(variable_unit == null){
                    variable_unit = "No Data Provided"
                  }
                  let aggregation_dur = `${result['timeSupport'][i]} ${result['timeUnitName'][i]}`;
                  if(aggregation_dur == null){
                    aggregation_dur = "No Data Provided"
                  }
                  let time_serie_range = result['times_series'][variable_new];

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

                active_map_feature_graphs['bar']['x_array']=[];
                active_map_feature_graphs['pie']['x_array']=[];

                let title_info = `${feature.values_['name']} Variables Distribution`;


                evt.stopPropagation();
                let object_code_and_variable = {};
                let variables = result['variables'];
                let code_variable =result['codes'];
                codes_variables_array = JSON.parse(JSON.stringify(code_variable));
                for(let i=0; i< variables.length ; ++i){
                  object_code_and_variable[`${variables[i]}`]=code_variable[i];
                }
                let variable_select = $("#variables_graph");
                variable_select.empty();
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

                let object_request2 = {};
                object_request2['hs_name']=feature_single.values_['hs_name'];
                object_request2['site_name']=feature_single.values_['name'];
                object_request2['hs_url']=feature_single.values_['hs_url'];
                object_request2['code']=feature_single.values_['code'];
                object_request2['network']=feature_single.values_['network'];
                //CONTINUE HERE // AND TRY TO SEE HOW IT GOES //
                var selectedItem = $('#variables_graph')['0'].value;
                var selectedItemText = $('#variables_graph')['0'].text;

                object_request2['variable']=selectedItem;
                object_request2['code_variable']= code_variable[`${selectedItem}` -1];
                object_request2['times_series'] = result['times_series'];
                time_series_cache = result['times_series'];
                object_request2['variables_array']=result['variables'];
                object_request_graphs = JSON.parse(JSON.stringify(object_request2));

                // $('#variables_graph').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
                $('#variables_graph').on('change', function(e){
                  try{
                    $("#GeneralLoading").removeClass("hidden");
                    let selectedItem = this.value - 1;
                    console.log(selectedItem)
                  // $( document ).on( 'change', "#variables_graph", function(){
                    // do something...
                    // let start_dateUTC = result['times_series'][Object.keys(result['times_series'])[0]]['beginDateTimeUTC']
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

                    ////console.log($('#datetimepicker6').datepicker('getDate'));
                    ////console.log($('#datetimepicker7').datepicker('getDate'));

                    $('#datetimepicker6').datepicker('setStartDate', dateUTC_start);
                    $('#datetimepicker6').datepicker('setEndDate', dateUTC_end);
                    // $('#datetimepicker7').datepicker('setStartDate',dateUTC_end);
                    $('#datetimepicker7').datepicker('setEndDate',dateUTC_end);
                    $("#GeneralLoading").addClass("hidden");
                  }
                  catch(e){
                    console.log(e);
                    $("#GeneralLoading").addClass("hidden");

                    $.notify(
                        {
                            message: `Please select a variable`
                        },
                        {
                            type: "info",
                            allow_dismiss: true,
                            z_index: 20000,
                            delay: 5000
                        }
                    )
                  }

                });

                 $("#GeneralLoading").addClass("hidden");
                 $("#siteName_title").empty();

              }
              else{
                // console.log(feature_single.values_)
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
                        delay: 5000
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
                      delay: 5000
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
                    delay: 5000
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
            delay: 5000
        }
    )
  }

}
