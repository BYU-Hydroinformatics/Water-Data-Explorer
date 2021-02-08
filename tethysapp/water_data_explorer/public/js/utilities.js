function featureStyle() {
    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            }),
            fill: new ol.style.Fill({
                // color: `#${(((1 << 24) * Math.random()) | 0).toString(16)}`
                color: "#00FF00"
            })
        })
    })
    return style
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
************ FUNCTION NAME: INITIALIZE_GRAPHS **********************
************ PURPOSE: INITIALIZES ANY GRAH IN THE TIME SERIE OR BEGINNING ***********
*/
initialize_graphs = function(xArray,yArray,title_graph,xTitle,yTitle,legend1,type,xArrayIn,yArrayIn){
  let element_graphs=document.getElementById("graph");
  $("#graphs").empty();
  let element_map =document.getElementById("map");
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
        responsive: true
    }
  if(type === "scatter"){
    var trace1 = {
      x: xArray,
      y: yArray,
      mode: 'lines',
      type: type,
      name: legend1,
      text: [],
      marker: { size: 5 },
      line: {color: '#17BECF'}
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
        line: {color: '#FF6347'}
      };
      data.push(interpolation_trace);
    }

    var layout = {
      xaxis: {
        title: {
         text: xTitle,
         font: {
           size: 15,
           color: '#7f7f7f'
         }
       }
      },
      yaxis: {
        title: {
         text: yTitle,
         font: {
           size: 15,
           color: '#7f7f7f'
         }
       }
      },
      title: title_graph,
      autosize: true,
      showlegend:true,
    };

    Plotly.newPlot('plots', data, layout,config);

  }
  if(type ==="bar"){

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
      },
      autosize: true,

    };
    // Plotly.newPlot('plotsDis', data, layout,config);

  }
  if(type === "pie"){
    var data = [{
      values:yArray,
      labels:xArray,
      type: type,
      hoverinfo: 'label + percent',
       textposition: 'inside'
    }];

    var layout = {
      title: title_graph,
      // height: 400,
      // width: 900,
      showlegend: true,
      legend: {
        xanchor:"center",
        yanchor:"top",
        y:-0.3, // play with it
        x:0.5   // play with it
      },
      autosize: true,


    };

    // Plotly.newPlot('plotsDis', data, layout,config);

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
    Plotly.newPlot('plots', data, layout,config);

  }

  // window.onresize = function() {
  //     Plotly.relayout('plots', {
  //         'xaxis.autorange': true,
  //         'yaxis.autorange': true
  //     });
  // };
}
function featureStyle(myColor) {
    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            }),
            fill: new ol.style.Fill({
                // color: `#${(((1 << 24) * Math.random()) | 0).toString(16)}`
                // color: get_new_color()
                color: myColor
            })
        })
    })
    return style
}

function get_new_color(){
  var color_new = colors_unique[Math.floor(Math.random() * colors_unique.length)];
  if (!colors_used.includes(color_new)) {
    colors_used.push(color_new)
    console.log(color_new)
    return color_new
  }
  // var new_color = colors_unique[0]
  // colors_used.push(new_color)
  // colors_unique.shift()
  // var color_new = colors_unique[Math.floor(Math.random() * colors_unique.length)];
  // return color_new
}

function html_for_groups(isAdmin, title, id_group_separator){
   let newHtml;
  if (isAdmin){
    newHtml =
    `
    <div class="panel panel-default" id="${title}_panel">
      <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
        <h4 class="panel-title">
          <a role="button" data-toggle="collapse" data-target="#collapse_${title}" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
          <span class="group-name"><strong>${ind})</strong> ${title}</span>

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
      <div class="iconhydro"><img src="https://img.icons8.com/dusk/24/000000/ssd.png"/>Broker Endpoints</div>
        <div class="panel-body">
            <div id= ${id_group_separator} class="divForServers"></div>
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
        <h4 class="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#current-Groupservers" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
          <span class="group-name"><strong>${ind})</strong> ${title}</span>
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
function change_effect_groups(element_to_check,id_group_separator){
  let servers_checks = Array.from(document.getElementById(`${id_group_separator}`).children);
  for(i = 0; i < servers_checks.length; i++) {
    let server_name = servers_checks[i].id;
     let checkbox = Array.from(servers_checks[i].children)
     for (var j = 0; j < checkbox.length; j++) {
         if (checkbox[j].className == "chkbx-layer") {
           console.log(checkbox[j])
           checkbox[j].checked = element_to_check.checked;
         }
     }
     console.log(checkbox);
     map.getLayers().forEach(function(layer) {
          if(layer instanceof ol.layer.Vector && layer == layersDict[server_name]){
            if(element_to_check.checked){
              layer.setStyle(featureStyle(layerColorDict[server_name]));
            }
            else{
              layer.setStyle(new ol.style.Style({}));
            }
          }
      });
   }
}
function html_for_servers(){


}
function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + "°" + minutes + "'" + seconds + "''";
}
