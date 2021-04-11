
/*
************ FUNCTION NAME: SELECT_VARIABLE_CHANGE **********************
************ PURPOSE: SELECT A VARIABLE FROM A DROPDOWN AND CHANGE THE GRAPH ***********
*/

select_variable_change = function(){
  try{
    let arrayTime = [];
    let object_request_variable={};
    let start_date_object =  $('#datetimepicker6').datepicker('getDates')[0];

    let start_date_string = start_date_object.toISOString().split("T")[0]
    let end_date_object = $('#datetimepicker7').datepicker('getDates')[0];

    let end_date_string = end_date_object.toISOString().split("T")[0]


    let chart_type= $("#type_graph_select2")['0'].value;
    let selectedItem = $('#variables_graph')['0'].value;
    let selectedItemText = $('#variables_graph')['0'].text;

    arrayTime.push(start_date_string);
    arrayTime.push(end_date_string);
    object_request_variable['timeFrame'] = arrayTime;

    if(chart_type == "Scatter" || chart_type =="Whisker and Box"){
      // $("#type_graph_select")['0'].disabled = false;


      object_request_graphs['variable']=selectedItem;
      object_request_variable['code_variable']= codes_variables_array[`${selectedItem}`-1];
      object_request_variable['hs_url'] =  object_request_graphs['hs_url'];
      object_request_variable['code'] =  object_request_graphs['code'];
      object_request_variable['network'] =  object_request_graphs['network'];

      if(selectedItem !== "0"){

        $("#graphAddLoading").css({left:'0',bottom:"0",right:"0",top:"0", margin:"auto", position:'fixed',"z-index": 9999});

        $("#graphAddLoading").removeClass("hidden");
        $.ajax({
          type:"GET",
          url: `get-values-graph-hs`,
          dataType: "JSON",
          data: object_request_variable,
          success: function(result1){
            try{
              if(result1.graphs.length > 0){
                console.log(result1)
                let time_series_array = result1['graphs'];
                let time_series_array_interpolation = result1['interpolation'];

                let x_array = [];
                time_series_array.forEach(function(x){
                  x_array.push(x[0]);
                })
                let y_array=[]
                time_series_array.forEach(function(y){
                  if(y[1]===-9999){
                    y_array.push(null)
                  }
                  else{
                    y_array.push(y[1]);
                  }

                })
                let x_array_interpolation = [];
                time_series_array_interpolation.forEach(function(x){
                  x_array_interpolation.push(x[0]);
                })
                let y_array_interpolation=[]
                time_series_array_interpolation.forEach(function(y){
                  y_array_interpolation.push(y[1]);
                })
                let title_graph = `${result1['variablename']} vs ${result1['timeUnitName']}`;
                let units_x = `${result1['variablename']} (${result1['unit_name']})` ;
                if (result1['unit_name'] == "No Data was provided"){
                  units_x = " ";
                }

                let units_y = `${result1['timeUnitName']}`;
                if (result1['timeUnitName'] == "No Data was provided"){
                  units_y = "Time";
                }
                let variable_name_legend = `${result1['variablename']}`;
                let type= "scatter";
                active_map_feature_graphs['scatter']['x_array'] = x_array;
                active_map_feature_graphs['scatter']['y_array'] = y_array;
                active_map_feature_graphs['scatter']['x_array_interpolation'] = x_array_interpolation;
                active_map_feature_graphs['scatter']['y_array_interpolation'] = y_array_interpolation;
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
                  initialize_graphs(x_array,y_array,title_graph,units_y, units_x,variable_name_legend,type,x_array_interpolation,y_array_interpolation);

                  $("#download_dropdown").unbind('change');
                  let funcDown = function(){
                    let selectedDownloadType = $('#download_dropdown')['0'].value;
                    let selectedDownloadTypeText = $('#download_dropdown')['0'];
                    if(selectedDownloadType != "Download"){
                      if(selectedDownloadType == "CSV" ){
                        var csvData = [];
                        var header = [units_y,units_x] //main header.
                        csvData.push(header);
                        for (var i = 0; i < x_array.length; i++){ //data
                          var line = [x_array[i],y_array[i]];
                          csvData.push(line);
                        }
                        var csvFile = csvData.map(e=>e.map(a=>'"'+((a||"").toString().replace(/"/gi,'""'))+'"').join(",")).join("\r\n"); //quote all fields, escape quotes by doubling them.
                        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
                        var link = document.createElement("a");
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", title_graph.replace(/[^a-z0-9_.-]/gi,'_') + ".csv");
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
                                delay: 5000
                            }
                        )
                      }
                      else if(selectedDownloadType == "WaterML1.0" ){
                        $("#graphAddLoading").removeClass("hidden");
                        let url_base = object_request_variable['hs_url'].split("?")[0];
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
                                    delay: 5000
                                }
                            )
                        }).
                        catch(error =>{

                           console
                           $.ajax({
                             type:"GET",
                             url: `get-xml`,
                             dataType: "JSON",
                             data: object_request_variable,
                             success: function(result1){
                               console.log(result1)
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
                                       delay: 5000
                                   }
                               )

                             }


                           })

                        });

                      }
                      else if(selectedDownloadType == "WaterML2.0" ){
                        $("#graphAddLoading").removeClass("hidden");
                        let url_base = object_request_variable['hs_url'].split("?")[0];
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
                                    delay: 5000
                                }
                            )
                        }).
                        catch(error =>{ console
                          $("#graphAddLoading").addClass("hidden");

                          $.notify(
                              {
                                  message: `There Service ${object_request_variable['hs_url']} does not provide WaterML 2.0 downloads`
                              },
                              {
                                  type: "danger",
                                  allow_dismiss: true,
                                  z_index: 20000,
                                  delay: 5000
                              }
                          )
                        });
                      }
                      else if(selectedDownloadType == "NetCDF" ){
                        $("#graphAddLoading").removeClass("hidden");
                        let url_base = object_request_variable['hs_url'].split("?")[0];
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
                                    delay: 5000
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
                                  delay: 5000
                              }
                          )
                        });
                      }
                    }
                  }


                  $("#download_dropdown").change(funcDown);
                  // $( document ).on( 'change', "#download_dropdown", funcDown );
                  // $( document ).on( 'click', "#download_dropdown", funcDown );
                }


                if(chart_type ==="Whisker and Box"){

                  initialize_graphs(undefined,y_array,title_graph,undefined, undefined,undefined,"whisker");
                }
                $("#graphAddLoading").addClass("hidden")

             }
             else{
               let title_graph=  `${object_request_graphs['site_name']} - ${selectedItemText}
               No Data Available`
               initialize_graphs([],[],title_graph,"","","","scatter");
               $("#graphAddLoading").addClass("hidden")
               $.notify(
                   {
                       message: `There is no data for this variable, Sorry`
                   },
                   {
                       type: "danger",
                       allow_dismiss: true,
                       z_index: 20000,
                       delay: 5000
                   }
               )

             }
            }
            catch(e){
              $("#graphAddLoading").addClass("hidden")
              $.notify(
                  {
                      message: `Unable to retrieve the data for the selected variable`
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
                   delay: 5000
               }
           )
         }

        })

      }
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
            delay: 5000
        }
    )
  }
}
// let temp_var = $("#variables_graph")
// $("#variables_graph").change(select_variable_change);
$( document ).on( 'change', "#variables_graph", select_variable_change );
$( document ).on( 'click', "#variables_graph", select_variable_change );

$("#update_graphs").on("click",select_variable_change);
/*
************ FUNCTION NAME: CHANGE_TYPE_GRAPHS_GROUP **********************
************ PURPOSE: CHANGE THE GRAPHS THAT ARE PART OF THE ***********
*/
change_type_graphs_group = function(){
  try{
    // let chart_type= $("#type_graph_select")['0'].value;

    if(chart_type === "Bar"){
      // $("#variables_graph")['0'].disabled = true;
      $('#variables_graph').selectpicker('setStyle', 'btn-info');


      if(active_map_feature_graphs['bar'].hasOwnProperty('y_array')){
        if(active_map_feature_graphs['bar']['y_array'].length > 0){

          initialize_graphs(active_map_feature_graphs['bar']['x_array'],active_map_feature_graphs['bar']['y_array'],active_map_feature_graphs['bar']['title_graph'],undefined,undefined,undefined,active_map_feature_graphs['bar']['type']);
          ////console.log("the graph has been change to bar");
        }
      }

      else{
        $.notify(
            {
                message: `Click on one of the hydroserver data points to retrieve a Bar plot`
            },
            {
                type: "danger",
                allow_dismiss: true,
                z_index: 20000,
                delay: 5000
            }
        )


      }

    }

    if(chart_type === "Pie"){
      $('#variables_graph').selectpicker('setStyle', 'btn-info');

      if(active_map_feature_graphs['pie'].hasOwnProperty('y_array')){
        if(active_map_feature_graphs['pie']['y_array'].length > 0){

          if (active_map_feature_graphs['pie']['check_none'].includes(true)){
            initialize_graphs(active_map_feature_graphs['pie']['x_array'],active_map_feature_graphs['pie']['y_array'],active_map_feature_graphs['pie']['title_graph'], undefined, undefined, undefined,active_map_feature_graphs['pie']['type']);

          }
          else{
            initialize_graphs(['no variable has data'],[1],active_map_feature_graphs['pie']['title_graph'], undefined, undefined, undefined,active_map_feature_graphs['pie']['type']);

          }
        }
      }

      else{
        $.notify(
            {
                message: `Click on one of the hydroserver data points to retrieve a Pie plot`
            },
            {
                type: "danger",
                allow_dismiss: true,
                z_index: 20000,
                delay: 5000
            }
        )


      }

    }
  }
  catch(e){
    console.log(e)
    $.notify(
        {
            message: `Unable to change the type of plot`
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
// $("#type_graph_select").change(change_type_graphs_group)
// $("#type_graph_select2").change(change_type_graphs_individual)
