/*****************************************************************************
 * FILE:                utilities.js
 * BEGGINING DATE:      16 Jun 2021
 * ENDING DATE:         ---------------
 * AUTHOR:              Giovanni Romero Bustamante
 * COPYRIGHT:           (c) Brigham Young University 2020
 * LICENSE:             MIT
 *
 *****************************************************************************/

/**
* uuidv4 function.
 * Function to get a uuidv for a group or server
 * @return {string} uuid - uuid indetifier
* */
uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
* copyToClipboard function.
  * Function to copy to a clipboard
  * @param {string} element - string to be copied to the clipboard
* */
copyToClipboard = function(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  $.notify(
      {
          message: `copied to clipboard`
      },
      {
          element: '#urlHydroserver',
          type: "info",
          allow_dismiss: true,
          z_index: 20000,
          placement: {
            from: "top",
            align: "right"
          },
          offset: {
            // x: -80,
            y: 100,
          },
          delay:1000,
          template: '<div id="modalCrazy" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      }
  )
}

/**
* disable_map function.
  * Function to disable the movement of the map
* */
disable_map =  function (){
  try{
    let map_block=document.getElementById("blockPosition");
    let layerBoundary = layersDict['boundaryLayer'];
    let vectorSource = layerBoundary.getSource();
    if(map_block.checked){
      var extent = vectorSource.getExtent();
      ////console.log(extent);
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
  catch(err){
    $.notify(
        {
            message: `Boundary layer was not setup, please go to settings and set up the boundary layer`
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
$('#blockPosition').change(disable_map)

/**
* addDefaultBehaviorToAjax function.
  * Function to extent the functionality of the ajax request
* */
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

/**
* checkCsrfSafe function.
  * Function that states HTTP methods that do not require CSRF protection
  * @param {string} method - string to be copied to the clipboard
  * @return {string} string - string containing the HTTP methods that do not require CSRF protection
* */
checkCsrfSafe = function(method) {
    // these HTTP methods do not require CSRF protection
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
}

/**
* getCookie function.
  * Function to generate a cookie
  * @param {string} name - string representing a name
  * @return {string} cookieValue - string representing a cookie
* */
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

/**
* set_color function.
  * Function to generate a hexcolor from a list of colors
  * @return {string} color - string representing a hexcode color
* */
set_color = function() {
    var color = colors[Math.floor(Math.random() * colors.length)]
    return color
}

/**
* clear_coords function.
  * Clear the point/polygon coordinates so that its easier for the post request to process the form
* */
clear_coords = function() {
    $("#poly-lat-lon").val("")
    $("#point-lat-lon").val("")
}

/**
* activate_deactivate_graphs function.
  * Function to hide or show the graphs panel
* */
activate_deactivate_graphs = function(){
  try{
    let actual_state=$(this).prop('checked');
    let element_graphs=document.getElementById("graph");

    let element_map =document.getElementById("map");
    if(actual_state){
      if($( window ).width() > 320 && $( window ).width() <= 480){
        element_graphs.style.cssText=  "display: flex !important; flex-direction: column;";
        map.updateSize();
      }
      else{
        element_graphs.style.cssText=  "display: flex !important; flex-direction: row;";
        map.updateSize();
      }

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
    }

    else{

      $("#graph").hide();
      if(map !==undefined){
        map.updateSize();

      }

    }
  }
  catch(e){
    console.log(e);
  }


};
$('#sG').change(activate_deactivate_graphs)

/**
* legend_change function.
  * Function to hide or show the legend of the map
* */
legend_change = function(){
  try{
    let actual_state=$(this).prop('checked');
    if(actual_state){
      $("#tableLegend").show()
    }
    else{
      $("#tableLegend").hide();
    }
  }
  catch(e){
    console.log(e);
  }

}
$('#sG-legend').change(legend_change)


/**
* checkCsrfSafe function.
  * Function that states HTTP methods that do not require CSRF protection
  * @param {object} xArray - Array containing the dates for the x axis
  * @param {object} yArray - Array containing the values for the y axis
  * @param {string} title_graph - string repreenting the title of the graph
  * @param {string} xTitle - string representing the x axis title
  * @param {string} yTitle - string representing the y axis title
  * @param {string} legend1 - string representing the name of the variable in the legend
  * @param {string} type - string representing the type of graphs: "scatter" or "whisker"
  * @param {object} xArrayIn - Array containing the dates for the x axis for the interpolation values
  * @param {object} yArrayIn - Array containing the interpolation values for the y axis
* */
initialize_graphs = function(xArray,yArray,title_graph,xTitle,yTitle,legend1,type,xArrayIn,yArrayIn){
  try{
    let element_graphs=document.getElementById("graph");
    $("#graphs").empty();
    let element_map =document.getElementById("map");
      //make the down part visible and also give the design of the model//



    if($( window ).width() > 320 && $( window ).width() <= 480){
      element_graphs.style.cssText=  "display: flex; flex-direction: column;";
    }
    else{
      element_graphs.style.cssText=  "display: flex !important; flex-direction: row;";
    }




    map.updateSize();
    var config = {
       modeBarButtonsToRemove: ['hoverClosestCartesian', 'hoverCompareCartesian','resetScale2d','toggleSpikelines'],
       displaylogo: false,
       responsive:true
    };

    if(type === "scatter"){
      var trace1 = {
        x: xArray,
        y: yArray,
        mode: (yArray.length > 1) ? 'lines' : 'lines+markers',
        type: type,
        name: legend1,
        text: [],
        line: {color: '#17BECF'},
      };
      var interpolation_trace;
      var data = [];
      data.push(trace1)
      if(xArrayIn != undefined && yArrayIn != undefined){
        interpolation_trace = {
          x: xArrayIn,
          y: yArrayIn,
          mode: 'lines',
          type: type,
          name: `Mean Interpolation`,

          text: [],
          marker: { size: 5 },
          line: {
            color: '#FF6347',
            dash: 'dot',
          }
        };
        data.push(interpolation_trace);
      }

      var layout = {
        width: $(".carousel-inner").parent().width(),
        yaxis: {
          title: {
           text: yTitle,
           font: {
             size: 15,
             color: '#7f7f7f'
           }
         },
         automargin: true,
        },
        xaxis: {
         automargin: true,
        },
        // title: title_graph,
        autosize: true,
        showlegend:true,
        legend: {
          "orientation": "h",
          yanchor: 'top',
          xanchor:'center',
          y:-0.15,
          x:0.5
        },
        margin: {
          l: 40,
          r: 40,
          b: 40,
          t: 40,
          pad: 10
        },
      };


      Plotly.newPlot('plots', data, layout, config);

    }

    if(type === "whisker"){
      let trace1 = {
        y: yArray,
        type: 'box',
        name: 'All Points',
        marker: {color: '#3D9970'},
        boxpoints: 'outliers',
        boxmean: 'sd'

      };

      let data = [trace1];

      let layout = {
        title: title_graph,
        autosize: true,

      };
      Plotly.newPlot('plots', data, layout, config);
    }
    // update the layout to expand to the available size
    // when the window is resized
    window.onresize = function() {
        Plotly.relayout('plots', {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
    };


  }
  catch(e){
    $.notify(
        {
            message: `Unable to initialize the graphs`
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

/**
* featureStyle function.
  * Function to create a feature style for the sites.
  * @param {string} myColor - string representing a hexcolor
  * @return {object} style - Open layers style ;
* */
featureStyle = function (myColor) {
    var styleCache = {};
    var style2 =
    function (feature) {
      var size = feature.get('features').length;
      var style = styleCache[size];
      if (!style) {
        style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 10,
            stroke: new ol.style.Stroke({
              color: "white",
            }),
            fill: new ol.style.Fill({
              color: myColor,
            }),
          }),
          text: new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({
              color: '#fff',
            }),
          }),
        });
        styleCache[size] = style;
      }
      return style;
    }

    return style2
}

/**
* set_color function.
  * Function to generate a new hexcolor
  * @return {string} color_new - string representing a hexcode color
* */
get_new_color = function (){
  var color_new = colors_unique[Math.floor(Math.random() * colors_unique.length)];
  if (!colors_used.includes(color_new)) {
    colors_used.push(color_new)
    return color_new
  }

}

/**
* html_for_groups function.
  * Function that creates the html string for the groups in the left pannel of the app
  * @param {boolean} isAdmin - boolean representing if it is an admin.
  * @param {string} title - string representing the name of the catalog
  * @param {string} id_group_separator - string repreenting the id of the catalog separator
  * @return {string} newHtml - html string containing the catalogs structure.
* */
html_for_groups = function(isAdmin, title, id_group_separator){
  try{
    let newHtml;
    if (isAdmin){
      newHtml =

      `
      <div class="panel panel-default" id="${title}_panel">
        <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
          <h4 class="panel-title tool_tip_h" data-toggle="tooltip" data-placement="right" title="${id_dictionary[title]}">
            <a role="button" data-toggle="collapse" data-target="#collapse_${title}" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
            <span class="group-name"> ${id_dictionary[title]}</span>

            </a>
          </h4>
          <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">

              <input class="chkbx-layers" type="checkbox">
              <button class="btn btn-primary btn-sm" data-toggle="modal" data-dismiss="modal" data-target="#modalInterface">
                <span class=" glyphicon glyphicon-info-sign "></span>
              </button>

              <button id="load-from-soap" class="btn btn-primary btn-sm" data-toggle="modal" data-dismiss="modal" data-target="#modalAddSoap">
                <span class="glyphicon glyphicon-plus"></span>
              </button>
              <button id="delete-server" class="btn btn-primary btn-sm" data-toggle="modal"  data-dismiss="modal" data-target="#modalDelete">
                <span class="glyphicon glyphicon-trash"></span>
              </button>
          </li>

        </div>

        <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
        <div class="iconhydro"><img src="https://img.icons8.com/dusk/24/000000/ssd.png"/>WaterOneFlow Web Services</div>
          <div class="panel-body">
              <div id= ${id_group_separator} class="divForServers">
                <button class="btn btn-danger btn-block" id = "${title}-noGroups"> The group is empty</button>
              </div>
          </div>
        </div>
      </div>
      `

      return newHtml
    }
    else{
      newHtml =
      `
      <div class="panel panel-default" id="${title}_panel">
        <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
          <h4 class="panel-title tool_tip_h" data-toggle="tooltip" data-placement="right" title="${id_dictionary[title]}">
            <a role="button" data-toggle="collapse" data-parent="#current-Groupservers" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
            <span class="group-name">${id_dictionary[title]}</span>

            </a>
          </h4>
          <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
            <input class="chkbx-layers" type="checkbox">
            <button class="btn btn-primary btn-sm" data-toggle="modal" data-dismiss="modal" data-target="#modalInterface">
              <span class=" glyphicon glyphicon-info-sign "></span>
            </button>
          </li>
        </div>
        <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
          <div class="panel-body">
              <div id= ${id_group_separator} class="divForServers"></div>
          </div>
        </div>
      </div>
      `

      return newHtml
    }
  }
  catch(e){
    console.log(e);
  }
}

/**
* change_effect_groups function.
  * Function that makes the sites to be visible or hidden
  * @param {boolean} isAdmin - boolean representing if it is an admin.
  * @param {string} title - string representing the name of the catalog
  * @param {string} id_group_separator - string representing the id of the catalog separator
  * @return {string} newHtml - html string containing the catalogs structure.
* */
change_effect_groups = function(element_to_check,id_group_separator){
  try{
    if(layersDict['selectedPointModal']){
      map.removeLayer(layersDict['selectedPointModal'])
      map.updateSize()
    }
    if(layersDict['selectedPoint']){
      map.removeLayer(layersDict['selectedPoint'])
      map.updateSize()
    }
    let servers_checks = Array.from(document.getElementById(`${id_group_separator}`).children);
    for(i = 0; i < servers_checks.length; i++) {
      let server_name = servers_checks[i].id;
       let checkbox = Array.from(servers_checks[i].children)
       for (var j = 0; j < checkbox.length; j++) {
           if (checkbox[j].className == "chkbx-layer") {
             checkbox[j].checked = element_to_check.checked;
           }
       }
       let server_new_name = id_dictionary[server_name];
       ////console.log(checkbox);
       map.getLayers().forEach(function(layer) {
         if(layer_object_filter.hasOwnProperty(server_new_name) == false){
           //console.log("false")
           if(layer instanceof ol.layer.Vector && layer == layersDict[server_new_name]){
             if(element_to_check.checked){

               layer.setStyle(featureStyle(layerColorDict[server_new_name]));
             }
             else{
               layer.setStyle(new ol.style.Style({}));
             }
           }
         }
         else{
           if(layer instanceof ol.layer.Vector && layer == layer_object_filter[server_new_name]){
             if(element_to_check.checked){

               layer.setStyle(featureStyle(layerColorDict[server_new_name]));
             }
             else{
               layer.setStyle(new ol.style.Style({}));
             }
           }
         }
        });
     }

  }
  catch(e){
    console.log(e);
  }
}

/**
* html_for_servers function.
* Function that creates the html string for the servers in the left pannel of the app
  * @param {string} title - string representing the name of the catalog
  * @param {string} group_name - string representing the id of the catalog
  * @param {boolean} isNew - boolean representing if the server is newly added
  * @return {string} newHtml - html string containing the catalogs structure.
* */
html_for_servers = function(isAdmin,title,group_name,isNew){


  try{

    let check_var = (( isNew == true ) ? 'checked' : '');
    let newHtml;

    if (isAdmin){
      newHtml = `
      <li class="ui-state-default" layer-name="${title}" id="${title}" >
      <span class="server-name tool_tip_h" data-toggle="tooltip" data-placement="right" title="${id_dictionary[title]}">${id_dictionary[title]}</span>
      <input class="chkbx-layer" type="checkbox" data-toggle="tooltip" data-placement="bottom" title="Show/Hide View" ${check_var}>
      <button type="button" id="${title}_${group_name}_reload" class="btn btn-xs" >
       <span  class="glyphicon glyphicon-refresh tool_tip_h" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Update View">
       </span>
      </button>
      <button type="button" id="${title}_zoom" class="btn btn-dark btn-xs" >
       <span class="glyphicon glyphicon-map-marker tool_tip_h" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Zoom to View"></span>
      </button>
  
      <button id="${title}_variables" class="btn btn-dark btn-xs" data-toggle="modal" data-target="#modalShowVariablesTable"> <span class=" glyphicon glyphicon-list-alt tool_tip_h" data-toggle="tooltip" data-placement="bottom" title="View Variables"></span>
      </button>
  
      <button type="button" id="${title}_variables_info" class="btn btn-dark btn-xs" data-toggle="modal" data-target="#modalHydroserInformation">
       <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
      </button>
  
      </li>
      `;
    }
    else{
      newHtml = `
      <li class="ui-state-default" layer-name="${title}" id="${title}" >
      <span class="server-name tool_tip_h" data-toggle="tooltip" data-placement="right" title="${id_dictionary[title]}">${id_dictionary[title]}</span>
      <input class="chkbx-layer" type="checkbox" data-toggle="tooltip" data-placement="bottom" title="Show/Hide View" ${check_var}>
      <button type="button" id="${title}_zoom" class="btn btn-dark btn-xs" >
       <span class="glyphicon glyphicon-map-marker tool_tip_h" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Zoom to View"></span>
      </button>
  
      <button id="${title}_variables" class="btn btn-dark btn-xs" data-toggle="modal" data-target="#modalShowVariablesTable"> <span class=" glyphicon glyphicon-list-alt tool_tip_h" data-toggle="tooltip" data-placement="bottom" title="View Variables"></span>
      </button>
  
      <button type="button" id="${title}_variables_info" class="btn btn-dark btn-xs" data-toggle="modal" data-target="#modalHydroserInformation">
       <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
      </button>
  
      </li>
      `;
      
    }

    return newHtml
  }
  catch (e){
    console.log(e);
  }

}

/**
* toDegreesMinutesAndSeconds function.
* Function to format the lat and lon coordinates into degrees , minutes, seconds
  * @param {number} coordinate - number representing a latitude or longitude
  * @return {string} degrees - string for coordinates of the format : degrees , minutes, seconds
* */
toDegreesMinutesAndSeconds = function(coordinate) {
    try{
      var absolute = Math.abs(coordinate);
      var degrees = Math.floor(absolute);
      var minutesNotTruncated = (absolute - degrees) * 60;
      var minutes = Math.floor(minutesNotTruncated);
      var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

      return degrees + "°" + minutes + "'" + seconds + "''";
    }
    catch(e){
      console.log(e);
    }

}

/**
* getIconLegend function.
* Function to create icon for each view
  * @param {object} style - Open layers style
  * @param {string} server - string representing a view
  * @return {string} svgElem - HTML string containing the icon.
* */
getIconLegend = function(style,server) {
  try{
    style = style.getImage();
    var radius = style.getRadius();
    var strokeWidth = style.getStroke().getWidth();
    var dx = radius + strokeWidth;

    var svgElem = $('<svg/>')
    .attr({
      class: 'svgs_legend',
      width: 11,
      height: 11
    });
    $('<circle />')
    .attr({
      cx: 5,
      cy: 5,
      r: 5,
      stroke: style.getStroke().getColor(),
      'stroke-width': strokeWidth,
      fill: style.getFill().getColor()
    })
    .appendTo(svgElem);


    // Convert DOM object to string to overcome from some SVG manipulation related oddities
    return $('<div>').append(svgElem).html();
  }
  catch(e){
    console.log(e);
  }

}

/**
* check_if_exits function.
* Function to check if a groups/service has already been created
  * @param {string} name_to_check - name of the group or service
  * @return {boolean} isThere - boolean to see if the group/service exists
* */
check_if_exits = function(name_to_check){
  try{
      isThere = false;
  Object.keys(id_dictionary).forEach(function(key){
    if(id_dictionary[key] == name_to_check){
      isThere = true;
      return isThere
    }
  })
  return isThere
  }
  catch(e){
    console.log(e);
  }

}
