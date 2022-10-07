/*****************************************************************************
 * FILE:                utilitiesGraphs.js
 * BEGGINING DATE:      16 August 2019
 * ENDING DATE:         ---------------
 * AUTHOR:              Giovanni Romero Bustamante
 * COPYRIGHT:           (c) Brigham Young University 2020
 * LICENSE:             MIT
 *
 *****************************************************************************/

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
        $("#graphAddLoading").css({left:'0',bottom:"0",right:"0",top:"50%", margin:"auto", position:'absolute',"z-index": 9999});
        $("#graphAddLoading").removeClass("hidden");

        $.ajax({
          type:"POST",
          url: `get-values-graph-hs/`,
          dataType: "JSON",
          data: object_request_variable,
          success: function(result1){
            try{
              // CHECK TO NOT SELECT THE FIRST DROPDOWN OPTION "SELECT VARIABLE"//
              if(result1.graphs.length > 0){

                //GRAPHS VALUES//
                let time_series_array = result1['graphs'];
                //INTERPOLATION VALUES//
                let time_series_array_interpolation = result1['interpolation'];

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

                // MAKE THE ARRAY FOR X INTERPOLATION VALUES //
                let x_array_interpolation = [];
                time_series_array_interpolation.forEach(function(x){
                  x_array_interpolation.push(x[0]);
                })

                // MAKE THE ARRAY FOR X INTERPOLATION VALUES //
                let y_array_interpolation=[]
                time_series_array_interpolation.forEach(function(y){
                  y_array_interpolation.push(y[1]);
                })

                // NAME TITLE //
                let title_graph = `${result1['variablename']}`;

                // UNITS X AXIS //
                let units_x = `${result1['variablename']} (${result1['unit_name']})` ;
                if (result1['unit_name'] == "No Data was provided"){
                  units_x = " ";
                }

                // UNITS Y AXIS //
                let units_y = `${result1['timeUnitName']}`;
                if (result1['timeUnitName'] == "No Data was provided"){
                  units_y = "Time";
                }

                // VARIABLE NAME //
                let variable_name_legend = `${result1['variablename']}`;

                // TYPE CHART //
                let type= "scatter";

                // MAKING THE REQUEST OBJECT FOR DOWNLOAD CALLED "active_map_feature_graphs" //

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
                // IF FOR TYPE OF PLOT//
                if(chart_type ==="Scatter"){
                  initialize_graphs(x_array,y_array,title_graph,units_y, units_x,variable_name_legend,type,x_array_interpolation,y_array_interpolation);
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
                          var header = [units_y,units_x] //main header.
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
                          new Notify ({
                            status: 'success',
                            title: 'Success',
                            text: `Download completed for the ${object_request_graphs['variable']} variable in CSV format`,
                            effect: 'fade',
                            speed: 300,
                            customClass: '',
                            customIcon: '',
                            showIcon: true,
                            showCloseButton: true,
                            autoclose: true,
                            autotimeout: 3000,
                            gap: 20,
                            distance: 20,
                            type: 1,
                            position: 'right top'
                          })
                          // $.notify(
                          //     {
                          //         message: `Download completed for the ${object_request_graphs['variable']} variable in CSV format`
                          //     },
                          //     {
                          //         type: "success",
                          //         allow_dismiss: true,
                          //         z_index: 20000,
                          //         delay: 5000,
                          //         animate: {
                          //           enter: 'animated fadeInRight',
                          //           exit: 'animated fadeOutRight'
                          //         },
                          //         onShow: function() {
                          //             this.css({'width':'auto','height':'auto'});
                          //         }
                          //     }
                          // )
                        }
                        // IF TO AVOID 'WaterML1.0' VALUE IN THE DROPDOWN//
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
                              new Notify ({
                                status: 'success',
                                title: 'Success',
                                text: `Download completed for the ${object_request_graphs['variable']} variable in WaterML 1.0 format`,
                                effect: 'fade',
                                speed: 300,
                                customClass: '',
                                customIcon: '',
                                showIcon: true,
                                showCloseButton: true,
                                autoclose: true,
                                autotimeout: 3000,
                                gap: 20,
                                distance: 20,
                                type: 1,
                                position: 'right top'
                              })
                              // $.notify(
                              //     {
                              //         message: `Download completed for the ${object_request_graphs['variable']} variable in WaterML 1.0 format`
                              //     },
                              //     {
                              //         type: "success",
                              //         allow_dismiss: true,
                              //         z_index: 20000,
                              //         delay: 5000,
                              //         animate: {
                              //           enter: 'animated fadeInRight',
                              //           exit: 'animated fadeOutRight'
                              //         },
                              //         onShow: function() {
                              //             this.css({'width':'auto','height':'auto'});
                              //         }
                              //     }
                              // )
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
                                 new Notify ({
                                  status: 'success',
                                  title: 'Success',
                                  text: `Download completed for the ${object_request_graphs['variable']} variable in WaterML 1.0 format`,
                                  effect: 'fade',
                                  speed: 300,
                                  customClass: '',
                                  customIcon: '',
                                  showIcon: true,
                                  showCloseButton: true,
                                  autoclose: true,
                                  autotimeout: 3000,
                                  gap: 20,
                                  distance: 20,
                                  type: 1,
                                  position: 'right top'
                                })
                                //  $.notify(
                                //      {
                                //          message: `Download completed for the ${object_request_graphs['variable']} variable in WaterML 1.0 format`
                                //      },
                                //      {
                                //          type: "success",
                                //          allow_dismiss: true,
                                //          z_index: 20000,
                                //          delay: 5000,
                                //          animate: {
                                //            enter: 'animated fadeInRight',
                                //            exit: 'animated fadeOutRight'
                                //          },
                                //          onShow: function() {
                                //              this.css({'width':'auto','height':'auto'});
                                //          }
                                //      }
                                //  )

                               },
                               error:function(){
                                 $("#graphAddLoading").addClass("hidden");
                                 new Notify ({
                                  status: 'error',
                                  title: 'Error',
                                  text: `Something went wrong when Downloading the data for the ${object_request_graphs['variable']} in WaterML 1.0 format`,
                                  effect: 'fade',
                                  speed: 300,
                                  customClass: '',
                                  customIcon: '',
                                  showIcon: true,
                                  showCloseButton: true,
                                  autoclose: true,
                                  autotimeout: 3000,
                                  gap: 20,
                                  distance: 20,
                                  type: 1,
                                  position: 'right top'
                                })
                                //  $.notify(
                                //      {
                                //          message: `Something went wrong when Downloading the data for the ${object_request_graphs['variable']} in WaterML 1.0 format`
                                //      },
                                //      {
                                //          type: "danger",
                                //          allow_dismiss: true,
                                //          z_index: 20000,
                                //          delay: 5000,
                                //          animate: {
                                //            enter: 'animated fadeInRight',
                                //            exit: 'animated fadeOutRight'
                                //          },
                                //          onShow: function() {
                                //              this.css({'width':'auto','height':'auto'});
                                //          }
                                //      }
                                //  )
                               }


                             })

                          });

                        }
                        // IF TO AVOID 'WaterML2.0' VALUE IN THE DROPDOWN//
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
                              new Notify ({
                                status: 'success',
                                title: 'Success',
                                text: `Download completed for the ${object_request_graphs['variable']} variable in WaterML 2.0 format`,
                                effect: 'fade',
                                speed: 300,
                                customClass: '',
                                customIcon: '',
                                showIcon: true,
                                showCloseButton: true,
                                autoclose: true,
                                autotimeout: 3000,
                                gap: 20,
                                distance: 20,
                                type: 1,
                                position: 'right top'
                              })
                              // $.notify(
                              //     {
                              //         message: `Download completed for the ${object_request_graphs['variable']} variable in WaterML 2.0 format`
                              //     },
                              //     {
                              //         type: "success",
                              //         allow_dismiss: true,
                              //         z_index: 20000,
                              //         delay: 5000,
                              //         animate: {
                              //           enter: 'animated fadeInRight',
                              //           exit: 'animated fadeOutRight'
                              //         },
                              //         onShow: function() {
                              //             this.css({'width':'auto','height':'auto'});
                              //         }
                              //     }
                              // )
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
                              new Notify ({
                                status: 'success',
                                title: 'Success',
                                text: `There Service ${object_request_variable['hs_url']} does not provide WaterML 2.0 downloads, but the WDE provides ones`,
                                effect: 'fade',
                                speed: 300,
                                customClass: '',
                                customIcon: '',
                                showIcon: true,
                                showCloseButton: true,
                                autoclose: true,
                                autotimeout: 3000,
                                gap: 20,
                                distance: 20,
                                type: 1,
                                position: 'right top'
                              })
                              // $.notify(
                              //     {
                              //         message: `There Service ${object_request_variable['hs_url']} does not provide WaterML 2.0 downloads, but the WDE provides ones`
                              //     },
                              //     {
                              //         type: "success",
                              //         allow_dismiss: true,
                              //         z_index: 20000,
                              //         delay: 5000,
                              //         animate: {
                              //           enter: 'animated fadeInRight',
                              //           exit: 'animated fadeOutRight'
                              //         },
                              //         onShow: function() {
                              //             this.css({'width':'auto','height':'auto'});
                              //         }
                              //     }
                              // )
                            }
                            catch(e){
                              $("#graphAddLoading").addClass("hidden");
                              new Notify ({
                                status: 'error',
                                title: 'Error',
                                text: `Something went wrong when Downloading the data for the ${object_request_graphs['variable']} in WaterML 2.0 format`,
                                effect: 'fade',
                                speed: 300,
                                customClass: '',
                                customIcon: '',
                                showIcon: true,
                                showCloseButton: true,
                                autoclose: true,
                                autotimeout: 3000,
                                gap: 20,
                                distance: 20,
                                type: 1,
                                position: 'right top'
                              })
                              // $.notify(
                              //     {
                              //         message: `Something went wrong when Downloading the data for the ${object_request_graphs['variable']} in WaterML 2.0 format`
                              //     },
                              //     {
                              //         type: "danger",
                              //         allow_dismiss: true,
                              //         z_index: 20000,
                              //         delay: 5000,
                              //         animate: {
                              //           enter: 'animated fadeInRight',
                              //           exit: 'animated fadeOutRight'
                              //         },
                              //         onShow: function() {
                              //             this.css({'width':'auto','height':'auto'});
                              //         }
                              //     }
                              // )
                            }

                          });
                        }
                        // IF TO AVOID 'NetCDF' VALUE IN THE DROPDOWN//
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
                              new Notify ({
                                status: 'success',
                                title: 'Success',
                                text: `Download completed for the ${object_request_graphs['variable']} variable in NetCDF format`,
                                effect: 'fade',
                                speed: 300,
                                customClass: '',
                                customIcon: '',
                                showIcon: true,
                                showCloseButton: true,
                                autoclose: true,
                                autotimeout: 3000,
                                gap: 20,
                                distance: 20,
                                type: 1,
                                position: 'right top'
                              })
                              // $.notify(
                              //     {
                              //         message: `Download completed for the ${object_request_graphs['variable']} variable in NetCDF format`
                              //     },
                              //     {
                              //         type: "success",
                              //         allow_dismiss: true,
                              //         z_index: 20000,
                              //         delay: 5000,
                              //         animate: {
                              //           enter: 'animated fadeInRight',
                              //           exit: 'animated fadeOutRight'
                              //         },
                              //         onShow: function() {
                              //             this.css({'width':'auto','height':'auto'});
                              //         }
                              //     }
                              // )
                          }).
                          catch(error =>{ console
                            $("#graphAddLoading").addClass("hidden");
                            new Notify ({
                              status: 'error',
                              title: 'Error',
                              text: `There Service ${object_request_variable['hs_url']} does not provide NetCDF downloads`,
                              effect: 'fade',
                              speed: 300,
                              customClass: '',
                              customIcon: '',
                              showIcon: true,
                              showCloseButton: true,
                              autoclose: true,
                              autotimeout: 3000,
                              gap: 20,
                              distance: 20,
                              type: 1,
                              position: 'right top'
                            })                            
                            // $.notify(
                            //     {
                            //         message: `There Service ${object_request_variable['hs_url']} does not provide NetCDF downloads`
                            //     },
                            //     {
                            //         type: "danger",
                            //         allow_dismiss: true,
                            //         z_index: 20000,
                            //         delay: 5000,
                            //         animate: {
                            //           enter: 'animated fadeInRight',
                            //           exit: 'animated fadeOutRight'
                            //         },
                            //         onShow: function() {
                            //             this.css({'width':'auto','height':'auto'});
                            //         }
                            //     }
                            // )
                          });
                        }
                      }
                    }
                    catch(e){
                      console.log(e);
                      $("#graphAddLoading").addClass("hidden");
                      new Notify ({
                        status: 'error',
                        title: 'Error',
                        text: `There was a problem downloading the file for the Service ${object_request_variable['hs_url']}`,
                        effect: 'fade',
                        speed: 300,
                        customClass: '',
                        customIcon: '',
                        showIcon: true,
                        showCloseButton: true,
                        autoclose: true,
                        autotimeout: 3000,
                        gap: 20,
                        distance: 20,
                        type: 1,
                        position: 'right top'
                      })     
                      // $.notify(
                      //     {
                      //         message: `There was a problem downloading the file for the Service ${object_request_variable['hs_url']}`
                      //     },
                      //     {
                      //         type: "danger",
                      //         allow_dismiss: true,
                      //         z_index: 20000,
                      //         delay: 5000,
                      //         animate: {
                      //           enter: 'animated fadeInRight',
                      //           exit: 'animated fadeOutRight'
                      //         },
                      //         onShow: function() {
                      //             this.css({'width':'auto','height':'auto'});
                      //         }
                      //     }
                      // )
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
               let title_graph=  `${object_request_graphs['site_name']} - ${selectedItemText}
               No Data Available`
               initialize_graphs([],[],title_graph,"","","","scatter");
               $("#graphAddLoading").addClass("hidden")
               new Notify ({
                status: 'warning',
                title: 'Warning',
                text: `There is no data for this variable, Sorry`,
                effect: 'fade',
                speed: 300,
                customClass: '',
                customIcon: '',
                showIcon: true,
                showCloseButton: true,
                autoclose: true,
                autotimeout: 3000,
                gap: 20,
                distance: 20,
                type: 1,
                position: 'right top'
              })  
              //  $.notify(
              //      {
              //          message: `There is no data for this variable, Sorry`
              //      },
              //      {
              //          type: "danger",
              //          allow_dismiss: true,
              //          z_index: 20000,
              //          delay: 5000,
              //          animate: {
              //            enter: 'animated fadeInRight',
              //            exit: 'animated fadeOutRight'
              //          },
              //          onShow: function() {
              //              this.css({'width':'auto','height':'auto'});
              //          }
              //      }
              //  )

             }
            }
            catch(e){
              console.log(e);
              $("#graphAddLoading").addClass("hidden")
              new Notify ({
                status: 'error',
                title: 'Error',
                text: `Unable to retrieve the data for the selected variable`,
                effect: 'fade',
                speed: 300,
                customClass: '',
                customIcon: '',
                showIcon: true,
                showCloseButton: true,
                autoclose: true,
                autotimeout: 3000,
                gap: 20,
                distance: 20,
                type: 1,
                position: 'right top'
              }) 
              // $.notify(
              //     {
              //         message: `Unable to retrieve the data for the selected variable`
              //     },
              //     {
              //         type: "danger",
              //         allow_dismiss: true,
              //         z_index: 20000,
              //         delay: 5000,
              //         animate: {
              //           enter: 'animated fadeInRight',
              //           exit: 'animated fadeOutRight'
              //         },
              //         onShow: function() {
              //             this.css({'width':'auto','height':'auto'});
              //         }
              //     }
              // )
            }

         },
         error: function(xhr, status, error){
           console.log(error);
           let title_graph=  `${object_request_graphs['site_name']} - ${selectedItemText}
           No Data Available`
           initialize_graphs([],[],title_graph,"","","","scatter");
           $("#graphAddLoading").addClass("hidden")
           new Notify ({
            status: 'error',
            title: 'Error',
            text: `There is an error retrieving the values for the ${selectedItem} variable`,
            effect: 'fade',
            speed: 300,
            customClass: '',
            customIcon: '',
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 3000,
            gap: 20,
            distance: 20,
            type: 1,
            position: 'right top'
          }) 
          //  $.notify(
          //      {
          //          message: `There is an error retrieving the values for the ${selectedItem} variable `
          //      },
          //      {
          //          type: "danger",
          //          allow_dismiss: true,
          //          z_index: 20000,
          //          delay: 5000,
          //          animate: {
          //            enter: 'animated fadeInRight',
          //            exit: 'animated fadeOutRight'
          //          },
          //          onShow: function() {
          //              this.css({'width':'auto','height':'auto'});
          //          }
          //      }
          //  )
         }

        })

      }
  }
  catch(e){
    console.log(e);
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `Unable to retrieve the data for the selected variable`,
      effect: 'fade',
      speed: 300,
      customClass: '',
      customIcon: '',
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'right top'
    })
    // $.notify(
    //     {
    //         message: `Unable to retrieve the data for the selected variable`
    //     },
    //     {
    //         type: "danger",
    //         allow_dismiss: true,
    //         z_index: 20000,
    //         delay: 5000,
    //         animate: {
    //           enter: 'animated fadeInRight',
    //           exit: 'animated fadeOutRight'
    //         },
    //         onShow: function() {
    //             this.css({'width':'auto','height':'auto'});
    //         }
    //     }
    // )
  }
}

$("#update_graphs").on("click",select_variable_change);
