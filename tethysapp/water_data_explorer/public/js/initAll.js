/*****************************************************************************
 * FILE:                InitAll.js
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
 var apiServer = "";
 window.onbeforeunload = null
 var $myGroup = $("#helpGroup")
 $myGroup.on("show.bs.collapse", ".collapse", function() {
     $myGroup.find(".collapse.in").collapse("hide")
 });(function() {
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


var water_data_explorer_PACKAGE = (function() {
    // Wrap the library in a package function
    "use strict" // And enable strict mode for this library

    /*
    ************ FUNCTION NAME: ADD_BOUNDARY_MAP **********************
    ************ PURPOSE: ADD THE BOUNDARY LAYER TO THE MAP TAKING INTO ACCCOUNT THE CUSTOM SETTINGS***********
    */
    add_boundary_map = function(color, width, map){
      try{
        if(color === "None"){
          color = "#000000";
        }
        if(width === "None"){
          width = 3;
        }
        if(endpointGeoServer ==="None"){
          endpointGeoServer = "Whole_world";
          ////console.log(endpointGeoServer);
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
              ////console.log(extent);
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
      catch(e) {
        $.notify(
            {
                message: `Unable to retrieve the boundary of the Data Explorer`
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

    /*
    ************ FUNCTION NAME: INIT_MAP**********************
    ************ PURPOSE:INIT MAP WITH THE OPENLAYERS BASE MAP AND THE OTHER ADDEDLAYERS OF HYDROSERVERS  ***********
    */

    init_map = function() {
      try{
        var myZoom;
        if($( window ).width() <= 768){
          myZoom = 2;
          console.log(myZoom);
        }
        else{
          myZoom = 3;
        }
        var projection = ol.proj.get("EPSG:3857")
        var baseLayer = new ol.layer.Tile({
            source: new ol.source.BingMaps({
                key:
                    "As822KVqVMwb1JcFVv2JG9lqZB6G0v08RWNHogMBpVAZAXI5PMASZAPiNdnHjf6B",
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
        layers = [baseLayer, vector_layer, shpLayer];
          map = new ol.Map({
              target: "map",
              layers: layers,
              view: new ol.View({
                // -25.30066, -57.63591
                  center: [17.670578, -49.082926],
                  projection: projection,
                  zoom: myZoom
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
      }
      catch(e){
        $.notify(
            {
                message: `Unable to initialize the map of the Data Explorer`
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


    give_name = function(){
      try{
        if(views_names != "None"){
          $(".titleh").html(`${views_names} Views`)
          // $(".app-title").html(`${views_names} Data Explorer`)
        }
        else{
          $(".titleh").html(`Views`)
          $(".app-title").html(`Water Data Explorer`)
          $.notify(
              {
                  message: `Tip: You can give name to the Data Explorer by going into the settings`
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
        $.notify(
            {
                message: `Unable to retrieve name of the Data Explorer`
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

    /*
    ************ FUNCTION NAME: INIT_JEQUERY_VAR**********************
    ************ PURPOSE: INITIALIZE ALL THE JQUERY VARIABLES USED***********
    */
    init_jquery_var = function(){
      try{
        $modalAddGroupHydro= $("#modalAddGroupServer");
        $modalAddSOAP = $("#modalAddSoap");
        $modalDelete = $("#modalDelete");
        $modalInterface = $("#modalInterface");
        $hs_list = $("#current-servers-list");
      }
      catch(error){
        console.log(error)
      }

    }
    addLegendMap = function(map){
      try{
        let element = document.getElementById("tableLegend");
        var controlPanel = new ol.control.Control({
          element: element
        });
        map.addControl(controlPanel);
      }
      catch(error){
        console.log(error);
      }


    }
  /************************************************************************
   *                  INITIALIZATION / CONSTRUCTOR
   *************************************************************************/
  $(function() {
    try{
      responsive_graphs();

      // console.log(uuidv4());
      init_jquery_var();
      addDefaultBehaviorToAjax();
      init_map();
      load_group_hydroservers();
      activate_layer_values();
      let empty_array=[];
      initialize_graphs([],[],"No data Available","","","","scatter");
      add_boundary_map(geoServerColor, geoServerWidth, map);
      activate_deactivate_graphs();
      give_name();
      addLegendMap(map);

      //make the picker to always appear//
      $(".selectpicker").selectpicker({
        "title": "Select Options"
      }).selectpicker("render");

      $(".toggle-nav").on("click",function(){
        if($('#app-navigation').is(':visible')){
          console.log("visible toggle")
          $("#app-navigation").hide();

          // $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "0px"});
          if($( window ).width() >= 768 && $( window ).width() <= 1366){
            console.log("tablet");
            
            if(window.innerHeight > window.innerWidth){
                //portrait
                // $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "100px", "position": "relative","left": "200px"})
                $('#inner-app-content').css({"width": "100vw", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "0px"});

                console.log("tablet portrait")
            }
            if(window.innerWidth > window.innerHeight){
                //landscape
                console.log("tablet landscape")

                $('#inner-app-content').css({ "width": "100vw", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "0px"});

                // $('#app-content-wrapper #app-content #app-navigation').css({"width":"min-content", "position":"absolute"});

            }
          }
          if($( window ).width() > 1366){
            console.log("laptop");
            // $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "100px", "position": "relative","left": "200px"})
            // $('#inner-app-content').css({"width": "100vw", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "0px"});
            $('#inner-app-content').css({ "width": "100vw", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "300px"});


          }
          if($( window ).width() < 768){
            console.log("phone")
            $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "0px"})

          }
          // if($( window ).width() >= 768){
          //   console.log("Tablet or bigger visible toggle");
          //
          // }
          // else{
          //   console.log("cellphone visible toggle");
          //
          //   $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "0px"})
          //
          // }

          setTimeout(function(){ map.updateSize(); }, 500);


        }

        else{
          console.log("not visible toggle");
          $("#app-navigation").show();
          if($( window ).width() >= 768 && $( window ).width() <= 1366){
            console.log("tablet");
            if(window.innerHeight > window.innerWidth){
                //portrait
                $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative","left": "300px"})
                console.log("tablet portrait")
            }
            if(window.innerWidth > window.innerHeight){
                //landscape
                console.log("tablet landscape")
                $('#inner-app-content').css({"width": "100%","display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "300px"})

            }
            // $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "0px"})

          }
          if($( window ).width() < 768){
            console.log("phone");

            if(window.innerHeight > window.innerWidth){
                //portrait
                console.log("phone portrait");
                $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "100px", "position": "relative","left": "200px"})

            }
            if(window.innerWidth > window.innerHeight){
                //landscape
                console.log("phone landscape");
                // $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "0px", "position": "relative", "left": "0px"})
            }

          }
          // $('#inner-app-content').css({"width": "100%", "display":"flex", "height": "100%" , "flex-direction": "column","padding": "0 0 0 0","padding-right": "100px", "position": "relative","left": "100px"})

          setTimeout(function(){ map.updateSize(); }, 200);
        }
        setTimeout(function(){
          if($('#plots').is(':visible')){
            Plotly.Plots.resize("plots");
              Plotly.relayout($("plots"), {
                'xaxis.autorange': true,
                'yaxis.autorange': true
              });
          }
        },500)
      });

      //Event for the clusters of the map
      map.getView().on('change:resolution', function(evt){
        var view = evt.target;

        map.getLayers().getArray().map(function(layer) {
          var source = layer.getSource();
          if (source instanceof ol.source.Cluster) {
            var distance = source.getDistance();
            if (view.getZoom() >= 9 && distance > 0) {
              source.setDistance(0);
            }
            else if (view.getZoom() < 9 && distance == 0) {
              source.setDistance(50);

            }
          }
        });
      }, map);
      console.log(id_dictionary);
    }
      catch(error){
        console.log(error);
        $.notify(
            {
                message: `Unable to start the Data Explorer`
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
})() // End of package wrapper
