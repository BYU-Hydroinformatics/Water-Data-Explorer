/*****************************************************************************
 * FILE:                endpoint.js
 * BEGGINING DATE:      16 Jun 2021
 * ENDING DATE:         ---------------
 * AUTHOR:              Giovanni Romero Bustamante
 * COPYRIGHT:           (c) Brigham Young University 2020
 * LICENSE:             MIT
 *
 *****************************************************************************/

/**
* get_download_hs function.
* Function to overwrite the retrieved data from a python notebook.
* @param {object} nb - object containing the content of a python notebook
* @param {string} hs_name - name of the service
* @param {string} hs_url - url of the service
* @param {string} variable_hs - variable of the service
* @param {string} site_hs - site of the service
* @return {object} nb: overwritten content of a python notebook.
* */
get_download_hs = function(nb, hs_name, hs_url, variable_hs, site_hs){
  nb['cells'][1]['source'][0] = `# ${hs_name} \n`;
  nb['cells'][5]['source'][0] = `WOF_URL = ${hs_url} \n`;
  nb['cells'][5]['source'][1] = `VARIABLE = ${variable_hs} \n`;
  nb['cells'][5]['source'][2] = `SITE = ${site_hs} \n`;

  return nb
}

/**
  * get_vars_from_site function.
  * Function to get metadata from the WaterOneFow function GetSiteInfo
  * @param {object} resultList - object containing the content of a python notebook
* */
get_vars_from_site = function (resultList){
  try{
    let indexs= $("#site_choose")['0'].value;
    request_obj = {}
    request_obj['hs_url'] = $("#url_WOF").text();
    request_obj['network'] = resultList[indexs]['network'];
    request_obj['code'] = resultList[indexs]['sitecode'];
    let var_select = $("#variable_choose");
    var_select.empty();
    var_select.selectpicker("refresh");
    $("#downloading_loading").removeClass("hidden");
    let url_base = $("#url_WOF").text().split("?")[0];
    let SITE = resultList[indexs]['sitecode'];
    let url_request;
    let make_sure_not_mc = url_base.split("//");

    if(make_sure_not_mc[0] != document.location.protocol){
      url_base = document.location.protocol + "//" + make_sure_not_mc[1];
    }
    url_request = `${url_base}?request=GetSiteInfoObject&site=${SITE}`;
    console.log(url_request);
      $.ajax({
        type:"GET",
        url:url_request,
        dataType: "text",
        success: function(result8){
          try{
            let getSiteInfoObjectParse = getSitesInfoJS(result8);
            let result =getSiteInfoObjectParsableJS(getSiteInfoObjectParse);
            if (result.hasOwnProperty("variables")){
              let variables_ = result['variables'];
              for(let i=0; i< variables_.length; ++i){
                let option_begin = `<option value=${i}>${variables_[i]} </option>`;
                var_select.append(option_begin);
              }
              var_select.selectpicker("refresh");

              let reque_ob = {}
              reque_ob['hs_name'] = $("#site_choose option:selected").html();
              reque_ob['hs_url'] = $("#url_WOF").text();
              reque_ob['site_hs'] = $("#site_choose")['0'].value;

              reque_ob['variable_hs'] = $("#variable_choose")['0'].value;
              $("#variable_choose").off("change.something2").on("change", function(){
              });
              $("#variable_choose").on("change.something2").on("change", function(){
                reque_ob['variable_hs'] = $("#variable_choose")['0'].value;
              });

              $("#btn-add-download").unbind();
              $("#btn-add-download").on("click", function(){
                $("#downloading_loading").removeClass("hidden");
                $.ajax({
                  type:"GET",
                  url: `https://gist.githubusercontent.com/romer8/89c851014afb276b0f20cb61c9c731f6/raw/a0ee55ca83e75f34f26eb94bd52941cc2a2199cd/pywaterml_template.ipynb`,
                  dataType: "text",
                  success: function(result2_){
                    try{
                      // console.log(result2_);
                      let result2 = get_download_hs(JSON.parse(result2_),$("#site_choose option:selected").html(),$("#url_WOF").text(),$("#variable_choose")['0'].value,$("#site_choose")['0'].value );
                      var name_together =reque_ob['hs_name'].replace(/(?!\w|\s)./g, '_').replace(/\s+/g, '_').replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
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
                    }
                    catch(e){
                      console.log(e);
                      $("#downloading_loading").addClass("hidden");
                      $.notify(
                          {
                              message: `Something went wrong when downloading a python notebook for the site`
                          },
                          {
                              type: "danger",
                              allow_dismiss: true,
                              z_index: 20000,
                              delay: 5000,
                              animate: {
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                              },
                              onShow: function() {
                                  this.css({'width':'auto','height':'auto'});
                              }
                          }
                      )
                    }

                  },
                  error:function(error){
                    console.log(error);
                    $("#downloading_loading").addClass("hidden");

                    $.notify(
                        {
                            message: `Something went wrong when downloading a python notebook for the site`
                        },
                        {
                            type: "danger",
                            allow_dismiss: true,
                            z_index: 20000,
                            delay: 5000,
                            animate: {
                              enter: 'animated fadeInRight',
                              exit: 'animated fadeOutRight'
                            },
                            onShow: function() {
                                this.css({'width':'auto','height':'auto'});
                            }
                        }
                    )
                  }
                })
              });

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
                      delay: 5000,
                      animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                      },
                      onShow: function() {
                          this.css({'width':'auto','height':'auto'});
                      }
                  }
              )
            }
          }
          catch(e){
            $("#downloading_loading").addClass("hidden");
            $.notify(
                {
                    message: `Something went wrong when loading the variables for the site`
                },
                {
                    type: "danger",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 5000,
                    animate: {
                      enter: 'animated fadeInRight',
                      exit: 'animated fadeOutRight'
                    },
                    onShow: function() {
                        this.css({'width':'auto','height':'auto'});
                    }
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
                  delay: 5000,
                  animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutRight'
                  },
                  onShow: function() {
                      this.css({'width':'auto','height':'auto'});
                  }
              }
          )
        }
    })
  }
  catch(error){
    console.log(error)
    $("#downloading_loading").addClass("hidden");
    $.notify(
        {
            message: `Something went wrong when loading the variables for the site`
        },
        {
            type: "info",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
            },
            onShow: function() {
                this.css({'width':'auto','height':'auto'});
            }
        }
    )
  }

}

/**
* map_layers function.
  * Function to create the map vectorLayer and vectorSource for sites
  * @param {object} resultList - object containing the sites
  * @return {object} array containing the open layers vector Layer and vector Source
* */
map_layers = function(sites,title,url){
  // console.log(sites)
  try{
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
    // console.log(sites)
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
  catch(error){
    $.notify(
        {
            message: `Seems that there is no sites in the service`
        },
        {
            type: "info",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
            },
            onShow: function() {
                this.css({'width':'auto','height':'auto'});
            }
        }
    )
  }


}

/**
  * load_individual_hydroservers_group function.
  * Function to load individual service in the group
  * @param {string} group_name - name of the group to add service
* */
load_individual_hydroservers_group = function(group_name){
   let group_name_obj={
     group: group_name
   };
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
           url: `catalog-group/`,
           dataType: "JSON",
           data: group_name_obj,
           success: result => {
             try{
               let servers = result["hydroserver"]
               // console.log(servers);
               servers.sort(function(a, b) {
                    var textA = a.title.toUpperCase();
                    var textB = b.title.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
               //USE A FUNCTION TO FIND THE LI ASSOCIATED WITH THAT GROUP  AND DELETE IT FROM THE MAP AND MAKE ALL
               // THE CHECKBOXES VISIBLE //
               let group_name_e3;
               Object.keys(id_dictionary).forEach(function(key) {
                 if(id_dictionary[key] == group_name ){
                   group_name_e3 = key;
                 }
               });
               let extent = ol.extent.createEmpty()
               let id_group_separator = `${group_name_e3}_list_separator`;

               if(servers.length <= 0){
                 $(`#${group_name_e3}-noGroups`).show();
               }
               else{
                  $(`#${group_name_e3}-noGroups`).hide();
               }
               let rowHTML= `<tr id= ${group_name_e3}-row-complete>
                              <th id="${group_name_e3}-row-legend"></th>
                              <th class= "group-legend">${group_name}</th>
                            </tr>`
              if(!document.getElementById(`${group_name_e3}-row-complete`) && servers.length > 0 ){
                if(check_groups_length > 1){
                  $(rowHTML).appendTo('#tableLegend');
                }
              }
               servers.forEach(function(server){
                   let {
                       title,
                       url,
                       siteInfo
                   } = server
                   let unique_id_group = uuidv4()
                   id_dictionary[unique_id_group] = title;
                   urls_servers[unique_id_group] = url;
                   information_model[`${group_name}`].push(title);

                   let new_title = unique_id_group;
                   let newHtml;
                    if(can_delete_hydrogroups){
                        newHtml = html_for_servers(can_delete_hydrogroups,new_title,group_name_e3);
                    }
                    else{
                      newHtml = html_for_servers(false,new_title,group_name_e3);
                    }
                    //  let newHtml = html_for_servers(can_delete_hydrogroups,new_title,group_name_e3);
                     $(newHtml).appendTo(`#${id_group_separator}`);
                     $(`#${new_title}_variables`).on("click",showVariables2);
                     $(`#${new_title}_variables_info`).on("click",hydroserver_information);
                     $(`#${new_title}_${group_name_e3}_reload`).on("click",update_hydroserver);


                     let lis = document.getElementById(`${id_group_separator}`).getElementsByTagName("li");
                     let li_arrays = Array.from(lis);
                     let li_arrays2 = Array.from(lis);

                     let input_check = li_arrays.filter(x => new_title === x.attributes['layer-name'].value)[0].getElementsByClassName("chkbx-layer")[0];


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
                     let rowHTML= `<tr id= ${new_title}-row-complete>
                                    <th id="${new_title}-row-legend"></th>
                                    <th>${title}</th>
                                  </tr>`
                    if(!document.getElementById(`${new_title}-row-complete`)){
                      $(rowHTML).appendTo('#tableLegend');
                    }
                    $(`#${new_title}-row-legend`).prepend($(getIconLegend(test_style,title)));


                     map.addLayer(vectorLayer);
                     vectorLayer.setStyle(new ol.style.Style({}));


                     vectorLayer.set("selectable", true)

                     layersDict[title] = vectorLayer;
                     $(`#${new_title}_zoom`).on("click",function(){
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
               $("#GeneralLoading").addClass("hidden");
             }
             catch(e){
               console.log(e);
               $("#GeneralLoading").addClass("hidden");
               $.notify(
                   {
                       message: `Something went wrong loading the hydroservers for the group called ${group_name}. Please see the console for details.`
                   },
                   {
                       type: "danger",
                       allow_dismiss: true,
                       z_index: 20000,
                       delay: 5000,
                       animate: {
                         enter: 'animated fadeInRight',
                         exit: 'animated fadeOutRight'
                       },
                       onShow: function() {
                           this.css({'width':'auto','height':'auto'});
                       }
                   }
               )
             }



           },
           error: function(error) {
             $("#GeneralLoading").addClass("hidden");
               $.notify(
                   {
                       message: `Something went wrong loading the hydroservers for the group called ${group_name}. Please see the console for details.`
                   },
                   {
                       type: "danger",
                       allow_dismiss: true,
                       z_index: 20000,
                       delay: 5000,
                       animate: {
                         enter: 'animated fadeInRight',
                         exit: 'animated fadeOutRight'
                       },
                       onShow: function() {
                           this.css({'width':'auto','height':'auto'});
                       }
                   }
               )
           }
       })
 };

/**
  * add_hydroserver function.
  * Function to add an individual service in the group
* */
add_hydroserver = function(){
  try{
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
    if(check_if_exits($("#soap-title").val())){
      $modalAddSOAP.find(".warning").html(  "<b>There is already a view with that name, please provide another</b>")
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
        var specials=/[*|\":<>[\]{}`\\()';@&$]/;

        var title = $("#soap-title").val();
        if (specials.test(title)){

            $modalAddSOAP
                .find(".warning")
                .html("<b>The following characters are not permitted in the title [ * | \" : < > [ \ ] { } ` \ \ ( ) ' ; @ & $ ]</b>");

            return false
        }
      } else {
          $modalAddSOAP.find(".warning").html("");
      }

      $("#soapAddLoading").removeClass("hidden");

      let title_server = $("#soap-title").val();
      let unique_id_group = uuidv4();
      id_dictionary[unique_id_group] = title_server;
      let actual_group_name = actual_group.split('=')[1];
      let description = $("#hs-description").val();
      let url_decons;
      let url_to_sent =$("#soap-url").val();
      if($("#soap-url").val().includes("?WSDL")){
        url_decons = $("#soap-url").val().split("?")[0];
      }
      else{
        url_decons = url_to_sent;
        url_to_sent = url_to_sent + "?WSDL";
      }
      let url_request;
      let url
      console.log(url_decons);
      // url_request = url_decons[0] + "?request=GetSitesObject&format=WML1";
      let make_sure_not_mc = url_decons.split("//");
      console.log(make_sure_not_mc);
      if(make_sure_not_mc[0] == document.location.protocol){
        url_request = url_decons + "?request=GetSitesObject&format=WML1";
      }
      else{
        url_request = document.location.protocol + "//" + make_sure_not_mc[1] +"?request=GetSitesObject&format=WML1";
      }
      console.log(url_request);
      var raw_add = '';
      var complete_add = '';
      var lastResponseLength = false;
      var loco_index = 0;
      var almost_response = '';
      var complete_response;
      var tag_b;
      var tag_c = '</sitesResponse></GetSitesObjectResponse></soap:Body></soap:Envelope>';
      var list_sites_me = [];
      var notifications;
      console.log(url_request);
      // $("#loading_p").removeClass("hidden");
      // $("#loading_p").html(`Adding ${title_server}: 0 new sites added to the database . . .`);
        $.ajax({
          type:"GET",
          url:url_request,
          dataType: "text",
          xhrFields: {
              // Getting on progress streaming response
              onprogress: function(e){
                try{
                  var progressResponse;

                  var response = e.currentTarget.response;
                  raw_add += response;
                  var last_child;
                  // if (loco_index > 0){
                  if(lastResponseLength === false){
                      progressResponse = response;
                      tag_b = progressResponse.split('</queryInfo>')[0] + '</queryInfo>';
                      last_child = progressResponse.substr(progressResponse.length - 7);
                      console.log("last characters",last_child);
                      if(last_child == '</site>' || last_child == 'velope>'){
                        console.log('1a');
                          complete_response = progressResponse;
                      }
                      else{
                        console.log('1b');
                        // Get the first incomplete element and add the site tag//
                        almost_response = '<site>' + progressResponse.split('<site>')[progressResponse.split('<site>').length - 1] ;
                        // Add the response withpu the last element as the complete response //
                        complete_response = progressResponse.split('<site>').slice(0,-1).join('<site>');
                      }
                      lastResponseLength = response.length;
                  }
                  else{
                    progressResponse = response.substring(lastResponseLength);
                    last_child = progressResponse.substr(progressResponse.length - 7);
                    console.log("last characters",last_child);
                    if(last_child == '</site>' || last_child == 'velope>'){
                      if(almost_response != ''){
                        console.log('2a1');

                        complete_response = tag_b + almost_response + progressResponse;
                        // almost_response = '';
                        // complete_response = almost_response + progressResponse.split('<site>')[0];
                        // almost_response = progressResponse.split('<site>').slice(1).join('<site>');

                      }
                      else{
                        console.log('2a2');

                        complete_response = tag_b + progressResponse;
                      }
                    }
                    else{
                      if(almost_response != ''){
                        console.log('2b1');

                        complete_response = tag_b + almost_response + progressResponse.split('<site>')[0];
                        almost_response = '<site>' + progressResponse.split('<site>').slice(1).join('<site>');
                      }
                      else{
                        console.log('2b2');

                        // Get the first incomplete element and add the site tag//
                        almost_response = '<site>' + progressResponse.split('<site>')[progressResponse.split('<site>').length - 1];
                        // Add the response withpu the last element as the complete response //
                        complete_response = tag_b + progressResponse.split('<site>').slice(0,-1).join('<site>');
                      }

                    }
                    lastResponseLength = response.length;

                    // console.log(complete_response);
                  }
                  if(!complete_response.includes(tag_c)){
                    complete_response = complete_response + tag_c;
                  }

                  // complete_response += tag_c;
                  // console.log("raw");
                  // console.log(progressResponse);
                  //
                  // console.log("complete");
                  // console.log(complete_response);
                  //
                  // console.log("partial");
                  // console.log(almost_response);

                  loco_index += 1;

                  let parsedObject = getSitesHelper(complete_response);
                  let requestObject = {
                    hs: title_server,
                    group: actual_group_name,
                    sites: JSON.stringify(parsedObject),
                    url: url_to_sent,
                    description:description,
                  }

                  console.log(requestObject);
                  $.ajax({
                    type:"POST",
                    url: "save_stream/",
                    dataType: "JSON",
                    data: requestObject,
                    success:function(result){
                        //Returning the geoserver layer metadata from the controller
                        console.log(result);
                        var json_response = result['success']
                        console.log(json_response);
                        if(!result.hasOwnProperty("error")){

                          $("#loading_p").html(`Adding ${title_server}: ${json_response} . . .`);
                          if(notifications != undefined){
                            notifications.update(
                                {
                                    'message': `${title_server}: ${json_response} . . .`,
                                    'delay': 500,

                                }
                            )
                          }
                          else{
                            notifications = $.notify(
                                {
                                    message: `${title_server}: 0 new sites added to the database . . .`
                                },
                                {
                                    newest_on_top: true,
                                    type: "success",
                                    allow_dismiss: true,
                                    z_index: 500,
                                    delay: 0,
                                    animate: {
                                      enter: 'animated fadeInRight',
                                      exit: 'animated fadeOutRight'
                                    },
                                    onShow: function() {
                                        this.css({'width':'auto','height':'auto'});
                                    }
                                }
                            )
                          }

                        }


                    },
                    error: function(err){
                      console.log(err);
                      $("#soapAddLoading-group").addClass("hidden");
                      // $("#loading_p").addClass("hidden");

                      // $.notify(
                      //     {
                      //         message: `We are having problems adding the ${title_server} WaterOneFlow web service`
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

                  for(let i=0; i < parsedObject.length; ++i){
                    list_sites_me.push(parsedObject[i].sitename)
                  }
                }
                catch(e){
                  console.log(e);
                }
              }
          },

          success: function(xmlData){


            function arrayCompare(_arr1, _arr2) {
                if (
                  !Array.isArray(_arr1)
                  || !Array.isArray(_arr2)
                  || _arr1.length !== _arr2.length
                  ) {
                    return false;
                  }

                // .concat() to not mutate arguments
                const arr1 = _arr1.concat().sort();
                const arr2 = _arr2.concat().sort();

                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] !== arr2[i]) {
                        return false;
                     }
                }

                return true;
            }

            try{
              let test_cont = []
              let parsedObject = getSitesHelper(xmlData);
              for(let i=0; i < parsedObject.length; ++i){
                test_cont.push(parsedObject[i].sitename)
              }

              console.log(arrayCompare(test_cont,list_sites_me));

              let requestObject = {
                hs: title_server,
                group: actual_group_name,
                sites: JSON.stringify(parsedObject),
                url: url_to_sent,
                description:description
              }

              console.log(requestObject);
              $.ajax({
                type:"POST",
                url: "save_new_sites/",
                dataType: "JSON",
                data: requestObject,
                success:function(result){
                  try{
                    //Returning the geoserver layer metadata from the controller
                    var json_response = result
                    let group_name = actual_group_name;
                    let group_name_e3;
                    Object.keys(id_dictionary).forEach(function(key) {
                      if(id_dictionary[key] == group_name ){
                        group_name_e3 = key;
                      }
                    });

                    let id_group_separator = `${group_name_e3}_list_separator`;

                    let new_title = unique_id_group;

                    // put the ajax call and also the filter //
                    let servers_with_keywords = [];

                    $(`#${group_name_e3}-noGroups`).hide();

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
                        let rowHTML= `<tr id= ${new_title}-row-complete>
                                       <th id="${new_title}-row-legend"></th>
                                       <th>${title}</th>
                                     </tr>`
                       if(!document.getElementById(`${new_title}-row-complete`)){
                         $(rowHTML).appendTo('#tableLegend');
                       }
                       $(`#${new_title}-row-legend`).prepend($(getIconLegend(test_style,title)));


                        map.addLayer(vectorLayer);

                        vectorLayer.set("selectable", true)
                        map.getView().fit(vectorSource.getExtent());
                        map.updateSize();
                        layersDict[title] = vectorLayer;


                          let no_servers_tag = Array.from(document.getElementById(`${id_group_separator}`).getElementsByTagName("P"))[0];
                          let newHtml;
                          if(can_delete_hydrogroups){
                              newHtml = html_for_servers(can_delete_hydrogroups,new_title,group_name_e3);
                          }
                          else{
                            newHtml = html_for_servers(false,new_title,group_name_e3);
                          }
                          
                          
                          
                          // let newHtml = html_for_servers(can_delete_hydrogroups,new_title,group_name_e3)
                           $(newHtml).appendTo(`#${id_group_separator}`);
                           $(`#${new_title}_variables`).on("click",showVariables2);
                           $(`#${new_title}_variables_info`).on("click",hydroserver_information);
                           $(`#${new_title}_${group_name_e3}_reload`).on("click",update_hydroserver);

                          // MAKES THE LAYER INVISIBLE

                          let lis = document.getElementById("current-Groupservers").getElementsByTagName("li");
                          let li_arrays = Array.from(lis);
                          let input_check = li_arrays.filter(x => new_title === x.attributes['layer-name'].value)[0].getElementsByClassName("chkbx-layer")[0];

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
                          $(`#${new_title}_zoom`).on("click",function(){
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
                          urls_servers[$("#soap-title").val()] =  url_to_sent
                          getVariablesJS(url_to_sent,new_title , group_name_e3);

                          $.notify(
                              {
                                  message: `Successfully Added the ${title_server} WaterOneFlow Service to the Map`
                              },
                              {
                                  newest_on_top: true,
                                  type: "success",
                                  allow_dismiss: true,
                                  z_index: 20000,
                                  delay: 100,
                                  animate: {
                                    enter: 'animated fadeInRight',
                                    exit: 'animated fadeOutRight'
                                  },
                                  onShow: function() {
                                      this.css({'width':'auto','height':'auto'});
                                  }
                              }
                          )
                          notifications.close();
                          $("#soapAddLoading-group").addClass("hidden");


                    }
                    catch(err){
                      console.log(err);
                      $("#soapAddLoading-group").addClass("hidden");

                      $("#btn-add-soap").show();
                      $.notify(
                          {
                              message: `We are having problems adding the ${title_server} WaterOneFlow web service`
                          },
                          {
                              type: "danger",
                              allow_dismiss: true,
                              z_index: 20000,
                              delay: 5000,
                              animate: {
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                              },
                              onShow: function() {
                                  this.css({'width':'auto','height':'auto'});
                              }
                          }
                      )
                  }

                },
                error: function(err){
                  console.log(err);
                  $("#soapAddLoading-group").addClass("hidden");
                  $.notify(
                      {
                          message: `We are having problems adding the ${title_server} WaterOneFlow web service`
                      },
                      {
                          type: "danger",
                          allow_dismiss: true,
                          z_index: 20000,
                          delay: 5000,
                          animate: {
                            enter: 'animated fadeInRight',
                            exit: 'animated fadeOutRight'
                          },
                          onShow: function() {
                              this.css({'width':'auto','height':'auto'});
                          }
                      }
                  )
                }

              })
            }
            catch(e){
              console.log(e);
              $("#soapAddLoading-group").addClass("hidden");
              $.notify(
                  {
                      message: `We are having problems adding the ${title_server} WaterOneFlow web service`
                  },
                  {
                      type: "danger",
                      allow_dismiss: true,
                      z_index: 20000,
                      delay: 5000,
                      animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                      },
                      onShow: function() {
                          this.css({'width':'auto','height':'auto'});
                      }
                  }
              )
            }
          },

          error: function(err){
            console.log(err);
            $("#soapAddLoading-group").addClass("hidden");
            $.notify(
                {
                    message: `We are having problems adding the ${title_server} WaterOneFlow web service`
                },
                {
                    type: "danger",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 5000,
                    animate: {
                      enter: 'animated fadeInRight',
                      exit: 'animated fadeOutRight'
                    },
                    onShow: function() {
                        this.css({'width':'auto','height':'auto'});
                    }
                }
            )
          }
        })
  }
  catch(e){
        $("#soapAddLoading").addClass("hidden");
        $("#btn-add-soap").show();
        console.log(e);
        $.notify(
            {
                message: `We are having problems adding the WaterOneFlow web service`
            },
            {
                type: "danger",
                allow_dismiss: true,
                z_index: 20000,
                delay: 5000,
                animate: {
                  enter: 'animated fadeInRight',
                  exit: 'animated fadeOutRight'
                },
                onShow: function() {
                    this.css({'width':'auto','height':'auto'});
                }
            }
        )
  }


}
$("#btn-add-soap").on("click", add_hydroserver);

/**
  * delete_hydroserver function.
  * Function to delete an individual service in the group
* */
delete_hydroserver= function(){
  try{
    $modalInterface.find(".success").html("")
    let arrayActual_group=actual_group.split('=')[1];
    let group_name_e3;
    Object.keys(id_dictionary).forEach(function(key) {
      if(id_dictionary[key] == actual_group.split('=')[1] ){
        group_name_e3 = key;
      }
    });
    var datastring = $modalDelete.serialize() //Delete the record in the database
    datastring += actual_group;
    $.ajax({
        type: "POST",
        url: `delete-group-hydroserver/`,
        data: datastring,
        dataType: "HTML",
        success: function(result) {
          try{
            var json_response = JSON.parse(result)
            $("#modalDelete").modal("hide")
            $("#modalDelete").each(function() {
                this.reset()
            })
            for(let i=0; i<Object.keys(json_response).length; ++i){

              let i_string=i.toString();
              let title = json_response[i_string];
              let new_title;
              Object.keys(id_dictionary).forEach(function(key) {
                if(id_dictionary[key] == title ){
                  new_title = key;
                  delete id_dictionary[key]
                }
              });
              $(`#${new_title}-row-complete`).remove()

              let element = document.getElementById(new_title);
              element.parentNode.removeChild(element);

              map.removeLayer(layersDict[title])
              delete layersDict[title]
              map.updateSize()

              let id_group_separator = `${group_name_e3}_list_separator`;
              let separator_element = document.getElementById(id_group_separator);
              let children_element = Array.from(separator_element.children);
              if(children_element.length < 2){
                $(`#${group_name_e3}-noGroups`).show();

              }
              $(`#${new_title}deleteID`).remove();

              $.notify(
                  {
                      message: `Successfully Deleted the Web Service!`
                  },
                  {
                      type: "success",
                      allow_dismiss: true,
                      z_index: 20000,
                      delay: 5000,
                      animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                      },
                      onShow: function() {
                          this.css({'width':'auto','height':'auto'});
                      }
                  }
              )

            }
          }
          catch(e){
            console.log(e);
            $.notify(
                {
                    message: `We got a problem updating the interface after deleting the Web Service, please reload your page `
                },
                {
                    type: "info",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 5000,
                    animate: {
                      enter: 'animated fadeInRight',
                      exit: 'animated fadeOutRight'
                    },
                    onShow: function() {
                        this.css({'width':'auto','height':'auto'});
                    }
                }
            )
          }
        },
        error: error => {
          console.log(error);
            $.notify(
                {
                    message: `Something went wrong while deleting the selected web services`
                },
                {
                    type: "danger",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 5000,
                    animate: {
                      enter: 'animated fadeInRight',
                      exit: 'animated fadeOutRight'
                    },
                    onShow: function() {
                        this.css({'width':'auto','height':'auto'});
                    }
                }
            )
        }
    })
  }
  catch(e){
    console.log(e);
    $.notify(
        {
            message: `We are having problems recognizing the actual group or groups to delete.`
        },
        {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
            },
            onShow: function() {
                this.css({'width':'auto','height':'auto'});
            }
        }
    )
  }
}
$("#btn-del-server").on("click", delete_hydroserver);


/**
  * delete_hydroserver_Individual function.
  * Function to delete an individual service in the group
* */
delete_hydroserver_Individual= function(group,server){
  try{
    var datastring = `server=${server}&actual-group=${group}`
    $.ajax({
        type: "POST",
        url: `delete-group-hydroserver/`,
        data: datastring,
        dataType: "HTML",
        success: function(result) {
          try{
            var json_response = JSON.parse(result)
            for(let i=0; i<Object.keys(json_response).length; ++i){

              let i_string=i.toString();
              let title=json_response[i_string];
              title  = title.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
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
                let no_servers = `<button class="btn btn-danger btn-block noGroups"> The group is empty</button>`
                    $(no_servers).appendTo(`#${id_group_separator}`) ;
              }
              $.notify(

                  {
                      message: `Successfully Deleted the Web service!`
                  },
                  {
                      type: "success",
                      allow_dismiss: true,
                      z_index: 20000,
                      delay: 5000,
                      animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                      },
                      onShow: function() {
                          this.css({'width':'auto','height':'auto'});
                      }
                  }
              )
            }
          }
          catch(e){
            console.log(e);
            $.notify(
                {
                    message: `We have a problem updating the interface, please reload the page`
                },
                {
                    type: "info",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 5000,
                    animate: {
                      enter: 'animated fadeInRight',
                      exit: 'animated fadeOutRight'
                    },
                    onShow: function() {
                        this.css({'width':'auto','height':'auto'});
                    }
                }
            )
          }
        },
        error: error => {
          console.log(error);
            $.notify(
                {
                    message: `Something went wrong while deleting the selected web services`
                },
                {
                    type: "danger",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 5000,
                    animate: {
                      enter: 'animated fadeInRight',
                      exit: 'animated fadeOutRight'
                    },
                    onShow: function() {
                        this.css({'width':'auto','height':'auto'});
                    }
                }
            )
        }
    })
  }
  catch(e){
    console.log(e);
    $.notify(
        {
            message: `We are having problems recognizing the actual servers selected to delete`
        },
        {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
            },
            onShow: function() {
                this.css({'width':'auto','height':'auto'});
            }
        }
    )
  }
}

/**
  * showVariables2 function.
  * Function to retrieve the variables of an individual service in the group
* */
showVariables2 = function(){
 try{
   let groupActual = this.parentElement.parentNode.id.split("_")[0];
   groupActual = id_dictionary[groupActual];
   let hsActual = this.id.split("_")[0];
   hsActual = id_dictionary[hsActual];
   filterSites['group']=groupActual;
   filterSites['hs']=hsActual;

   let $modalVariables = $("#modalShowVariablesTable");
   $(`#hideScroll2`).empty();
   $("#variablesLoading2").removeClass("hidden");
   $.ajax({
       type: "POST",
       url: `get-variables-hs/`,
       dataType: "JSON",
       data: filterSites,
       success: result => {
         try{
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
                    <thead><th>Observed Variable</th><th>Unit</th><th> WHOS Variable Code</th></thead>
                 <tbody>`
             if (result['variables_name'].length === 0) {
                 $modalVariables
                     .find(".modal-body")
                     .html(
                         "<b>There are no variables in the View.</b>"
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
         }
         catch(e){
           $("#variablesLoading2").addClass("hidden");
             $.notify(
                 {
                     message: `There is a problem retrieving the variables of the ${hsActual} Web Service`
                 },
                 {
                     type: "warning",
                     allow_dismiss: true,
                     z_index: 20000,
                     delay: 5000,
                     animate: {
                       enter: 'animated fadeInRight',
                       exit: 'animated fadeOutRight'
                     },
                     onShow: function() {
                         this.css({'width':'auto','height':'auto'});
                     }
                 }
             )
         }


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
                  delay: 5000,
                  animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutRight'
                  },
                  onShow: function() {
                      this.css({'width':'auto','height':'auto'});
                  }
              }
          )
      }


    })
 }
 catch(e){
   $("#variablesLoading2").addClass("hidden");

   $.notify(
       {
           message: `We are having problems recognizing the actual servers selected to delete. WE ARE WORKING ON IT :)`
       },
       {
           type: "danger",
           allow_dismiss: true,
           z_index: 20000,
           delay: 5000,
           animate: {
             enter: 'animated fadeInRight',
             exit: 'animated fadeOutRight'
           },
           onShow: function() {
               this.css({'width':'auto','height':'auto'});
           }
       }
   )
 }
}


/**
  * hydroserver_information function.
  * Function to retrieve information of an individual service in the group
* */
hydroserver_information = function(){
  try{
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
      // console.log("change unbind");
    });

    site_select.selectpicker("refresh");
    let groupActual = this.parentElement.parentNode.id.split("_")[0];
    groupActual = id_dictionary[groupActual]
    let hsActual = this.id.split("_")[0];
    // hsActual = hsActual.replace(/-/g, ' ');
    hsActual = id_dictionary[hsActual]
    filterSites['group']=groupActual;
    filterSites['hs']=hsActual;
    $("#hydroserverTitle").html(`${filterSites['hs']}`);
    $("#downloading_loading").removeClass("hidden");

    $.ajax({
      type:"POST",
      url: `get-hydroserver-info/`,
      dataType: "JSON",
      data: filterSites,
      success: function(result1){
        try{
          let hs_title = result1['title'];
          var url_UN = "https://geoservices.un.org/arcgis/rest/services/ClearMap_WebTopo/MapServer";

          setTimeout(function(){
            if(map2 ==undefined){
              map2 = new ol.Map({
                     target: 'map2',
                     layers: [
                       new ol.layer.Tile({
                               source: new ol.source.TileArcGISRest({
                                 url: url_UN
                               })
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

          let url_token_array = result1['url'].split('/');
          let token_s = "<b>{Your Personal Token Identifier}</b>";
          url_token_array[7] = token_s;
          let url_token_final = url_token_array.join("/");

          console.log(result1['url']);
          console.log(url_token_final);

          $("#urlHydroserver").html(url_token_final);
          $("#url_WOF").html($("#urlHydroserver").html());


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
                        <p>Station/Platform Code: ${result1['siteInfo'][i]['sitecode']}</p>
                        <p>Network: ${result1['siteInfo'][i]['network']}</p>
                        <p>Latitude: ${result1['siteInfo'][i]['latitude']}</p>
                        <p>Longitude: ${result1['siteInfo'][i]['longitude']}</p>
                      </td>`
                      +
                 '</tr>'

              }
              site_select.selectpicker("refresh");



              $("#site_choose").on("change.something", function(){
                  get_vars_from_site(result1['siteInfo']);
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
          $("#downloading_loading").addClass("hidden");
        }
        catch(e){
          console.log(e);
          $("#downloading_loading").addClass("hidden");

          $.notify(
              {
                  message: `There is a problem retriving information for the selected Web Service`
              },
              {
                  type: "danger",
                  allow_dismiss: true,
                  z_index: 20000,
                  delay: 5000,
                  animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutRight'
                  },
                  onShow: function() {
                      this.css({'width':'auto','height':'auto'});
                  }
              }
          )
        }

      },
      error: function(error) {
        console.log(error);
        $("#downloading_loading").addClass("hidden");

          $.notify(
              {
                  message: `There is a problem retriving information for the selected Web Service`
              },
              {
                  type: "danger",
                  allow_dismiss: true,
                  z_index: 20000,
                  delay: 5000,
                  animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutRight'
                  },
                  onShow: function() {
                      this.css({'width':'auto','height':'auto'});
                  }
              }
          )
      }

    })

  }
  catch(e){
    console.log(e);
    $("#downloading_loading").addClass("hidden");

    $.notify(
        {
            message: `We are having problems recognizing the selected Web Service`
        },
        {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
            },
            onShow: function() {
                this.css({'width':'auto','height':'auto'});
            }
        }
    )
  }
}

/**
  * searchSites function.
  * Function to search the table of sites in the service info modal
* */
searchSites = function() {
  try{
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
  catch (e){
    console.log(e);
    $.notify(
        {
            message: `Seems that we are having problems with the Search Bar, Please search manually for the site.`
        },
        {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
            },
            onShow: function() {
                this.css({'width':'auto','height':'auto'});
            }
        }
    )
  }

}
document.getElementById('myInput').addEventListener("keyup", searchSites);

/**
* getVariablesJS function.
  * Function to retrieve the metadata of the WaterOneFlow function GetVariables
  * @param {string} url - url of the service
  * @param {string} hsActual - name of the service
  * @param {string} group_name - name of the catalog
* */
getVariablesJS = function(url,hsActual,group_name){
  try{
    let url_decons = url.split("?");

    let url_request;
    // let url_request = url_decons[0] + "?request=GetVariablesObject&format=WML1";
    let make_sure_not_mc = url_decons[0].split("//");

    if(make_sure_not_mc[0] == document.location.protocol){
      url_request = url_decons[0] + "?request=GetVariablesObject&format=WML1";
    }
    else{
      url_request = document.location.protocol + "//" + make_sure_not_mc[1] +"?request=GetVariablesObject&format=WML1";
    }
    console.log(url_request);
    $("#GeneralLoading").removeClass("hidden");
    $.ajax({
      type:"GET",
      url:url_request,
      dataType: "text",
      success: function(xmlData){
        // console.log(xmlData);
        try{
          let parsedObject = getVariablesHelperJS(xmlData);
          let requestObject = {
            hs: id_dictionary[hsActual],
            group: id_dictionary[group_name],
            variables: JSON.stringify(parsedObject)
          }
          $.ajax({
            type:"POST",
            url: "save-variables/",
            dataType: "JSON",
            data: requestObject,
            success:function(data){
              $("#GeneralLoading").addClass("hidden");
              return data
            },
            error: function(error){
              $("#GeneralLoading").addClass("hidden");
              console.log(error);
              $.notify(
                  {
                      message: `There was an error updating the Web Service`
                  },
                  {
                      type: "danger",
                      allow_dismiss: true,
                      z_index: 20000,
                      delay: 5000,
                      animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                      },
                      onShow: function() {
                          this.css({'width':'auto','height':'auto'});
                      }
                  }
              )
            }
          })
        }
        catch(e){
          $("#GeneralLoading").addClass("hidden");
          console.log(e);
          $.notify(
              {
                  message: `There was an error updating the Web Service`
              },
              {
                  type: "danger",
                  allow_dismiss: true,
                  z_index: 20000,
                  delay: 5000,
                  animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutRight'
                  },
                  onShow: function() {
                      this.css({'width':'auto','height':'auto'});
                  }
              }
          )
        }

      },
      error: function(error){
        $("#GeneralLoading").addClass("hidden");
        console.log(error);
        $.notify(
            {
                message: `There was an error updating the Web Service`
            },
            {
                type: "danger",
                allow_dismiss: true,
                z_index: 20000,
                delay: 5000,
                animate: {
                  enter: 'animated fadeInRight',
                  exit: 'animated fadeOutRight'
                },
                onShow: function() {
                    this.css({'width':'auto','height':'auto'});
                }
            }
        )
      }
    })
  }
  catch(e){
    $("#GeneralLoading").addClass("hidden");
    $.notify(
        {
            message: `There was an error updating the Web Service`
        },
        {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
            },
            onShow: function() {
                this.css({'width':'auto','height':'auto'});
            }
        }
    )
    console.log(e);
  }

}

/**
* getVariablesHelperJS function.
  * Helper function to parse the xml metadata of the WaterOneFlow function GetVariables
  * @param {string} url - url of the service
  * @param {string} hsActual - name of the service
  * @param {string} group_name - name of the catalog
  * @return {object} return_array - array containing the response of the WaterOneFlow function GetVariables
* */
getVariablesHelperJS = function(xmlData){
  let return_obj;
  let return_array = [];
  var options = {
      attributeNamePrefix : "@",
      attrNodeName: "attr", //default is 'false'
      textNodeName : "#text",
      ignoreAttributes : false,
      ignoreNameSpace : false,
      allowBooleanAttributes : true,
      parseNodeValue : true,
      parseAttributeValue : true,
      trimValues: true,
      cdataTagName: "__cdata", //default is 'false'
      cdataPositionChar: "\\c",
      parseTrueNumberOnly: false,
      arrayMode: false, //"strict"
      attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
      tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
      stopNodes: ["parse-me-as-string"]
  };
  var result = parser.validate(xmlData);
  if (result !== true) console.log(result.err);
  var jsonObj = parser.parse(xmlData,options);
  // console.log(jsonObj);
  let firstObject = jsonObj['soap:Envelope']['soap:Body']['GetVariablesObjectResponse'];

  let array_variables = firstObject['variablesResponse']['variables']['variable'];
  if(Array.isArray(array_variables)){
    for(let i=0; i< array_variables.length; ++i){
      let one_variable = array_variables[i];
      let return_object = {};
      return_object = getVariablesHelperJS2(one_variable, return_object);
      return_array.push(return_object);
    }
  }
  else{
    let return_object = {};
    return_object = getVariablesHelperJS2(array_variables, return_object);
    return_array.push(return_object);
  }

  return return_array
}

/**
* getVariablesHelperJS2 Helper function to parse and store the content of the GetValues response dictionary at the level:
  * <p> one_variable = GetVariablesResponse ['variablesResponse']['variables']['variable'] </p>
  * <p> The dictionary containing the response from the GetValues method stores the following content into a new dictionary: </p>
  * <ol style="list-style: none;">
  *  <li> variableName: Name of the variable </li>
  *  <li> unitName: Name of the units of the values associated to the given variable and site </li>
  *  <li> unitAbbreviation: unit abbreviation of the units from the values associated to the given variable and site </li>
  *  <li> noDataValue: value associated to lack of data. </li>
  *  <li> isRegular: Boolean to indicate whether the observation measurements and collections regular </li>
  *  <li> timeSupport: Boolean to indicate whether the values support time </li>
  *  <li> timeUnitName: Time Units associated to the observation </li>
  *  <li> timeUnitAbbreviation: Time units abbreviation </li>
  *  <li> sampleMedium: the sample medium, for example water, atmosphere, soil. </li>
  *  <li> speciation: The chemical sample speciation (as nitrogen, as phosphorus..) </li>
  * </ol>
  * @param {string} one_variable - object with structure GetVariablesResponse ['variablesResponse']['variables']['variable']
  * @param {string} return_object - response object
  * @return {object} return_array - array containing the response of the WaterOneFlow function GetVariables
* */
getVariablesHelperJS2 = function(one_variable, return_object){

  try{
    return_object['variableName'] = one_variable['variableName'];
  }
  catch(e){
      return_object['variableName'] = "No Data Provided";
  }
  try{
      return_object['variableCode'] = one_variable['variableCode']['#text'];
  }
  catch(e){
    return_object['variableCode'] = "No Data Provided";
  }
  try{
    return_object['valueType']= one_variable['valueType'];
  }
  catch(e){
    return_object['valueType'] = "No Data Provided";
  }
  try{
    return_object['dataType']= one_variable['dataType'];
  }
  catch(e){
    return_object['dataType'] = "No Data Provided";
  }
  try{
    return_object['generalCategory'] = one_variable['generalCategory'];
  }
  catch(e){
    return_object['generalCategory'] = "No Data Provided";
  }
  try{
    return_object['sampleMedium'] = one_variable['sampleMedium'];
  }
  catch(e){
    return_object['sampleMedium'] = "No Data Provided";
  }
  try{
    return_object['unitName'] = one_variable['unit']['unitName'];
  }
  catch(e){
    return_object['unitName'] = "No Data Provided";
  }
  try{
    return_object['unitType'] = one_variable['unit']['unitType'];
  }
  catch(e){
    return_object['unitType'] = "No Data Provided";
  }
  try{
    return_object['unitAbbreviation'] = one_variable['unit']['unitAbbreviation'];
  }
  catch(e){
    return_object['unitAbbreviation'] = "No Data Provided";
  }
  try{
    return_object['noDataValue'] = one_variable['noDataValue'];
  }
  catch(e){
    return_object['noDataValue'] = "No Data Provided";
  }
  try{
    return_object['isRegular'] = one_variable['variableCode']['attr']['@default'];
  }
  catch(e){
    return_object['isRegular'] = "No Data Provided";
  }
  try{
    return_object['timeUnitAbbreviation'] = one_variable['timeScale']['unit']['unitAbbreviation'];
  }
  catch(e){
    return_object['timeUnitAbbreviation'] = "No Data Provided";
  }
  try{
    return_object['timeSupport'] = one_variable['timeScale']['timeSupport'];
  }
  catch(e){
    return_object['timeSupport'] = "No Data Provided";
  }
  try{
    return_object['speciation'] = one_variable['speciation'];
  }
  catch(e){
    return_object['speciation'] = "No Data Provided";
  }

  return return_object

}

/**
* getSitesFilterHelper function.
  * Helper function to parse the xml metadata of the WaterOneFlow function GetSites with variable filter
  * @param {string} xmlData - xmlData string
  * @return {object} return_array - array containing the response of the WaterOneFlow function GetSites with variable filter
* */
getSitesFilterHelper = function (xmlData){
  let return_obj;
  let return_array = []
  var options = {
      attributeNamePrefix : "@",
      attrNodeName: "attr", //default is 'false'
      textNodeName : "#text",
      ignoreAttributes : false,
      ignoreNameSpace : false,
      allowBooleanAttributes : true,
      parseNodeValue : true,
      parseAttributeValue : true,
      trimValues: true,
      cdataTagName: "__cdata", //default is 'false'
      cdataPositionChar: "\\c",
      parseTrueNumberOnly: false,
      arrayMode: false, //"strict"
      attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
      tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
      stopNodes: ["parse-me-as-string"]
  };
  var result = parser.validate(xmlData);
  if (result !== true) console.log(result.err);
  var jsonObj = parser.parse(xmlData,options);
  //console.log(jsonObj);
  let firstObject = jsonObj['soap:Envelope']['soap:Body']['GetSitesResponse']['GetSitesResult'];
  // console.log(firstObject);

  var result2 = parser.validate(firstObject);
  if (result2 !== true) console.log(result2.err);
  var jsonObj2 = parser.parse(firstObject,options);
  firstObject = jsonObj2;
  //console.log(jsonObj2);

  let hs_sites = []
  try{
    if (firstObject.hasOwnProperty('sitesResponse')){
      if(!firstObject['sitesResponse'].hasOwnProperty('site')){
        return hs_sites;
      }
      let sites_object = firstObject['sitesResponse']['site'];
      // # If statement is executed for multiple sites within the HydroServer, if there is a single site then it goes to the else statement
      // # Parse through the HydroServer and each site with its metadata as a
      // # dictionary object to the hs_sites list
      if(Array.isArray(sites_object)){
        for(let i=0; i< sites_object.length; ++i){
          let site = sites_object[i]
          let hs_json = {};
          let latitude = site['siteInfo']['geoLocation']['geogLocation']['latitude'];
          let longitude = site['siteInfo']['geoLocation']['geogLocation']['longitude'];
          let site_name = site['siteInfo']['siteName'];
          let network = site['siteInfo']['siteCode']['attr']["@network"];
          let sitecode = site['siteInfo']['siteCode']["#text"];
          let siteID = site['siteInfo']['siteCode']['attr']["@siteID"];
          hs_json['country'] = "No Data was Provided";
          try{
            let sitePorperty_Info = site['siteInfo']['siteProperty'];
            if (Array.isArray(sitePorperty_Info)){
              for(let j = 0; j < sitePorperty_Info.length; ++j){
                let props = sitePorperty_Info[j];
                  if (props['attr']['@name'] == 'Country'){
                    hs_json['country'] = props['#text'];
                  }
              }

            }
            else{
              if(sitePorperty_Info['attr']['@name'] == 'Country'){
                hs_json['country'] = sitePorperty_Info['#text']
              }
            }
          }
          catch(e){
            hs_json['country'] = "No Data was Provided";
          }
          hs_json["sitename"] = site_name;
          hs_json["latitude"] = latitude;
          hs_json["longitude"] = longitude;
          hs_json["sitecode"] = sitecode;
          hs_json["network"] = network;
          hs_json["fullSiteCode"] = network + ":" + sitecode;
          hs_json["siteID"] = siteID;
          hs_json["service"] = "SOAP";
          hs_sites.push(hs_json);
        }

      }

      else{
        let hs_json = {}
        let latitude = sites_object['siteInfo']['geoLocation']['geogLocation']['latitude'];
        let longitude = sites_object['siteInfo']['geoLocation']['geogLocation']['longitude'];
        let site_name = sites_object['siteInfo']['siteName'];
        let network = sites_object['siteInfo']['siteCode']['attr']["@network"];
        let sitecode = sites_object['siteInfo']['siteCode']["#text"];
        let siteID = sites_object['siteInfo']['siteCode']['attr']["@siteID"];

        hs_json['country'] = "No Data was Provided";
        try{
          let sitePorperty_Info = sites_object['siteInfo']['siteProperty'];

          if(Array.isArray(sitePorperty_Info)){
            for(let z = 0; z < sitePorperty_Info.length; ++z){
              let props = sitePorperty_Info[j];
              if (props['attr']['@name'] == 'Country'){
                hs_json['country'] = props['#text'];
              }
            }
          }
          else{
            if(sitePorperty_Info['attr']['@name'] == 'Country'){
              hs_json['country'] = sitePorperty_Info['#text']
            }
          }
        }
        catch(e){
          hs_json['country'] = "No Data was Provided";
        }
        hs_json["sitename"] = site_name;
        hs_json["latitude"] = latitude;
        hs_json["longitude"] = longitude;
        hs_json["sitecode"] = sitecode;
        hs_json["network"] = network;
        hs_json["fullSiteCode"] = network + ":" + sitecode;
        hs_json["siteID"] = siteID;
        hs_json["service"] = "SOAP";
        hs_sites.push(hs_json);
      }

    }
  }
  catch(e){
    console.log(e);
    console.log("There is a discrepancy in the structure of the response. It is possible that the respond object does not contain the sitesResponse attribute")
  }

  return hs_sites

}


/**
* getSitesFilterHelper function.
  * Helper function to parse the xml metadata of the WaterOneFlow function GetSites
  * @param {string} xmlData - xmlData string
  * @return {object} return_array - array containing the response of the WaterOneFlow function GetSites
* */
getSitesHelper = function (xmlData){
  let return_obj;
  let return_array = []
  var options = {
      attributeNamePrefix : "@",
      attrNodeName: "attr", //default is 'false'
      textNodeName : "#text",
      ignoreAttributes : false,
      ignoreNameSpace : false,
      allowBooleanAttributes : true,
      parseNodeValue : true,
      parseAttributeValue : true,
      trimValues: true,
      cdataTagName: "__cdata", //default is 'false'
      cdataPositionChar: "\\c",
      parseTrueNumberOnly: false,
      arrayMode: false, //"strict"
      attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
      tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
      stopNodes: ["parse-me-as-string"]
  };
  var result = parser.validate(xmlData);
  if (result !== true) console.log(result.err);
  var jsonObj = parser.parse(xmlData,options);
  let firstObject = jsonObj['soap:Envelope']['soap:Body']['GetSitesObjectResponse'];

  let hs_sites = []
  try{
    if (firstObject.hasOwnProperty('sitesResponse')){
      if(!firstObject['sitesResponse'].hasOwnProperty('site')){
        return hs_sites;
      }
      let sites_object = firstObject['sitesResponse']['site'];
      // # If statement is executed for multiple sites within the HydroServer, if there is a single site then it goes to the else statement
      // # Parse through the HydroServer and each site with its metadata as a
      // # dictionary object to the hs_sites list
      if(Array.isArray(sites_object)){
        for(let i=0; i< sites_object.length; ++i){
          let site = sites_object[i]
          let hs_json = {};
          let latitude = site['siteInfo']['geoLocation']['geogLocation']['latitude'];
          let longitude = site['siteInfo']['geoLocation']['geogLocation']['longitude'];
          let site_name = site['siteInfo']['siteName'];
          let network = site['siteInfo']['siteCode']['attr']["@network"];
          let sitecode = site['siteInfo']['siteCode']["#text"];
          let siteID = site['siteInfo']['siteCode']['attr']["@siteID"];
          hs_json['country'] = "No Data was Provided";
          try{
            let sitePorperty_Info = site['siteInfo']['siteProperty'];
            if (Array.isArray(sitePorperty_Info)){
              for(let j = 0; j < sitePorperty_Info.length; ++j){
                let props = sitePorperty_Info[j];
                  if (props['attr']['@name'] == 'Country'){
                    hs_json['country'] = props['#text'];
                  }
              }

            }
            else{
              if(sitePorperty_Info['attr']['@name'] == 'Country'){
                hs_json['country'] = sitePorperty_Info['#text']
              }
            }
          }
          catch(e){
            hs_json['country'] = "No Data was Provided";
          }
          hs_json["sitename"] = site_name;
          hs_json["latitude"] = latitude;
          hs_json["longitude"] = longitude;
          hs_json["sitecode"] = sitecode;
          hs_json["network"] = network;
          hs_json["fullSiteCode"] = network + ":" + sitecode;
          hs_json["siteID"] = siteID;
          hs_json["service"] = "SOAP";
          hs_sites.push(hs_json);
        }

      }

      else{
        let hs_json = {}
        let latitude = sites_object['siteInfo']['geoLocation']['geogLocation']['latitude'];
        let longitude = sites_object['siteInfo']['geoLocation']['geogLocation']['longitude'];
        let site_name = sites_object['siteInfo']['siteName'];
        let network = sites_object['siteInfo']['siteCode']['attr']["@network"];
        let sitecode = sites_object['siteInfo']['siteCode']["#text"];
        let siteID = sites_object['siteInfo']['siteCode']['attr']["@siteID"];

        hs_json['country'] = "No Data was Provided";
        try{
          let sitePorperty_Info = sites_object['siteInfo']['siteProperty'];

          if(Array.isArray(sitePorperty_Info)){
            for(let z = 0; z < sitePorperty_Info.length; ++z){
              let props = sitePorperty_Info[j];
              if (props['attr']['@name'] == 'Country'){
                hs_json['country'] = props['#text'];
              }
            }
          }
          else{
            if(sitePorperty_Info['attr']['@name'] == 'Country'){
              hs_json['country'] = sitePorperty_Info['#text']
            }
          }
        }
        catch(e){
          hs_json['country'] = "No Data was Provided";
        }
        hs_json["sitename"] = site_name;
        hs_json["latitude"] = latitude;
        hs_json["longitude"] = longitude;
        hs_json["sitecode"] = sitecode;
        hs_json["network"] = network;
        hs_json["fullSiteCode"] = network + ":" + sitecode;
        hs_json["siteID"] = siteID;
        hs_json["service"] = "SOAP";
        hs_sites.push(hs_json);
      }

    }
  }
  catch(e){
    console.log(e);
    console.log("There is a discrepancy in the structure of the response. It is possible that the respond object does not contain the sitesResponse attribute")
  }

  return hs_sites

}

/**
* getSitesJS function.
  * Function to get the sites of the function GetSites
  * @param {string} url - url of the service
  * @param {string} hsActual - name of the service
  * @param {string} group_name - name of the catalog
* */
getSitesJS = function(url,hsActual,group_name){
    try{
      let url_decons = url.split("?");
      let url_request;
      if(url_decons.length > 0){
        $("#GeneralLoading").css({
           position:'fixed',
           "z-index": 9999,
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)'
         });
        $("#GeneralLoading").removeClass("hidden");
        // url_request = url_decons[0] + "?request=GetSitesObject&format=WML1";
        let make_sure_not_mc = url_decons[0].split("//");
        if(make_sure_not_mc[0] == document.location.protocol){
          url_request = url_decons[0] + "?request=GetSitesObject&format=WML1";
        }
        else{
          url_request = document.location.protocol + "//" + make_sure_not_mc[1] +"?request=GetSitesObject&format=WML1";
        }
        console.log(url_request);
      $.ajax({
        type:"GET",
        url:url_request,
        dataType: "text",
        success: function(xmlData){
          // console.log(xmlData);
          try{
            let parsedObject = getSitesHelper(xmlData);

            let requestObject = {
              hs: id_dictionary[hsActual],
              group: id_dictionary[group_name],
              sites: JSON.stringify(parsedObject),
            }
            $.ajax({
              type:"POST",
              url: "save-sites/",
              dataType: "JSON",
              data: requestObject,
              success:function(data){
                try{
                  let {siteInfo,sitesAdded,url} = data
                  if(layersDict.hasOwnProperty(hsActual)){
                    map.removeLayer(layersDict[hsActual])
                  }

                  let sites = siteInfo
                  if(sites.length > 0 ){
                    const vectorLayer = map_layers(sites,hsActual,url)[0]
                    const vectorSource = map_layers(sites,hsActual,url)[1]


                    map.addLayer(vectorLayer)
                    ol.extent.extend(extent, vectorSource.getExtent())
                    vectorLayer.set("selectable", true)
                    layersDict[hsActual] = vectorLayer;

                    map.getView().fit(vectorSource.getExtent());
                    map.updateSize();

                    layersDict[hsActual] = vectorLayer;
                  }


                    $.notify(
                        {
                            message: `Successfully updated the Web Service , ${sitesAdded} have been added to the Map.`
                        },
                        {
                            type: "success",
                            allow_dismiss: true,
                            z_index: 20000,
                            delay: 5000,
                            animate: {
                              enter: 'animated fadeInRight',
                              exit: 'animated fadeOutRight'
                            },
                            onShow: function() {
                                this.css({'width':'auto','height':'auto'});
                            }
                        }
                    )
                  $("#GeneralLoading").addClass("hidden");
                }
                catch(e){
                  console.log(e);
                  $("#GeneralLoading").addClass("hidden");
                  $.notify(
                      {
                          message: `There was an error updating the Web Service`
                      },
                      {
                          type: "danger",
                          allow_dismiss: true,
                          z_index: 20000,
                          delay: 5000,
                          animate: {
                            enter: 'animated fadeInRight',
                            exit: 'animated fadeOutRight'
                          },
                          onShow: function() {
                              this.css({'width':'auto','height':'auto'});
                          }
                      }
                  )
                }
              },
              error:function(error){
                console.log(error);
                $("#GeneralLoading").addClass("hidden");
                $.notify(
                    {
                        message: `There was an error updating the Web Service.`
                    },
                    {
                        type: "danger",
                        allow_dismiss: true,
                        z_index: 20000,
                        delay: 5000,
                        animate: {
                          enter: 'animated fadeInRight',
                          exit: 'animated fadeOutRight'
                        },
                        onShow: function() {
                            this.css({'width':'auto','height':'auto'});
                        }
                    }
                )
              }
            })
          }
          catch(e){
            console.log(e);
            $("#GeneralLoading").addClass("hidden");
            $.notify(
                {
                    message: `There was an error Updating the selected Web Service.`
                },
                {
                    type: "danger",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 5000,
                    animate: {
                      enter: 'animated fadeInRight',
                      exit: 'animated fadeOutRight'
                    },
                    onShow: function() {
                        this.css({'width':'auto','height':'auto'});
                    }
                }
            )
          }


        },
        error:function(error){
          console.log(error);
          $("#GeneralLoading").addClass("hidden");
          $.notify(
              {
                  message: `There was an error Updating the selected Web Service.`
              },
              {
                  type: "danger",
                  allow_dismiss: true,
                  z_index: 20000,
                  delay: 5000,
                  animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutRight'
                  },
                  onShow: function() {
                      this.css({'width':'auto','height':'auto'});
                  }
              }
          )
        }
      })
    }
  }
    catch(e){
      console.log(e);
      $("#GeneralLoading").addClass("hidden");
      $.notify(
          {
              message: `There was an error Updating the selected Web Service.`
          },
          {
              type: "danger",
              allow_dismiss: true,
              z_index: 20000,
              delay: 5000,
              animate: {
                enter: 'animated fadeInRight',
                exit: 'animated fadeOutRight'
              },
              onShow: function() {
                  this.css({'width':'auto','height':'auto'});
              }
          }
      )
    }
  }


/**
* getSitesJS function.
  * Function to get the update the sites of a selected service.
* */
update_hydroserver = function(){
  try{
    let hsActual = this.id.split("_")[0];
    let group_name = this.id.split("_")[1];
    getSitesJS(urls_servers[hsActual], hsActual, group_name);
    getVariablesJS(urls_servers[hsActual], hsActual, group_name);
  }
  catch(e){
    console.log(e);
    $.notify(
        {
            message: `There was an error updating the Web Service 1`
        },
        {
            type: "success",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
            },
            onShow: function() {
                this.css({'width':'auto','height':'auto'});
            }
        }
    )
  }
}


// showAvailableSites = function(){
//   try{
//     let group = this.baseURI.split("/");
//     // ONLY THE KEY WORDS //
//     let datastring = Array.from(document.getElementsByClassName("odd gradeX2"));
//     let hs = datastring[0].offsetParent.id.split("-")[0];
//
//     let key_words_to_search=[];
//     datastring.forEach(function(data){
//       Array.from(data.children).forEach(function(column){
//         if(Array.from(column.children)[0].checked ==true){
//           key_words_to_search.push(Array.from(column.children)[0].value.trim())
//         }
//       })
//     });
//
//     let requestObject = {};
//     requestObject['hs'] = filterSites['hs'];
//     requestObject['group'] = filterSites['group'];
//     requestObject['variables'] = key_words_to_search;
//     $("#variablesLoading").removeClass("hidden");
//     $.ajax({
//         type: "POST",
//         url: `get-available-sites/`,
//         dataType: "JSON",
//         data: requestObject,
//         success: result => {
//           try{
//             let sites = result['hydroserver'];
//             let title = filterSites['hs'];
//             let url = layersDict[title].values_.source.features[0].values_.features[0].values_.hs_url
//             const vectorLayer =  map_layers(sites,title,url)[0]
//             const vectorSource =  map_layers(sites,title,url)[1]
//             map.getLayers().forEach(function(layer) {
//                  if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
//                      layer.setStyle(new ol.style.Style({}));
//                    }
//              });
//
//             map.addLayer(vectorLayer)
//             vectorLayer.set("selectable", true)
//             layer_object_filter[title] = vectorLayer;
//
//             $("#btn-var-reset-server").on("click", function(){
//               map.removeLayer(layer_object_filter[title])
//               layer_object_filter={};
//               if(layersDict.hasOwnProperty(title)){
//                 map.getLayers().forEach(function(layer) {
//                      if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
//                        layer.setStyle(featureStyle(layerColorDict[title]));
//                        }
//                  });
//               }
//
//
//
//               $(`#${hs}`).css({"opacity": "1",
//                                    "border-color": "#d3d3d3",
//                                    "border-width":"1px",
//                                    "border-style":"solid",
//                                    "color":"#555555",
//                                    "font-weight": "normal"});
//             })
//             $("#variablesLoading").addClass("hidden");
//             $("#modalShowVariables").modal("hide")
//             $(`#${hs}`).css({"opacity": "1",
//                                 "border-color": "#ac2925",
//                                 "border-width": "2px",
//                                 "border-style": "solid",
//                                 "color": "black",
//                                 "font-weight": "bold"});
//           }
//           catch(e){
//             $("#variablesLoading").removeClass("hidden");
//               $.notify(
//                   {
//                       message: `There is a problem showing the available sites in the web service/s`
//                   },
//                   {
//                       type: "danger",
//                       allow_dismiss: true,
//                       z_index: 20000,
//                       delay: 5000,
//                       animate: {
//                         enter: 'animated fadeInRight',
//                         exit: 'animated fadeOutRight'
//                       },
//                       onShow: function() {
//                           this.css({'width':'auto','height':'auto'});
//                       }
//                   }
//               )
//           }
//
//        },
//        error: function(error) {
//          $("#variablesLoading").removeClass("hidden");
//            $.notify(
//                {
//                    message: `There is a problem showing the available sites in the web service/s`
//                },
//                {
//                    type: "danger",
//                    allow_dismiss: true,
//                    z_index: 20000,
//                    delay: 5000,
//                    animate: {
//                      enter: 'animated fadeInRight',
//                      exit: 'animated fadeOutRight'
//                    },
//                    onShow: function() {
//                        this.css({'width':'auto','height':'auto'});
//                    }
//                }
//            )
//        }
//
//      })
//   }
//   catch(e){
//     $("#variablesLoading").addClass("hidden");
//
//     $.notify(
//         {
//             message: `We are having problems recognizing the web services selected`
//         },
//         {
//             type: "danger",
//             allow_dismiss: true,
//             z_index: 20000,
//             delay: 5000,
//             animate: {
//               enter: 'animated fadeInRight',
//               exit: 'animated fadeOutRight'
//             },
//             onShow: function() {
//                 this.css({'width':'auto','height':'auto'});
//             }
//         }
//     )
//   }
// }
// $(`#btn-var-search-server`).on("click",showAvailableSites);
