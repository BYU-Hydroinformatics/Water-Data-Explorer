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
        new Notify ({
          status: 'warning',
          title: 'Info',
          text: `No boundary found for the Water Data Explorer`,
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
        //         message: `No boundary found for the Water Data Explorer`
        //     },
        //     {
        //         type: "info",
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

    /*
    ************ FUNCTION NAME: INIT_MAP**********************
    ************ PURPOSE:INIT MAP WITH THE OPENLAYERS BASE MAP AND THE OTHER ADDEDLAYERS OF HYDROSERVERS  ***********
    */

    init_map = function() {
      try{
               
        var url_UN = "https://geoservices.un.org/arcgis/rest/services/ClearMap_WebTopo/MapServer";
        
        var layers = [
          new ol.layer.Tile({
            title: 'Open Street Map',
            source: new ol.source.OSM(),
            type: 'base'
          }),

          new ol.layer.Tile({
            title: 'United Nations Map', 
            source: new ol.source.TileArcGISRest({
              attributions: 'Produced by United Nations Geospatial',
              url: url_UN
            }),
            type: 'base'
          }),
          new ol.layer.Tile({
            title: 'ArcGIS World Topographic Map',
            type:'base',
            source: new ol.source.XYZ({
              attributions:'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' + 'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
              url:'https://server.arcgisonline.com/ArcGIS/rest/services/' + 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            }),
          }),
          new ol.layer.Tile({
            title: 'ArcGIS World Imaginary Map',
            type:'base',
            source: new ol.source.XYZ({
              attributions:'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' + 'rest/services/World_Imagery/MapServer">ArcGIS</a>',
              url:'https://server.arcgisonline.com/ArcGIS/rest/services/' + 'World_Imagery/MapServer/tile/{z}/{y}/{x}'
            }),
          })

        ]

        // var url_UN = "https://geoservices.un.org/arcgis/rest/services/ClearMap_WebTopo/MapServer";
        var myZoom;
        if($( window ).width() <= 768){
          myZoom = 2;
        }
        else{
          myZoom = 3;
        }
        var projection = ol.proj.get("EPSG:3857");

        // how to add the UN map //
        //https://openlayers.org/en/latest/examples/arcgis-tiled.html
        //https://geoportal.un.org/arcgis/home/item.html?id=541557fd0d4d42efb24449be614e6887

        // const baseLayer =  new ol.layer.Tile({
        //         source: new ol.source.TileArcGISRest({
        //           attributions: 'Produced by United Nations Geospatial',
        //           url: url_UN
        //         })
        // });

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
        // layers = [baseLayer, vector_layer, shpLayer];
        // layers = layers.push(vector_layer);
        // layers = layers.push(shpLayer);
        // console.log(layers);
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
                      new ol.control.FullScreen(),
                      new ol.control.Attribution({
                        collapsible: true,
                        collapsed: false,
                        tipLabel: 'Produced by United Nations Geospatial'
                      })
                  ]),
              crossOrigin: "anonymous",
              // interactions: ol.interaction.defaults({ dragPan: false}),
          })


        map.addControl(new ol.control.LayerSwitcher());
        map.addLayer(vector_layer);
        map.addLayer(shpLayer);


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
        console.log(e)
        new Notify ({
          status: 'error',
          title: 'Error',
          text: `Unable to initialize the map of the Data Explorer`,
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
        //         message: `Unable to initialize the map of the Data Explorer`
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


    give_name = function(){
      try{
        if(views_names != "None"){
          $(".titleh").html(`${views_names} Views `)
          // $(".app-title").html(`${views_names} Data Explorer`)
        }
        else{
          $(".titleh").html(`Views `)
          $(".app-title").html(`Water Data Explorer`)
          new Notify ({
            status: 'success',
            title: 'Water Data Explorer',
            text: 'Tip: You can give name to the Data Explorer by going into the settings',
            effect: 'fade',
            speed: 200,
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
          //         message: `Tip: You can give name to the Data Explorer by going into the settings`
          //     },
          //     {
          //         type: "info",
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
      catch(e){
        new Notify ({
          status: 'warning',
          title: 'Warning',
          text: `Unable to give a customized name to the view of the Water Data Explorer`,
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
        //         message: `Unable to give a customized name to the view of the Water Data Explorer`
        //     },
        //     {
        //         type: "info",
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
      // responsive_graphs();

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

      // Setup the toggles
      $('#sG-legend').bootstrapToggle('on');
      $('#sG').bootstrapToggle('off');
      try{
        $('#blockPosition').bootstrapToggle('off');
      }
      catch(e){}

      //make the picker to always appear//
      //$(".selectpicker").selectpicker("refresh");
      $(".selectpicker").select2();
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.selectpicker').selectpicker('mobile');
      }

      $(".carousel-control-prev ").hide();
      $(".carousel-control-prev").on("click",hide_or_show_buttons_on_carousel)
      $(".carousel-control-next").on("click",hide_or_show_buttons_on_carousel)
      $(".carousel-indicator").on("click",hide_or_show_buttons_on_carousel)
      $(".toggle-nav").on("click",function(){

          setTimeout(function(){ map.updateSize(); }, 200);
          setTimeout(function(){
            try{
              if($('#plots').is(':visible')){
                Plotly.Plots.resize("plots");
                  Plotly.relayout($("plots"), {
                    'xaxis.autorange': true,
                    'yaxis.autorange': true
                  });
              }
            }
            catch(e){
              console.log("Simple plotly error, not worry")
            }

          },200)
          if($( window ).width() < 500){
            if($("#inner-app-content").width() < $( window ).width()){
              $('#sG-legend').bootstrapToggle('on');
            }
            else{
              $('#sG-legend').bootstrapToggle('off');
              $('#sG').bootstrapToggle('off');


            }
          }

      });
      $(".carousel-control-next").on("click",function(e){
        map.updateSize();

      })


      $('[data-bs-toggle="tooltip"]').tooltip()

      $('body').tooltip({
          selector: '.tool_tip_h'
      });
      $('#app-navigation').tooltip({
          selector: '.chkbx-layer'
      });

      $('#checkbox-label').on('show.bs.tooltip change', function (e) {
          $this = $(this);
          console.log("hoppp");
          if (e.type == 'show' && $this.find(":checkbox").is(":checked")) {
              e.preventDefault();
          } else if (e.type == 'change') {
              $this.find(":checkbox").is(":checked") ? $this.tooltip('hide') : $this.tooltip('show');
          }
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
    }
      catch(error){
        console.log(error);
        new Notify ({
          status: 'error',
          title: 'Error',
          text: `Unable to start the Water Data Explorer`,
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
        //         message: `Unable to start the Water Data Explorer`
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


  })
})() // End of package wrapper

/*
************ FUNCTION NAME: INIT_JEQUERY_VAR**********************
************ PURPOSE: INITIALIZE ALL THE JQUERY VARIABLES USED***********
*/
hide_or_show_buttons_on_carousel = function(){
  if ($("#tables_info").hasClass("active")) {
    $(".carousel-control-next ").hide();
    $(".carousel-control-prev ").show();
   }
   if ($("#plots_info").hasClass("active")) {
    $(".carousel-control-next ").show();
    $(".carousel-control-prev ").hide();
   }
}
