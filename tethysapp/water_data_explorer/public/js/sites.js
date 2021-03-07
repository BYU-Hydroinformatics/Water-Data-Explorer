/*
************ FUNCTION NAME: ACTIVATE_LAYER_VALUES **********************
************ PURPOSE: THE FUNCTIONS RETRIEVES THE DATA FROM THE LAYERS WHEN ONE MAKES A CLICK ***********
*/
activate_layer_values = function (){
  map.on('singleclick', function(evt) {

    $('#variables_graph').selectpicker('setStyle', 'btn-primary');

    evt.stopPropagation();
    $("#graphs").empty();


    let object_request={};
    //console.log(object_request);

    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature2, layer) {
        console.log(feature2)
        //you can add a condition on layer to restrict the listener
        if(feature2){


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
          //console.log("adding new feature");
          //console.log(vectorLayer);
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
      // console.log(feature);
      let feature_single = feature.values_.features[0]
      // console.log(feature_single)
      //console.log(feature_single.values_['hs_name']);

      // $("#siteName_title").html(feature.values_['name']);
      $("#siteName_title").html("Site Information");
      // object_request['hs_name']=feature.values_['hs_name'];
      // object_request['site_name']=feature.values_['name'];
      object_request['hs_url']=feature_single.values_['hs_url'];
      object_request['code']=feature_single.values_['code'];
      object_request['network']=feature_single.values_['network'];
      // $("#plots").hide();
      // $("#graphAddLoading").css({left:'50%',bottom:"15%", position:'absolute',"z-index": 9999});
      // $("#graphAddLoading").removeClass("hidden");
      $("#GeneralLoading").removeClass("hidden");
      // console.log(object_request);

      $.ajax({
        type:"GET",
        url: `get-values-hs`,
        dataType: "JSON",
        data: object_request,
        success: function(result){
          console.log(result);
          let description_site = document.getElementById('siteDes')
          let geolocations = result['geolo'];
          let country_name = result['country'];
          let lats = parseFloat(geolocations['latitude'])
          let lons = parseFloat(geolocations['longitude'])
          let new_lat = toDegreesMinutesAndSeconds(lats)
          let new_lon = toDegreesMinutesAndSeconds(lons)
          //console.log(new_lat)
          //console.log(new_lon)

          description_site.innerHTML =
            ` <p> <em> Station/Platform Name:</em> ${feature_single.values_['name']}<p>
              <p> <em> Territory of origin of data:</em> ${country_name}<p>
              <p> <em> Supervising Organization:</em> ${result['organization'][Object.keys(result['organization'])[0]]} <p>
              <p> <em> Geospatial Location:</em> lat: ${new_lat} lon: ${new_lon} <p>`

          let table_begin =
        `<br>
        <p>Table of Variables</p>
        <table id="siteVariableTable" class="table table-striped table-hover table-condensed">
            <tr class="danger">
              <th>Observed Variables</th>
              <th>Unit</th>
              <th>Temporal Extent</th>
            </tr>`;
          for(let i=0; i<result['variables'].length ; ++i){
            let variable_new = result['variables'][i]
            let variable_unit = result['units'][i]
            let time_serie_range = result['times_series'][variable_new]
            let begin_date = time_serie_range['beginDateTime'].split('T')[0];
            let end_date = time_serie_range['endDateTime'].split('T')[0];
            //console.log(time_serie_range)
            let newRow =
            `
            <tr>
              <th>${variable_new}</th>
              <th>${variable_unit}</th>
              <th>${begin_date} - ${end_date}</th>

            </tr>
            `
            table_begin = table_begin + newRow;
          }
          table_begin = table_begin + `</table>`;
          $("#table_div").html(table_begin);

          active_map_feature_graphs['bar']['x_array']=[];
          active_map_feature_graphs['pie']['x_array']=[];


          // create Dict //
          // for(let i=0; i< result['variables'].length; ++i){
          //   // let x_axis= `${result['variables'][i]} (${result['codes'][i]})`;
          //   let x_axis= `${result['variables'][i]}`;
          //   active_map_feature_graphs['bar']['x_array'].push(x_axis);
          //   active_map_feature_graphs['pie']['x_array'].push(x_axis);
          //
          // }
          let title_info = `${feature.values_['name']} Variables Distribution`;

          // active_map_feature_graphs['bar']['y_array'] = result['counts'];
          // active_map_feature_graphs['bar']['type'] = 'bar';
          // active_map_feature_graphs['bar']['title_graph'] = title_info;

          // active_map_feature_graphs['pie']['y_array'] = result['counts'];
          // active_map_feature_graphs['pie']['type'] = 'pie';
          // active_map_feature_graphs['pie']['title_graph'] = title_info;



          // let check_empty_pieChart = true;
          // let check_array = [];

          // result['counts'].forEach(function(x){
          //   if (x > 0){
          //     check_empty_pieChart = true;
          //     check_array.push(check_empty_pieChart);
          //   }
          //   else{
          //     check_empty_pieChart = false;
          //     check_array.push(check_empty_pieChart);
          //
          //   }
          //
          // })
          // active_map_feature_graphs['pie']['check_none'] = check_array;
          //console.log(active_map_feature_graphs['pie']['check_none']);

          // if (check_array.includes(true)) {
          //   initialize_graphs(active_map_feature_graphs['pie']['x_array'],result['counts'],title_info, undefined, undefined, undefined,'pie');
          //
          // }
          // else{
          //   initialize_graphs(['no variable has data'],[1],title_info, undefined, undefined, undefined,'pie');
          //
          // }

          evt.stopPropagation();
          let object_code_and_variable = {};
          let variables = result['variables'];
          let code_variable =result['codes'];
          codes_variables_array = JSON.parse(JSON.stringify(code_variable));
          for(let i=0; i< variables.length ; ++i){
            object_code_and_variable[`${variables[i]}`]=code_variable[i];
          }
          // //console.log(object_code_and_variable);
          let variable_select = $("#variables_graph");
          variable_select.empty();
          let i = 1;
          let array_variables=[]
          let option_variables;
          // let variables_select = document.getElementById("variables_graph");
          let option_beginning= `<option value= 0 selected= "selected" > Select an variable </option>`;
          variable_select.append(option_beginning)

          variables.forEach(function(variable){
            let option;
            let option_begin;
              array_variables.push(variable);
              if(i === 1){
                //console.log("initial");
                // option = `<option selected = "selected>Variables Ready ..</option>`;
                // option_begin = `<option value=${i}>${variable} (${result['counts'][i-1]}) Data Points Counted </option>`;
                option_begin = `<option value=${i}>${variable} </option>`;
                variable_select.append(option_begin)

              }
              else{
                // option = `<option value=${i} >${variable} (${result['counts'][i-1]}) Data Points Counted</option>`;
                option = `<option value=${i} >${variable} </option>`;

              }
              variable_select.append(option)
              // variable_select.append(option_variables)

              variable_select.selectpicker("refresh");
              i = i+1;
          });
          //console.log(object_request);
          //console.log($('#variables_graph'));
          let object_request2 = {};
          object_request2['hs_name']=feature_single.values_['hs_name'];
          object_request2['site_name']=feature_single.values_['name'];
          object_request2['hs_url']=feature_single.values_['hs_url'];
          object_request2['code']=feature_single.values_['code'];
          object_request2['network']=feature_single.values_['network'];
          //CONTINUE HERE // AND TRY TO SEE HOW IT GOES //
          // //console.log(object_request);
          var selectedItem = $('#variables_graph')['0'].value;
          var selectedItemText = $('#variables_graph')['0'].text;
          //console.log(selectedItem);

          object_request2['variable']=selectedItem;
          object_request2['code_variable']= code_variable[`${selectedItem}` -1];
          object_request2['times_series'] = result['times_series']
          // object_request2['methodsIDs'] = result['methodsIDs']
          object_request2['variables_array']=result['variables']
          object_request_graphs = JSON.parse(JSON.stringify(object_request2));
          //console.log(object_request2);
          let start_dateUTC = result['times_series'][Object.keys(result['times_series'])[0]]['beginDateTimeUTC']
          //console.log(start_dateUTC);
          let dateUTC_start = new Date(start_dateUTC)
          //console.log(dateUTC_start);
          let starts = start_dateUTC.split("T");
          //console.log(starts[0]);
          // let start_date_ = starts[0]+ ' '+ starts[1]
          let starts_no_seconds = starts[1].split(":");
          // object_request_graphs["startTime_hhmmss"] = starts_no_seconds[0] +":" +starts_no_seconds[1];
          let end_dateUTC = result['times_series'][Object.keys(result['times_series'])[0]]['endDateTimeUTC']
          let dateUTC_end = new Date(end_dateUTC)

          let ends = end_dateUTC.split("T");
          //console.log(ends[0]);

          let ends_no_seconds = ends[1].split(":");
          //console.log(dateUTC_end);


          //console.log(new Date(starts[0]));
          //console.log(new Date(ends[0]));

          // THIS IS NECESARRY TO RESET THE DATES OTHERWISE IT IS GOING TO HAVE EMPTY SPACES..
          $('#datetimepicker6').datepicker('setStartDate', null);
          $('#datetimepicker6').datepicker('setEndDate', null);
          $('#datetimepicker7').datepicker('setEndDate',null);

//               @KrunchMuffin I found a workaround this issue:
//               Before setting the value remove the limitation (endDate)
//               Set the value
//               Restore the limitation (endDate)
//
//               Maybe it will work for you also
//               https://github.com/uxsolutions/bootstrap-datepicker/issues/2292#issuecomment-341496634

          $('#datetimepicker6').datepicker('update', dateUTC_start);
          $('#datetimepicker7').datepicker('update', dateUTC_end);

          //console.log($('#datetimepicker6').datepicker('getDate'));
          //console.log($('#datetimepicker7').datepicker('getDate'));

          $('#datetimepicker6').datepicker('setStartDate', dateUTC_start);
          $('#datetimepicker6').datepicker('setEndDate', dateUTC_end);
          // $('#datetimepicker7').datepicker('setStartDate',dateUTC_end);
          $('#datetimepicker7').datepicker('setEndDate',dateUTC_end);
           // $("#graphAddLoading").addClass("hidden")
           $("#GeneralLoading").addClass("hidden")


        }

      })

    }
  });

}
