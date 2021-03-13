get_vars_from_site = function (resultList){
  let indexs= $("#site_choose")['0'].value;
  console.log(indexs)
  request_obj = {}
  request_obj['hs_url'] = $("#url_WOF").text()
  request_obj['network'] = resultList[indexs]['network']
  request_obj['code'] = resultList[indexs]['sitecode']
  let var_select = $("#variable_choose");
  console.log(var_select)
  var_select.empty();
  var_select.selectpicker("refresh");
  console.log("holasdasfa")
  $("#downloading_loading").removeClass("hidden");
    $.ajax({
      type:"GET",
      url: `get-values-hs`,
      dataType: "JSON",
      data: request_obj,
      success: function(result){
        if (result.hasOwnProperty("variables")){
          let variables_ = result['variables'];
          for(let i=0; i< variables_.length; ++i){
            let option_begin = `<option value=${i}>${variables_[i]} </option>`;
            var_select.append(option_begin);
          }
          var_select.selectpicker("refresh");

          $("#downloading_loading").addClass("hidden");
        }
        else{
          $("#downloading_loading").addClass("hidden");
          $.notify(
              {
                  message: `There is no variables in the selected site`
              },
              {
                  type: "info",
                  allow_dismiss: true,
                  z_index: 20000,
                  delay: 5000
              }
          )
        }



      },
      error:function(){
        $("#downloading_loading").addClass("hidden");

        $.notify(
            {
                message: `Something went wrong when loading the variables for the site`
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





map_layers = function(sites,title,url){

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
  var clusterSource = new ol.source.Cluster({
     distance: parseInt(30, 10),
     source: vectorSource,
   });
  if(layerColorDict.hasOwnProperty(title) == false){
    layerColorDict[title] = get_new_color();

  }

  let style_custom = featureStyle(layerColorDict[title])
  var vectorLayer = new ol.layer.Vector({
    source: clusterSource,
    style: style_custom
  });
  return [vectorLayer,vectorSource]

}

/*
****** FU1NCTION NAME : load_individual_hydroservers_group*********
****** FUNCTION PURPOSE: LOADS THE SERVERS OF A HYDROSERVER WHEN THE HYDROSERVER GROUPS IS CLICKED*********
*/
  load_individual_hydroservers_group = function(group_name){
     let group_name_obj={
       group: group_name
     };
     //// console.log(group_name_obj);
     $("#GeneralLoading").css({
        position:'fixed',
        "z-index": 9999,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      });
     $("#GeneralLoading").removeClass("hidden");
         $.ajax({
             type: "GET",
             url: `catalog-group`,
             dataType: "JSON",
             data: group_name_obj,
             success: result => {
                 let servers = result["hydroserver"]

                 //USE A FUNCTION TO FIND THE LI ASSOCIATED WITH THAT GROUP  AND DELETE IT FROM THE MAP AND MAKE ALL
                 // THE CHECKBOXES VISIBLE //

                 let extent = ol.extent.createEmpty()
                 // //console.log(servers);
                 let id_group_separator = `${group_name}_list_separator`;

                 if(servers.length <= 0){
                   $(`#${group_name}-noGroups`).show();
                   console.log("hola bye")
                   // $(`#${group_name}_list_separator`).find(".noGroups").show();
                 }
                 else{
                    $(`#${group_name}-noGroups`).hide();
                 }

                 servers.forEach(function(server){
                     let {
                         title,
                         url,
                         siteInfo
                     } = server
                     information_model[`${group_name}`].push(title);

                     title = title.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');

                       let newHtml = html_for_servers(title,group_name);
                       $(newHtml).appendTo(`#${id_group_separator}`);

                       $(`#${title}_variables`).on("click",showVariables2);
                       $(`#${title}_variables_info`).on("click",hydroserver_information);
                       $(`#${title}_${group_name}_reload`).on("click",update_hydroserver);


                       let lis = document.getElementById(`${id_group_separator}`).getElementsByTagName("li");
                       let li_arrays = Array.from(lis);
                       let li_arrays2 = Array.from(lis);

                       let input_check = li_arrays.filter(x => title === x.attributes['layer-name'].value)[0].getElementsByClassName("chkbx-layer")[0];


                       input_check.addEventListener("change", function(){
                         let check_box = this;
                         if(layersDict['selectedPointModal']){
                           map.removeLayer(layersDict['selectedPointModal'])
                           map.updateSize()
                         }
                         if(layersDict['selectedPoint']){
                           map.removeLayer(layersDict['selectedPoint'])
                           map.updateSize()
                         }
                         map.getLayers().forEach(function(layer) {
                           if(layer_object_filter.hasOwnProperty(title) == false){
                             if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
                               if(check_box.checked){

                                 layer.setStyle(featureStyle(layerColorDict[title]));
                               }
                               else{
                                 layer.setStyle(new ol.style.Style({}));

                               }
                             }
                           }
                           else{
                             if(layer instanceof ol.layer.Vector && layer == layer_object_filter[title]){
                               if(check_box.checked){

                                 layer.setStyle(featureStyle(layerColorDict[title]));
                               }
                               else{
                                 layer.setStyle(new ol.style.Style({}));
                               }
                             }
                           }
                          });

                       });

                       let sites = siteInfo
                       if (typeof(sites) == "string"){
                         sites = JSON.parse(siteInfo);
                       }
                       var vectorLayer = map_layers(sites,title,url)[0]
                       var vectorSource = map_layers(sites,title,url)[1]

                       let test_style = new ol.style.Style({
                         image: new ol.style.Circle({
                           radius: 10,
                           stroke: new ol.style.Stroke({
                             color: "white",
                           }),
                           fill: new ol.style.Fill({
                             color: layerColorDict[title],
                           }),
                         })
                       });
                       let rowHTML= `<tr id= ${title}-row-complete>
                                      <th id="${title}-row-legend"></th>
                                      <th>${title}</th>
                                    </tr>`
                      if(!document.getElementById(`${title}-row-complete`)){
                        $(rowHTML).appendTo('#tableLegend');
                      }
                      $(`#${title}-row-legend`).prepend($(getIconLegend(test_style,title)));


                       map.addLayer(vectorLayer);
                       vectorLayer.setStyle(new ol.style.Style({}));


                       vectorLayer.set("selectable", true)

                       layersDict[title] = vectorLayer;
                       $(`#${title}_zoom`).on("click",function(){
                         if(layersDict['selectedPointModal']){
                           map.removeLayer(layersDict['selectedPointModal'])
                           map.updateSize();
                         }
                         if(layersDict['selectedPoint']){
                           map.removeLayer(layersDict['selectedPoint'])
                           map.updateSize();
                         }
                         map.getView().fit(vectorSource.getExtent());
                         map.updateSize();
                         map.getLayers().forEach(function(layer) {
                           if (!(title in layer_object_filter)){
                             if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
                               layer.setStyle(featureStyle(layerColorDict[title]));
                             }
                           }
                           else{
                             if(layer instanceof ol.layer.Vector && layer == layer_object_filter[title]){
                               layer.setStyle(featureStyle(layerColorDict[title]));
                             }
                           }

                          });
                         input_check.checked = true;
                       });
                 })

             },
             error: function(error) {
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
   };


/*
****** FU1NCTION NAME: add_hydroserver *********
****** FUNCTION PURPOSE: ADD AN INDIVIDUAL HYDROSERVER TO A GROUP *********
*/

add_hydroserver = function(){
  if($("#extent").is(":checked")){
    var zoom= map.getView().getZoom();
    if(zoom < 5){
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
  if($("#soap-url").val() == "http://hydroportal.cuahsi.org/nwisdv/cuahsi_1_1.asmx?WSDL" ||$("#soap-url").val() =="http://hydroportal.cuahsi.org/nwisuv/cuahsi_1_1.asmx?WSDL"){
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
      var regex = new RegExp("^(?![0-9]*$)[a-zA-Z0-9]+$")

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

    $("#soapAddLoading").removeClass("hidden");


    $.ajax({
        type: "POST",
        url: `soap-group/`,
        dataType: "HTML",
        data: datastring,
        success: function(result) {

            //Returning the geoserver layer metadata from the controller
            var json_response = JSON.parse(result)
            let group_name = actual_group.split('=')[1];
            let id_group_separator = `${group_name}_list_separator`;

            try{
              if (json_response.status === "true") {
                  // put the ajax call and also the filter //
                  let servers_with_keywords = [];
                  let key_words_to_search = get_all_the_checked_keywords();
                  let group_name_obj={
                    group: group_name
                  };

                  $(`#${group_name}-noGroups`).hide();

                    let {title, siteInfo, url, group} = json_response


                      let sites = siteInfo

                      if (typeof(sites) == "string"){
                        sites = JSON.parse(siteInfo);
                      }
                      var vectorLayer = map_layers(sites,title,url)[0]
                      var vectorSource = map_layers(sites,title,url)[1]

                      let test_style = new ol.style.Style({
                        image: new ol.style.Circle({
                          radius: 10,
                          stroke: new ol.style.Stroke({
                            color: "white",
                          }),
                          fill: new ol.style.Fill({
                            color: layerColorDict[title],
                          }),
                        })
                      });
                      let rowHTML= `<tr id= ${title}-row-complete>
                                     <th id="${title}-row-legend"></th>
                                     <th>${title}</th>
                                   </tr>`
                     if(!document.getElementById(`${title}-row-complete`)){
                       $(rowHTML).appendTo('#tableLegend');
                     }
                     $(`#${title}-row-legend`).prepend($(getIconLegend(test_style,title)));


                      map.addLayer(vectorLayer);

                      vectorLayer.set("selectable", true)
                      map.getView().fit(vectorSource.getExtent());
                      map.updateSize();
                      layersDict[title] = vectorLayer;


                        let no_servers_tag = Array.from(document.getElementById(`${id_group_separator}`).getElementsByTagName("P"))[0];
                        let newHtml = html_for_servers(title,group_name)
                         $(newHtml).appendTo(`#${id_group_separator}`);
                         $(`#${title}_variables`).on("click",showVariables2);
                         $(`#${title}_variables_info`).on("click",hydroserver_information);
                         $(`#${title}_${group_name}_reload`).on("click",update_hydroserver);

                        // MAKES THE LAYER INVISIBLE

                        let lis = document.getElementById("current-Groupservers").getElementsByTagName("li");
                        let li_arrays = Array.from(lis);
                        let input_check = li_arrays.filter(x => title === x.attributes['layer-name'].value)[0].getElementsByClassName("chkbx-layer")[0];

                        input_check.addEventListener("change", function(){
                          if(layersDict['selectedPointModal']){
                            map.removeLayer(layersDict['selectedPointModal'])
                            map.updateSize();
                          }
                          if(layersDict['selectedPoint']){
                            map.removeLayer(layersDict['selectedPoint'])
                            map.updateSize();
                          }
                          if(this.checked){
                            map.getLayers().forEach(function(layer) {
                                 if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
                                   layer.setStyle(featureStyle(layerColorDict[title]));
                                 }
                             });
                          }
                          else{
                            map.getLayers().forEach(function(layer) {
                                 if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
                                   layer.setStyle(new ol.style.Style({}));

                                 }
                             });

                          }

                        });
                        $(`#${title}_zoom`).on("click",function(){
                          if(layersDict['selectedPointModal']){
                            map.removeLayer(layersDict['selectedPointModal'])
                            map.updateSize();
                          }
                          if(layersDict['selectedPoint']){
                            map.removeLayer(layersDict['selectedPoint'])
                            map.updateSize();
                          }
                          map.getView().fit(vectorSource.getExtent());
                          map.updateSize();
                          map.getLayers().forEach(function(layer) {
                            if (!(title in layer_object_filter)){
                              if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
                                layer.setStyle(featureStyle(layerColorDict[title]));
                              }
                            }
                            else{
                              if(layer instanceof ol.layer.Vector && layer == layer_object_filter[title]){
                                layer.setStyle(featureStyle(layerColorDict[title]));
                              }
                            }

                           });
                          input_check.checked = true;

                        });

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
                        $("#soapAddLoading").addClass("hidden")
                        $("#btn-add-soap").show()

                        $("#modalAddSoap").modal("hide")
                        $("#modalAddSoap").each(function() {
                            this.reset()
                        })

                      }

            }
            catch(err){
                      $("#soapAddLoading").addClass("hidden")
                      $.notify(
                          {
                              message: `The following error ocurred: ${err}`
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
            $("#btn-add-soap").show();
            //console.log(error);
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
            var json_response = JSON.parse(result)
            $("#modalDelete").modal("hide")
            $("#modalDelete").each(function() {
                this.reset()
            })
            for(let i=0; i<Object.keys(json_response).length; ++i){

              let i_string=i.toString();
              let title=json_response[i_string];
              title  = title.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
              console.log(title)
              $(`#${title}-row-complete`).remove()

              let element = document.getElementById(title);
              element.parentNode.removeChild(element);

              map.removeLayer(layersDict[title])
              delete layersDict[title]
              map.updateSize()

              let id_group_separator = `${actual_group.split('=')[1]}_list_separator`;
              let separator_element = document.getElementById(id_group_separator);
              console.log(separator_element);
              let children_element = Array.from(separator_element.children);
              console.log(children_element);
              if(children_element.length < 2){
                console.log("empty")
                $(`#${actual_group.split('=')[1]}-noGroups`).show();

              }
              $(`#${title}deleteID`).remove();

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
****** FU1NCTION NAME: delete_hydroserver *********
****** FUNCTION PURPOSE: DELETE THE SELECTED HYDROSERVER OF A GROUP*********
*/

delete_hydroserver_Individual= function(group,server){

    var datastring = `server=${server}&actual-group=${group}`
    $.ajax({
        type: "POST",
        url: `delete-group-hydroserver/`,
        data: datastring,
        dataType: "HTML",
        success: function(result) {
            var json_response = JSON.parse(result)

            for(let i=0; i<Object.keys(json_response).length; ++i){

              let i_string=i.toString();
              let title=json_response[i_string];
              title  = title.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
              console.log(title)
              let element = document.getElementById(title);
              element.parentNode.removeChild(element);
              map.removeLayer(layersDict[title])
              delete layersDict[title]
              map.updateSize()
              $(`#${title}-row-complete`).remove();

              let id_group_separator = `${group}_list_separator`;
              let separator_element = document.getElementById(id_group_separator);
              let children_element = Array.from(separator_element.children);
              if(children_element.length < 1){
                let no_servers = `<button class="btn btn-danger btn-block noGroups"> The group does not have hydroservers</button>`
                    $(no_servers).appendTo(`#${id_group_separator}`) ;
              }


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

/*
****** FU1NCTION NAME : showVariables*********
****** FUNCTION PURPOSE: RETRIEVES THE DIFFERENT VARIABLES THAT A HYDROSERVER HAS*********
*/

showVariables = function(){

 let groupActual = this.parentElement.parentNode.id.split("_")[0];
 let hsActual = this.id.split("_")[0];
 group_show_actual = groupActual;
 hs_show_actual = hsActual;

 filterSites['group']=groupActual;
 filterSites['hs']=hsActual;

 let $modalVariables = $("#modalShowVariables")
   $.ajax({
      type: "GET",
      url: `get-variables-hs`,
      dataType: "JSON",
      data: filterSites,
      success: result => {
          console.log(result);
          var HSTableHtml =
              `<table id="${filterSites['hs']}-variable-table" class="table table-striped table-bordered nowrap" width="100%"><tbody>`
          if (result['variables_name'].length === 0) {
              $modalVariables
                  .find(".modal-body")
                  .html(
                      "<b>There are no variables in the Hydroserver.</b>"
                  )
          }
          else {
              for (var i = 0; i < result['variables_name'].length; i++) {
                  HSTableHtml +=
                 '<tr class="odd gradeX2">'+
                      `<td><input type="checkbox" name="name1" value="${result['variables_code'][i]}" />${result['variables_name'][i]}</td>`
                      +
                 '</tr>'
              }
              HSTableHtml += "</tbody></table>"
              $modalVariables.find("#hideScroll2").html(HSTableHtml)
          }

     }
   })

}

showVariables2 = function(){

 let groupActual = this.parentElement.parentNode.id.split("_")[0];
 let hsActual = this.id.split("_")[0];
 group_show_actual = groupActual;
 hs_show_actual = hsActual;
 filterSites['group']=groupActual;
 filterSites['hs']=hsActual;

 let $modalVariables = $("#modalShowVariablesTable")
 $("#variablesLoading2").removeClass("hidden");
 $.ajax({
     type: "GET",
     url: `get-variables-hs`,
     dataType: "JSON",
     data: filterSites,
     success: result => {
       //1) combine the arrays:
      var list_e = [];
      for (var j = 0; j <result['variables_name'].length; j++)
          list_e.push({'variables_name': result['variables_name'][j], 'variables_unit_abr': result['variables_unit_abr'][j], 'variables_code':result['variables_code'][j]});

      //2) sort:
      list_e.sort(function(a, b) {
          return ((a.variables_name < b.variables_name) ? -1 : ((a.variables_name == b.variables_name) ? 0 : 1));

      });

      //3) separate them back out:
      for (var k = 0; k < list_e.length; k++) {
          result['variables_name'][k] = list_e[k].variables_name;
          result['variables_unit_abr'][k] = list_e[k].variables_unit_abr;
          result['variables_code'][k] = list_e[k].variables_code;
      }

         // console.log(result);
         var HSTableHtml =
             `<table id="${filterSites['hs']}-variable-table" class="table table-striped table-bordered nowrap" width="100%">
                <thead><th>variable name</th><th>units</th><th> WHOS variable code</th></thead>
             <tbody>`
         if (result['variables_name'].length === 0) {
             $modalVariables
                 .find(".modal-body")
                 .html(
                     "<b>There are no variables in the Hydroserver.</b>"
                 )
         }
         else {
             for (var i = 0; i < result['variables_name'].length; i++) {
                 HSTableHtml +=
                '<tr class="odd gradeX2">'+
                     `<td>${result['variables_name'][i]}</td>
                     <td>${result['variables_unit_abr'][i]}</td>
                     <td>${result['variables_code'][i]}</td>

                     `
                     +
                '</tr>'
             }
             HSTableHtml += "</tbody></table>"
             $modalVariables.find("#hideScroll2").html(HSTableHtml)
         }
         $("#variablesLoading2").addClass("hidden");

    },
    error: function(error) {
      $("#variablesLoading2").addClass("hidden");
        $.notify(
            {
                message: `There is no variables in the ${hsActual} Web Service`
            },
            {
                type: "warning",
                allow_dismiss: true,
                z_index: 20000,
                delay: 5000
            }
        )
    }


  })
}
/*
****** FU1NCTION NAME : showAvailableSites*********
****** FUNCTION PURPOSE: SHOW THE SITES THAT HAVE BEEN FILTERED REQURING SPECIFIC VARIABLES*********
*/
showAvailableSites = function(){

 let group = this.baseURI.split("/");
 // ONLY THE KEY WORDS //
 let datastring = Array.from(document.getElementsByClassName("odd gradeX2"));
 let hs = datastring[0].offsetParent.id.split("-")[0];

 let key_words_to_search=[];
 datastring.forEach(function(data){
   Array.from(data.children).forEach(function(column){
     if(Array.from(column.children)[0].checked ==true){
       key_words_to_search.push(Array.from(column.children)[0].value.trim())
     }
   })
 });

 let requestObject = {};
 requestObject['hs'] = filterSites['hs'];
 requestObject['group'] = filterSites['group'];
 requestObject['variables'] = key_words_to_search;
 $("#variablesLoading").removeClass("hidden");

 $.ajax({
     type: "GET",
     url: `get-available-sites`,
     dataType: "JSON",
     data: requestObject,
     success: result => {
         let sites = result['hydroserver'];
         let title = filterSites['hs'];
         let url = layersDict[title].values_.source.features[0].values_.features[0].values_.hs_url
         const vectorLayer =  map_layers(sites,title,url)[0]
         const vectorSource =  map_layers(sites,title,url)[1]
         map.getLayers().forEach(function(layer) {
              if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
                  layer.setStyle(new ol.style.Style({}));
                }
          });

         map.addLayer(vectorLayer)
         vectorLayer.set("selectable", true)
         layer_object_filter[title] = vectorLayer;

         $("#btn-var-reset-server").on("click", function(){
           map.removeLayer(layer_object_filter[title])
           layer_object_filter={};
           if(layersDict.hasOwnProperty(title)){
             map.getLayers().forEach(function(layer) {
                  if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
                    layer.setStyle(featureStyle(layerColorDict[title]));
                    }
              });
           }



           $(`#${hs}`).css({"opacity": "1",
                                "border-color": "#d3d3d3",
                                "border-width":"1px",
                                "border-style":"solid",
                                "color":"#555555",
                                "font-weight": "normal"});
         })
         $("#variablesLoading").addClass("hidden");
         $("#modalShowVariables").modal("hide")
         $(`#${hs}`).css({"opacity": "1",
                             "border-color": "#ac2925",
                             "border-width": "2px",
                             "border-style": "solid",
                             "color": "black",
                             "font-weight": "bold"});
    }
  })


}
$(`#btn-var-search-server`).on("click",showAvailableSites);


/*
************ FUNCTION NAME: HYDROSERVER INFORMATION **********************
************ PURPOSE: THE HYDROSERVER INFORMATION LOOKS FOR THE INFORMATION OF THE SITE, SO IT GIVES METADATA ***********
*/

hydroserver_information = function(){
  if(layersDict['selectedPointModal']){
    map2.removeLayer(layersDict['selectedPointModal']);
    map.removeLayer(layersDict['selectedPointModal']);
    map2.updateSize()
    map.updateSize()
  }
  let var_select = $("#variable_choose");
  var_select.empty();
  var_select.selectpicker("refresh");
  let site_select = $("#site_choose");
  site_select.empty();
  // $("#site_choose").unbind('change');
  $("#site_choose").off("change.something").on("change", function(){
    console.log("change unbind");
  });

  site_select.selectpicker("refresh");
  let groupActual = this.parentElement.parentNode.id.split("_")[0];

  let hsActual = this.id.split("_")[0];
  hsActual = hsActual.replace(/-/g, ' ');

  filterSites['group']=groupActual;
  filterSites['hs']=hsActual;
  $("#hydroserverTitle").html(filterSites['hs']);
  $.ajax({
    type:"GET",
    url: `get-hydroserver-info`,
    dataType: "JSON",
    data: filterSites,
    success: function(result1){
      let hs_title = result1['title'].replace(/\s/g, "-");

      setTimeout(function(){
        if(map2 ==undefined){
          map2 = new ol.Map({
                 target: 'map2',
                 layers: [
                   new ol.layer.Tile({
                      source: new ol.source.OSM()
                   })
                 ],
                 view: new ol.View({
                   center: ol.proj.fromLonLat([37.41, 8.82]),
                   zoom: 4
                 })
          });

          actualLayerModal = layersDict[`${hs_title}`]

          map2.addLayer(actualLayerModal);
          map2.getView().fit(actualLayerModal.getSource().getExtent());
          map2.updateSize();
        }
        else{
          map2.removeLayer(actualLayerModal);

          actualLayerModal=layersDict[`${hs_title}`];

          map2.addLayer(actualLayerModal);

          map2.getView().fit(actualLayerModal.getSource().getExtent());
          map2.updateSize();
        }


      },600)


      $("#urlHydroserver").html(result1['url']);
      $("#url_WOF").html($("#urlHydroserver").html());


      $("#description_Hydroserver").html(result1['description']);
      var HSTableHtml =
          `<table id="${filterSites['hs']}-info-table" class="table table-striped table-bordered nowrap" width="100%"><tbody>`
      if (result1['siteInfo'].length === 0) {
          $("#modalHydroserInformation")
              .find("#infoTable")
              .html(
                  "<b>There are no sites in the Hydroserver.</b>"
              )
      }
      else {
          for (var i = 0; i < result1['siteInfo'].length; i++) {
            option_begin = `<option value=${i}> ${result1['siteInfo'][i]['sitename']} </option>`;
            site_select.append(option_begin)
              HSTableHtml +=
             '<tr>'+
                  `<td> <p id="titleSite">${i+1}.- ${result1['siteInfo'][i]['sitename']}
                  <button type="button" class="btn btn-primary" id="${result1['siteInfo'][i]['sitecode']}_modal"><span class="glyphicon glyphicon-pushpin"></span></button></p>
                    <p>Site Code: ${result1['siteInfo'][i]['sitecode']}</p>
                    <p>Network: ${result1['siteInfo'][i]['network']}</p>
                    <p>Latitude: ${result1['siteInfo'][i]['latitude']}</p>
                    <p>Longitude: ${result1['siteInfo'][i]['longitude']}</p>
                  </td>`
                  +
             '</tr>'

          }
          site_select.selectpicker("refresh");



          $("#site_choose").on("change.something", function(){

            // var_select = $("#variable_choose");
            // var_select.empty();
            // var_select.selectpicker("refresh");
            // if(var_select[0].childNodes.length < 1){
              get_vars_from_site(result1['siteInfo']);

            // }

          });

          let reque_ob = {}
          reque_ob['hs_name'] = $("#site_choose option:selected").html();
          reque_ob['hs_url'] = $("#url_WOF").text();
          reque_ob['site_hs'] = $("#site_choose")['0'].value;
          reque_ob['variable_hs'] = $("#variable_choose")['0'].value;

          $("#btn-add-download").unbind();

          $("#btn-add-download").on("click", function(){
            console.log("holaa")
            $("#downloading_loading").removeClass("hidden");
            $.ajax({
              type:"GET",
              url: `get-download-hs`,
              dataType: "JSON",
              data: reque_ob,
              success: function(result2){
                var name_together =reque_ob['hs_name'].replace(/(?!\w|\s)./g, '_').replace(/\s+/g, '_').replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
                // var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result2));
                // var downloadAnchorNode = document.createElement('a');
                // downloadAnchorNode.setAttribute("href",dataStr);
                // downloadAnchorNode.setAttribute("download", name_together + ".ipynb");
                // document.body.appendChild(downloadAnchorNode); // required for firefox
                // downloadAnchorNode.click();
                // downloadAnchorNode.remove();


                var blob = new Blob([JSON.stringify(result2)], { type: 'application/json' });
                var link = document.createElement("a");
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", name_together.replace(/[^a-z0-9_.-]/gi,'_') + ".ipynb");
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);




                $("#downloading_loading").addClass("hidden");
              },
              error:function(){
                $("#downloading_loading").addClass("hidden");

                $.notify(
                    {
                        message: `Something went wrong when downloading a python notebook for the site`
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
          });

          HSTableHtml += "</tbody></table>"
          $("#modalHydroserInformation").find("#infoTable").html(HSTableHtml);
          for (var i = 0; i < result1['siteInfo'].length; i++) {
            let lat_modal=result1['siteInfo'][i]['latitude'];
            let lng_modal=result1['siteInfo'][i]['longitude'];
            let coordinate_modal = [lat_modal,lng_modal];

            $(`#${result1['siteInfo'][i]['sitecode']}_modal`).click(function(){
                    if(layersDict['selectedPointModal']){
                      map2.removeLayer(layersDict['selectedPointModal']);
                      map.removeLayer(layersDict['selectedPointModal']);
                      map2.updateSize()
                      map.updateSize()
                    }

                    let actual_Source = new ol.source.Vector({});
                    let marker = new ol.Feature({
                      geometry: new ol.geom.Point(
                        ol.proj.transform([parseFloat(lng_modal),parseFloat(lat_modal)], 'EPSG:4326','EPSG:3857'))
                    })
                    actual_Source.addFeature(marker);
                    let vectorLayer = new ol.layer.Vector({
                        source: actual_Source,
                        style:  new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 15,
                                stroke: new ol.style.Stroke({
                                    color: `#FF0000`,
                                    width: 8
                                }),
                                fill: new ol.style.Fill({
                                    color: 'rgba(255, 255, 0, 0.63)',
                                })
                            })
                        })
                    })
                    layersDict['selectedPointModal'] = vectorLayer;
                    map2.addLayer(layersDict['selectedPointModal']);
                    map.getLayers().insertAt(1, layersDict['selectedPointModal']);
            });

          }

      }
    }
  })
}
/*
************ FUNCTION NAME: SEARCH SITES **********************
************ PURPOSE: MAKES THE TABLE SEARCHABLE ***********
*/

searchSites = function() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById(`${filterSites['hs']}-info-table`);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
document.getElementById('myInput').addEventListener("keyup", searchSites);


update_hydroserver = function(){
    let hsActual = this.id.split("_")[0];
    let group_name = this.id.split("_")[1]
    let requestObject = {
      hs: hsActual,
      group: group_name
    }
    $("#GeneralLoading").css({
       position:'fixed',
       "z-index": 9999,
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)'
     });
    $("#GeneralLoading").removeClass("hidden");


    $.ajax({
        type: "POST",
        url: `soap-update/`,
        dataType: "JSON",
        data: requestObject,
        success: function(result) {
            if(layersDict.hasOwnProperty(hsActual)){
              map.removeLayer(layersDict[hsActual])
            }

            let {siteInfo,sitesAdded,url} = result


                    let sites = siteInfo
                    const vectorLayer = map_layers(sites,hsActual,url)[0]
                    const vectorSource = map_layers(sites,hsActual,url)[1]


                    map.addLayer(vectorLayer)
                    ol.extent.extend(extent, vectorSource.getExtent())
                    vectorLayer.set("selectable", true)
                    layersDict[hsActual] = vectorLayer;

                    map.getView().fit(vectorSource.getExtent());
                    map.updateSize();

                    layersDict[hsActual] = vectorLayer;

                      $.notify(
                          {
                              message: `Successfully Reloaded the HydroServer to the Map, ${sitesAdded} have been added to the Hydroserver `
                          },
                          {
                              type: "success",
                              allow_dismiss: true,
                              z_index: 20000,
                              delay: 5000
                          }
                      )
                    $("#GeneralLoading").addClass("hidden");
          },
        error: function(error) {
          $("#GeneralLoading").addClass("hidden");

            $.notify(
                {
                    message: `There was an error realoading the hydroserver.`
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
