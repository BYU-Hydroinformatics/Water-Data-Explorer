/*****************************************************************************
 * FILE:                Main.js
 * BEGGINING DATE:      16 August 2019
 * ENDING DATE:         ---------------
 * AUTHOR:              Giovanni Romero Bustamante
 * COPYRIGHT:           (c) Brigham Young University 2020
 * LICENSE:             MIT
 *
 *****************************************************************************/
/*****************************************************************************
 *                      LIBRARY WRAPPER
 *****************************************************************************/
 var staticPath = baseStatic;
 // var apiServer = `${staticPath.replace("/static", "/apps")}`;
 var apiServer = "";
 console.log(apiServer);
 window.onbeforeunload = null
 var $myGroup = $("#helpGroup")
 $myGroup.on("show.bs.collapse", ".collapse", function() {
     $myGroup.find(".collapse.in").collapse("hide")
 })
 ;(function() {
     "use strict"
     window.addEventListener(
         "load",
         function() {
             // Fetch all the forms we want to apply custom Bootstrap validation styles to
             var forms = document.getElementsByClassName("needs-validation")
             // Loop over them and prevent submission
             var validation = Array.prototype.filter.call(forms, function(form) {
                 form.addEventListener(
                     "submit",
                     function(event) {
                         if (form.checkValidity() === false) {
                             event.preventDefault()
                             event.stopPropagation()
                         }
                         form.classList.add("was-validated")
                     },
                     false
                 )
             })
         },
         false
     )
 })()

 function featureStyle() {
     var style = new ol.style.Style({
         image: new ol.style.Circle({
             radius: 6,
             stroke: new ol.style.Stroke({
                 color: "white",
                 width: 1
             }),
             fill: new ol.style.Fill({
                 color: `#${(((1 << 24) * Math.random()) | 0).toString(16)}`
             })
         })
     })
     return style
 }

var water_data_explorer_PACKAGE = (function() {
    // Wrap the library in a package function
    "use strict" // And enable strict mode for this library
    /************************************************************************
     *                      MODULE LEVEL / GLOBAL VARIABLES
     *************************************************************************/
    var ContextMenuBase,
        colors,
        current_layer,
        layers,
        layersDict, //Dictionary for keeping track of the new layers that are being added to the map
        map,
        shpSource,
        shpLayer,
        wmsLayer,
        wmsSource
    /************************************************************************
     *                    PRIVATE FUNCTION DECLARATIONS
     *************************************************************************/
    var filter_words,
        add_soap,
        addDefaultBehaviorToAjax,
        checkCsrfSafe,
        getCookie,
        click_catalog,
        clear_coords,
        generate_graph,
        generate_plot,
        get_climate_serv,
        get_data_rods,
        get_his_server,
        get_hs_list,
        get_random_color,
        init_map,
        init_menu,
        init_jquery_var,
        init_events,
        load_catalog,
        location_search,
        $modalAddHS,
        $modalAddSOAP,
        set_color,
        $SoapVariable,
        $modalAddGroupHydro,
        $modalHIS,
        $modalClimate,
        $modalDelete,
        $modalDataRods,
        $modalInterface,
        $modalUpload,
        $btnUpload,
        onClickZoomTo,
        onClickDeleteLayer,
        $hs_list,
        prepare_files,
        update_catalog,
        upload_file,
        createExportCanvas,
        create_group_hydroservers,
        load_group_hydroservers,
        addExpandableMenu,
        load_individual_hydroservers_group,
        actual_group,
        add_hydroserver,
        delete_hydroserver,
        get_hs_list_from_hydroserver,
        delete_group_of_hydroservers,
        get_keywords_from_group,
        remove_individual_hydroservers_group,
        get_all_the_checked_keywords,
        get_servers_with_keywords_from_group,
        remove_list_and_layers_from_hydroservers,
        reset_keywords,
        get_active_hydroservers_groups,
        lis_deleted = [],
        layers_deleted = [],
        lis_separators = [],
        get_notification,
        activate_deactivate_graphs,
        activate_layer_values,
        initialize_graphs,
        object_request_graphs ={},
        // object_request_variable={},
        select_variable_change,
        select_variable_change2,
        codes_variables_array={},
        change_type_graphs_group,
        change_type_graphs_individual,
        add_boundary_map,
        disable_map,
        active_map_feature_graphs = {
          'scatter':{},
          'bar':{},
          'pie':{},
          'whisker':{}
        },
        cleanGraphs,
      /************************************************************************
     *                    PRIVATE FUNCTION IMPLEMENTATIONS : How are these private? JS has no concept of that
     *************************************************************************/
    colors = [
        "#ff0000",
        "#0033cc",
        "#000099",
        "#ff0066",
        "#ff00ff",
        "#800000",
        "#6699ff",
        "#6600cc",
        "#00ffff"
    ]

    /*
    ************ FUNCTION NAME: CLEANGRAPH **********************
    ************ PURPOSE: RESET THE GRAPHS PORTION ***********
    */
    cleanGraphs = function(){
      //RESET THE GRAPHS PORTION //
      $( "#table_div" ).empty();
      initialize_graphs([],[],"No data Available","","","","scatter");
      $("#siteName_title").html("Site Variables Info");
      $("#siteDes").html("No Site Selected, when a site is 'clicked' metadata of the site will display in this part such as a name and a description.");
      $('#variables_graph option').remove();
      $('#variables_graph').selectpicker('refresh');
      // $('#variables_graph').empty();
      $("#variables_graph").html(`<option > No Variables Available . . .</option>`);
      $('#datetimepicker6').datepicker('update', '');
      $('#datetimepicker7').datepicker('update', '');

    }
    /*
    ************ FUNCTION NAME: DISABLE MAP **********************
    ************ PURPOSE: DISABLES OR ENABLES THE ZOOM OUT AND DRAGGING OF THE MAP ***********
    */
    disable_map =  function (){

      let map_block=document.getElementById("blockPosition");
      let layerBoundary = layersDict['boundaryLayer'];
      let vectorSource = layerBoundary.getSource();
      if(map_block.checked){
        var extent = vectorSource.getExtent();
        console.log(extent);
        map.getView().fit(extent, map.getSize());
        var properties = map.getView().getProperties();
        properties["minZoom"] = map.getView().getZoom();
        if(geoServerMovement){
          properties["extent"]= extent

        }
        map.setView(new ol.View(properties));
        map.addLayer(layersDict['boundaryLayer']);
      }
      else{
        var properties = map.getView().getProperties();
        properties["minZoom"] = 1;
        if(geoServerMovement){
          properties["extent"]= extent

        }
        map.setView(new ol.View(properties));
        map.removeLayer(layersDict['boundaryLayer']);
      }
    }

    $('#blockPosition').change(disable_map)

    /*
    ************ FUNCTION NAME: ADD_BOUNDARY_MAP **********************
    ************ PURPOSE: ADD THE BOUNDARY LAYER TO THE MAP TAKING INTO ACCCOUNT THE CUSTOM SETTINGS***********
    */
    add_boundary_map = function(color, width, map){

      if(color === "None"){
        color = "#000000";
      }
      if(width === "None"){
        width = 3;
      }
      if(endpointGeoServer ==="None"){
        endpointGeoServer = "Whole_world";
        console.log(endpointGeoServer);
      }
      if(geoServerWorkspace ==="None"){
        geoServerWorkspace= "Whole_world";
      }
      if(geoServerLayer ==="None"){
        geoServerLayer= "Whole_world";
      }
      if(endpointGeoServer !== "Whole_world"){
        var owsrootUrl = endpointGeoServer;
        var workspaceURL = geoServerWorkspace;
        var layerURL = geoServerLayer;
        var typeRoot = "ows";
        var serviceURL = "WFS";
        var versionURL = "1.1.0";
        var request = "GetFeature";
        var typename = `${workspaceURL}:${layerURL}`;
        var outputFormat = "application/json";
        var finalURL = `${owsrootUrl}/${typeRoot}?service=${serviceURL}&version=${versionURL}&request=${request}&typename=${typename}&outputFormat=${outputFormat} `;
        var vectorSource = new ol.source.Vector({
            url:finalURL,
            format: new ol.format.GeoJSON()
        })
        var vector_layer = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                //color Fill
                // fill: new ol.style.Fill({
                //     color: "rgba(255, 255, 255, 0)"
                // }),
                //ourside part of contour //
                stroke: new ol.style.Stroke({
                    color: color,
                    width: width
                }),
            })
        });
        layersDict['boundaryLayer'] = vector_layer;
        map.addLayer(vector_layer);
        vectorSource.once('change',function(e){
          if(vectorSource.getState() === 'ready') {
            var extent = vectorSource.getExtent();
            console.log(extent);
            map.getView().fit(extent, map.getSize());

            //disable zoom out //
            var properties = map.getView().getProperties();
            properties["minZoom"] = map.getView().getZoom();
            if(geoServerMovement){
              properties["extent"]= extent

            }
            map.setView(new ol.View(properties));

          }
        });
      }


    }

    /*
    ************ FUNCTION NAME: CHANGE_TYPE_GRAPHS_INDIVIDUAL **********************
    ************ PURPOSE: CHANGE THE GRAPHS THAT ARE PART OF THE ***********
    */
    change_type_graphs_individual = function(){
      let chart_type= $("#type_graph_select2")['0'].value;

      if(chart_type === "Scatter"){
        console.log("inside the scatter char");

        // $("#variables_graph")['0'].disabled = false;


        // $("#variables_graph").val($("#variables_graph option:first").val());
        // $("#variables_graph")['0'].value = 0
        console.log($("#variables_graph"));
        // $("#variables_graph")[0].selectedIndex = 0
        // $("#variables_graph option:selected").prop("selected", false);
        // $("#variables_graph option:first").prop("selected", "selected");

        console.log($("#variables_graph"));




        console.log(active_map_feature_graphs);
        if(active_map_feature_graphs['scatter'].hasOwnProperty('y_array')){
          $('#variables_graph').selectpicker('setStyle', 'btn-primary');

          console.log(active_map_feature_graphs['scatter']);
          // initialize_graphs(active_map_feature_graphs['scatter']['x_a'])

          let x_array=active_map_feature_graphs['scatter']['x_array'];
          let y_array= active_map_feature_graphs['scatter']['y_array'];
          let title_graph= active_map_feature_graphs['scatter']['title_graph'];
          let units_x = active_map_feature_graphs['scatter']['units_x'];
          let units_y = active_map_feature_graphs['scatter']['units_y'];
          let variable_name_legend = active_map_feature_graphs['scatter']['variable_name_legend'];
          let type = active_map_feature_graphs['scatter']['type'];
          initialize_graphs(x_array,y_array,title_graph, units_y, units_x, variable_name_legend,type);
          console.log("scatter chart has been changed");

        }
        else{
          initialize_graphs([],[],"No data Available","","","","scatter");

          $.notify(
              {
                  message: `Click on one of the hydroserver data points to retrieve a Scatter plot or either the Scatter plot does not have any values`
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
      if(chart_type === "Whisker and Box"){
        console.log("inside the whisker and plot char");

        // $("#variables_graph")['0'].disabled = false;
        console.log($("#variables_graph"));
        // $("#variables_graph")[0].selectedIndex = 0
        // $("#variables_graph option:selected").prop("selected", false);
        // $("#variables_graph option:first").prop("selected", "selected");
        console.log($("#variables_graph"));

        console.log(active_map_feature_graphs);
        if(active_map_feature_graphs['scatter'].hasOwnProperty('y_array')){
          $('#variables_graph').selectpicker('setStyle', 'btn-primary');

          console.log(active_map_feature_graphs['scatter']);
          // initialize_graphs(active_map_feature_graphs['scatter']['x_a'])

          let y_array= active_map_feature_graphs['scatter']['y_array'];
          let title_graph= active_map_feature_graphs['scatter']['title_graph'];
          let type = active_map_feature_graphs['whisker']['type'];
          initialize_graphs(undefined,y_array,title_graph, undefined, undefined, undefined,type);
          console.log("whisker chart has been changed");

        }
        else{
          initialize_graphs([],[],"No data Available","","","","scatter");

          $.notify(
              {
                  message: `Click on one of the hydroserver data points to retrieve a Whisker and Box plot`
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
    /*
    ************ FUNCTION NAME: CHANGE_TYPE_GRAPHS_GROUP **********************
    ************ PURPOSE: CHANGE THE GRAPHS THAT ARE PART OF THE ***********
    */
    change_type_graphs_group = function(){
      let chart_type= $("#type_graph_select")['0'].value;

      if(chart_type === "Bar"){
        console.log("inside the bar type");
        // $("#variables_graph")['0'].disabled = true;
        $('#variables_graph').selectpicker('setStyle', 'btn-info');


        if(active_map_feature_graphs['bar'].hasOwnProperty('y_array')){
          if(active_map_feature_graphs['bar']['y_array'].length > 0){

            initialize_graphs(active_map_feature_graphs['bar']['x_array'],active_map_feature_graphs['bar']['y_array'],active_map_feature_graphs['bar']['title_graph'],undefined,undefined,undefined,active_map_feature_graphs['bar']['type']);
            console.log("the graph has been change to bar");
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
        console.log("inside the pie char");
        // $("#variables_graph")['0'].disabled = true;
        $('#variables_graph').selectpicker('setStyle', 'btn-info');

        if(active_map_feature_graphs['pie'].hasOwnProperty('y_array')){
          if(active_map_feature_graphs['pie']['y_array'].length > 0){

            console.log(active_map_feature_graphs['pie']);
            if (active_map_feature_graphs['pie']['check_none'].includes(true)){
              initialize_graphs(active_map_feature_graphs['pie']['x_array'],active_map_feature_graphs['pie']['y_array'],active_map_feature_graphs['pie']['title_graph'], undefined, undefined, undefined,active_map_feature_graphs['pie']['type']);
              console.log("change to pie chart");

            }
            else{
              initialize_graphs(['no variable has data'],[1],active_map_feature_graphs['pie']['title_graph'], undefined, undefined, undefined,active_map_feature_graphs['pie']['type']);
              console.log("change to pie chart");

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
    $("#type_graph_select").change(change_type_graphs_group)
    $("#type_graph_select2").change(change_type_graphs_individual)


    /*
    ************ FUNCTION NAME: SELECT_VARIABLE_CHANGE **********************
    ************ PURPOSE: SELECT A VARIABLE FROM A DROPDOWN AND CHANGE THE GRAPH ***********
    */

    select_variable_change = function(){
      console.log("new change on this");
      console.log(this);
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
      // object_request_graphs['timeFrame'] = arrayTime;
      object_request_variable['timeFrame'] = arrayTime;

      // object_request_graphs['actual_method'] = object_request_graphs['methodsIDs'][object_request_graphs['variables_array'][selectedItem-1]];
      object_request_variable['actual_method'] = object_request_graphs['methodsIDs'][object_request_graphs['variables_array'][selectedItem-1]];
      // console.log(object_request_graphs['actual_method']);
      // console.log(object_request_graphs);

      if(chart_type == "Scatter" || chart_type =="Whisker and Box"){
        $("#type_graph_select")['0'].disabled = false;

        // console.log(selectedItem);

        object_request_graphs['variable']=selectedItem;
        // object_request_variable['variable']=selectedItem;
        // object_request_graphs['code_variable']= codes_variables_array[`${selectedItem}`-1];
        object_request_variable['code_variable']= codes_variables_array[`${selectedItem}`-1];
        object_request_variable['hs_url'] =  object_request_graphs['hs_url'];
        object_request_variable['code'] =  object_request_graphs['code'];
        object_request_variable['network'] =  object_request_graphs['network'];
        // console.log(object_request_graphs);
        console.log(object_request_variable);
        $("#graphAddLoading").css({left:'50%',bottom:"15%", position:'absolute',"z-index": 9999});
        $("#graphAddLoading").removeClass("hidden");
        $.ajax({
          type:"GET",
          url: `get-values-graph-hs`,
          dataType: "JSON",
          data: object_request_variable,
          success: function(result1){
            console.log(result1);
            if(result1.graphs !== undefined){
              console.log(result1);
              let time_series_array = result1['graphs']['values2'];
              console.log(time_series_array);

              let x_array = [];
              time_series_array.forEach(function(x){
                x_array.push(x[0]);
              })
              let y_array=[]
              time_series_array.forEach(function(y){
                // console.log(y[1]);
                if(y[1]===-9999){
                  y_array.push(null)
                }
                else{
                  y_array.push(y[1]);
                }

              })
              console.log(x_array);
              console.log(y_array);
              let title_graph = `${result1['graphs']['title']}`;
              let units_x = `${result1['graphs']['unit']}` ;
              let units_y = "Time";
              let variable_name_legend = `${result1['graphs']['variable']}`;
              let type= "scatter";
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
                console.log("it is an scatter plot for the variable change");
                initialize_graphs(x_array,y_array,title_graph,units_y, units_x,variable_name_legend,type);
              }
              if(chart_type ==="Whisker and Box"){
                console.log("it is an whisker and box plot for the variable change");

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
        })

      }

    }
    $("#variables_graph").change(select_variable_change);
    $("#update_graphs").on("click",select_variable_change);

    /*
    ************ FUNCTION NAME: INITIALIZE_GRAPHS **********************
    ************ PURPOSE: INITIALIZES ANY GRAH IN THE TIME SERIE OR BEGINNING ***********
    */
    initialize_graphs = function(xArray,yArray,title_graph,xTitle,yTitle,legend1,type){
      let element_graphs=document.getElementById("graph");
      $("#graphs").empty();
      // let element_graphs2=document.getElementById("graph2");
      let element_map =document.getElementById("map");
      // if(actual_state){
        //make the down part visible and also give the design of the model//
        console.log("on");

        element_graphs.style.cssText=  "display: flex; flex-direction: row;";
        map.updateSize();
        var config = {
          modeBarButtonsToAdd: [{ name: 'downloadCsv', title: 'Download data as csv', icon: Plotly.Icons.disk, click: function(){
            var csvData = [];
            var header = [xTitle,yTitle] //main header.
            csvData.push(header);
            for (var i = 0; i < xArray.length; i++){ //data
              var line = [xArray[i],yArray[i]];
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
            } }],
        }
      if(type === "scatter"){
        var trace1 = {
          x: xArray,
          y: yArray,
          // mode: 'markers',
          mode: 'lines',
          type: type,
          name: legend1,
          text: [],
          marker: { size: 5 },
          line: {color: '#17BECF'}
        };


        var data = [trace1];

        var layout = {
          xaxis: {
            title: {
             text: xTitle,
             font: {
               size: 15,
               color: '#7f7f7f'
             }
           }
            // range: [ 0, 5.25 ]
          },
          yaxis: {
            title: {
             text: yTitle,
             font: {
               size: 15,
               color: '#7f7f7f'
             }
           }
            // range: [0, 4]
          },
          title: title_graph,
          autosize: true,
          showlegend:true
        };

        Plotly.newPlot('plots', data, layout,config);

      }
      if(type ==="bar"){
        // var xValue = ['Product A', 'Product B', 'Product C'];
        // var yValue = [20, 14, 23];
        var trace1 = {
          x: xArray,
          y: yArray,
          type: 'bar',
          text: yArray.map(String),
          textposition: 'auto',
          hoverinfo: 'none',
          marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
            line: {
              color: 'rgb(8,48,107)',
              width: 1.5
            }
          }
        };

        var data = [trace1];

        var layout = {
          title: 'Variables',
          barmode: 'stack',
          xaxis: {
            title: {
             text: xTitle,
             font: {
               size: 15,
               color: '#7f7f7f'
             }
           },
           rangemode: 'tozero'
            // range: [ 0, 5.25 ]
          },
          yaxis: {
            title: {
             text: yTitle,
             font: {
               size: 15,
               color: '#7f7f7f'
             }
           },
           rangemode: 'tozero'

            // range: [0, 4]
          },
        };
        Plotly.newPlot('plots', data, layout,config);

      }
      if(type === "pie"){
        var data = [{
          values:yArray,
          labels:xArray,
          type: type,
          // automargin: true,
          hoverinfo: 'label + percent',
           textposition: 'inside'
        }];

        var layout = {
          title: title_graph,
          height: 400,
          width: 900,
          showlegend: true,
          // autosize: true,
          legend: {
            x: 1,
            y: 0.5
          }

        };

        Plotly.newPlot('plots', data, layout,config);

      }
      if(type === "whisker"){
        let trace1 = {
          y: yArray,
          type: 'box',
          name: 'All Points',
          // jitter: 0.3,
          // pointpos: -1.8,
          marker: {color: '#3D9970'},
          boxpoints: 'outliers',
          boxmean: 'sd'

        };

        let data = [trace1];

        let layout = {
          title: title_graph
        };
        Plotly.newPlot('plots', data, layout,config);

      }

    // }
  }



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
        console.log(object_request);

        var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
            //you can add a condition on layer to restrict the listener
            if(feature){


              if(layersDict['selectedPoint']){
                map.removeLayer(layersDict['selectedPoint'])
                delete layersDict[title]
                map.updateSize()
              }

              let actual_Source = new ol.source.Vector({})
              actual_Source.addFeature(feature);
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
              console.log("adding new feature");
              console.log(vectorLayer);
              map.addLayer(vectorLayer);
            }
            return feature;
            });
        if (feature) {

          initialize_graphs([],[],"No data Available","","","","scatter");


          active_map_feature_graphs={
            'scatter':{},
            'bar':{},
            'pie':{},
            'whisker':{}
          }
          console.log(feature.values_['hs_name']);

          $("#siteName_title").html(feature.values_['name']);
          // object_request['hs_name']=feature.values_['hs_name'];
          // object_request['site_name']=feature.values_['name'];
          object_request['hs_url']=feature.values_['hs_url'];
          object_request['code']=feature.values_['code'];
          object_request['network']=feature.values_['network'];
          // $("#plots").hide();
          $("#graphAddLoading").css({left:'50%',bottom:"15%", position:'absolute',"z-index": 9999});
          $("#graphAddLoading").removeClass("hidden");
          console.log(object_request);

          $.ajax({
            type:"GET",
            url: `get-values-hs`,
            dataType: "JSON",
            data: object_request,
            success: function(result){
              console.log(result);
              let description_site = document.getElementById('siteDes')
              console.log(description_site);
              description_site.innerHTML =
                ` <p> <em>Organization:</em> ${result['description'][Object.keys(result['description'])[0]]['organization']} <p>
                  <p> <em>Citation:</em> ${result['description'][Object.keys(result['description'])[0]]['citation']} <p>
                  <p> <em>Description:</em> ${result['description'][Object.keys(result['description'])[0]]['sourceDescription']}</p>`

              let table_begin =
            `<br>
            <p>Table of Variables</p>
            <table id="siteVariableTable" class="table table-striped table-hover table-condensed">
                <tr class="danger">
                  <th>Variable</th>
                  <th>Code</th>
                  <th>Data Points</th>
                </tr>`;
              for(let i=0; i<result['variables'].length ; ++i){
                let newRow =
                `
                <tr>
                  <th>${result['variables'][i]}</th>
                  <th>${result['codes'][i]}</th>
                  <th>${result['counts'][i]}</th>
                </tr>
                `
                table_begin = table_begin + newRow;
              }
              table_begin = table_begin + `</table>`;
              $("#table_div").html(table_begin);

              active_map_feature_graphs['bar']['x_array']=[];
              active_map_feature_graphs['pie']['x_array']=[];


              // create Dict //
              for(let i=0; i< result['variables'].length; ++i){
                // let x_axis= `${result['variables'][i]} (${result['codes'][i]})`;
                let x_axis= `${result['variables'][i]}`;
                active_map_feature_graphs['bar']['x_array'].push(x_axis);
                active_map_feature_graphs['pie']['x_array'].push(x_axis);

              }
              // let title_info = `${object_request['site_name']} Variables Distribution`;
              let title_info = `${feature.values_['name']} Variables Distribution`;

              // active_map_feature_graphs['bar']['x_array'] =result['variables'];
              active_map_feature_graphs['bar']['y_array'] = result['counts'];
              active_map_feature_graphs['bar']['type'] = 'bar';
              active_map_feature_graphs['bar']['title_graph'] = title_info;

              active_map_feature_graphs['pie']['y_array'] = result['counts'];
              active_map_feature_graphs['pie']['type'] = 'pie';
              active_map_feature_graphs['pie']['title_graph'] = title_info;



              let check_empty_pieChart = true;
              let check_array = [];

              result['counts'].forEach(function(x){
                if (x > 0){
                  check_empty_pieChart = true;
                  check_array.push(check_empty_pieChart);
                }
                else{
                  check_empty_pieChart = false;
                  check_array.push(check_empty_pieChart);

                }

              })
              active_map_feature_graphs['pie']['check_none'] = check_array;
              console.log(active_map_feature_graphs['pie']['check_none']);

              if (check_array.includes(true)) {
                initialize_graphs(active_map_feature_graphs['pie']['x_array'],result['counts'],title_info, undefined, undefined, undefined,'pie');
              }
              else{
                initialize_graphs(['no variable has data'],[1],title_info, undefined, undefined, undefined,'pie');

              }

              evt.stopPropagation();
              let object_code_and_variable = {};
              let variables = result['variables'];
              let code_variable =result['codes'];
              codes_variables_array = JSON.parse(JSON.stringify(code_variable));
              for(let i=0; i< variables.length ; ++i){
                object_code_and_variable[`${variables[i]}`]=code_variable[i];
              }
              // console.log(object_code_and_variable);
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
                    console.log("initial");
                    // option = `<option selected = "selected>Variables Ready ..</option>`;
                    option_begin = `<option value=${i}>${variable} (${result['counts'][i-1]}) Data Points Counted </option>`;
                    variable_select.append(option_begin)

                  }
                  else{
                    option = `<option value=${i} >${variable} (${result['counts'][i-1]}) Data Points Counted</option>`;

                  }
                  variable_select.append(option)
                  // variable_select.append(option_variables)

                  variable_select.selectpicker("refresh");
                  i = i+1;
              });
              console.log(object_request);
              console.log($('#variables_graph'));
              let object_request2 = {};
              object_request2['hs_name']=feature.values_['hs_name'];
              object_request2['site_name']=feature.values_['name'];
              object_request2['hs_url']=feature.values_['hs_url'];
              object_request2['code']=feature.values_['code'];
              object_request2['network']=feature.values_['network'];
              //CONTINUE HERE // AND TRY TO SEE HOW IT GOES //
              // console.log(object_request);
              var selectedItem = $('#variables_graph')['0'].value;
              var selectedItemText = $('#variables_graph')['0'].text;
              console.log(selectedItem);

              object_request2['variable']=selectedItem;
              object_request2['code_variable']= code_variable[`${selectedItem}` -1];
              object_request2['times_series'] = result['times_series']
              object_request2['methodsIDs'] = result['methodsIDs']
              object_request2['variables_array']=result['variables']
              object_request_graphs = JSON.parse(JSON.stringify(object_request2));
              console.log(object_request2);
              let start_dateUTC = result['times_series'][Object.keys(result['times_series'])[0]]['beginDateTimeUTC']
              console.log(start_dateUTC);
              let dateUTC_start = new Date(start_dateUTC)
              console.log(dateUTC_start);
              let starts = start_dateUTC.split("T");
              console.log(starts[0]);
              // let start_date_ = starts[0]+ ' '+ starts[1]
              let starts_no_seconds = starts[1].split(":");
              // object_request_graphs["startTime_hhmmss"] = starts_no_seconds[0] +":" +starts_no_seconds[1];
              let end_dateUTC = result['times_series'][Object.keys(result['times_series'])[0]]['endDateTimeUTC']
              let dateUTC_end = new Date(end_dateUTC)

              let ends = end_dateUTC.split("T");
              console.log(ends[0]);

              let ends_no_seconds = ends[1].split(":");
              console.log(dateUTC_end);


              console.log(new Date(starts[0]));
              console.log(new Date(ends[0]));

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

              console.log($('#datetimepicker6').datepicker('getDate'));
              console.log($('#datetimepicker7').datepicker('getDate'));

              $('#datetimepicker6').datepicker('setStartDate', dateUTC_start);
              $('#datetimepicker6').datepicker('setEndDate', dateUTC_end);
              // $('#datetimepicker7').datepicker('setStartDate',dateUTC_end);
              $('#datetimepicker7').datepicker('setEndDate',dateUTC_end);
               $("#graphAddLoading").addClass("hidden")


            }

          })

        }
      });

    }

    /*
    ************ FUNCTION NAME: ACTIVATE_DEACTIVATE_GRAPHS **********************
    ************ PURPOSE: THE FUNCTIONS SHOWS THE GRAPHS IN THE LOWER PORTION OF THE MAP ***********
    */
    activate_deactivate_graphs = function(){
      console.log("we ACTIVATEEAAGAG");
      let actual_state=$(this).prop('checked');
      let element_graphs=document.getElementById("graph");

      let element_map =document.getElementById("map");
      if(actual_state){
        element_graphs.style.cssText=  "display: flex !important; flex-direction: row;";
        map.updateSize();

      }
      else{

        console.log("off");
        $("#graph").hide();
        if(map !==undefined){
          map.updateSize();

        }

      }
    };
    $('#sG').change(activate_deactivate_graphs)

    /*
    ************ FUNCTION NAME: GET_NOTIFICATION **********************
    ************ PURPOSE: THE FUNCTIONS GIVES NOTIFICATIONS ***********
    *********** NEEDS FIX, NOT CURRENTLY BEING USED *********************
    */

    get_notification = function(type1, message1){
        $.notify(
            {
                message: message1
            },
            {
                type: type1,
                allow_dismiss: true,
                z_index: 20000,
                delay: 5000
            }
        )
    }
    /*
    ************ FUNCTION NAME: SET_COLOR **********************
    ************ PURPOSE:RETURN A RANDOM COLOR FROM THE LIST OF COLORS  ***********
    */

    set_color = function() {
        var color = colors[Math.floor(Math.random() * colors.length)]
        return color
    }
    /*
    ************ FUNCTION NAME: CLEA_COORDS**********************
    ************ PURPOSE: Clear the point/polygon coordinates so that its easier for the post request to process the form ***********
    */

    clear_coords = function() {
        $("#poly-lat-lon").val("")
        $("#point-lat-lon").val("")
    }


    /*
    ************ FUNCTION NAME: get_random_color**********************
    ************ PURPOSE:LIST OF COLOTS FOR GENERATIING TEH STYLING OF THE POINTS ON THE MAP  ***********
    */

    //
    get_random_color = function() {
        var letters = "012345".split("")
        var color = "#"
        color += letters[Math.round(Math.random() * 5)]
        letters = "0123456789ABCDEF".split("")
        for (var i = 0; i < 5; i++) {
            color += letters[Math.round(Math.random() * 15)]
        }
        return color
    }

    /*
    ************ FUNCTION NAME: INIT_MAP**********************
    ************ PURPOSE:INIT MAP WITH THE OPENLAYERS BASE MAP AND THE OTHER ADDEDLAYERS OF HYDROSERVERS  ***********
    */

    init_map = function() {
        var projection = ol.proj.get("EPSG:3857")
        var baseLayer = new ol.layer.Tile({
            source: new ol.source.BingMaps({
                key:
                    "5TC0yID7CYaqv3nVQLKe~xWVt4aXWMJq2Ed72cO4xsA~ApdeyQwHyH_btMjQS1NJ7OHKY8BK-W-EMQMrIavoQUMYXeZIQOUURnKGBOC7UCt4",
                imagerySet: "AerialWithLabels" // Options 'Aerial', 'AerialWithLabels', 'Road'
            })
        })
        //Creating an empty source and layer to store the shapefile geojson object
        shpSource = new ol.source.Vector()
        shpLayer = new ol.layer.Vector({
            source: shpSource
        })
        //Creating an empty source and layer to store the point/polygon features.
        var source = new ol.source.Vector({
            wrapX: false
        })
        var vector_layer = new ol.layer.Vector({
            name: "my_vectorlayer",
            source: source,
            style: new ol.style.Style({
                //color Fill
                fill: new ol.style.Fill({
                    color: "rgba(255, 255, 255, 0.2)"
                }),
                //ourside part of contour //
                stroke: new ol.style.Stroke({
                    color: "#ffcc33",
                    width: 2
                }),

                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: "#ffcc33"
                    })
                })
            })
        })

        layersDict = {}
        // var boundaryLayerGeoserver = add_boundary_map(geoServerColor, geoServerWidth);
        // layers = [baseLayer, vector_layer, shpLayer, boundaryLayerGeoserver]
        layers = [baseLayer, vector_layer, shpLayer];
          map = new ol.Map({
              target: "map",
              layers: layers,
              view: new ol.View({
                // -25.30066, -57.63591
                  center: [17.670578, -49.082926],
                  projection: projection,
                  zoom: 3
              }),
              controls: ol.control
                  .defaults()
                  .extend([
                      new ol.control.ZoomSlider(),
                      new ol.control.FullScreen()
                  ]),
              crossOrigin: "anonymous",
              // interactions: ol.interaction.defaults({ dragPan: false}),
          })



        var lastFeature, draw, featureType
        //Remove the last feature before drawing a new one
        var removeLastFeature = function() {
            if (lastFeature) source.removeFeature(lastFeature)
        }
        //Add the point/polygon interaction to the map
        var addInteraction = function(geomtype) {
            var typeSelect = document.getElementById("types")
            var value = typeSelect.value
            $("#data").val("")
            if (value !== "None") {
                if (draw) map.removeInteraction(draw)
                draw = new ol.interaction.Draw({
                    source: source,
                    type: geomtype
                })
                map.addInteraction(draw)
            }
            if (featureType === "Point" || featureType === "Polygon") {
                // draw.on('drawend', function (e) {
                //     removeLastFeature();
                //     lastFeature = e.feature;
                // });
                draw.on("drawend", function(e) {
                    lastFeature = e.feature
                })
                draw.on("drawstart", function(e) {
                    source.clear()
                })
            }
        }
        //Extracting information from the saved json object data
        vector_layer.getSource().on("addfeature", function(event) {
            var feature_json = saveData()
            var parsed_feature = JSON.parse(feature_json)
            var feature_type = parsed_feature["features"][0]["geometry"]["type"]
            //Save the point values to the point-lat-lon field
            if (feature_type == "Point") {
                var coords =
                    parsed_feature["features"][0]["geometry"]["coordinates"]
                var proj_coords = ol.proj.transform(
                    coords,
                    "EPSG:3857",
                    "EPSG:4326"
                )
                $("#gldas-lat-lon").val(proj_coords)
                $modalDataRods.modal("show")
            } else if (feature_type == "Polygon") {
                //Save the coordinates to the cserv-lat-lon field
                $modalClimate.modal("show")
                var coords =
                    parsed_feature["features"][0]["geometry"]["coordinates"][0]
                proj_coords = []
                coords.forEach(function(coord) {
                    var transformed = ol.proj.transform(
                        coord,
                        "EPSG:3857",
                        "EPSG:4326"
                    )
                    proj_coords.push("[" + transformed + "]")
                })
                var json_object =
                    '{"type":"Polygon","coordinates":[[' + proj_coords + "]]}"
                $("#cserv_lat_lon").val(json_object)
            }
        })
        //Save the drawn feature as a json object
        function saveData() {
            // get the format the user has chosen
            var data_type = "GeoJSON",
                // define a format the data shall be converted to
                format = new ol.format[data_type](),
                // this will be the data in the chosen format
                data
            try {
                // convert the data of the vector_layer into the chosen format
                data = format.writeFeatures(
                    vector_layer.getSource().getFeatures()
                )
            } catch (e) {
                // at time of creation there is an error in the GPX format (18.7.2014)
                $("#data").val(e.name + ": " + e.message)
                return
            }
            // $('#data').val(JSON.stringify(data, null, 4));
            return data
        }
        //Change the map based on the interaction type. Add/remove interaction accordingly.
        $("#types")
            .change(function(e) {
                featureType = $(this)
                    .find("option:selected")
                    .val()
                if (featureType == "None") {
                    $("#data").val("")
                    clear_coords()
                    map.removeInteraction(draw)
                    vector_layer.getSource().clear()
                    shpLayer.getSource().clear()
                } else if (featureType == "Point") {
                    clear_coords()
                    shpLayer.getSource().clear()
                    addInteraction(featureType)
                } else if (featureType == "Polygon") {
                    clear_coords()
                    shpLayer.getSource().clear()
                    addInteraction(featureType)
                } else if (featureType == "Upload") {
                    clear_coords()
                    vector_layer.getSource().clear()
                    shpLayer.getSource().clear()
                    map.removeInteraction(draw)
                    $modalUpload.modal("show")
                }
            })
            .change()
        // init_events()
    }
    /*
    ************ FUNCTION NAME: INIT_JEQUERY_VAR**********************
    ************ PURPOSE: INITIALIZE ALL THE JQUERY VARIABLES USED***********
    */
    init_jquery_var = function(){
      $modalAddGroupHydro= $("#modalAddGroupServer");
      // $modalAddHS = $("#modalAddHS");
      $modalAddSOAP = $("#modalAddSoap");
      // $SoapVariable = $("#soap_variable");
      $modalDelete = $("#modalDelete");
      // $modalHIS = $("#modalHISCentral");
      // $modalDataRods = $("#modalDataRods");
      $modalInterface = $("#modalInterface");
      $hs_list = $("#current-servers-list");
      // $modalClimate = $("#modalClimate");
      // $modalUpload = $("#modalUpload");
      // $btnUpload = $("#btn-add-shp");
    }

/*
************ FUNCTION NAME : GET_KEYWORDS_FROM_GROUPS
************ PURPOSE : THE FUNCTION LETS YOU FILTER THE HYDROSERVERS LIST FROM THE SELECTED GROUPS OF HYDROSERVERS

*/
  get_keywords_from_group = function(){

      // ONLY THE KEY WORDS //
      let key_words_to_search= get_all_the_checked_keywords();


      if(key_words_to_search.length > 0){

        // LOOK FOR THE GROUPS TO SEARCH//
        let input_check_array= get_active_hydroservers_groups();

        // GET THE LI ELEMENTS OF THE MENU OF THE HYDROSERVERS //
        // let lis = document.getElementById("current-servers").getElementsByTagName("li");
        let lis = document.getElementById("current-Groupservers").getElementsByTagName("li");

        let li_arrays = Array.from(lis);
        li_arrays = li_arrays.filter(x => x.attributes['layer-name'].value !== "none");

        console.log(li_arrays);


        // LOOP FOR ALL THE GROUPS THAT ARE CHECKED
        input_check_array.forEach(function(hydroserver_group){
          let allNoneGroups = Array.from(document.getElementsByClassName("noGroups"));
          console.log(allNoneGroups);
          allNoneGroups.forEach(function(e){
            e.parentNode.removeChild(e);

          })

          let servers_with_no_keyword=[]; // SERVERS WITH NO KEYWORD
          let all_servers_titles=[]; // ALL THE TITLES OF THE SERVERS

          let send_group={
            group: hydroserver_group
          };
          $("#KeywordLoading").css({"margin-left":'40%', position:'relative',"z-index": 9999});
          $("#KeywordLoading").removeClass("hidden");
          $("#btn-key-search").hide();


          $.ajax({
            type:"GET",
            url: `keyword-group`,
            dataType: "JSON",
            data: send_group,
            success: function(result){
              console.log(result);

              //ALL THE SERVERS IN THE SELECTED GROUP //
              let all_servers_in_group = result.hydroserver;
              console.log(all_servers_in_group);

              //LOOK FOR THE SERVERS THAT HAVE KEYWORDS //
              let keywords_in_servers = get_servers_with_keywords_from_group(result, key_words_to_search);
              // PRINT THE SERVERS WITH KEYWORDS
              console.log(keywords_in_servers);


              // GET ALL THE TITLES OF THE SERVERS ACTIVE OR NOT //
              all_servers_in_group.forEach(server_in_group => {
                      let title_add = server_in_group.title;
                      all_servers_titles.push(title_add);
              })

                // SERVERS WITH NO KEYWORDS //
                servers_with_no_keyword = all_servers_titles.filter(x => !keywords_in_servers.includes(x));

                //COMPARISON OF ALL THE SERVERS AND THE ONES ONLY WITH KEYWORDS //
                console.log(servers_with_no_keyword.length);
                console.log(all_servers_titles.length);

                // LI ELEMENTS THAT NEED TO BE DELETED
                let lis_to_delete = li_arrays.filter(x => servers_with_no_keyword.includes(x.attributes['layer-name'].value));
                console.log(lis_to_delete);


                //PRINT THE ARRAYS THAT KNOW WHICH LAYERS AND MENUS HAS BEEN ERRASED//
                console.log(lis_deleted);
                console.log(layers_deleted);

                console.log(lis_separators);
                console.log(keywords_in_servers);

                // ADDING THE LAYERS TO THE MAP AND MENUS THAT ARE LEFT //
                keywords_in_servers.forEach(function(server_name){
                  let checks = true;
                  let index = lis_deleted.length -1 ;
                  while (index >= 0) {
                    let title = lis_deleted[index].attributes['layer-name'].value;
                      if (title === server_name) {
                        // let title = lis.attributes['layer-name'].value;
                        console.log(title);
                        lis_separators[index].appendChild(lis_deleted[index]);
                        layersDict[title] = layers_deleted[index];
                        map.addLayer(layers_deleted[index]);
                        lis_separators.splice(index, 1);
                        lis_deleted.splice(index, 1);
                        layers_deleted.splice(index , 1);
                      }
                      index -= 1;
                  }

                })


                // DELETE THE LAYERS ON THE MAP AND ALSO THE MENUS //
                lis_to_delete.forEach(function(li_to_delete){
                  let layer = li_to_delete.attributes['layer-name'].value;
                  lis_deleted.push(li_to_delete);
                  console.log(document.getElementById(`${hydroserver_group}_list_separator`));
                  lis_separators.push(document.getElementById(`${hydroserver_group}_list_separator`));
                  document.getElementById(`${hydroserver_group}_list_separator`).removeChild(li_to_delete);
                  map.removeLayer(layersDict[layer]);
                  layers_deleted.push(layersDict[layer]);
                  delete layersDict[layer];
                  map.updateSize();
                })

                let id_group_separator = `${hydroserver_group}_list_separator`;
                let separator_element = document.getElementById(id_group_separator);
                console.log(separator_element);
                let children_element = Array.from(separator_element.children);
                console.log(children_element);
                if(children_element.length === 0 ){
                    let no_servers = `<button class="btn btn-danger btn-block noGroups"> The group does not have hydroservers</button>`
                    // let no_servers = `<p class="no_groups_tag"> The group does not have hydroservers</p>`
                      $(no_servers).appendTo(`#${id_group_separator}`) ;
                }
                else{
                  let separators = Array.from(document.getElementsByClassName("no_groups_tag"));
                  if(separators.length){
                      separators.forEach(function(separator){
                        separator.parentNode.removeChild(separator);
                      })
                  }

                }
                $("#KeywordLoading").addClass("hidden");

                $("#btn-key-search").show();
                $("#modalKeyWordSearch").modal("hide");
                $("#modalKeyWordSearch").each(function() {
                    this.reset()
                })

                cleanGraphs();


            },

            error: function(error) {
              console.log(error);
              // get_notification("danger",`Something were wrong when applying the filter with the keywords`);
              $.notify(
                  {
                      message: `Something were wrong when applying the filter with the keywords`
                  },
                  {
                      type: "danger",
                      allow_dismiss: true,
                      z_index: 20000,
                      delay: 5000
                  }
              )

            }
          });

        })

    }
    else {

      console.log("I am here with no keywords");
      console.log(lis_deleted);
      console.log(layers_deleted);
      console.log(lis_separators);
      let i = 0;
      lis_deleted.forEach( function(lis){
        let title = lis.attributes['layer-name'].value;
        lis_separators[i].appendChild(lis);
        layersDict[title] = layers_deleted[i];
        map.addLayer(layers_deleted[i]);
        i = i + 1;
      })
      lis_deleted = [];
      layers_deleted = [];
      lis_separators = [];

      let separator_elements = Array.from(document.getElementsByClassName("no_groups_tag"));
      separator_elements.forEach(function(element){
        element.parentNode.removeChild(element);
      })


      // get_notification("info", `You need to select at least one keyword` )
      $.notify(
          {
              message: `You need to select at least one keyword`
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

  $("#btn-key-search").on("click", get_keywords_from_group);

  /*
  ************ FUNCTION NAME : RESET KEYWORDS
  ************ PURPOSE : THE FUNCTION LETS YOU RESET ALL THE KEYWORDS
  */
  reset_keywords = function(){
    // UNCHECK ALL THE BOXES AND CHECK IF THERE WAS SOME THAT WERE CHECKED BEFORE //
    // $("#KeywordLoading").css({"margin-left":'40%', position:'relative',"z-index": 9999});
    // $("#KeywordLoading").removeClass("hidden");
    // $("#btn-key-search").hide();
    console.log("IN THE FUNCTION FOR RESETING ");
    let allNoneGroups = Array.from(document.getElementsByClassName("noGroups"));
    console.log(allNoneGroups);
    allNoneGroups.forEach(function(e){
      e.parentNode.removeChild(e);

    })
    let datastring = Array.from(document.getElementsByClassName("odd gradeX"));
    datastring.forEach(function(data){
      Array.from(data.children).forEach(function(column){
        if(Array.from(column.children)[0].checked ==true){
          Array.from(column.children)[0].checked = false;
        }
      })
    });

      console.log("I am here with no keywords");
      console.log(lis_deleted);
      console.log(layers_deleted);
      console.log(typeof(layers_deleted));
      console.log(lis_separators);
      let index = 0;

      lis_deleted.forEach( function(lis){
        lis.style.visibility = "visible";
        console.log("hola");
        let title = lis.attributes['layer-name'].value;

        lis_separators[index].appendChild(lis);

        layersDict[title] = layers_deleted[index];

        map.addLayer(layersDict[title]);

        index = index + 1;
      })

      lis_deleted = [];
      layers_deleted = [];
      lis_separators = [];
      let separator_elements = Array.from(document.getElementsByClassName("no_groups_tag"));
      separator_elements.forEach(function(element){
        element.parentNode.removeChild(element);
      })
      // $("#KeywordLoading").addClass("hidden");

  }
  $("#btn-r-reset").on("click", reset_keywords);

  /*
  ************ FUNCTION NAME : GET_ALL_THE_CHECKED_KEYWORDS
  ************ PURPOSE : GET ALL THE CHECKED KEYWORDS FROM THE POP-UP MENU
  */
  get_all_the_checked_keywords = function(){
    // ONLY THE KEY WORDS //
    let datastring = Array.from(document.getElementsByClassName("odd gradeX"));
    // console.log(datastring);
    let key_words_to_search=[];
    datastring.forEach(function(data){
      // console.log(Array.from(data.children));
      Array.from(data.children).forEach(function(column){
        if(Array.from(column.children)[0].checked ==true){
          // console.log();
          key_words_to_search.push(Array.from(column.children)[0].nextSibling.nodeValue.trim())
        }
      })
    });
    // filter_words = key_words_to_search;
    console.log(key_words_to_search);
    return key_words_to_search;
  }
  /*
  ************ FUNCTION NAME : GET_ACTIVE_HYDROSERVERS_GROUPS
  ************ PURPOSE : THIS GETS ALL THE ACTIVE HYDROSERVERS GROUPS
  */

  get_active_hydroservers_groups = function(){
    let active_groups_hydroservers = document.getElementById("current-Groupservers").getElementsByTagName("LI");
    let array_active_groups_hydroservers = Array.from(active_groups_hydroservers);
    let input_check_array = [];
    console.log(array_active_groups_hydroservers);
    array_active_groups_hydroservers = array_active_groups_hydroservers.filter(x => x.attributes['layer-name'].value == "none");

    array_active_groups_hydroservers.forEach(function(group){
      let input_type = Array.from(group.getElementsByTagName("INPUT"))[0];
      if(input_type.checked){
        input_check_array.push(group.innerText);
      }
    })
    console.log(input_check_array);
    return input_check_array
  }
  /*
  ************ FUNCTION NAME : GET_SERVERS_WITH_KEYWORDS_FROM_GROUP
  ************ PURPOSE : THIS WILL GET TEH SERVERS WITH KEYWORDS
  */

  get_servers_with_keywords_from_group = function(result, key_words_to_search){
    //look which servers do not have a selected search keyword//
    let keywords_in_servers=[];
    for (let [key, value] of Object.entries(result.keysSearch)) {
        value.forEach(function(v){
            key_words_to_search.forEach(function(word_to_search){
              if(v === word_to_search){
                if(!keywords_in_servers.includes(key)){
                  keywords_in_servers.push(key);
                }
              }
            })
        })
        console.log(key, value);
    }
    console.log(keywords_in_servers);
    return keywords_in_servers;
  }

  /*
  ************ FUNCTION NAME : CREATE_GROUP_HYDROSERVERS
  ************ PURPOSE : CREATES A GROUP OF HYDRSOERVERS AND ADDS IT TO THE MENU
  */
  create_group_hydroservers = function(){
      //CHECKS IF THE INPUT IS EMPTY ///
      if($("#addGroup-title").val() == ""){
        $modalAddGroupHydro.find(".warning").html(  "<b>Please enter a title. This field cannot be blank.</b>")
        return false
      }
      else {
        $modalAddGroupHydro.find(".warning").html("")
      }

      //CHECKS IF THERE IS AN INPUT THAT IS NOT ALLOWED//
      if ($("#addGroup-title").val() != "") {
        var regex = new RegExp("^(?![0-9]*$)[a-zA-Z0-9_]+$")
        var title = $("#addGroup-title").val()
        if (!regex.test(title)) {
            $modalAddGroupHydro
                .find(".warning")
                .html("<b>Please note that only numbers and other characters besides the underscore ( _ ) are not allowed</b>");
            return false
        }
      }
      else {
          $modalAddGroupHydro.find(".warning").html("");
      }

      //CHECKS IF THERE IS AN EMPTY DESCRIPTION //
      if($("#addGroup-description").val() == ""){
        $modalAddGroupHydro.find(".warning").html(  "<b>Please enter a description for this group. This field cannot be blank.</b>")
        return false
      }
      else {
        $modalAddGroupHydro.find(".warning").html("")
      }
      //MAKE THE AJAX REQUEST///
      let elementForm= $("#modalAddGroupServerForm");
      let datastring= elementForm.serialize();
      console.log(typeof(datastring));
      console.log(datastring);
      $("#soapAddLoading").removeClass("hidden");
      // $("#btn-add-addHydro").hide();

      $.ajax({
          type: "POST",
          url: `create-group/`,
          dataType: "HTML",
          data: datastring,
          success: function(result) {
              //Returning the geoserver layer metadata from the controller
              var json_response = JSON.parse(result)

              let group=json_response
              if(group.message !== "There was an error while adding th group.") {
                let title=group.title;
                let description=group.description;

                // let newHtml = `<li class="ui-state-default" id="${title}">
                // <input class="chkbx-layer" type="checkbox" checked><span class="group-name">${title}</span>
                // <div>
                //   <button class="btn btn-warning" data-toggle="modal" data-target="#modalInterface"> <span class="glyphicon glyphicon-option-vertical"></span> </button>
                // </div>
                // </li>`
                let id_group_separator = `${title}_list_separator`;
                let newHtml;
                if(can_delete_hydrogroups){
                  newHtml =
                  `
                  <div class="panel panel-default">
                    <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
                      <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-target="#collapse_${title}" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
                        <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
                          <input class="chkbx-layer" type="checkbox" checked>
                            <span class="group-name">${title}</span>
                            <button class="btn btn-warning" data-toggle="modal" data-target="#modalInterface">
                              <span class="glyphicon glyphicon-option-vertical"></span>
                            </button>
                        </li>
                        </a>
                      </h4>
                    </div>
                    <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
                      <div class="panel-body">
                          <div id= ${id_group_separator} class="divForServers"></div>
                      </div>
                    </div>
                  </div>
                  `
                }
                else{
                  newHtml =
                  `
                  <div class="panel panel-default">
                    <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
                      <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#current-Groupservers" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
                        <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
                          <input class="chkbx-layer" type="checkbox" checked>
                            <span class="group-name">${title}</span>
                        </li>
                        </a>
                      </h4>
                    </div>
                    <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
                      <div class="panel-body">
                          <div id= ${id_group_separator} class="divForServers"></div>
                      </div>
                    </div>
                  </div>
                  `
                }

                $(newHtml).appendTo("#current-Groupservers");

                let li_object = document.getElementById(`${title}`);
                console.log("hola");
                // console.log(li_object.children[0]);
                let input_check = li_object.children[0];
                console.log(input_check);
                if(input_check.checked){
                  load_individual_hydroservers_group(title);
                }

                input_check.addEventListener("change", function(){
                  console.log(this);
                  if(this.checked){
                    console.log(" it is checked");
                    load_individual_hydroservers_group(title);

                  }
                  else{
                    // delete the lsit of hydroservers being display // make a function to delete it
                    console.log("it is not checked");
                    remove_individual_hydroservers_group(title);
                  }

                });

                let $title="#"+title;
                let $title_list="#"+title+"list";
                console.log($title_list);


                $($title).click(function(){
                  $("#pop-up_description2").html("");

                  actual_group = `&actual-group=${title}`;

                  let description_html=`<h1><u>${title}</u></h1>
                  <p>${description}</p>`;
                  // $("#pop-up_description").html(description_html);
                  $("#pop-up_description2").html(description_html);

                });




                $(".ui-state-default").click(function(){
                  console.log("hola");
                });
                    $("#soapAddLoading").addClass("hidden")
                    $("#soapAddLoading").addClass("hidden")
                    $("#btn-add-addHydro").show()

                    $("#modalAddGroupServer").modal("hide")
                    $("#modalAddGroupServerForm").each(function() {
                        this.reset()
                    })

                    // map.getView().fit(vectorSource.getExtent(), map.getSize());

                    // get_notification("success",`Successfully Created Group of HydroServers to the database` );
                    $.notify(
                        {
                            message: `Successfully Created Group of HydroServers to the database`
                        },
                        {
                            type: "success",
                            allow_dismiss: true,
                            z_index: 20000,
                            delay: 5000
                        }
                    )

              } else {
                  $("#soapAddLoading").addClass("hidden")
                  $("#btn-add-addHydro").show()
                  // get_notification("danger",`Failed to add to the group. Please check and try again.` )
                  $.notify(
                      {
                          message: `Failed to add to the group. Please check and try again.`
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
          error: function(error) {
              $("#soapAddLoading").addClass("hidden")
              $("#btn-add-addHydro").show()
              console.log(error)
              // get_notification("danger",`There was an error while adding a group of hydroserver` );
              $.notify(
                  {
                      message: `There was an error while adding a group of hydroserver`
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

    };

    $("#btn-add-addHydro").on("click", create_group_hydroservers);
/*
****** FU1NCTION NAME : delete_group_of_hydroservers *********
****** FUNCTION PURPOSE: DELETES THE HYDROSERVER GROUP AND THE HYDROSERVERS INSIDE THE GROUP*********
*/
  delete_group_of_hydroservers = function(){
    let datastring = Object.values($("#current-Groupservers").find(".buttonAppearance > .chkbx-layer"));
    console.log(datastring);
    let groups_to_delete=[];
    datastring.forEach(function(data){
      if(data.checked== true){
        let group_name = data.nextElementSibling.innerHTML;
        groups_to_delete.push(group_name);
      }
    });
    console.log(groups_to_delete);
    let groups_to_delete_obj={
      groups:groups_to_delete
    };
    $.ajax({
      type: "POST",
      url: `delete-group/`,
      dataType: "JSON",
      data: groups_to_delete_obj,
      success: function(result){
        console.log(result);
        // var json_response = JSON.parse(result)
        let groups_to_erase = result.groups;
        let hydroservers_to_erase = result.hydroservers;
        console.log(groups_to_erase);
        console.log(hydroservers_to_erase);
        $("#pop-up_description2").empty();



        groups_to_erase.forEach(function(group){
          let element=document.getElementById(group);
          element.parentNode.removeChild(element);
          let id_group_separator = `${group}_list_separator`;
          let separator = document.getElementById(id_group_separator);
          separator.parentNode.removeChild(separator);
        });

        hydroservers_to_erase.forEach(function(hydroserver){

            map.removeLayer(layersDict[hydroserver]);
            delete layersDict[title]

        });
        map.updateSize();
        // get_notification("sucess",`Successfully Deleted Group of HydroServer!`);

          $.notify(
              {
                  message: `Successfully Deleted Group of HydroServer!`
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

  }

  $("#btn-delete-hydroserver-group").on("click", delete_group_of_hydroservers);

  /*
  ****** FU1NCTION NAME : addExpandableMenu *********
  ****** FUNCTION PURPOSE: call and expandable menu*********
  */
  addExpandableMenu = function(clName){
      let element= document.getElementsByClassName(className);

    }
    /*
    ****** FU1NCTION NAME : REMOVE_INDIVIDUAL_HYDROSERVERS_GROUPS *********
    ****** FUNCTION PURPOSE: MAKES THE LAYERS OF HYDROSERVERS AND THE GROUP TAG TO DISSAPEAR WHEN THE GROUP NAME IS UNCHECK*********
    */
  remove_individual_hydroservers_group = function(group_name){

      let group_name_obj={
        group: group_name
      };
      console.log(group_name_obj);
      $.ajax({
          type: "GET",
          url: `catalog-group`,
          dataType: "JSON",
          data: group_name_obj,
          success: result => {
              console.log(result);
              let servers = result["hydroserver"]
              console.log("this are the servers");
              console.log(servers);

              //USE A FUNCTION TO FIND THE LI ASSOCIATED WITH THAT GROUP  AND DELETE IT FROM THE MAP AND MAKE ALL
              // THE CHECKBOXES VISIBLE //

              let extent = ol.extent.createEmpty();
              console.log(servers);
              let id_group_separator = `${group_name}_list_separator`;
              // let tag_to_delete = document.getElementById(id_group_separator);
              // console.log(tag_to_delete);
              // tag_to_delete.parentNode.removeChild(tag_to_delete);
              // $("#current-servers").remove(id_group_separator);

              // let lis = document.getElementById("current-servers").getElementsByTagName("li");
              // let lis = document.getElementById("current-Groupservers").getElementsByTagName("li");
              let lis = document.getElementById(`${id_group_separator}`).getElementsByTagName("li");
              // Object.values($("#current-Groupservers").find(".buttonAppearance > .chkbx-layer"))
              let li_arrays = Array.from(lis);
              console.log(li_arrays);
              servers.forEach(server => {
                  let {
                      title,
                      url,
                      geoserver_url,
                      layer_name,
                      extents,
                      siteInfo
                  } = server

                  map.removeLayer(layersDict[title])
                  delete layersDict[title]
                  map.updateSize()
                  let lis_to_delete = li_arrays.filter(x => title === x.attributes['layer-name'].value);

                  // so the deletion will be //

                  // let ul_servers = document.getElementById("current-servers");
                  // let ul_servers = document.getElementById("current-Groupservers");
                  let ul_servers = document.getElementById(`${id_group_separator}`);

                  lis_to_delete.forEach(function(li_tag){
                    ul_servers.removeChild(li_tag);
                  });


              })

          },
          error: function(error) {
              console.log(error)
              // get_notification("danger",`Something went wrong loading the catalog. Please see the console for details.`);
              $.notify(
                  {
                      message: `Something went wrong loading the catalog. Please see the console for details.`
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

    };

/*
****** FU1NCTION NAME : load_individual_hydroservers_group*********
****** FUNCTION PURPOSE: LOADS THE SERVERS OF A HYDROSERVER WHEN THE HYDROSERVER GROUPS IS CLICKED*********

*/
  load_individual_hydroservers_group = function(group_name){
     let servers_with_keywords = [];
     let key_words_to_search = get_all_the_checked_keywords();
     let group_name_obj={
       group: group_name
     };
     console.log(group_name_obj);
     $("#GeneralLoading").css({
        position:'fixed',
        "z-index": 9999,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      });
     $("#GeneralLoading").removeClass("hidden");
     $.ajax({
       type:"GET",
       url: `keyword-group`,
       dataType: "JSON",
       data: group_name_obj,
       success: function(result){
         console.log(result);

         //ALL THE SERVERS IN THE SELECTED GROUP //
         let all_servers_in_group = result.hydroserver;
         console.log(all_servers_in_group);

         //LOOK FOR THE SERVERS THAT HAVE KEYWORDS //
         let keywords_in_servers = get_servers_with_keywords_from_group(result, key_words_to_search);
         console.log(keywords_in_servers);
         $.ajax({
             type: "GET",
             url: `catalog-group`,
             dataType: "JSON",
             data: group_name_obj,
             success: result => {
                 console.log(result);
                 let servers = result["hydroserver"]
                 console.log("this are the servers");
                 console.log(servers);


                 // $("#current-servers").empty() //Resetting the catalog

                 //USE A FUNCTION TO FIND THE LI ASSOCIATED WITH THAT GROUP  AND DELETE IT FROM THE MAP AND MAKE ALL
                 // THE CHECKBOXES VISIBLE //

                 let extent = ol.extent.createEmpty()
                 console.log(servers);
                 let id_group_separator = `${group_name}_list_separator`;
                 // let title_group=`<ul id= ${id_group_separator}>
                 // <button class="btn btn-info btn-block">${group_name} </button>
                 //  </ul> `
                 //
                 //
                 //
                 //
                 // $(title_group).appendTo("#current-servers") ;
                 if(servers.length <= 0){
                   let no_servers = `<button class="btn btn-danger btn-block noGroups"> The group does not have hydroservers</button>`
                   $(no_servers).appendTo(`#${id_group_separator}`) ;
                 }

                 servers.forEach(function(server){
                     let {
                         title,
                         url,
                         geoserver_url,
                         layer_name,
                         extents,
                         siteInfo
                     } = server

                     if(keywords_in_servers.includes(title) || key_words_to_search.length == 0){
                       console.log(keywords_in_servers.includes(title));
                       let newHtml = `
                       <li class="ui-state-default" layer-name="${title}" id="${title}" >
                       <input class="chkbx-layer" type="checkbox" checked><span class="server-name">${title}</span>
                       <button type="button" id="${title}_zoom" class="btn btn-dark">
                        <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                       </button>
                       </li>
                       `;

                       // $(newHtml).appendTo("#current-servers")
                       $(newHtml).appendTo(`#${id_group_separator}`);
                       console.log($(newHtml));



                       // console.log(document.getElementById("current-servers"));
                       // let lis = document.getElementById("current-servers").getElementsByTagName("li");
                       // let lis = document.getElementById("current-Groupservers").getElementsByTagName("li");
                       let lis = document.getElementById(`${id_group_separator}`).getElementsByTagName("li");
                       console.log(lis);
                       let li_arrays = Array.from(lis);
                       let li_arrays2 = Array.from(lis);
                       console.log(li_arrays2);

                       let input_check = li_arrays.filter(x => title === x.attributes['layer-name'].value)[0];
                       // let input_check = document.querySelector(newHtml);
                       console.log(input_check);

                       input_check.firstElementChild.addEventListener("change", function(){
                         console.log(this);
                         if(this.checked){
                           console.log(" it is checked");
                           // load_individual_hydroservers_group(title);
                           let sites = JSON.parse(siteInfo)
                           // console.log(extents);
                           console.log(sites);
                           sites = sites.map(site => {
                               return {
                                   type: "Feature",
                                   geometry: {
                                       type: "Point",
                                       coordinates: ol.proj.transform(
                                           [
                                               parseFloat(site.longitude),
                                               parseFloat(site.latitude)
                                           ],
                                           "EPSG:4326",
                                           "EPSG:3857"
                                       )
                                   },
                                   properties: {
                                       name: site.sitename,
                                       code: site.sitecode,
                                       network: site.network,
                                       hs_url: url,
                                       hs_name: title,
                                       lon: parseFloat(site.longitude),
                                       lat: parseFloat(site.latitude)
                                   }
                               }
                           })

                           let sitesGeoJSON = {
                               type: "FeatureCollection",
                               crs: {
                                   type: "name",
                                   properties: {
                                       name: "EPSG:3857"
                                   }
                               },
                               features: sites
                           }

                           const vectorSource = new ol.source.Vector({
                               features: new ol.format.GeoJSON().readFeatures(
                                   sitesGeoJSON
                               )
                           })

                           const vectorLayer = new ol.layer.Vector({
                               source: vectorSource,
                               style: featureStyle()
                           })

                           map.addLayer(vectorLayer)



                           ol.extent.extend(extent, vectorSource.getExtent())

                           vectorLayer.set("selectable", true)


                           layersDict[title] = vectorLayer
                         }
                         else{
                           // delete the lsit of hydroservers being display // make a function to delete it
                           console.log("it is not checked");
                           // remove the layers from map
                           map.removeLayer(layersDict[title])
                           delete layersDict[title]
                           map.updateSize()
                         }

                       });


                       let sites = JSON.parse(siteInfo)
                       // console.log(extents);
                       console.log(sites);
                       sites = sites.map(site => {
                           return {
                               type: "Feature",
                               geometry: {
                                   type: "Point",
                                   coordinates: ol.proj.transform(
                                       [
                                           parseFloat(site.longitude),
                                           parseFloat(site.latitude)
                                       ],
                                       "EPSG:4326",
                                       "EPSG:3857"
                                   )
                               },
                               properties: {
                                   name: site.sitename,
                                   code: site.sitecode,
                                   network: site.network,
                                   hs_url: url,
                                   hs_name: title,
                                   lon: parseFloat(site.longitude),
                                   lat: parseFloat(site.latitude)
                               }
                           }
                       })

                       let sitesGeoJSON = {
                           type: "FeatureCollection",
                           crs: {
                               type: "name",
                               properties: {
                                   name: "EPSG:3857"
                               }
                           },
                           features: sites
                       }

                       const vectorSource = new ol.source.Vector({
                           features: new ol.format.GeoJSON().readFeatures(
                               sitesGeoJSON
                           )
                       })

                       const vectorLayer = new ol.layer.Vector({
                           source: vectorSource,
                           style: featureStyle()
                       })

                       map.addLayer(vectorLayer)
                       ol.extent.extend(extent, vectorSource.getExtent())

                       vectorLayer.set("selectable", true)
                       // select interaction working on "click"
                       // var selectClick = new Select({
                       //   condition: click
                       // });
                       // map.addInteraction(selectClick);
                       //
                       // selectClick.on('select', function(e){
                       //   console.log("hola");
                       // })

                       layersDict[title] = vectorLayer;
                       $(`#${title}_zoom`).on("click",function(){
                         map.getView().fit(vectorSource.getExtent());
                         map.updateSize();
                       });
                   }
                 })

                 ///CHANGE TO ZOOM TO EACH ONE OF THE LAYERS //
                 if (servers.length) {

                     // map.getView().fit(extent, map.getSize())
                     // map.updateSize()
                 }

             },
             error: function(error) {
                 console.log(error);
                 // get_notification("danger",`Something went wrong loading the hydroservers for the group called ${group}. Please see the console for details.` )
                 $.notify(
                     {
                         message: `Something went wrong loading the hydroservers for the group called ${group_name}. Please see the console for details.`
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
         $("#GeneralLoading").addClass("hidden");

       },
       error: function(error) {
           console.log(error);
           // get_notification("danger",`Something went wrong loading the hydroservers for the group called ${group}` );
           $.notify(
               {
                   message: `Something went wrong loading the hydroservers for the group called ${group_name}`
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

   };
 /*
 ****** FU1NCTION NAME : load_group_hydroservers*********
 ****** FUNCTION PURPOSE: LOADS THE GROUPS OF HYDROSERVERS THAT ARE THERE *********
 */
  load_group_hydroservers = function(){
      console.log("hola");

      $.ajax({
          type: "GET",
          url: `load-groups`,
          dataType: "JSON",
          success: result => {
            console.log(result);
              let groups =result["hydroservers"];
              // console.log("this are the servers");
              // console.log(groups);
              // $("#current-servers").empty() //Resetting the catalog
              $(".divForServers").empty() //Resetting the catalog
              let extent = ol.extent.createEmpty()
              // console.log(groups);
              groups.forEach(group => {
                  let {
                      title,
                      description
                  } = group
                  let id_group_separator = `${title}_list_separator`;

                  let newHtml;
                  if(can_delete_hydrogroups){
                    newHtml =
                    `
                    <div class="panel panel-default">
                      <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
                        <h4 class="panel-title">
                          <a role="button" data-toggle="collapse" data-target="#collapse_${title}" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
                          <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
                            <input class="chkbx-layer" type="checkbox" checked>
                              <span class="group-name">${title}</span>
                              <button class="btn btn-warning" data-toggle="modal" data-target="#modalInterface">
                                <span class="glyphicon glyphicon-option-vertical"></span>
                              </button>
                          </li>
                          </a>
                        </h4>
                      </div>
                      <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
                        <div class="panel-body">
                            <div id= ${id_group_separator} class="divForServers"></div>
                        </div>
                      </div>
                    </div>

                    `
                    // <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
                    //   <input class="chkbx-layer" type="checkbox" checked>
                    //     <span class="group-name">${title}</span>
                    //     <button class="btn btn-warning" data-toggle="modal" data-target="#modalInterface">
                    //       <span class="glyphicon glyphicon-option-vertical"></span>
                    //     </button>
                    // </li>
                    // <div id= ${id_group_separator} class="divForServers"></div>
                  }
                  else{
                    newHtml =
                    `
                    <div class="panel panel-default">
                      <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
                        <h4 class="panel-title">
                          <a role="button" data-toggle="collapse" data-parent="#current-Groupservers" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
                          <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
                            <input class="chkbx-layer" type="checkbox" checked>
                              <span class="group-name">${title}</span>

                          </li>
                          </a>
                        </h4>
                      </div>
                      <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
                        <div class="panel-body">
                            <div id= ${id_group_separator} class="divForServers"></div>
                        </div>
                      </div>
                    </div>
                    `
                  }
                  $(newHtml).appendTo("#current-Groupservers");



                  let li_object = document.getElementById(`${title}`);
                  console.log("hola");
                  // console.log(li_object.children[0]);
                  let input_check = li_object.children[0];
                  console.log(input_check);
                  if(input_check.checked){
                    load_individual_hydroservers_group(title);
                  }

                  input_check.addEventListener("change", function(){
                    console.log(this);
                    if(this.checked){
                      console.log(" it is checked");
                      load_individual_hydroservers_group(title);
                    }
                    else{
                      // delete the lsit of hydroservers being display // make a function to delete it
                      console.log("it is not checked");
                      remove_individual_hydroservers_group(title);
                    }

                  });


                  let $title="#"+title;
                  let $title_list="#"+title+"list";
                  console.log($title_list);


                  $($title).click(function(){
                    $("#pop-up_description2").html("");

                    actual_group = `&actual-group=${title}`;

                    let description_html=`<h1><u>${title}</u></h1>
                    <p>${description}</p>`;
                    // $("#pop-up_description").html(description_html);
                    $("#pop-up_description2").html(description_html);

                  });


              })

      },
      error: function(error) {
          $("#soapAddLoading").addClass("hidden")
          $("#btn-add-addHydro").show()
          console.log(error);
          // get_notification("danger",`There was an error while adding a group of hydroserver`);
          $.notify(
              {
                  message: `There was an error while adding a group of hydroserver`
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

  /*
  ****** FU1NCTION NAME: add_hydroserver *********
  ****** FUNCTION PURPOSE: ADD AN INDIVIDUAL HYDROSERVER TO A GROUP *********
  */

  add_hydroserver = function(){
    if($("#extent").is(":checked")){
      var zoom= map.getView().getZoom();
      if(zoom < 8){
          $modalAddSOAP.find(".warning").html("<b>The zoom level has to be 8 or greater. Please check and try again.</b>")
          return false
      }
      else {
        $modalAddSOAP.find(".warning").html("")
      }
      $('#chk_val').empty()
      var level=map.getView().calculateExtent(map.getSize())
      $(
            '<input type="text" name="extent_val" id="extent_val" value=' +
                '"' +
                level +
                '"' +
                " hidden>"
        ).appendTo($("#chk_val"))
    }
    if($("#soap-title").val() == ""){
      $modalAddSOAP.find(".warning").html(  "<b>Please enter a title. This field cannot be blank.</b>")
      return false
    }
    else {
      $modalAddSOAP.find(".warning").html("")
    }
    if(
      $("#soap-url").val() == "http://hydroportal.cuahsi.org/nwisdv/cuahsi_1_1.asmx?WSDL" ||
      $("#soap-url").val() =="http://hydroportal.cuahsi.org/nwisuv/cuahsi_1_1.asmx?WSDL")
      {
        $modalAddSOAP
              .find(".warning")
              .html(
                  "<b>Please zoom in further to be able to access the NWIS Values</b>"
              )
          return false
      }
      else {
          $modalAddSOAP.find(".warning").html("")
      }
      if ($("#soap-title").val() != "") {
        var regex = new RegExp("^[a-zA-Z ]+$")
        var title = $("#soap-title").val()
        if (!regex.test(title)) {
            $modalAddSOAP
                .find(".warning")
                .html("<b>Please enter Letters only for the title.</b>");
            return false
        }
      } else {
          $modalAddSOAP.find(".warning").html("");
      }
      var datastring = $modalAddSOAP.serialize();
      datastring += actual_group;


      console.log("This is the serialize string of datastring");
      console.log(datastring);
      //Submitting the data to the controller
      $("#soapAddLoading").removeClass("hidden");

      $("#btn-add-soap").hide();

      $.ajax({
          type: "POST",
          url: `soap-group/`,
          dataType: "HTML",
          data: datastring,
          success: function(result) {

              // put second filter // and also put a warning message that says that the new layers has been uploaded,
              // put another warnign saying that it is added, but because of the filter you cannot see it. Probably a warning one
              // put another warning if something gets wrong with the data base or with other thing.

              //Returning the geoserver layer metadata from the controller
              var json_response = JSON.parse(result)
              console.log(json_response);
              let group_name = actual_group.split('=')[1];
              let id_group_separator = `${group_name}_list_separator`;


              if (json_response.status === "true") {
                  // put the ajax call and also the filter //
                  let servers_with_keywords = [];
                  let key_words_to_search = get_all_the_checked_keywords();
                  let group_name_obj={
                    group: group_name
                  };
                  console.log(group_name_obj);
                  $.ajax({
                    type:"GET",
                    url: `keyword-group`,
                    dataType: "JSON",
                    data: group_name_obj,
                    success: function(result2){
                      console.log(result2);

                      //ALL THE SERVERS IN THE SELECTED GROUP //
                      let all_servers_in_group = result2.hydroserver;
                      console.log(all_servers_in_group);

                      //LOOK FOR THE SERVERS THAT HAVE KEYWORDS //
                      let keywords_in_servers = get_servers_with_keywords_from_group(result2, key_words_to_search);
                      console.log(keywords_in_servers);


                    let {title, siteInfo, url, group} = json_response
                    // if(keywords_in_servers.includes(title) || key_words_to_search.length == 0 ){
                      console.log(keywords_in_servers.includes(title));
                      let no_servers_tag = Array.from(document.getElementById(`${id_group_separator}`).getElementsByTagName("P"))[0];
                      console.log(no_servers_tag);
                      if(no_servers_tag !== undefined){
                        no_servers_tag.parentNode.removeChild(no_servers_tag);

                      }

                      let newHtml = `
                      <li class="ui-state-default" layer-name="${title}" id="${title}" >
                      <input class="chkbx-layer" type="checkbox" checked><span class="server-name">${title}</span>
                      <button type="button" id="${title}_zoom" class="btn btn-dark">
                       <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                      </button>
                      </li>
                      `;

                      // $(newHtml).appendTo("#current-servers")\
                      $(newHtml).appendTo(`#${id_group_separator}`); ////////***********ONLY THING THAT CHANGES **********////
                      // console.log($(newHtml));
                      document.getElementById(`${title}`).style.visibility = "hidden";



                      // MAKES THE LAYER INVISIBLE

                      // console.log(document.getElementById("current-servers"));
                      // let lis = document.getElementById("current-servers").getElementsByTagName("li");
                      let lis = document.getElementById("current-Groupservers").getElementsByTagName("li");
                      console.log(lis);
                      let li_arrays = Array.from(lis);
                      console.log(li_arrays);

                      let input_check = li_arrays.filter(x => title === x.attributes['layer-name'].value)[0];

                      // let input_check = document.querySelector(newHtml);
                      console.log(input_check);

                      input_check.firstElementChild.addEventListener("change", function(){
                        console.log(this);
                        if(this.checked){
                          console.log(" it is checked");
                          // load_individual_hydroservers_group(title);
                          let sites = JSON.parse(siteInfo)
                          // console.log(extents);
                          console.log(sites);
                          sites = sites.map(site => {
                              return {
                                  type: "Feature",
                                  geometry: {
                                      type: "Point",
                                      coordinates: ol.proj.transform(
                                          [
                                              parseFloat(site.longitude),
                                              parseFloat(site.latitude)
                                          ],
                                          "EPSG:4326",
                                          "EPSG:3857"
                                      )
                                  },
                                  properties: {
                                      name: site.sitename,
                                      code: site.sitecode,
                                      network: site.network,
                                      hs_url: url,
                                      hs_name: title,
                                      lon: parseFloat(site.longitude),
                                      lat: parseFloat(site.latitude)
                                  }
                              }
                          })

                          let sitesGeoJSON = {
                              type: "FeatureCollection",
                              crs: {
                                  type: "name",
                                  properties: {
                                      name: "EPSG:3857"
                                  }
                              },
                              features: sites
                          }

                          const vectorSource = new ol.source.Vector({
                              features: new ol.format.GeoJSON().readFeatures(
                                  sitesGeoJSON
                              )
                          })

                          const vectorLayer = new ol.layer.Vector({
                              source: vectorSource,
                              style: featureStyle()
                          })

                            map.addLayer(vectorLayer)
                            // ol.extent.extend(extent, vectorSource.getExtent())
                            vectorLayer.set("selectable", true)
                            layersDict[title] = vectorLayer


                        }
                        else{
                          // delete the lsit of hydroservers being display // make a function to delete it
                          console.log("it is not checked");

                          // remove the layers from map
                          map.removeLayer(layersDict[title])
                          delete layersDict[title]
                          map.updateSize()
                        }

                      });

                      if(keywords_in_servers.includes(title) || key_words_to_search.length ==0){
                          document.getElementById(`${title}`).style.visibility = "visible";
                      }
                      else{
                        console.log("it not going to be shown, but it is going to be added");
                        lis_deleted.push(document.getElementById(`${title}`));
                        lis_separators.push(document.getElementById(`${id_group_separator}`));
                        document.getElementById(`${title}`).parentNode.removeChild(document.getElementById(`${title}`));
                      }



                      let sites = JSON.parse(siteInfo)
                      // console.log(extents);
                      console.log(sites);
                      sites = sites.map(site => {
                          return {
                              type: "Feature",
                              geometry: {
                                  type: "Point",
                                  coordinates: ol.proj.transform(
                                      [
                                          parseFloat(site.longitude),
                                          parseFloat(site.latitude)
                                      ],
                                      "EPSG:4326",
                                      "EPSG:3857"
                                  )
                              },
                              properties: {
                                  name: site.sitename,
                                  code: site.sitecode,
                                  network: site.network,
                                  hs_url: url,
                                  hs_name: title,
                                  lon: parseFloat(site.longitude),
                                  lat: parseFloat(site.latitude)
                              }
                          }
                      })

                      let sitesGeoJSON = {
                          type: "FeatureCollection",
                          crs: {
                              type: "name",
                              properties: {
                                  name: "EPSG:3857"
                              }
                          },
                          features: sites
                      }

                      const vectorSource = new ol.source.Vector({
                          features: new ol.format.GeoJSON().readFeatures(
                              sitesGeoJSON
                          )
                      })

                      const vectorLayer = new ol.layer.Vector({
                          source: vectorSource,
                          style: featureStyle()
                      })

                      map.addLayer(vectorLayer)
                      ol.extent.extend(extent, vectorSource.getExtent())
                      vectorLayer.set("selectable", true)
                      layersDict[title] = vectorLayer;

                      map.getView().fit(vectorSource.getExtent());
                      map.updateSize();

                      layersDict[title] = vectorLayer;
                      $(`#${title}_zoom`).on("click",function(){
                        map.getView().fit(vectorSource.getExtent());
                        map.updateSize();
                      });


                      if(keywords_in_servers.includes(title) || key_words_to_search.length == 0 ){
                        // get_notification("sucess",`Successfully Added the HydroServer to the Map`);
                        let allNoneGroups = Array.from(document.getElementsByClassName("noGroups"));
                        console.log(allNoneGroups);
                        allNoneGroups.forEach(function(e){
                          e.parentNode.removeChild(e);

                        })
                        $.notify(
                            {
                                message: `Successfully Added the HydroServer to the Map`
                            },
                            {
                                type: "success",
                                allow_dismiss: true,
                                z_index: 20000,
                                delay: 5000
                            }
                        )
                      }
                      else{

                        map.removeLayer(layersDict[title])
                        layers_deleted.push(layersDict[title]);
                        delete layersDict[title]
                        map.updateSize()
                        // get_notification("warning",`${title} was added to the group, but is not displaying because it did not contain
                        // the keywords that that the search especified.`);
                        $.notify(
                            {
                                message: `${title} was added to the group, but is not displaying because it did not contain
                                the keywords that that the search especified.`
                            },
                            {
                                type: "warning",
                                allow_dismiss: true,
                                z_index: 20000,
                                delay: 5000
                            }
                        )
                      }

                      $("#soapAddLoading").addClass("hidden")
                      $("#btn-add-soap").show()

                      $("#modalAddSoap").modal("hide")
                      $("#modalAddSoap").each(function() {
                          this.reset()
                      })



                },
                    error: function(error) {
                        $("#soapAddLoading").addClass("hidden")
                        $("#btn-add-soap").show()
                        console.log(error);
                        // get_notification("danger", `There was an error when applying the filter of key words to the new added layer`);
                        $.notify(
                            {
                                message: `There was an error when applying the filter of key words to the new added layer`
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


          },
          error: function(error) {
              $("#soapAddLoading").addClass("hidden")
              $("#btn-add-soap").show();
              console.log(error);
              // get_notification("danger",`Invalid Hydroserver SOAP Url. Please check and try again.`)
              $.notify(
                  {
                      message: `Invalid Hydroserver SOAP Url. Please check and try again.`
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

  $("#btn-add-soap").on("click", add_hydroserver);

  /*
  ****** FU1NCTION NAME: delete_hydroserver *********
  ****** FUNCTION PURPOSE: DELETE THE SELECTED HYDROSERVERS OF A GROUP*********
  */

  delete_hydroserver= function(){
      $modalInterface.find(".success").html("")
      let arrayActual_group=actual_group.split('=')[1];
      var datastring = $modalDelete.serialize() //Delete the record in the database
      datastring += actual_group;
      console.log(datastring);
      $.ajax({
          type: "POST",
          url: `delete-group-hydroserver/`,
          data: datastring,
          dataType: "HTML",
          success: function(result) {
              console.log(result);
              var json_response = JSON.parse(result)
              console.log(json_response);
              // var title = json_response.title
              // $("#current-servers").empty() //Resetting the catalog. So that it is updated.
              // let element = document.getElementById(arrayActual_group);
              // element.parentNode.removeChild(element);

              $("#modalDelete").modal("hide")
              $("#modalDelete").each(function() {
                  this.reset()
              })
              for(let i=0; i<Object.keys(json_response).length; ++i){

                let i_string=i.toString();
                let title=json_response[i_string];
                let element = document.getElementById(title);
                element.parentNode.removeChild(element);
                //Removing layer from the frontend
                console.log(title);
                map.removeLayer(layersDict[title])
                delete layersDict[title]
                map.updateSize()
                console.log(arrayActual_group);
                // load_individual_hydroservers_group(arrayActual_group) //Reloading the new catalog
                // get_notification("sucess",`Successfully Deleted the HydroServer!`);

                let id_group_separator = `${arrayActual_group}_list_separator`;
                let separator_element = document.getElementById(id_group_separator);
                console.log(separator_element);
                let children_element = Array.from(separator_element.children);
                console.log(children_element);
                if(children_element.length < 1){
                  let no_servers = `<button class="btn btn-danger btn-block noGroups"> The group does not have hydroservers</button>`
                      $(no_servers).appendTo(`#${id_group_separator}`) ;
                }

                // let title_group=`<h5 class = "title-separators" id= ${id_group_separator}>${group_name}<h5>`

                // $(title_group).appendTo("#current-servers") ;
                // if(servers.length <= 0){
                //   $(no_servers).appendTo(`#${id_group_separator}`) ;
                // }


                $.notify(
                    {
                        message: `Successfully Deleted the HydroServer!`
                    },
                    {
                        type: "success",
                        allow_dismiss: true,
                        z_index: 20000,
                        delay: 5000
                    }
                )


              }

          },
          error: error => {
              console.log(error);
              // get_notification("danger",`Something were wrong while deleting a hydroserver or group of hydroservers!`);
              $.notify(
                  {
                      message: `Something were wrong while deleting a hydroserver or group of hydroservers!`
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
  $("#btn-del-server").on("click", delete_hydroserver)

  /*
  ****** FU1NCTION NAME: GET_HS_LIST_FROM_HYDRPSERVER *********
  ****** FUNCTION PURPOSE: GET THE LIST OF HYDROSERVERS THAT A GROUP OF HYDROSERVER CONTAINS *********
  */
  get_hs_list_from_hydroserver = function(){
    if(actual_group == undefined){
      actual_group="";
    }
    let arrayActual_group=actual_group.split('=')[1];
    console.log(arrayActual_group);
      let group_name_obj={
        group: arrayActual_group
      };
      $.ajax({
          type: "GET",
          url: `catalog-group`,
          dataType: "JSON",
          data:group_name_obj,
          success: function(result) {
              //Dynamically generate the list of existing hydroservers
              var server = result["hydroserver"]
              var HSTableHtml =
                  '<table id="tbl-hydroservers"><thead><th>Check</th><th>Title</th><th>URL</th></thead><tbody>'
              if (server.length === 0) {
                  $modalDelete
                      .find(".modal-body")
                      .html(
                          "<b>There are no hydroservers in the Catalog.</b>"
                      )
              } else {
                  for (var i = 0; i < server.length; i++) {
                      var title = server[i].title
                      var url = server[i].url
                      HSTableHtml +=
                          "<tr>" +
                          '<td><input type="checkbox" name="server" id="server" value="' +
                          title +
                          '"></td>' +
                          '<td class="hs_title">' +
                          title +
                          "</td>" +
                          '<td class="hs_url">' +
                          url +
                          "</td>" +
                          "</tr>"
                  }
                  HSTableHtml += "</tbody></table>"
                  $modalDelete.find(".modal-body").html(HSTableHtml)
              }
          },
          error: function(error) {
              console.log(error)
          }
      })
  }
  $("#delete-server").on("click", get_hs_list_from_hydroserver);

/// NEEDS TO BE ADDED TO THE APP FOR EXISTING CATALOGS //
  const add_central = () => {
      let modal = $("#addCentral"),
          mWarning = modal.find(".warning"),
          titleVal = $("#title").val()
      // Clear all existing Warnings
      modal.find(".warning").html("")

      if (titleVal == "") {
          mWarning.html(
              "<b>Please enter a title. This field cannot be blank.</b>"
          )
          return false
      } else {
          let regex = new RegExp("^[a-zA-Z ]+$")
          if (!regex.test(titleVal)) {
              mWarning.html("<b>Please enter Letters only for the title.</b>")
              return false
          }
      }
      if ($("#url").val() == "") {
          mWarning.html(
              "<b>Please enter a valid URL. This field cannot be blank.</b>"
          )
          return false
      }
      $.ajax({
          type: "POST",
          url: `add-central/`,
          dataType: "json",
          data: {
              title: titleVal,
              url: $("#url").val()
          },
          success: result => {
            console.log(result);
              if (result.status) {
                  // Close main modal
                  modal.modal("hide")
                  modal.each(function() {
                      this.reset()
                  })
                  // modal.hide()
                  $.notify(
                      {
                          message: `Server Successfully Added. You may use it to add HydroServers`
                      },
                      {
                          type: "success",
                          allow_dismiss: true,
                          z_index: 20000,
                          delay: 5000
                      }
                  )
              } else {
                  $.notify(
                      {
                          message: `Error! Couldn't add HIS Catalog service: ${
                              result.message
                          }.`
                      },
                      {
                          type: "danger",
                          allow_dismiss: true,
                          z_index: 20000,
                          delay: 10000
                      }
                  )
              }
          },
          error: error => {
              console.log(error)
              $.notify(
                  {
                      message: `Error! Couldn't add HIS Catalog service: ${
                          error.statusText
                      }. Please check the URL`
                  },
                  {
                      type: "danger",
                      allow_dismiss: true,
                      z_index: 20000,
                      delay: 10000
                  }
              )
          }
      })
  }
  $("#btn-add-central").on("click", add_central);
  // $('#switchGraphs').on("click",function() {
  //     // $('#console-event').html('Toggle: ' + $(this).prop('checked'))
  //     console.log("hola nene");
  // })

//The following three functions are necessary to make dynamic ajax requests//

  /*
  ****** FU1NCTION NAME: addDefaultBehaviorToAjax *********
  ****** FUNCTION PURPOSE: make dynamic ajax requests *********
  */
  addDefaultBehaviorToAjax = function() {
      // Add CSRF token to appropriate ajax requests
      $.ajaxSetup({
          beforeSend: function(xhr, settings) {
              if (!checkCsrfSafe(settings.type) && !this.crossDomain) {
                  xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
              }
          }
      })
  }
  /*
  ****** FU1NCTION NAME: checkCsrfSafe *********
  ****** FUNCTION PURPOSE: CHECK THE OPERATIONS THAT DOES NOT NEED A CSRF VERIFICATION *********
  */
  checkCsrfSafe = function(method) {
      // these HTTP methods do not require CSRF protection
      return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
  }
  /*
  ****** FU1NCTION NAME: getCookie *********
  ****** FUNCTION PURPOSE: Retrieve a cookie value from the csrf token *********
  */
  getCookie = function(name) {
      var cookie
      var cookies
      var cookieValue = null
      var i
      if (document.cookie && document.cookie !== "") {
          cookies = document.cookie.split(";")
          for (i = 0; i < cookies.length; i += 1) {
              cookie = $.trim(cookies[i])
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === name + "=") {
                  cookieValue = decodeURIComponent(
                      cookie.substring(name.length + 1)
                  )
                  break
              }
          }
      }
      return cookieValue
  }
  /*
  ****** FU1NCTION NAME: init_menu *********
  ****** FUNCTION PURPOSE: Initialize the context menu (The little hamburger in the Current HydroServers list item). It currently supports zoom to or delete layer. You can add more functionality here. *********
  */
  init_menu = function() {
      ContextMenuBase = [
          {
              name: "Add a HydroServer",
              title: "Add a HydroServer",
              fun: function(e) {
                  onClickZoomTo(e)
              }
          },
          {
              name: "Delete HydroServer",
              title: "Delete hydroserver",
              fun: function(e) {
                  onClickDeleteLayer(e)
              }
          }
      ]
  }

  /************************************************************************
   *                  INITIALIZATION / CONSTRUCTOR
   *************************************************************************/
  $(function() {

    init_jquery_var();
    addDefaultBehaviorToAjax();
    init_menu();
    init_map();
    // activate_deactivate_graphs();
    load_group_hydroservers();
    activate_layer_values();
    let empty_array=[];
    initialize_graphs([],[],"No data Available","","","","scatter");
    add_boundary_map(geoServerColor, geoServerWidth, map);
    activate_deactivate_graphs();



  })
})() // End of package wrapper
