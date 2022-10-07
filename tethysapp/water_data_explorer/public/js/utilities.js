responsive_graphs =  function(){
  let newHtml;
  if($( window ).width() > 1224){
    $("#graph").empty()
    newHtml = `
    <div id="options">
      <h3 id= "siteName_title"> Select a Station</h3>
        <p id= "siteDes"> No Site Selected, when a site is "clicked" metadata of the site will display
          in this part such as a name and a description.
        </p>
      <div id="table_div"></div>
    </div>
    <div id="plots2">
      <h3></h3>
      <div id= "ipad_lay_contr">
      <div id= "firstContainer" class="controlGraphs2">
        <div id= "select-graphs">
          <select id= "variables_graph" class="selectpicker" data-live-search="true" data-style="btn-info" data-width="100%" >
            <option > Variables</option>
          </select>
          <select id="type_graph_select2" class="selectpicker" data-width="100%">

            <optgroup label="Individual Variable Plots">
              <option> Scatter </option>
              <option> Whisker and Box </option>
          </optgroup>
          </select>
        </div>
        <div id= "timeControllers" class="containerTime">
            <div class='col-md-5'>
                <div class="form-group">
                    <div class='input-group date' id='datetimepicker6' data-provide="datepicker">
                        <input type='text' class="form-control" />
                        <span class="input-group-addon">
                          <i class="bi bi-calendar2-week-fill"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class='col-md-5'>
                <div class="form-group">
                    <div class='input-group date' id='datetimepicker7' data-provide="datepicker">
                        <input type='text' class="form-control" />
                        <span class="input-group-addon">
                          <i class="bi bi-calendar2-week-fill"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div id= "secondContainer" class="controlGraphs2">
          <button type="button" id= "update_graphs" class="btn btn-danger">Search</button>
          <select id= "download_dropdown" class="selectpicker" data-live-search="false" data-width="fit" data-size="mini">
              <option value="Download">Download</option>
              <option value="CSV" >CSV</option>
              <option value = "WaterML1.0">WaterML 1.0</option>
              <option value = "WaterML2.0">WaterML 2.0</option>
          </select>
      </div>
      </div>


      <div id="plots"></div>
    </div>
    `
  }
  if($( window ).width() >= 768 && $( window ).width() <= 1224){

    $("#graph").empty()
    newHtml = `
    <div id="carouselExampleIndicators" class="carousel slide" data-interval="false" >
      <ol class="carousel-indicators">
        <li data-bs-target="#carouselExampleIndicators" data-slide-to="0" class="active">
        </li>
        <li data-bs-target="#carouselExampleIndicators" data-slide-to="1"></li>
      </ol>
      <div class="carousel-inner">
        <div class="item active">
            <div id="options">
              <h3 id= "siteName_title"> Select a Station</h3>
                <p id= "siteDes"> No Site Selected, when a site is "clicked" metadata of the site will display
                  in this part such as a name and a description.
                </p>
              <div id="table_div"></div>
            </div>
        </div>
        <div class="item">
          <div id="plots2">
            <h3></h3>
            <div id= "ipad_lay_contr">
            <div id= "firstContainer" class="controlGraphs2">
              <div id= "select-graphs">
                <select id= "variables_graph" class="selectpicker" data-live-search="true" data-style="btn-info" data-width="100%" >
                  <option > Variables</option>
                </select>
                <select id="type_graph_select2" class="selectpicker" data-width="100%">

                  <optgroup label="Individual Variable Plots">
                    <option> Scatter </option>
                    <option> Whisker and Box </option>
                </optgroup>
                </select>
              </div>
              <div id= "timeControllers" class="containerTime">
                  <div class='col-md-5'>
                      <div class="form-group">
                          <div class='input-group date' id='datetimepicker6' data-provide="datepicker">
                              <input type='text' class="form-control" />
                              <span class="input-group-addon">
                                <i class="bi bi-calendar2-week-fill"></i>
                              </span>
                          </div>
                      </div>
                  </div>
                  <div class='col-md-5'>
                      <div class="form-group">
                          <div class='input-group date' id='datetimepicker7' data-provide="datepicker">
                              <input type='text' class="form-control" />
                              <span class="input-group-addon">
                                <i class="bi bi-calendar2-week-fill"></i>
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            <div id= "secondContainer" class="controlGraphs2">
                <button type="button" id= "update_graphs" class="btn btn-danger">Search</button>
                <select id= "download_dropdown" class="selectpicker" data-live-search="false" data-width="fit" data-size="mini">
                    <option value="Download">Download</option>
                    <option value="CSV" >CSV</option>
                    <option value = "WaterML1.0">WaterML 1.0</option>
                    <option value = "WaterML2.0">WaterML 2.0</option>
                </select>
            </div>
            </div>


            <div id="plots"></div>
          </div>


        </div>
      </div>
      <a class="left carousel-control" href="#carouselExampleIndicators" data-slide="prev">
        <i class="bi bi-chevron-left"></i>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#carouselExampleIndicators" data-slide="next">
        <i class="bi bi-chevron-right"></i>
        <span class="sr-only">Next</span>
      </a>

    </div>
    `
  }

  $(newHtml).appendTo("#graph");
}




uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}




copyToClipboard = function(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  new Notify ({
    status: 'success',
    title: 'Success',
    text: `Copied to clipboard`,
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
  //         message: `copied to clipboard`
  //     },
  //     {
  //         element: '#urlHydroserver',
  //         type: "info",
  //         allow_dismiss: true,
  //         z_index: 20000,
  //         placement: {
  //           from: "top",
  //           align: "right"
  //         },
  //         offset: {
  //           // x: -80,
  //           y: 100,
  //         },
  //         delay:1000,
  //         template: '<div id="modalCrazy" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
  //         '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
  //         '<span data-notify="icon"></span> ' +
  //         '<span data-notify="title">{1}</span> ' +
  //         '<span data-notify="message">{2}</span>' +
  //         '<div class="progress" data-notify="progressbar">' +
  //           '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
  //         '</div>' +
  //         '<a href="{3}" target="{4}" data-notify="url"></a>' +
  //         '</div>'
  //     }
  // )
}


/*
************ FUNCTION NAME: DISABLE MAP **********************
************ PURPOSE: DISABLES OR ENABLES THE ZOOM OUT AND DRAGGING OF THE MAP ***********
*/
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
    new Notify ({
      status: 'warning',
      title: 'Warning',
      text: `Boundary layer was not setup, please go to settings and set up the boundary layer`,
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
    //         message: `Boundary layer was not setup, please go to settings and set up the boundary layer`
    //     },
    //     {
    //         type: "info",
    //         allow_dismiss: true,
    //         z_index: 20000,
    //         delay: 5000
    //     }
    // )
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
************ FUNCTION NAME: ACTIVATE_DEACTIVATE_GRAPHS **********************
************ PURPOSE: THE FUNCTIONS SHOWS THE GRAPHS IN THE LOWER PORTION OF THE MAP ***********
*/
activate_deactivate_graphs = function(){
  ////console.log("we ACTIVATEEAAGAG");
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

};
$('#sG').change(activate_deactivate_graphs)

legend_change = function(){
  let actual_state=$(this).prop('checked');
  if(actual_state){
    $("#tableLegend").show()
  }
  else{
    $("#tableLegend").hide();
  }
}
$('#sG-legend').change(legend_change)
/*
************ FUNCTION NAME: CLEANGRAPH **********************
************ PURPOSE: RESET THE GRAPHS PORTION ***********
*/
cleanGraphs = function(){
  //RESET THE GRAPHS PORTION //
  $( "#table_div" ).empty();
  initialize_graphs([],[],"No data Available","","","","scatter");
  $("#siteName_title").html("Select a Station");
  $("#siteDes").html("No Site Selected, when a site is 'clicked' metadata of the site will display in this part such as a name and a description.");
  $('#variables_graph option').remove();
  // $('#variables_graph').selectpicker('refresh');
  $('#variables_graph').select2();
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
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `Unable to initialize the graphs`,
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
    //         message: `Unable to initialize the graphs`
    //     },
    //     {
    //         type: "danger",
    //         allow_dismiss: true,
    //         z_index: 20000,
    //         delay: 5000
    //     }
    // )
  }

}
function featureStyle(myColor) {
    ////console.log("ahuringa")
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



function get_new_color(){
  var color_new = colors_unique[Math.floor(Math.random() * colors_unique.length)];
  if (!colors_used.includes(color_new)) {
    colors_used.push(color_new)
    return color_new
  }

}

function html_for_groups(isAdmin, title, id_group_separator){
  try{
    let newHtml;
    if (isAdmin){
      // Updated the following block for new accordion bootstrap 5 functionality
      newHtml =

      `
      <div class="accordion-item" id="${title}_panel">
        <div class="accordion-header" id="heading_${title}" style="background: #286090 !important; display: flex; width: 100%;">
          <h4 class="accordion-title tool_tip_h" id="${id_dictionary[title]}" data-bs-toggle="tooltip" data-placement="right" title="${id_dictionary[title]}">
            <a role="button" data-bs-toggle="collapse" data-bs-target="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
            <span class="group-name">${id_dictionary[title]}</span>
            </a>
          </h4>
          <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">

              <input class="chkbx-layers" type="checkbox">
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalInterface">
                <i class="bi bi-info-circle-fill"></i>
              </button>

              <button id="load-from-soap" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalAddSoap">
                <i class="bi bi-plus-lg"></i>
              </button>
              <button id="delete-server" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalDelete">
                <i class="bi bi-trash"></i>
              </button>
          </li>
        </div>
  
        <div id="collapse_${title}" class="accordion-collapse collapse show" aria-labelledby="heading_${title}">
          <div class="iconhydro"><img src="https://img.icons8.com/dusk/24/000000/ssd.png"/>WaterOneFlow Web Services</div>
            <div class="accordion-body">
              <div id= ${id_group_separator} class="divForServers">
                <div class="d-grid gap-2">
                  <button class="btn btn-danger btn-block" id = "${title}-noGroups"> The group is empty</button>

                </div>
              </div>
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
      <div class="accordion-item" id="${title}_panel">
        <div class="accordion-header" id="heading_${title}" style="background: #286090 !important; display: flex; width: 100%;">
          <h4 class="accordion-title tool_tip_h" id="${id_dictionary[title]}" data-bs-toggle="tooltip" data-placement="right" title="${id_dictionary[title]}">
          <a role="button" data-bs-toggle="collapse" data-bs-target="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
            <span class="group-name">${id_dictionary[title]}</span>
            </a>
          </h4>
          <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
            <input class="chkbx-layers" type="checkbox">
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalInterface">
              <i class="bi bi-info-circle-fill"></i>
            </button>
          </li>
        </div>
        <div id="collapse_${title}" class="accordion-collapse collapse show" aria-labelledby="heading_${title}">
          <div class="accordion-body">
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

function change_effect_groups(element_to_check,id_group_separator){
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

function html_for_servers(title,group_name,isNew){
  try{
    let check_var = (( isNew == true ) ? 'checked' : '');
    let newHtml = `
    <li class="ui-state-default" layer-name="${title}" id="${title}" >
    <span class="server-name tool_tip_h" data-bs-toggle="tooltip" data-placement="right" title="${id_dictionary[title]}">${id_dictionary[title]}</span>
    <input class="chkbx-layer" type="checkbox" data-bs-toggle="tooltip" data-placement="bottom" title="Show/Hide View" ${check_var}>
    <button type="button" id="${title}_${group_name}_reload" class="btn btn-sm" >
     <i class="bi bi-arrow-clockwise tool_tip_h" aria-hidden="true" data-bs-toggle="tooltip" data-placement="bottom" title="Update View"></i>
    </button>
    <button type="button" id="${title}_zoom" class="btn btn-sm" >
     <i class="bi bi-geo-alt-fill tool_tip_h" aria-hidden="true" data-bs-toggle="tooltip" data-placement="bottom" title="Zoom to View"></i>
    </button>

    <button id="${title}_variables" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#modalShowVariablesTable"> 
      <i class="bi bi-card-list tool_tip_h" data-bs-toggle="tooltip" data-placement="bottom" title="View Variables"></i>
    </button>

    <button type="button" id="${title}_variables_info" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#modalHydroserInformation">
     <i class="bi bi-info-circle-fill tool_tip_h" data-bs-toggle="tooltip" data-placement="bottom" title="Hydroserver Information"></i>
    </button>


    </li>
    `;
    return newHtml
  }
  catch (e){
    console.log(e);
  }

}

function toDegreesMinutesAndSeconds(coordinate) {
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
