/*****************************************************************************
 * FILE:                groups.js
 * BEGGINING DATE:      16 Jun 2021
 * ENDING DATE:         ---------------
 * AUTHOR:              Giovanni Romero Bustamante
 * COPYRIGHT:           (c) Brigham Young University 2020
 * LICENSE:             MIT
 *
 *****************************************************************************/

/**
 * getWaterOneFlowServicesInfoHelperJS function.
 * Helper function to retrieve metadata for the GetWaterOneFlowServiceInfo WaterOneFLow function
 * @param {string} xmlData - xml string from the Getavalues response
 * @return {object} return_array: array containing data from the GetWaterOneFlowServiceInfo Method response.
 *
 * */
getWaterOneFlowServicesInfoHelperJS = function (xmlData) {
  let return_obj;
  let return_array = [];
  var options = {
    attributeNamePrefix: "@",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: true,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) =>
      he.decode(val, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"],
  };
  var result = parser.validate(xmlData);
  if (result !== true) console.log(result.err);
  var jsonObj = parser.parse(xmlData, options);
  console.log(jsonObj);

  try {
    return_array = jsonObj["ArrayOfServiceInfo"]["ServiceInfo"];
    return return_array;
  } catch (e) {
    console.log(e);
    return_array = [];
    return return_array;
  }
};

/**
 * giveServices function.
 * Helper function to retrieve metadata from the GetWaterOneFlowServiceInfo
 * @param {array} services - array containing the GetWaterOneFlowServiceInfo response
 * @return {object} json_response: containing the services available in the online catalog
 *
 * */
giveServices = function (services) {
  let json_response = {};
  let hs_list = [];
  services.forEach(function (i) {
    let hs = {};
    let url = i["servURL"];
    if (url.endsWith("?WSDL") == false) {
      url = url + "?WSDL";
    }

    let title = i["Title"];
    let description =
      "None was provided by the organiation in charge of the Web Service";

    if (i.hasOwnProperty("aabstract")) {
      description = i["aabstract"];
    }

    hs["url"] = url;
    hs["title"] = title;
    hs["description"] = description;
    hs_list.push(hs);
  });
  json_response["services"] = hs_list;
  return json_response;
};

/**
 * give_available_services function.
 * Function to retrieve metadata from the GetWaterOneFlowServiceInfo
 * */
give_available_services = function () {
  $("#soapAddLoading-group").removeClass("hidden");
  try {
    let url = $("#url").val().trim();
    let url_request = `${url}?request=GetWaterOneFlowServiceInfo`;
    console.log(url_request);
    $.ajax({
      type: "GET",
      url: url_request,
      dataType: "text",
      success: function (xmlData) {
        try {
          console.log(xmlData);
          let services = getWaterOneFlowServicesInfoHelperJS(xmlData);
          console.log(services);
          obj_services = giveServices(services);
          $("#rows_servs").empty();
          var services_ava = obj_services["services"];
          tmp_hs_url = services_ava;
          var i = 1;
          var row = "";
          services_ava.forEach(function (serv) {
            var title_new = serv["title"].replace(/ /g, "_");
            row += `<tr>
                       <th scope="row">${i}</th>
                       <td><input type="checkbox" class="filter_check" name="server" value=${serv["url"]}></td>
                       <td>${serv["title"]}</td>
                     </tr>`;
            i += 1;
          });
          $("#available_services").show();
          $("#modalAddGroupServer").find("#rows_servs").html(row);

          $("#available_services").removeClass("hidden");
          $("#soapAddLoading-group").addClass("hidden");

          $("#btn-check_all").removeClass("hidden");
        } catch (e) {
          console.log(e);
          $("#soapAddLoading-group").addClass("hidden");
          $.notify(
            {
              message: `There was an error retrieving the different web services contained in the view`,
            },
            {
              type: "danger",
              allow_dismiss: true,
              z_index: 20000,
              delay: 5000,
              animate: {
                enter: "animated fadeInRight",
                exit: "animated fadeOutRight",
              },
              onShow: function () {
                this.css({ width: "auto", height: "auto" });
              },
            }
          );
        }
      },
      error: function (error) {
        console.log(error);
        $("#soapAddLoading-group").addClass("hidden");
        $.notify(
          {
            message: `There was an error retrieving the different web services contained in the view`,
          },
          {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: "animated fadeInRight",
              exit: "animated fadeOutRight",
            },
            onShow: function () {
              this.css({ width: "auto", height: "auto" });
            },
          }
        );
      },
    });
  } catch (error) {
    $("#soapAddLoading-group").addClass("hidden");
    $.notify(
      {
        message: `There was an error retriving the input data from the Web Service`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};
$("#btn-check_available_serv").on("click", give_available_services);

$("#btn-check_all").on("click", function () {
  if ($("#btn-check_all").html() == "Select All Views") {
    $("#btn-check_all").html("Unselect All Views");
    $("#modalAddGroupServer :checkbox").each(function () {
      this.checked = true;
    });
  } else {
    $("#btn-check_all").html("Select All Views");
    $("#modalAddGroupServer :checkbox").each(function () {
      this.checked = false;
    });
  }
});

/**
 * show_variables_groups function.
 * Function to retrieve the variables in all the catalogs.
 * */
show_variables_groups = function () {
  $("#KeywordLoading").removeClass("hidden");
  $.ajax({
    type: "POST",
    url: `available-variables/`,
    dataType: "JSON",
    success: function (data) {
      try {
        variables_list = data["variables"];
        variables_codes_list = data["variables_codes"];
        let variables_urls_list = data["urls"];
        let variables_names_list = data["names"];
        const chunk = (arr, size) =>
          Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
          );
        let arr = chunk(variables_list, 2);
        let arr2 = chunk(variables_codes_list, 2);
        let arr3 = chunk(variables_urls_list, 2);
        let arr4 = chunk(variables_names_list, 2);

        var HSTableHtml = `<table id="data-table-var" class="table table-striped table-bordered nowrap" width="100%"><tbody>`;
        let z = 0;
        arr.forEach((l_arr) => {
          HSTableHtml += '<tr class="odd gradeX">';
          let j = 0;
          l_arr.forEach((i) => {
            // let new_i = i.replace(/ /g,"_");
            let new_i2 = i
              .replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, "-")
              .replace(/^(-)+|(-)+$/g, "");
            let new_codei =
              arr2[z][j] + "join" + arr3[z][j] + "join" + arr4[z][j];
            // let new_codei = arr2[z][j].replace(/ /g,"_");

            HSTableHtml += `<td id =${new_i2}_td ><input type="checkbox" class="filter_check" name="variables" value=${new_codei} /> ${i}</td>`;

            j = j + 1;
          });

          HSTableHtml += "</tr>";
          z = z + 1;
        });

        HSTableHtml += "</tbody></table>";
        $("#modalKeyWordSearch").find("#groups_variables").html(HSTableHtml);
        $("#KeywordLoading").addClass("hidden");
      } catch (e) {
        console.log(e);
        $("#KeywordLoading").addClass("hidden");
        $.notify(
          {
            message: `There was an error retrieving the different variables for the selected group`,
          },
          {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: "animated fadeInRight",
              exit: "animated fadeOutRight",
            },
            onShow: function () {
              this.css({ width: "auto", height: "auto" });
            },
          }
        );
      }
    },
    error: function (error) {
      console.log(e);
      $("#KeywordLoading").addClass("hidden");
      $.notify(
        {
          message: `There was an error retrieving the different variables for the selected group`,
        },
        {
          type: "danger",
          allow_dismiss: true,
          z_index: 20000,
          delay: 5000,
          animate: {
            enter: "animated fadeInRight",
            exit: "animated fadeOutRight",
          },
          onShow: function () {
            this.css({ width: "auto", height: "auto" });
          },
        }
      );
    },
  });
};

/**
 * available_regions function.
 * Function to retrieve the regions in all the catalogs.
 * */
available_regions = function () {
  $("#KeywordLoading").removeClass("hidden");
  $.ajax({
    type: "POST",
    url: `available-regions/`,
    dataType: "JSON",
    success: function (data) {
      try {
        countries_available = data["countries"];
        const chunk = (arr, size) =>
          Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
          );
        let arr = chunk(countries_available, 2);
        var HSTableHtml = `<table id="data-table" class="table table-striped table-bordered nowrap" width="100%"><tbody>`;

        arr.forEach((l_arr) => {
          HSTableHtml += '<tr class="odd gradeX">';
          l_arr.forEach((i) => {
            let new_i = i.replace(/ /g, "_");
            HSTableHtml += `<td><input type="checkbox" class="filter_check" name="countries" value=${new_i} /> ${i}</td>`;
          });

          HSTableHtml += "</tr>";
        });

        HSTableHtml += "</tbody></table>";
        $("#modalKeyWordSearch").find("#groups_countries").html(HSTableHtml);
        $("#KeywordLoading").addClass("hidden");
      } catch (e) {
        console.log(e);
        $("#KeywordLoading").addClass("hidden");
        $.notify(
          {
            message: `There was an error trying to retrieve the different countries contained by the web services in the app`,
          },
          {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: "animated fadeInRight",
              exit: "animated fadeOutRight",
            },
            onShow: function () {
              this.css({ width: "auto", height: "auto" });
            },
          }
        );
      }
    },
    error: function (error) {
      console.log(error);
      $("#KeywordLoading").addClass("hidden");
      $.notify(
        {
          message: `There was an error trying to retrieve the different countries contained by the web services in the app`,
        },
        {
          type: "danger",
          allow_dismiss: true,
          z_index: 20000,
          delay: 5000,
          animate: {
            enter: "animated fadeInRight",
            exit: "animated fadeOutRight",
          },
          onShow: function () {
            this.css({ width: "auto", height: "auto" });
          },
        }
      );
    },
  });
};

/**
 * listener_checkbox function.
 * Function to retrieve the variables found in a specific country.
 * */
listener_checkbox = function (list_countries) {
  try {
    let le_object = {
      countries: list_countries,
    };
    $("#KeywordLoading").removeClass("hidden");

    $.ajax({
      type: "POST",
      url: `get-variables-for-country/`,
      dataType: "JSON",
      data: le_object,
      success: function (data) {
        console.log(data);
        try {
          $("#modalKeyWordSearch").find("#groups_variables").empty();

          variables_list = data["variables"];
          variables_codes_list = data["variables_codes"];
          const chunk = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
              arr.slice(i * size, i * size + size)
            );
          let arr = chunk(variables_list, 2);
          let arr2 = chunk(variables_codes_list, 2);

          var HSTableHtml = `<table id="data-table-var" class="table table-striped table-bordered nowrap" width="100%"><tbody>`;
          let z = 0;
          arr.forEach((l_arr) => {
            HSTableHtml += '<tr class="odd gradeX">';
            let j = 0;
            l_arr.forEach((i) => {
              let new_i = i.replace(/ /g, "_");
              let new_i2 = i
                .replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, "-")
                .replace(/^(-)+|(-)+$/g, "");
              let new_codei = arr2[z][j].replace(/ /g, "_");

              HSTableHtml += `<td id =${new_i2}_td ><input type="checkbox" class="filter_check" name="variables" value=${new_codei} /> ${i}</td>`;

              j = j + 1;
            });

            HSTableHtml += "</tr>";
            z = z + 1;
          });
          HSTableHtml += "</tbody></table>";
          ////console.log(HSTableHtml)
          $("#modalKeyWordSearch").find("#groups_variables").html(HSTableHtml);
          $("#KeywordLoading").addClass("hidden");
        } catch (e) {
          $("#KeywordLoading").addClass("hidden");
          console.log(e);
          $.notify(
            {
              message: `There was an error retrieving the different variables for the selected web service`,
            },
            {
              type: "danger",
              allow_dismiss: true,
              z_index: 20000,
              delay: 5000,
              animate: {
                enter: "animated fadeInRight",
                exit: "animated fadeOutRight",
              },
              onShow: function () {
                this.css({ width: "auto", height: "auto" });
              },
            }
          );
        }
      },
      error: function (error) {
        console.log(error);
        $("#KeywordLoading").addClass("hidden");
        $.notify(
          {
            message: `There was an error retrieving the different variables for the selected web service`,
          },
          {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: "animated fadeInRight",
              exit: "animated fadeOutRight",
            },
            onShow: function () {
              this.css({ width: "auto", height: "auto" });
            },
          }
        );
      },
    });
  } catch (e) {
    $("#KeywordLoading").addClass("hidden");
    $.notify(
      {
        message: `There was an error retrieving the different variables for the selected web service`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};

$(document).on("click", "#btn-key-update-variables", function () {
  let checkboxes = $("#data-table").find(
    "input[type=checkbox][name=countries]"
  );
  let countries_selected = [];

  // Attach a change event handler to the checkboxes of the countries to receive the countries.

  countries_selected = checkboxes
    .filter(":checked") // Filter out unchecked boxes.
    .map(function () {
      // Extract values using jQuery map.
      return this.value.replace(/_/g, " ");
    })
    .get(); // Get array.

  console.log(countries_selected);
  if (countries_selected.length > 0) {
    ////console.log(countries_selected);
    listener_checkbox(countries_selected);
  } else {
    show_variables_groups();
  }
});

/**
 * add_hydroserver_for_groups function.
 * Function to add a services to a newly creted catalog in the WDE.
 * */
add_hydroserver_for_groups = function (hs_object, actual_group_name) {
  try {
    let url_single = hs_object["url"];
    let title_server = hs_object["title"];
    let description = hs_object["description"];
    $("#soapAddLoading-group").removeClass("hidden");

    let unique_id_group = uuidv4();
    id_dictionary[unique_id_group] = title_server;

    let url_decons;
    let url_to_sent = url_single;
    url_decons = url_single.split("?");

    let url_request;
    console.log(url_decons[0]);
    let make_sure_not_mc = url_decons[0].split("//");

    if (make_sure_not_mc[0] == document.location.protocol) {
      url_request = url_decons[0] + "?request=GetSitesObject&format=WML1";
    } else {
      url_request =
        document.location.protocol +
        "//" +
        make_sure_not_mc[1] +
        "?request=GetSitesObject&format=WML1";
    }
    var raw_add = "";
    var complete_add = "";
    var lastResponseLength = false;
    var loco_index = 0;
    var almost_response = "";
    var complete_response;
    var tag_b;
    var tag_c =
      "</sitesResponse></GetSitesObjectResponse></soap:Body></soap:Envelope>";
    var list_sites_me = [];
    var notifications;
    console.log(url_request);
    // $("#loading_p").removeClass("hidden");
    // $("#loading_p").html(`Adding ${title_server}: 0 new sites added to the database . . .`);
    $.ajax({
      type: "GET",
      url: url_request,
      dataType: "text",
      xhrFields: {
        // Getting on progress streaming response
        onprogress: function (e) {
          try {
            var progressResponse;

            var response = e.currentTarget.response;
            raw_add += response;
            var last_child;
            // if (loco_index > 0){
            if (lastResponseLength === false) {
              progressResponse = response;
              tag_b =
                progressResponse.split("</queryInfo>")[0] + "</queryInfo>";
              last_child = progressResponse.substr(progressResponse.length - 7);
              console.log("last characters", last_child);
              if (last_child == "</site>" || last_child == "velope>") {
                console.log("1a");
                complete_response = progressResponse;
              } else {
                console.log("1b");
                // Get the first incomplete element and add the site tag//
                almost_response =
                  "<site>" +
                  progressResponse.split("<site>")[
                    progressResponse.split("<site>").length - 1
                  ];
                // Add the response withpu the last element as the complete response //
                complete_response = progressResponse
                  .split("<site>")
                  .slice(0, -1)
                  .join("<site>");
              }
              lastResponseLength = response.length;
            } else {
              progressResponse = response.substring(lastResponseLength);
              last_child = progressResponse.substr(progressResponse.length - 7);
              console.log("last characters", last_child);
              if (last_child == "</site>" || last_child == "velope>") {
                if (almost_response != "") {
                  console.log("2a1");

                  complete_response =
                    tag_b + almost_response + progressResponse;
                  // almost_response = '';
                  // complete_response = almost_response + progressResponse.split('<site>')[0];
                  // almost_response = progressResponse.split('<site>').slice(1).join('<site>');
                } else {
                  console.log("2a2");

                  complete_response = tag_b + progressResponse;
                }
              } else {
                if (almost_response != "") {
                  console.log("2b1");

                  complete_response =
                    tag_b +
                    almost_response +
                    progressResponse.split("<site>")[0];
                  almost_response =
                    "<site>" +
                    progressResponse.split("<site>").slice(1).join("<site>");
                } else {
                  console.log("2b2");

                  // Get the first incomplete element and add the site tag//
                  almost_response =
                    "<site>" +
                    progressResponse.split("<site>")[
                      progressResponse.split("<site>").length - 1
                    ];
                  // Add the response withpu the last element as the complete response //
                  complete_response =
                    tag_b +
                    progressResponse
                      .split("<site>")
                      .slice(0, -1)
                      .join("<site>");
                }
              }
              lastResponseLength = response.length;

              // console.log(complete_response);
            }
            if (!complete_response.includes(tag_c)) {
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
              description: description,
            };

            console.log(requestObject);
            $.ajax({
              type: "POST",
              url: "save_stream/",
              dataType: "JSON",
              data: requestObject,
              success: function (result) {
                //Returning the geoserver layer metadata from the controller
                console.log(result);
                var json_response = result["success"];
                console.log(json_response);
                if (!result.hasOwnProperty("error")) {
                  $("#loading_p").html(
                    `Adding ${title_server}: ${json_response} . . .`
                  );
                  if (notifications != undefined) {
                    notifications.update({
                      message: `${title_server}: ${json_response} . . .`,
                      delay: 500,
                    });
                  } else {
                    notifications = $.notify(
                      {
                        message: `${title_server}: 0 new sites added to the database . . .`,
                      },
                      {
                        newest_on_top: true,
                        type: "success",
                        allow_dismiss: true,
                        z_index: 500,
                        delay: 0,
                        animate: {
                          enter: "animated fadeInRight",
                          exit: "animated fadeOutRight",
                        },
                        onShow: function () {
                          this.css({ width: "auto", height: "auto" });
                        },
                      }
                    );
                  }
                }
              },
              error: function (err) {
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
              },
            });

            for (let i = 0; i < parsedObject.length; ++i) {
              list_sites_me.push(parsedObject[i].sitename);
            }
          } catch (e) {
            console.log(e);
          }
        },
      },

      success: function (xmlData) {
        function arrayCompare(_arr1, _arr2) {
          if (
            !Array.isArray(_arr1) ||
            !Array.isArray(_arr2) ||
            _arr1.length !== _arr2.length
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

        try {
          let test_cont = [];
          let parsedObject = getSitesHelper(xmlData);
          for (let i = 0; i < parsedObject.length; ++i) {
            test_cont.push(parsedObject[i].sitename);
          }

          console.log(arrayCompare(test_cont, list_sites_me));

          let requestObject = {
            hs: title_server,
            group: actual_group_name,
            sites: JSON.stringify(parsedObject),
            url: url_to_sent,
            description: description,
          };

          console.log(requestObject);
          $.ajax({
            type: "POST",
            url: "save_new_sites/",
            dataType: "JSON",
            data: requestObject,
            success: function (result) {
              try {
                //Returning the geoserver layer metadata from the controller
                var json_response = result;
                let group_name = actual_group_name;
                let group_name_e3;
                Object.keys(id_dictionary).forEach(function (key) {
                  if (id_dictionary[key] == group_name) {
                    group_name_e3 = key;
                  }
                });

                let id_group_separator = `${group_name_e3}_list_separator`;

                let new_title = unique_id_group;

                // put the ajax call and also the filter //
                let servers_with_keywords = [];

                $(`#${group_name_e3}-noGroups`).hide();

                let { title, siteInfo, url, group } = json_response;

                let sites = siteInfo;

                if (typeof sites == "string") {
                  sites = JSON.parse(siteInfo);
                }
                var vectorLayer = map_layers(sites, title, url)[0];
                var vectorSource = map_layers(sites, title, url)[1];

                let test_style = new ol.style.Style({
                  image: new ol.style.Circle({
                    radius: 10,
                    stroke: new ol.style.Stroke({
                      color: "white",
                    }),
                    fill: new ol.style.Fill({
                      color: layerColorDict[title],
                    }),
                  }),
                });
                let rowHTML = `<tr id= ${new_title}-row-complete>
                                       <th id="${new_title}-row-legend"></th>
                                       <th>${title}</th>
                                     </tr>`;
                if (!document.getElementById(`${new_title}-row-complete`)) {
                  $(rowHTML).appendTo("#tableLegend");
                }
                $(`#${new_title}-row-legend`).prepend(
                  $(getIconLegend(test_style, title))
                );

                map.addLayer(vectorLayer);

                vectorLayer.set("selectable", true);
                map.getView().fit(vectorSource.getExtent());
                map.updateSize();
                layersDict[title] = vectorLayer;

                let no_servers_tag = Array.from(
                  document
                    .getElementById(`${id_group_separator}`)
                    .getElementsByTagName("P")
                )[0];
                let newHtml;
                if (can_delete_hydrogroups) {
                  newHtml = html_for_servers(
                    can_delete_hydrogroups,
                    new_title,
                    group_name_e3
                  );
                } else {
                  newHtml = html_for_servers(false, new_title, group_name_e3);
                }

                // let newHtml = html_for_servers(can_delete_hydrogroups,new_title,group_name_e3)
                $(newHtml).appendTo(`#${id_group_separator}`);
                $(`#${new_title}_variables`).on("click", showVariables2);
                $(`#${new_title}_variables_info`).on(
                  "click",
                  hydroserver_information
                );
                $(`#${new_title}_${group_name_e3}_reload`).on(
                  "click",
                  update_hydroserver
                );

                // MAKES THE LAYER INVISIBLE

                let lis = document
                  .getElementById("current-Groupservers")
                  .getElementsByTagName("li");
                let li_arrays = Array.from(lis);
                let input_check = li_arrays
                  .filter(
                    (x) => new_title === x.attributes["layer-name"].value
                  )[0]
                  .getElementsByClassName("chkbx-layer")[0];

                input_check.addEventListener("change", function () {
                  if (layersDict["selectedPointModal"]) {
                    map.removeLayer(layersDict["selectedPointModal"]);
                    map.updateSize();
                  }
                  if (layersDict["selectedPoint"]) {
                    map.removeLayer(layersDict["selectedPoint"]);
                    map.updateSize();
                  }
                  if (this.checked) {
                    map.getLayers().forEach(function (layer) {
                      if (
                        layer instanceof ol.layer.Vector &&
                        layer == layersDict[title]
                      ) {
                        layer.setStyle(featureStyle(layerColorDict[title]));
                      }
                    });
                  } else {
                    map.getLayers().forEach(function (layer) {
                      if (
                        layer instanceof ol.layer.Vector &&
                        layer == layersDict[title]
                      ) {
                        layer.setStyle(new ol.style.Style({}));
                      }
                    });
                  }
                });
                $(`#${new_title}_zoom`).on("click", function () {
                  if (layersDict["selectedPointModal"]) {
                    map.removeLayer(layersDict["selectedPointModal"]);
                    map.updateSize();
                  }
                  if (layersDict["selectedPoint"]) {
                    map.removeLayer(layersDict["selectedPoint"]);
                    map.updateSize();
                  }
                  map.getView().fit(vectorSource.getExtent());
                  map.updateSize();
                  map.getLayers().forEach(function (layer) {
                    if (!(title in layer_object_filter)) {
                      if (
                        layer instanceof ol.layer.Vector &&
                        layer == layersDict[title]
                      ) {
                        layer.setStyle(featureStyle(layerColorDict[title]));
                      }
                    } else {
                      if (
                        layer instanceof ol.layer.Vector &&
                        layer == layer_object_filter[title]
                      ) {
                        layer.setStyle(featureStyle(layerColorDict[title]));
                      }
                    }
                  });
                  input_check.checked = true;
                });
                urls_servers[$("#soap-title").val()] = url_to_sent;
                getVariablesJS(url_to_sent, new_title, group_name_e3);

                $.notify(
                  {
                    message: `Successfully Added the ${title_server} WaterOneFlow Service to the Map`,
                  },
                  {
                    newest_on_top: true,
                    type: "success",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 100,
                    animate: {
                      enter: "animated fadeInRight",
                      exit: "animated fadeOutRight",
                    },
                    onShow: function () {
                      this.css({ width: "auto", height: "auto" });
                    },
                  }
                );
                notifications.close();
                $("#soapAddLoading-group").addClass("hidden");
              } catch (err) {
                console.log(err);
                $("#soapAddLoading-group").addClass("hidden");

                $("#btn-add-soap").show();
                $.notify(
                  {
                    message: `We are having problems adding the ${title_server} WaterOneFlow web service`,
                  },
                  {
                    type: "danger",
                    allow_dismiss: true,
                    z_index: 20000,
                    delay: 5000,
                    animate: {
                      enter: "animated fadeInRight",
                      exit: "animated fadeOutRight",
                    },
                    onShow: function () {
                      this.css({ width: "auto", height: "auto" });
                    },
                  }
                );
              }
            },
            error: function (err) {
              console.log(err);
              $("#soapAddLoading-group").addClass("hidden");
              $.notify(
                {
                  message: `We are having problems adding the ${title_server} WaterOneFlow web service`,
                },
                {
                  type: "danger",
                  allow_dismiss: true,
                  z_index: 20000,
                  delay: 5000,
                  animate: {
                    enter: "animated fadeInRight",
                    exit: "animated fadeOutRight",
                  },
                  onShow: function () {
                    this.css({ width: "auto", height: "auto" });
                  },
                }
              );
            },
          });
        } catch (e) {
          console.log(e);
          $("#soapAddLoading-group").addClass("hidden");
          $.notify(
            {
              message: `We are having problems adding the ${title_server} WaterOneFlow web service`,
            },
            {
              type: "danger",
              allow_dismiss: true,
              z_index: 20000,
              delay: 5000,
              animate: {
                enter: "animated fadeInRight",
                exit: "animated fadeOutRight",
              },
              onShow: function () {
                this.css({ width: "auto", height: "auto" });
              },
            }
          );
        }
      },

      error: function (err) {
        console.log(err);
        $("#soapAddLoading-group").addClass("hidden");
        $.notify(
          {
            message: `We are having problems adding the ${title_server} WaterOneFlow web service`,
          },
          {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: "animated fadeInRight",
              exit: "animated fadeOutRight",
            },
            onShow: function () {
              this.css({ width: "auto", height: "auto" });
            },
          }
        );
      },
    });
  } catch (e) {
    console.log(e);
    $("#soapAddLoading-group").addClass("hidden");
    $.notify(
      {
        message: `We are having problems adding the ${title_server} WaterOneFlow web service`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};

/**
 * create_group_hydroservers function.
 * Function to create a new empty catalog in the WDE.
 * */
create_group_hydroservers = function () {
  try {
    //CHECKS IF THE INPUT IS EMPTY ///
    if ($("#addGroup-title").val() == "") {
      $modalAddGroupHydro
        .find(".warning")
        .html("<b>Please enter a title. This field cannot be blank.</b>");
      return false;
    } else {
      $modalAddGroupHydro.find(".warning").html("");
    }
    if (check_if_exits($("#addGroup-title").val())) {
      $modalAddGroupHydro
        .find(".warning")
        // .html("<b>Please note that only numbers and other characters besides the underscore ( _ ) are not allowed</b>");
        .html("<b>There is already a group with the same name.");
      return false;
    } else {
      $modalAddGroupHydro.find(".warning").html("");
    }
    if ($("#addGroup-title").val() != "") {
      var regex = new RegExp("^(?![0-9]*$)[a-zA-Z0-9]+$");
      var specials = /[*|\":<>[\]{}`\\()';@&$]/;
      if (specials.test($("#addGroup-title").val())) {
        // if (!regex.test(title)) {
        $modalAddGroupHydro
          .find(".warning")
          // .html("<b>Please note that only numbers and other characters besides the underscore ( _ ) are not allowed</b>");
          .html(
            "<b>The following characters are not permitted in the title [ * | \" : < > [  ] { } `   ( ) ' ; @ & $ ]</b>"
          );
        return false;
      }
    } else {
      $modalAddGroupHydro.find(".warning").html("");
    }

    //CHECKS IF THERE IS AN EMPTY DESCRIPTION //
    if ($("#addGroup-description").val() == "") {
      $modalAddGroupHydro
        .find(".warning")
        .html(
          "<b>Please enter a description for this group. This field cannot be blank.</b>"
        );
      return false;
    } else {
      $modalAddGroupHydro.find(".warning").html("");
    }
    //MAKE THE AJAX REQUEST///
    let elementForm = $("#modalAddGroupServerForm");
    let datastring = elementForm.serialize();
    // console.log(datastring);
    $("#soapAddLoading-group").removeClass("hidden");

    let urls_array = datastring.split("&server=");
    urls_array = urls_array.slice(1);

    let urls_array2 = urls_array.map(function (single_url) {
      return decodeURIComponent(single_url);
    });
    // console.log(urls_array2);
    let tmp_hs_url_select = [];

    tmp_hs_url.forEach(function (single_hs) {
      console.log(single_hs);
      if (urls_array2.includes(single_hs["url"])) {
        tmp_hs_url_select.push(single_hs);
      }
    });
    // console.log(tmp_hs_url_select);

    let datastring_empty_group = datastring.split("&server=")[0];
    $.ajax({
      type: "POST",
      url: `create-group/`,
      dataType: "HTML",
      data: datastring,
      success: function (result) {
        let unique_id_group = uuidv4();
        id_dictionary[unique_id_group] = $("#addGroup-title").val();
        //Returning the geoserver layer metadata from the controller
        try {
          var json_response = JSON.parse(result);
          let group = json_response;
          let title = group.title;
          let description = group.description;
          information_model[`${title}`] = [];
          let new_title = unique_id_group;

          let id_group_separator = `${new_title}_list_separator`;

          let newHtml;
          if (can_delete_hydrogroups) {
            newHtml = html_for_groups(
              can_delete_hydrogroups,
              new_title,
              id_group_separator
            );
          } else {
            newHtml = html_for_groups(false, new_title, id_group_separator);
          }

          $(newHtml).appendTo("#current-Groupservers");

          $(`#${title}-noGroups`).show();

          let li_object = document.getElementById(`${new_title}`);
          let input_check = li_object.getElementsByClassName("chkbx-layers")[0];

          if (!input_check.checked) {
            // //console.log("HERE NOT CHECKEC")
            load_individual_hydroservers_group(title);
          }
          input_check.addEventListener("change", function () {
            change_effect_groups(this, id_group_separator);
          });

          let $title = "#" + new_title;
          let $title_list = "#" + new_title + "list";

          $($title).click(function () {
            $("#pop-up_description2").html("");

            actual_group = `&actual-group=${title}`;

            let description_html = `
                <h3>Catalog Title</h3>
                <p>${title}</p>
                <h3>Catalog Description</h3>
                <p>${description}</p>`;
            $("#pop-up_description2").html(description_html);
          });

          tmp_hs_url_select.forEach(function (single_hs) {
            add_hydroserver_for_groups(single_hs, title);
          });

          $("#btn-add-addHydro").show();
          $("#soapAddLoading-group").addClass("hidden");

          $.notify(
            {
              message: `Successfully Created Group of views to the database`,
            },
            {
              type: "success",
              allow_dismiss: true,
              z_index: 20000,
              delay: 500,
              animate: {
                enter: "animated fadeInRight",
                exit: "animated fadeOutRight",
              },
              onShow: function () {
                this.css({ width: "auto", height: "auto" });
              },
            }
          );
          $("#modalAddGroupServerForm").each(function () {
            this.reset();
          });
          $("#modalAddGroupServer").modal("hide");
          $("#rows_servs").empty();
          $("#available_services").hide();
          $("#btn-check_all").addClass("hidden");

          tmp_hs_url = [];
        } catch (e) {
          console.log(e);
          $("soapAddLoading-group").addClass("hidden");
          $("#btn-add-addHydro").show();
          $.notify(
            {
              message: `There was an error adding the group of views`,
            },
            {
              type: "danger",
              allow_dismiss: true,
              z_index: 20000,
              delay: 5000,
              animate: {
                enter: "animated fadeInRight",
                exit: "animated fadeOutRight",
              },
              onShow: function () {
                this.css({ width: "auto", height: "auto" });
              },
            }
          );
        }
      },
      error: function (error) {
        console.log(error);
        $("soapAddLoading-group").addClass("hidden");
        $("#btn-add-addHydro").show();
        $.notify(
          {
            message: `There was an error adding the group of views`,
          },
          {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: "animated fadeInRight",
              exit: "animated fadeOutRight",
            },
            onShow: function () {
              this.css({ width: "auto", height: "auto" });
            },
          }
        );
      },
    });
  } catch (error) {
    console.log(error);
    $("soapAddLoading-group").addClass("hidden");
    $.notify(
      {
        message: `There was an error while adding the group of WaterOneFlow web services`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};
$("#btn-add-addHydro").on("click", create_group_hydroservers);

/**
 * load_group_hydroservers function.
 * Function to load all the different catalogs in the WDE.
 * */
load_group_hydroservers = function () {
  $.ajax({
    type: "POST",
    url: `load-groups/`,
    dataType: "JSON",
    success: (result) => {
      try {
        let groups = result["hydroservers"];
        check_groups_length = groups.length;
        console.log(check_groups_length);
        $(".divForServers").empty(); //Resetting the catalog
        let extent = ol.extent.createEmpty();
        ind = 1;
        groups.sort(function (a, b) {
          var textA = a.title.toUpperCase();
          var textB = b.title.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        groups.forEach((group) => {
          let { title, description } = group;
          let unique_id_group = uuidv4();
          id_dictionary[unique_id_group] = title;

          information_model[`${title}`] = [];

          let new_title = unique_id_group;
          let id_group_separator = `${new_title}_list_separator`;

          $(`#${new_title}-noGroups`).show();

          let newHtml;

          if (can_delete_hydrogroups) {
            newHtml = html_for_groups(
              can_delete_hydrogroups,
              new_title,
              id_group_separator
            );
          } else {
            newHtml = html_for_groups(false, new_title, id_group_separator);
          }
          $(newHtml).appendTo("#current-Groupservers");

          let li_object = document.getElementById(`${new_title}`);
          let input_check = li_object.getElementsByClassName("chkbx-layers")[0];
          load_individual_hydroservers_group(title);
          let servers_checks = document
            .getElementById(`${id_group_separator}`)
            .getElementsByClassName("chkbx-layers");
          input_check.addEventListener("change", function () {
            change_effect_groups(this, id_group_separator);
          });

          let $title = "#" + new_title;
          let $title_list = "#" + new_title + "list";

          $($title).click(function () {
            $("#pop-up_description2").html("");

            actual_group = `&actual-group=${title}`;

            let description_html = `
                  <h3>Catalog Title</h3>
                  <p>${title}</p>
                  <h3>Catalog Description</h3>
                  <p>${description}</p>`;
            $("#pop-up_description2").html(description_html);
          });
          ind = ind + 1;
        });
      } catch (e) {
        console.log(e);
        $("#GeneralLoading").addClass("hidden");
        $.notify(
          {
            message: `There was an error while loading the different Web Services`,
          },
          {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: "animated fadeInRight",
              exit: "animated fadeOutRight",
            },
            onShow: function () {
              this.css({ width: "auto", height: "auto" });
            },
          }
        );
      }
    },
    error: function (error) {
      console.log(error);
      $("#GeneralLoading").addClass("hidden");

      $.notify(
        {
          message: `There was an error while loading the different Web Services`,
        },
        {
          type: "danger",
          allow_dismiss: true,
          z_index: 20000,
          delay: 5000,
          animate: {
            enter: "animated fadeInRight",
            exit: "animated fadeOutRight",
          },
          onShow: function () {
            this.css({ width: "auto", height: "auto" });
          },
        }
      );
    },
  });
};

/**
 * make_list_groups function.
 * Function to get the list of the catalogs that the WDE contains
 * */
make_list_groups = function () {
  try {
    let groupsDiv = $("#current-Groupservers").find(".panel.panel-default");
    let arrayGroups = Object.values(groupsDiv);
    let finalGroupArray = [];
    arrayGroups.forEach(function (g) {
      if (g.id) {
        let stringGroups = g.id.split("_")[0];

        finalGroupArray.push(stringGroups);
      }
    });
    var HSTableHtml =
      '<table class="table table-condensed-xs" id="tbl-hydrogroups"><thead><th>Select</th><th>Catalog Title</th></thead><tbody>';
    if (finalGroupArray.length < 0) {
      $("#modalDeleteGroups")
        .find(".modal-body")
        .html("<b>There are no groups in the Water Data Explorer</b>");
    } else {
      for (var i = 0; i < finalGroupArray.length; i++) {
        var title = finalGroupArray[i];
        HSTableHtml +=
          `<tr id="${title}deleteID">` +
          '<td><input class="chkbx-group" type="checkbox" name="server" value="' +
          title +
          '"></td>' +
          '<td class="hs_title">' +
          id_dictionary[title] +
          "</td>" +
          "</tr>";
      }
      HSTableHtml += "</tbody></table>";
      $("#modalDeleteGroups").find(".modal-body").html(HSTableHtml);
    }
  } catch (error) {
    console.log(error);
    $.notify(
      {
        message: `We are having an error trying to make the list of groups in the application`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};
$("#btn-del-groups-f").on("click", make_list_groups);

/**
 * get_hs_list_from_hydroserver function.
 * Function to get the list of all the services that a service contains contains
 * */
get_hs_list_from_hydroserver = function () {
  try {
    if (actual_group == undefined) {
      actual_group = "";
    }
    let arrayActual_group = actual_group.split("=")[1];
    let group_name_obj = {
      group: arrayActual_group,
    };

    $.ajax({
      type: "POST",
      url: `catalog-group/`,
      dataType: "JSON",
      data: group_name_obj,
      success: function (result) {
        try {
          //Dynamically generate the list of existing hydroservers
          var server = result["hydroserver"];
          var HSTableHtml =
            '<table class="table table-condensed-xs" id="tbl-hydroservers"><thead><th>Select</th><th>View Title</th></thead><tbody>';
          if (server.length === 0) {
            $modalDelete
              .find(".modal-body")
              .html("<b>There are no hydroservers in the Catalog.</b>");
          } else {
            for (var i = 0; i < server.length; i++) {
              var title = server[i].title;
              let new_title;
              Object.keys(id_dictionary).forEach(function (key) {
                if (id_dictionary[key] == title) {
                  new_title = key;
                }
              });
              var url = server[i].url;
              HSTableHtml +=
                `<tr id="${new_title}deleteID">` +
                '<td><input class = "check_hs_delete" type="checkbox" name="server"  value="' +
                title +
                '"></td>' +
                '<td class="hs_title">' +
                title +
                "</td>" +
                "</tr>";
            }
            HSTableHtml += "</tbody></table>";
            $modalDelete.find(".modal-body").html(HSTableHtml);
          }
        } catch (e) {
          console.log(e);
          $.notify(
            {
              message: `We are having an error trying to get the list of servers that are in the group`,
            },
            {
              type: "danger",
              allow_dismiss: true,
              z_index: 20000,
              delay: 5000,
              animate: {
                enter: "animated fadeInRight",
                exit: "animated fadeOutRight",
              },
              onShow: function () {
                this.css({ width: "auto", height: "auto" });
              },
            }
          );
        }
      },
      error: function (error) {
        console.log(error);
        $.notify(
          {
            message: `We are having an error trying to get the list of servers that are in the group`,
          },
          {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: "animated fadeInRight",
              exit: "animated fadeOutRight",
            },
            onShow: function () {
              this.css({ width: "auto", height: "auto" });
            },
          }
        );
      },
    });
  } catch (error) {
    console.log(error);
    $.notify(
      {
        message: `We are having an error trying to recognize the actual group`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};
$(document).on("click", "#delete-server", get_hs_list_from_hydroserver);

/**
 * delete_group_of_hydroservers function.
 * Function to delete the selected catalogs and the services that they contain.
 * */
delete_group_of_hydroservers = function () {
  try {
    let datastring = Object.values($("#tbl-hydrogroups").find(".chkbx-group"));
    let groups_to_delete = [];
    datastring.forEach(function (data) {
      if (data.checked == true) {
        let group_name = data.value;
        groups_to_delete.push(id_dictionary[group_name]);
      }
    });

    if (groups_to_delete.length > 0) {
      let groups_to_delete_obj = {
        groups: groups_to_delete,
      };
      $.ajax({
        type: "POST",
        url: `delete-group/`,
        dataType: "JSON",
        data: groups_to_delete_obj,
        success: function (result) {
          try {
            let groups_to_erase = result.groups;
            let hydroservers_to_erase = result.hydroservers;

            $("#pop-up_description2").empty();

            groups_to_erase.forEach(function (group) {
              let group_name_e3;
              Object.keys(id_dictionary).forEach(function (key) {
                if (id_dictionary[key] == group) {
                  group_name_e3 = key;
                  delete id_dictionary[key];
                  console.log(id_dictionary);
                  $(`#${group_name_e3}-row-complete`).remove();
                }
              });
              let element = document.getElementById(group_name_e3);
              element.parentNode.removeChild(element);
              let id_group_separator = `${group_name_e3}_list_separator`;
              let separator = document.getElementById(id_group_separator);
              separator.parentNode.removeChild(separator);
              let group_panel_id = `${group_name_e3}_panel`;
              let group_panel = document.getElementById(group_panel_id);
              group_panel.parentNode.removeChild(group_panel);
              $(`#${group_name_e3}deleteID`).remove();
            });

            hydroservers_to_erase.forEach(function (hydroserver) {
              let new_title;
              Object.keys(id_dictionary).forEach(function (key) {
                if (id_dictionary[key] == hydroserver) {
                  new_title = key;
                }
              });
              map.removeLayer(layersDict[hydroserver]);
              if (layersDict.hasOwnProperty(hydroserver)) {
                delete layersDict[hydroserver];
                $(`#${new_title}-row-complete`).remove();
              }
            });
            if (layersDict["selectedPointModal"]) {
              map.removeLayer(layersDict["selectedPointModal"]);
              map.updateSize();
            }

            if (layersDict["selectedPoint"]) {
              map.removeLayer(layersDict["selectedPoint"]);
              map.updateSize();
            }

            map.updateSize();

            $.notify(
              {
                message: `Successfully Deleted Group!`,
              },
              {
                type: "success",
                allow_dismiss: true,
                z_index: 20000,
                delay: 5000,
                animate: {
                  enter: "animated fadeInRight",
                  exit: "animated fadeOutRight",
                },
                onShow: function () {
                  this.css({ width: "auto", height: "auto" });
                },
              }
            );
          } catch (e) {
            console.log(e);
            $.notify(
              {
                message: `We are having an error deleting the selected groups of views`,
              },
              {
                type: "danger",
                allow_dismiss: true,
                z_index: 20000,
                delay: 5000,
                animate: {
                  enter: "animated fadeInRight",
                  exit: "animated fadeOutRight",
                },
                onShow: function () {
                  this.css({ width: "auto", height: "auto" });
                },
              }
            );
          }
        },
        error: function (error) {
          console.log(error);
          $.notify(
            {
              message: `We are having an error deleting the selected groups of views`,
            },
            {
              type: "danger",
              allow_dismiss: true,
              z_index: 20000,
              delay: 5000,
              animate: {
                enter: "animated fadeInRight",
                exit: "animated fadeOutRight",
              },
              onShow: function () {
                this.css({ width: "auto", height: "auto" });
              },
            }
          );
        },
      });
    } else {
      $.notify(
        {
          message: `You need to select at least one group to delete`,
        },
        {
          type: "info",
          allow_dismiss: true,
          z_index: 20000,
          delay: 5000,
          animate: {
            enter: "animated fadeInRight",
            exit: "animated fadeOutRight",
          },
          onShow: function () {
            this.css({ width: "auto", height: "auto" });
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
    $.notify(
      {
        message: `We are having problems tryingto recognize the actual group`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};
$("#btn-del-hydro-groups").on("click", delete_group_of_hydroservers);

/**
 * catalog_filter_regions function.
 * Function to filter catalogs by regions
 * */
catalog_filter_regions = function () {
  var styles = {
    MultiPolygon: [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgb(128,128,128)",
          lineDash: [4],
          width: 3,
        }),
        fill: new ol.style.Fill({
          color: "rgba(119,136,153, 0.05)",
        }),
      }),
    ],
    Polygon: [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgb(128,128,128)",
          lineDash: [4],
          width: 3,
        }),
        fill: new ol.style.Fill({
          color: "rgba(119,136,153, 0.05)",
        }),
      }),
    ],
  };

  var styleFunction = function (feature, resolution) {
    return styles[feature.getGeometry().getType()];
  };

  try {
    let elementForm = $("#modalKeyWordSearch");
    let datastring = elementForm.serialize();
    $("#KeywordLoading").removeClass("hidden");
    $.ajax({
      type: "POST",
      url: `catalog-filter/`,
      dataType: "HTML",
      data: datastring,
      success: function (result) {
        try {
          let jeojson = JSON.parse(JSON.parse(result)["geojson"]);
          map.removeLayer(layer_selected_countries["countries"]);

          if (jeojson["features"].length > 0) {
            for (let z = 0; z < jeojson["features"].length; ++z) {
              if (jeojson["features"][z]["geometry"]["type"] == "Polygon") {
                for (
                  let i = 0;
                  i <
                  jeojson["features"][z]["geometry"]["coordinates"][0].length;
                  ++i
                ) {
                  jeojson["features"][z]["geometry"]["coordinates"][0][i] =
                    ol.proj.transform(
                      jeojson["features"][z]["geometry"]["coordinates"][0][i],
                      "EPSG:4326",
                      "EPSG:3857"
                    );
                }
              }
              if (
                jeojson["features"][z]["geometry"]["type"] == "MultiPolygon"
              ) {
                for (
                  let i = 0;
                  i < jeojson["features"][z]["geometry"]["coordinates"].length;
                  ++i
                ) {
                  for (
                    let j = 0;
                    j <
                    jeojson["features"][z]["geometry"]["coordinates"][i][0]
                      .length;
                    ++j
                  ) {
                    jeojson["features"][z]["geometry"]["coordinates"][i][0][j] =
                      ol.proj.transform(
                        jeojson["features"][z]["geometry"]["coordinates"][i][0][
                          j
                        ],
                        "EPSG:4326",
                        "EPSG:3857"
                      );
                  }
                }
              }
            }

            var vectorSource = new ol.source.Vector({
              features: new ol.format.GeoJSON().readFeatures(jeojson),
            });

            var vectorLayer2 = new ol.layer.Vector({
              source: vectorSource,
              style: styleFunction,
            });
            map.removeLayer(layer_selected_countries["countries"]);
            layer_selected_countries["countries"] = vectorLayer2;
          }

          let hs_available = JSON.parse(result)["hs"];
          let new_hs_available = [];
          hs_available.forEach(function (hs) {
            let hs_new2;
            Object.keys(id_dictionary).forEach(function (key) {
              if (id_dictionary[key] == hs) {
                hs_new2 = key;
                // console.log(hs_available);
                new_hs_available.push(hs_new2);
              }
            });
          });
          // console.log(new_hs_available);
          let sitesObj = JSON.parse(result)["stations"];
          map.getLayers().forEach(function (layer) {
            if (layer instanceof ol.layer.Vector) {
              layer.setStyle(new ol.style.Style({}));
            }
          });

          // if(jeojson['features'].length > 0){
          //   map.addLayer(layer_selected_countries['countries']);
          //   map.getView().fit(layer_selected_countries['countries'].getSource().getExtent());
          //   map.updateSize();
          // }

          for (let i = 0; i < sitesObj.length; ++i) {
            let title = sitesObj[i]["title"];
            let url = sitesObj[i]["url"];
            let sites = sitesObj[i]["sites"];
            var vectorLayer = map_layers(sites, title, url)[0];
            var vectorSource = map_layers(sites, title, url)[1];
            map.getLayers().forEach(function (layer) {
              // if(layer instanceof ol.layer.Vector){
              //   layer.setStyle(new ol.style.Style({}));
              // }
              //
              if (
                layer instanceof ol.layer.Vector &&
                layer == layersDict[title]
              ) {
                layer.setStyle(new ol.style.Style({}));
              }
            });

            map.addLayer(vectorLayer);
            vectorLayer.set("selectable", true);
            layer_object_filter[title] = vectorLayer;

            if (layersDict["selectedPointModal"]) {
              map.removeLayer(layersDict["selectedPointModal"]);
              map.updateSize();
            }
            if (layersDict["selectedPoint"]) {
              map.removeLayer(layersDict["selectedPoint"]);
              map.updateSize();
            }
          }
          $("#btn-r-reset").show();
          $("#btn-r-reset").on("click", reset_keywords);
          $("#current-Groupservers")
            .find("li")
            .each(function () {
              var $li = $(this)["0"];
              let id_li = $li["id"];
              $(`#${id_li} input[type=checkbox]`).each(function () {
                this.checked = false;
              });
            });
          $("#current-Groupservers")
            .find("li")
            .each(function () {
              var $li = $(this)["0"];
              let id_li = $li["id"];

              if (new_hs_available.includes(id_li)) {
                $(`#${id_li}`).css({
                  opacity: "1",
                  "border-color": "#ac2925",
                  "border-width": "2px",
                  "border-style": "solid",
                  color: "black",
                  "font-weight": "bold",
                });
                $(`#${id_li} input[type=checkbox]`).each(function () {
                  this.checked = true;
                });
              } else {
                let groups_divs = Object.keys(information_model);
                let groups_divs_3e = [];
                groups_divs.forEach(function (g3) {
                  let g_new2;
                  Object.keys(id_dictionary).forEach(function (key) {
                    if (id_dictionary[key] == g3) {
                      g_new2 = key;
                    }
                  });
                  groups_divs_3e.push(g_new2);
                });
                groups_divs = groups_divs_3e;
                if (!groups_divs.includes(id_li)) {
                  $(`#${id_li}`).css({
                    opacity: "0.5",
                    "border-color": "#d3d3d3",
                    "border-width": "1px",
                    "border-style": "solid",
                    color: "#555555",
                    "font-weight": "normal",
                  });
                }
              }
            });
          let groups_divs = Object.keys(information_model);

          for (let i = 0; i < groups_divs.length; ++i) {
            let check_all = [];
            for (let j = 0; j < information_model[groups_divs[i]].length; ++j) {
              let service_div = information_model[groups_divs[i]][j];
              let new_service_div;
              Object.keys(id_dictionary).forEach(function (key) {
                if (id_dictionary[key] == service_div) {
                  new_service_div = key;
                }
              });
              $(`#${new_service_div} input[type=checkbox]`).each(function () {
                if (this.checked) {
                  check_all.push(true);
                } else {
                  check_all.push(false);
                }
              });
            }
            if (!check_all.includes(false) && check_all.length > 0) {
              let groups_divs_3e = [];
              groups_divs.forEach(function (g3) {
                let g_new2;
                Object.keys(id_dictionary).forEach(function (key) {
                  if (id_dictionary[key] == g3) {
                    g_new2 = key;
                  }
                });
                groups_divs_3e.push(g_new2);
              });

              $(`#${groups_divs_3e[i]} input[type=checkbox]`).each(function () {
                this.checked = true;
              });
            }
          }

          $("#KeywordLoading").addClass("hidden");
        } catch (e) {
          console.log(e);
          $("#KeywordLoading").addClass("hidden");

          $.notify(
            {
              message: `Something were wrong when filtering the web services by region`,
            },
            {
              type: "danger",
              allow_dismiss: true,
              z_index: 20000,
              delay: 5000,
              animate: {
                enter: "animated fadeInRight",
                exit: "animated fadeOutRight",
              },
              onShow: function () {
                this.css({ width: "auto", height: "auto" });
              },
            }
          );
        }
      },
      error: function (error) {
        console.log(error);
        $("#KeywordLoading").addClass("hidden");

        $.notify(
          {
            message: `Something were wrong when filtering the web services by region`,
          },
          {
            type: "danger",
            allow_dismiss: true,
            z_index: 20000,
            delay: 5000,
            animate: {
              enter: "animated fadeInRight",
              exit: "animated fadeOutRight",
            },
            onShow: function () {
              this.css({ width: "auto", height: "auto" });
            },
          }
        );
      },
    });
  } catch (error) {
    console.log(error);
    $("#KeywordLoading").addClass("hidden");
    $.notify(
      {
        message: `We are having a problem trying to retrieve the regions to filter the groups`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};
$("#btn-key-filter-only-country").on("click", catalog_filter_regions);

/**
 * catalog_filter_vars function.
 * Function to filter catalogs by variables
 * */
catalog_filter_vars = function () {
  try {
    let elementForm = $("#modalKeyWordSearch");
    let datastring = elementForm.serialize();
    let vars_request = datastring.split("&variables=").slice(1);
    $("#KeywordLoading").removeClass("hidden");
    let array_for_sale = [];

    //erase all the layers //
    map.getLayers().forEach(function (layer) {
      if (layer instanceof ol.layer.Vector) {
        layer.setStyle(new ol.style.Style({}));
      }
    });
    if (layersDict["selectedPointModal"]) {
      map.removeLayer(layersDict["selectedPointModal"]);
      map.updateSize();
    }
    if (layersDict["selectedPoint"]) {
      map.removeLayer(layersDict["selectedPoint"]);
      map.updateSize();
    }

    // UNCHECK ALL THE LAYERS //
    $("#current-Groupservers")
      .find("li")
      .each(function () {
        var $li = $(this)["0"];
        let id_li = $li["id"];
        $(`#${id_li} input[type=checkbox]`).each(function () {
          this.checked = false;
        });
      });
    // MAKE THE BUTTON TO APPEAR //
    $("#btn-r-reset").show();
    $("#btn-r-reset").on("click", reset_keywords);
    for (let i = 0; i < vars_request.length; ++i) {
      let url_temp = decodeURIComponent(vars_request[i].split("join")[1]);
      let var_temp = vars_request[i].split("join")[0];
      let server_name = vars_request[i].split("join")[2];

      Object.keys(urls_servers).forEach(function (key) {
        let url_testing = urls_servers[key];
        let url2_request = `${
          url_testing.split("?")[0]
        }/GetSites?variableCode=${var_temp}`;
        $.ajax({
          type: "GET",
          url: url2_request,
          dataType: "text",
          success: function (xmlData) {
            try {
              $("#KeywordLoading").removeClass("hidden");
              array_for_sale.push(xmlData);
              let sites = getSitesFilterHelper(xmlData);
              let title = server_name;
              let url = url_temp;

              //ADD LAYERS
              var vectorLayer = map_layers(sites, title, url)[0];
              var vectorSource = map_layers(sites, title, url)[1];
              map.addLayer(vectorLayer);
              vectorLayer.set("selectable", true);
              layer_object_filter[title] = vectorLayer;

              $("#current-Groupservers")
                .find("li")
                .each(function () {
                  var $li = $(this)["0"];
                  let id_li = $li["id"];
                  // console.log(id_li)
                  // console.log(server_name)
                  let hs_new2;
                  Object.keys(id_dictionary).forEach(function (key) {
                    if (id_dictionary[key] == server_name) {
                      hs_new2 = key;
                    }
                  });
                  if (hs_new2 == id_li) {
                    $(`#${id_li}`).css({
                      opacity: "1",
                      "border-color": "#ac2925",
                      "border-width": "2px",
                      "border-style": "solid",
                      color: "black",
                      "font-weight": "bold",
                    });
                    $(`#${id_li} input[type=checkbox]`).each(function () {
                      this.checked = true;
                    });
                  } else {
                    let groups_divs = Object.keys(information_model);
                    let groups_divs_3e = [];
                    groups_divs.forEach(function (g3) {
                      let g_new2;
                      Object.keys(id_dictionary).forEach(function (key) {
                        if (id_dictionary[key] == g3) {
                          g_new2 = key;
                        }
                      });
                      groups_divs_3e.push(g_new2);
                    });
                    groups_divs = groups_divs_3e;
                    if (!groups_divs.includes(id_li)) {
                      $(`#${id_li}`).css({
                        opacity: "0.5",
                        "border-color": "#d3d3d3",
                        "border-width": "1px",
                        "border-style": "solid",
                        color: "#555555",
                        "font-weight": "normal",
                      });
                    }
                  }
                });

              let groups_divs = Object.keys(information_model);

              for (let i = 0; i < groups_divs.length; ++i) {
                let check_all = [];
                for (
                  let j = 0;
                  j < information_model[groups_divs[i]].length;
                  ++j
                ) {
                  let service_div = information_model[groups_divs[i]][j];
                  let new_service_div;
                  Object.keys(id_dictionary).forEach(function (key) {
                    if (id_dictionary[key] == service_div) {
                      new_service_div = key;
                    }
                  });
                  $(`#${new_service_div} input[type=checkbox]`).each(
                    function () {
                      if (this.checked) {
                        check_all.push(true);
                      } else {
                        check_all.push(false);
                      }
                    }
                  );
                }
                if (!check_all.includes(false) && check_all.length > 0) {
                  let groups_divs_3e = [];
                  groups_divs.forEach(function (g3) {
                    let g_new2;
                    Object.keys(id_dictionary).forEach(function (key) {
                      if (id_dictionary[key] == g3) {
                        g_new2 = key;
                      }
                    });
                    groups_divs_3e.push(g_new2);
                  });

                  $(`#${groups_divs_3e[i]} input[type=checkbox]`).each(
                    function () {
                      this.checked = true;
                    }
                  );
                }
              }
              $("#KeywordLoading").addClass("hidden");
            } catch (error) {
              console.log(error);
              $("#KeywordLoading").addClass("hidden");

              $.notify(
                {
                  message: `Something were wrong when filtering the web services by variable`,
                },
                {
                  type: "danger",
                  allow_dismiss: true,
                  z_index: 20000,
                  delay: 5000,
                  animate: {
                    enter: "animated fadeInRight",
                    exit: "animated fadeOutRight",
                  },
                  onShow: function () {
                    this.css({ width: "auto", height: "auto" });
                  },
                }
              );
            }
          },
          error: function (error) {
            console.log(error);
            $("#KeywordLoading").addClass("hidden");

            $.notify(
              {
                message: `Something were wrong when filtering the web services by variable`,
              },
              {
                type: "danger",
                allow_dismiss: true,
                z_index: 20000,
                delay: 5000,
                animate: {
                  enter: "animated fadeInRight",
                  exit: "animated fadeOutRight",
                },
                onShow: function () {
                  this.css({ width: "auto", height: "auto" });
                },
              }
            );
          },
        });
      });
    }
  } catch (error) {
    console.log(error);
    $("#KeywordLoading").addClass("hidden");
    $.notify(
      {
        message: `We are having a problem trying to retrieve the regions to filter the groups`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};
$("#btn-key-filter-only-variables").on("click", catalog_filter_vars);

/**
 * reset_keywords function.
 * Function to reset the filters results.
 * */
reset_keywords = function () {
  try {
    $("#btn-r-reset").hide();
    Object.keys(information_model).forEach(function (key) {
      for (let i = 0; i < information_model[key].length; ++i) {
        if (layer_object_filter.hasOwnProperty(information_model[key][i])) {
          map.removeLayer(layer_object_filter[information_model[key][i]]);
          if (layersDict.hasOwnProperty(information_model[key][i])) {
            map.getLayers().forEach(function (layer) {
              if (
                layer instanceof ol.layer.Vector &&
                layer == layersDict[information_model[key][i]]
              ) {
                layer.setStyle(
                  featureStyle(layerColorDict[information_model[key][i]])
                );
              }
            });
          }
        }
      }
    });
    map.removeLayer(layer_selected_countries["countries"]);

    layer_object_filter = {};

    $("#current-Groupservers")
      .find("li")
      .each(function () {
        var $li = $(this)["0"];
        let id_li = $li["id"];

        $(`#${id_li}`).css({
          opacity: "1",
          "border-color": "#d3d3d3",
          "border-width": "1px",
          "border-style": "solid",
          color: "#555555",
          "font-weight": "normal",
        });
      });
  } catch (error) {
    $.notify(
      {
        message: `There is a problem reseting the fitler`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};
$("#btn-r-reset").on("click", reset_keywords);
$("#btn-r-reset-catalog").on("click", reset_keywords);

/**
 * load_info_model function.
 * Function to load the structure of the catalogs and services with console.log
 * */
load_info_model = function () {
  try {
    var HSTableHtml = "";
    Object.keys(information_model).forEach(function (key) {
      HSTableHtml += `<h4 id="titleSite">${key}</h4>`;
      information_model[key].forEach(function (serviceView) {
        HSTableHtml += `<p class= "fakeRow">${serviceView}</p>`;
      });
    });

    $("#modalKeyWordSearch").find("#groups_services").html(HSTableHtml);
  } catch (error) {
    console.log(error);
  }
};

/**
 * load_search_modal function.
 * Function to load all the different regions and variables that the catalogs WDE contains
 * */
load_search_modal = function () {
  try {
    load_info_model();
    show_variables_groups();
    available_regions();
  } catch (error) {
    console.log(error);
    $.notify(
      {
        message: `We are having an error trying to load the menu`,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};
$("#btn-filter-groups-f").on("click", load_search_modal);

/**
 * searchGroups function.
 * Function to search the regions table list in the WDE
 * */
searchGroups = function () {
  try {
    general_search("myInputKeyword", "data-table");
  } catch (error) {
    console.log(error);
  }
};
document
  .getElementById("myInputKeyword")
  .addEventListener("keyup", searchGroups);

/**
 * searchVariables function.
 * Function to search the variables table list in the WDE
 * */

// UNCOMMENT FOR FILTERING VARIABLES //
// searchVariables = function() {
//   try{
//     general_search("myInputKeyword2","data-table-var");
//
//   }
//   catch(error){
//     console.log(error);
//   }
// }
// document.getElementById('myInputKeyword2').addEventListener("keyup", searchVariables);

/**
 * searchGroups_group function.
 * Function to search the regions table list in the selected group
 * */
searchGroups_group = function () {
  try {
    general_search("myInputKeywordGroup", "data-table2");
  } catch (error) {
    console.log(error);
  }
};
document
  .getElementById("myInputKeywordGroup")
  .addEventListener("keyup", searchGroups_group);

/**
 * searchVariablesGroup function.
 * Function to search the variables table list in the selected group
 * */
searchVariablesGroup = function () {
  try {
    general_search("myInputKeywordGroup2", "data-table-var2");
  } catch (error) {
    console.log(error);
  }
};
document
  .getElementById("myInputKeywordGroup2")
  .addEventListener("keyup", searchVariablesGroup);

/**
 * general_search function.
 * Function to search the variables or regions table list.
 * */
general_search = function (id_search_input, id_table) {
  try {
    input = document.getElementById(`${id_search_input}`);
    filter = input.value.toUpperCase();
    table = document.getElementById(`${id_table}`);

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
  } catch (error) {
    console.log(error);
    $.notify(
      {
        message: `We are having a problem trying doing the search `,
      },
      {
        type: "danger",
        allow_dismiss: true,
        z_index: 20000,
        delay: 5000,
        animate: {
          enter: "animated fadeInRight",
          exit: "animated fadeOutRight",
        },
        onShow: function () {
          this.css({ width: "auto", height: "auto" });
        },
      }
    );
  }
};

// FUNCTIONS IF THE APP NEEDS TO BE EXTENDED

// /**
// * load_search_group_modal function.
// * Function to retrieve the variables and regions in all the catalogs in the WDE.
// * */
// load_search_group_modal = function(){
//   try{
//     $("#modalFilterGroup").find("#groups_countries2").empty();
//     $("#modalFilterGroup").find("#groups_variables2").empty();
//     show_variables_group();
//     available_regions_group();
//   }
//   catch(e){
//     console.log(e);
//     $.notify(
//         {
//             message: `Problem loading the Filter for the groups of views`
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
//
//
// }
// $(document).on("click", "#btn-filter-group-f", load_search_group_modal);

// available_regions_group = function(){
//   try{
//     let arrayActual_group=actual_group.split('=')[1];
//     let group_obj = {
//       'group': arrayActual_group
//     };
//     $("#KeywordLoading2").removeClass("hidden");
//     $.ajax({
//       type: "POST",
//       url: `available-regions/`,
//       dataType: "JSON",
//       data: group_obj,
//
//       success: function(data){
//         try{
//           countries_available = data['countries']
//           const chunk = (arr, size) =>
//             Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
//               arr.slice(i * size, i * size + size)
//             );
//           let arr=chunk(countries_available, 2);
//
//           var HSTableHtml =
//               `<table id="data-table2" class="table table-striped table-bordered nowrap" width="100%"><tbody>`
//
//             arr.forEach(l_arr => {
//               HSTableHtml +=  '<tr class="odd gradeX">'
//               l_arr.forEach(i =>{
//                 let new_i = i.replace(/ /g,"_");
//                 HSTableHtml +=  `<td><input type="checkbox" class="filter_check" name="countries" value=${new_i} /> ${i}</td>`;
//               })
//
//                   HSTableHtml += '</tr>';
//             })
//
//
//             HSTableHtml += "</tbody></table>"
//           $("#modalFilterGroup").find("#groups_countries2").html(HSTableHtml);
//           $("#KeywordLoading2").addClass("hidden");
//
//         }
//         catch(e){
//           console.log(e);
//           $("#KeywordLoading2").addClass("hidden");
//           $.notify(
//               {
//                 message: `There was an retriving the regions available in the WaterOneFlow web service`
//
//               },
//               {
//                   type: "danger",
//                   allow_dismiss: true,
//                   z_index: 20000,
//                   delay: 5000,
//                   animate: {
//                     enter: 'animated fadeInRight',
//                     exit: 'animated fadeOutRight'
//                   },
//                   onShow: function() {
//                       this.css({'width':'auto','height':'auto'});
//                   }
//               }
//           )
//         }
//
//       },
//       error: function(error){
//         console.log(error);
//         $("#KeywordLoading2").addClass("hidden");
//         $.notify(
//             {
//                 message: `There was an retriving the regions available in the WaterOneFlow web service`
//
//             },
//             {
//                 type: "danger",
//                 allow_dismiss: true,
//                 z_index: 20000,
//                 delay: 5000,
//                 animate: {
//                   enter: 'animated fadeInRight',
//                   exit: 'animated fadeOutRight'
//                 },
//                 onShow: function() {
//                     this.css({'width':'auto','height':'auto'});
//                 }
//             }
//         )
//       }
//
//     })
//   }
//   catch (error){
//     console.log(error);
//     $("#KeywordLoading2").addClass("hidden")
//     $.notify(
//         {
//           message: `We are having a problem to recognize the actual group for the request`
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
//
// }
//
// listener_checkbox_group = function(list_countries){
//   try{
//     let arrayActual_group=actual_group.split('=')[1];
//     let le_object = {
//       "countries": list_countries,
//       "group":arrayActual_group
//     };
//     $("#KeywordLoading2").removeClass("hidden")
//
//     $.ajax({
//       type: "POST",
//       url: `get-variables-for-country/`,
//       dataType: "JSON",
//       data: le_object,
//
//       success: function(data){
//         try{
//           $("#modalFilterGroup").find("#groups_variables2").empty();
//           variables_list = data['variables'];
//           const chunk = (arr, size) =>
//             Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
//               arr.slice(i * size, i * size + size)
//             );
//           let arr=chunk(variables_list, 2);
//
//           var HSTableHtml =
//               `<table id="data-table-var2" class="table table-striped table-bordered nowrap" width="100%"><tbody>`
//
//             arr.forEach(l_arr => {
//               HSTableHtml +=  '<tr class="odd gradeX">'
//               l_arr.forEach(i =>{
//                 let new_i = i.replace(/ /g,"_");
//                 let new_i2 = i.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
//
//                 HSTableHtml +=  `<td id =${new_i2}_td2 ><input type="checkbox" class="filter_check" name="variables" value=${new_i} /> ${i}</td>`;
//
//               })
//
//                   HSTableHtml += '</tr>';
//             })
//
//             HSTableHtml += "</tbody></table>"
//           $("#modalFilterGroup").find("#groups_variables2").html(HSTableHtml);
//
//           $("#KeywordLoading2").addClass("hidden");
//
//         }
//         catch(e){
//           console.log(e);
//           $("#KeywordLoading2").addClass("hidden");
//           $.notify(
//               {
//                   message: `There was an error trying to find the variables for the selected country`
//               },
//               {
//                   type: "danger",
//                   allow_dismiss: true,
//                   z_index: 20000,
//                   delay: 5000,
//                   animate: {
//                     enter: 'animated fadeInRight',
//                     exit: 'animated fadeOutRight'
//                   },
//                   onShow: function() {
//                       this.css({'width':'auto','height':'auto'});
//                   }
//               }
//           )
//         }
//
//       },
//       error: function(error){
//         console.log(error);
//         $("#KeywordLoading2").addClass("hidden");
//         $.notify(
//             {
//                 message: `There was an error trying to find the variables for the selected country`
//             },
//             {
//                 type: "danger",
//                 allow_dismiss: true,
//                 z_index: 20000,
//                 delay: 5000,
//                 animate: {
//                   enter: 'animated fadeInRight',
//                   exit: 'animated fadeOutRight'
//                 },
//                 onShow: function() {
//                     this.css({'width':'auto','height':'auto'});
//                 }
//             }
//         )
//       }
//
//     })
//   }
//   catch (error){
//     console.log(error);
//     $("#KeywordLoading2").addClass("hidden")
//
//     $.notify(
//         {
//             message: `There was an retriving the input data from the Web Service`
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
//
// }
//
// show_variables_group = function(){
//   try{
//     let arrayActual_group=actual_group.split('=')[1];
//     let group_obj = {
//       'group': arrayActual_group
//     };
//     $("#KeywordLoading2").removeClass("hidden");
//     $.ajax({
//       type: "POST",
//       url: `available-variables/`,
//       dataType: "JSON",
//       data: group_obj,
//       success: function(data){
//         try{
//           variables_list = data['variables'];
//           const chunk = (arr, size) =>
//             Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
//               arr.slice(i * size, i * size + size)
//             );
//           let arr=chunk(variables_list, 2);
//
//           var HSTableHtml =
//               `<table id="data-table-var2" class="table table-striped table-bordered nowrap" width="100%"><tbody>`
//
//             arr.forEach(l_arr => {
//               HSTableHtml +=  '<tr class="odd gradeX">'
//               l_arr.forEach(i =>{
//                 let new_i = i.replace(/ /g,"_");
//                 let new_i2 = i.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
//
//                 HSTableHtml +=  `<td id =${new_i2}_td2 ><input type="checkbox" class="filter_check" name="variables" value=${new_i} /> ${i}</td>`;
//
//               })
//
//                   HSTableHtml += '</tr>';
//             })
//
//             HSTableHtml += "</tbody></table>"
//           $("#modalFilterGroup").find("#groups_variables2").html(HSTableHtml);
//           $("#KeywordLoading2").addClass("hidden");
//         }
//         catch(e){
//           console.log(e);
//           $("#KeywordLoading2").addClass("hidden");
//           $.notify(
//               {
//                   message: `There was an error retrieving the variables from the selected group Web Service`
//               },
//               {
//                   type: "danger",
//                   allow_dismiss: true,
//                   z_index: 20000,
//                   delay: 5000,
//                   animate: {
//                     enter: 'animated fadeInRight',
//                     exit: 'animated fadeOutRight'
//                   },
//                   onShow: function() {
//                       this.css({'width':'auto','height':'auto'});
//                   }
//               }
//           )
//         }
//
//
//       },
//       error: function(error){
//         console.log(error);
//         $("#KeywordLoading2").addClass("hidden");
//         $.notify(
//             {
//                 message: `There was an error retrieving the variables from the selected group Web Service`
//             },
//             {
//                 type: "danger",
//                 allow_dismiss: true,
//                 z_index: 20000,
//                 delay: 5000,
//                 animate: {
//                   enter: 'animated fadeInRight',
//                   exit: 'animated fadeOutRight'
//                 },
//                 onShow: function() {
//                     this.css({'width':'auto','height':'auto'});
//                 }
//             }
//         )
//       }
//
//     })
//   }
//   catch (error){
//     console.log(error);
//     $("#KeywordLoading2").addClass("hidden")
//     $.notify(
//         {
//             message: `There was an retriving the input data from the Web Service`
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

// catalog_filter_server = function(){
//   try{
//     let elementForm= $("#modalFilterGroup");
//     let datastring= elementForm.serialize();
//     datastring += actual_group;
//     $("#KeywordLoading2").removeClass("hidden");
//
//     $.ajax({
//         type: "POST",
//         url: `catalog-filter/`,
//         dataType: "HTML",
//         data: datastring,
//         success: function(result) {
//           try{
//             let check_for_none = []
//             let hs_available = JSON.parse(result)['hs'];
//             let arrayActual_group=actual_group.split('=')[1];
//             $(`#${arrayActual_group}_list_separator`).find("li").each(function()
//                {
//                   var $li=$(this)['0'];
//                   let id_li = $li['id'];
//                   if(hs_available.includes(id_li)){
//                     $(`#${id_li}`).css({"opacity": "1",
//                                         "border-color": "#ac2925",
//                                         "border-width": "2px",
//                                         "border-style": "solid",
//                                         "color": "black",
//                                         "font-weight": "bold"});
//
//                   }
//                   else{
//
//                     $(`#${id_li}`).css({"opacity": "0.5",
//                                         "border-color": "#d3d3d3",
//                                         "border-width":"1px",
//                                         "border-style":"solid",
//                                         "color":"#555555",
//                                         "font-weight": "normal"});
//                   }
//                });
//
//                $("#KeywordLoading2").addClass("hidden");
//           }
//           catch(e){
//             $("#KeywordLoading2").addClass("hidden");
//
//             $.notify(
//                 {
//                     message: `Something were wrong when applying the filter with variables and regions`
//                 },
//                 {
//                     type: "danger",
//                     allow_dismiss: true,
//                     z_index: 20000,
//                     delay: 5000,
//                     animate: {
//                       enter: 'animated fadeInRight',
//                       exit: 'animated fadeOutRight'
//                     },
//                     onShow: function() {
//                         this.css({'width':'auto','height':'auto'});
//                     }
//                 }
//             )
//           }
//
//
//         },
//         error: function(error) {
//           $("#KeywordLoading2").addClass("hidden");
//
//           $.notify(
//               {
//                   message: `Something were wrong when applying the filter with variables and regions`
//               },
//               {
//                   type: "danger",
//                   allow_dismiss: true,
//                   z_index: 20000,
//                   delay: 5000,
//                   animate: {
//                     enter: 'animated fadeInRight',
//                     exit: 'animated fadeOutRight'
//                   },
//                   onShow: function() {
//                       this.css({'width':'auto','height':'auto'});
//                   }
//               }
//           )
//
//         }
//
//       })
//   }
//   catch(error){
//     $("#KeywordLoading2").addClass("hidden");
//     $.notify(
//         {
//             message: `We are having a problem trying to retrieve the regions to filter the groups`
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
// $("#btn-key-search-catalog").on("click", catalog_filter_server);

//UNCOMMENT WHEN NEEDED LAS CATALOG_FILTER FUNCTIONS //
// catalog_filter = function(){
//   var styles = {
//     'MultiPolygon': [new ol.style.Style({
//       stroke: new ol.style.Stroke({
//         color: 'rgb(128,128,128)',
//         lineDash: [4],
//         width: 3
//       }),
//       fill: new ol.style.Fill({
//         color: 'rgba(119,136,153, 0.05)'
//       })
//     })],
//     'Polygon': [new ol.style.Style({
//         stroke: new ol.style.Stroke({
//           color: 'rgb(128,128,128)',
//           lineDash: [4],
//           width: 3
//         }),
//         fill: new ol.style.Fill({
//           color: 'rgba(119,136,153, 0.05)'
//         })
//       })],
//   };
//
//   var styleFunction = function(feature, resolution) {
//     return styles[feature.getGeometry().getType()];
//   };
//
//
//   try{
//     let elementForm= $("#modalKeyWordSearch");
//     let datastring= elementForm.serialize();
//     $("#KeywordLoading").removeClass("hidden");
//     $.ajax({
//         type: "POST",
//         url: `catalog-filter/`,
//         dataType: "HTML",
//         data: datastring,
//         success: function(result) {
//           try{
//             let jeojson = JSON.parse(JSON.parse(result)['geojson']);
//             map.removeLayer(layer_selected_countries['countries']);
//
//             if(jeojson['features'].length > 0){
//               for(let z = 0; z < jeojson['features'].length; ++z){
//                 if(jeojson['features'][z]['geometry']['type'] == "Polygon"){
//                   for (let i = 0; i < jeojson['features'][z]['geometry']['coordinates'][0].length; ++i){
//                     jeojson['features'][z]['geometry']['coordinates'][0][i] = ol.proj.transform(jeojson['features'][z]['geometry']['coordinates'][0][i],
//                         "EPSG:4326",
//                         "EPSG:3857"
//                     )
//                   }
//                 }
//                 if(jeojson['features'][z]['geometry']['type'] == "MultiPolygon"){
//                   for (let i = 0; i < jeojson['features'][z]['geometry']['coordinates'].length; ++i){
//                     for(let j= 0; j < jeojson['features'][z]['geometry']['coordinates'][i][0].length; ++j){
//
//                       jeojson['features'][z]['geometry']['coordinates'][i][0][j] = ol.proj.transform(jeojson['features'][z]['geometry']['coordinates'][i][0][j],
//                           "EPSG:4326",
//                           "EPSG:3857"
//                       )
//                     }
//                   }
//                 }
//               }
//
//               var vectorSource = new ol.source.Vector({
//                 features: (new ol.format.GeoJSON()).readFeatures(jeojson)
//               });
//
//               var vectorLayer2 = new ol.layer.Vector({
//                 source: vectorSource,
//                 style: styleFunction
//
//               });
//               map.removeLayer(layer_selected_countries['countries']);
//               layer_selected_countries['countries'] = vectorLayer2
//             }
//
//
//             let hs_available = JSON.parse(result)['hs'];
//             let new_hs_available = []
//             hs_available.forEach(function(hs){
//               let hs_new2;
//               Object.keys(id_dictionary).forEach(function(key) {
//                 if(id_dictionary[key] == hs ){
//                   hs_new2 = key;
//                   // console.log(hs_available);
//                   new_hs_available.push(hs_new2);
//
//                 }
//               });
//             })
//             // console.log(new_hs_available);
//             let sitesObj =  JSON.parse(result)['stations'];
//             map.getLayers().forEach(function(layer) {
//               if(layer instanceof ol.layer.Vector){
//                 layer.setStyle(new ol.style.Style({}));
//               }
//             });
//
//             // if(jeojson['features'].length > 0){
//             //   map.addLayer(layer_selected_countries['countries']);
//             //   map.getView().fit(layer_selected_countries['countries'].getSource().getExtent());
//             //   map.updateSize();
//             // }
//
//
//             for(let i = 0;  i< sitesObj.length; ++i){
//               let title = sitesObj[i]['title']
//               let url = sitesObj[i]['url']
//               let sites = sitesObj[i]['sites'];
//               var vectorLayer = map_layers(sites,title,url)[0]
//               var vectorSource = map_layers(sites,title,url)[1]
//               map.getLayers().forEach(function(layer) {
//                 // if(layer instanceof ol.layer.Vector){
//                 //   layer.setStyle(new ol.style.Style({}));
//                 // }
//                 //
//                    if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
//                        layer.setStyle(new ol.style.Style({}));
//                      }
//                });
//
//
//               map.addLayer(vectorLayer)
//               vectorLayer.set("selectable", true)
//               layer_object_filter[title] = vectorLayer;
//
//               if(layersDict['selectedPointModal']){
//                 map.removeLayer(layersDict['selectedPointModal'])
//                 map.updateSize()
//               }
//               if(layersDict['selectedPoint']){
//                 map.removeLayer(layersDict['selectedPoint'])
//                 map.updateSize()
//               }
//
//             }
//             $("#btn-r-reset").show()
//             $("#btn-r-reset").on("click", reset_keywords);
//             $("#current-Groupservers").find("li").each(function()
//                {
//                  var $li=$(this)['0'];
//                  let id_li = $li['id'];
//                  $(`#${id_li} input[type=checkbox]`).each(function() {
//                    this.checked = false;
//                  });
//                });
//             $("#current-Groupservers").find("li").each(function()
//                {
//                   var $li=$(this)['0'];
//                   let id_li = $li['id'];
//
//                   if(new_hs_available.includes(id_li)){
//
//                     $(`#${id_li}`).css({"opacity": "1",
//                                         "border-color": "#ac2925",
//                                         "border-width": "2px",
//                                         "border-style": "solid",
//                                         "color": "black",
//                                         "font-weight": "bold"});
//                     $(`#${id_li} input[type=checkbox]`).each(function() {
//                       this.checked = true;
//                     });
//
//                   }
//                   else{
//                     let groups_divs = Object.keys(information_model);
//                     let groups_divs_3e = []
//                     groups_divs.forEach(function(g3){
//                       let g_new2;
//                       Object.keys(id_dictionary).forEach(function(key) {
//                         if(id_dictionary[key] == g3 ){
//                           g_new2 = key;
//                         }
//                       });
//                       groups_divs_3e.push(g_new2);
//                     })
//                     groups_divs = groups_divs_3e
//                     if (!groups_divs.includes(id_li)){
//                       $(`#${id_li}`).css({"opacity": "0.5",
//                                            "border-color": "#d3d3d3",
//                                            "border-width":"1px",
//                                            "border-style":"solid",
//                                            "color":"#555555",
//                                            "font-weight": "normal"});
//                     }
//                   }
//                });
//                let groups_divs = Object.keys(information_model);
//
//                for(let i=0; i< groups_divs.length; ++i){
//                  let check_all = []
//                  for(let j=0; j< information_model[groups_divs[i]].length; ++j){
//
//                    let service_div = information_model[groups_divs[i]][j];
//                    let new_service_div;
//                    Object.keys(id_dictionary).forEach(function(key) {
//                      if(id_dictionary[key] == service_div ){
//                        new_service_div = key;
//                      }
//                    });
//                    $(`#${new_service_div} input[type=checkbox]`).each(function(){
//                      if(this.checked){
//                        check_all.push(true);
//                      }
//                      else{
//                        check_all.push(false);
//                      }
//                    });
//                  }
//                  if(!check_all.includes(false) && check_all.length > 0){
//                    let groups_divs_3e = []
//                    groups_divs.forEach(function(g3){
//                      let g_new2;
//                      Object.keys(id_dictionary).forEach(function(key) {
//                        if(id_dictionary[key] == g3 ){
//                          g_new2 = key;
//                        }
//                      });
//                      groups_divs_3e.push(g_new2);
//                    })
//
//                    $(`#${groups_divs_3e[i]} input[type=checkbox]`).each(function() {
//                      this.checked = true;
//                    });
//                  }
//                }
//
//
//             $("#KeywordLoading").addClass("hidden");
//
//           }
//           catch(e){
//             console.log(e);
//             $("#KeywordLoading").addClass("hidden");
//
//             $.notify(
//                 {
//                     message: `Something were wrong when filtering the web services by region`
//                 },
//                 {
//                     type: "danger",
//                     allow_dismiss: true,
//                     z_index: 20000,
//                     delay: 5000,
//                     animate: {
//                       enter: 'animated fadeInRight',
//                       exit: 'animated fadeOutRight'
//                     },
//                     onShow: function() {
//                         this.css({'width':'auto','height':'auto'});
//                     }
//                 }
//             )
//           }
//
//         },
//         error: function(error) {
//           console.log(error);
//           $("#KeywordLoading").addClass("hidden");
//
//           $.notify(
//               {
//                   message: `Something were wrong when filtering the web services by region`
//               },
//               {
//                   type: "danger",
//                   allow_dismiss: true,
//                   z_index: 20000,
//                   delay: 5000,
//                   animate: {
//                     enter: 'animated fadeInRight',
//                     exit: 'animated fadeOutRight'
//                   },
//                   onShow: function() {
//                       this.css({'width':'auto','height':'auto'});
//                   }
//               }
//           )
//         }
//
//       })
//   }
//   catch(error){
//     $("#KeywordLoading").addClass("hidden");
//     $.notify(
//         {
//             message: `We are having a problem trying to retrieve the regions to filter the groups`
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
// $("#btn-key-search").on("click", catalog_filter);
