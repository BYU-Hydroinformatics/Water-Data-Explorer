
give_available_services = function(){
  //change to vissible//
  let elementForm= $("#modalAddGroupServerForm");
  let datastring= elementForm.serialize();
  let form_elements = datastring.split("&");
  let url_alone = form_elements[form_elements.length -1]
  //console.log(url_alone)
  $("#soapAddLoading-group").removeClass("hidden");

  $.ajax({
    type: "GET",
    url: `available-services/`,
    dataType: "HTML",
    data: url_alone,
    success: function(data){
      $("#rows_servs").empty();
      //console.log(data)
      var json_response = JSON.parse(data)
      var services_ava = json_response['services']
      var i = 1;
      var row = ""
      services_ava.forEach(function(serv){
        var title_new = serv['title'].replace(/ /g,"_");
        row += `<tr>
                  <th scope="row">${i}</th>
                  <td><input type="checkbox" name="server_${i}" id="server" value=${title_new}></td>
                  <td>${serv['title']}</td>
                </tr>`
        i += 1;
      })
      $("#available_services").show();
      $("#modalAddGroupServer").find("#rows_servs").html(row)

      $("#available_services").removeClass("hidden");
      $("#soapAddLoading-group").addClass("hidden")

    },
    error: function(error){
      $("#soapAddLoading-group").addClass("hidden")
      //console.log(error)
      $.notify(
          {
              message: `There was an error retrieving the different web services from the HIS catalog  `
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
  // //console.log(url_catalog)
}
$("#btn-check_available_serv").on("click", give_available_services);

show_variables_groups = function(){
  // Logger.useDefaults({
  //   defaultLevel: Logger.WARN,
  //   formatter: function (messages, context) {
  //     messages.unshift(new Date().toUTCString());
  //   },
  // });
  $("#KeywordLoading").removeClass("hidden");
  $.ajax({
    type: "GET",
    url: `available-variables/`,
    dataType: "JSON",
    success: function(data){

      // $("#rows_servs").empty();
      //console.log(data)
      variables_list = data['variables'];
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      let arr=chunk(variables_list, 2);
      //console.log(arr)

      var HSTableHtml =
          `<table id="data-table-var" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

        arr.forEach(l_arr => {
          HSTableHtml +=  '<tr class="odd gradeX">'
          l_arr.forEach(i =>{
            let new_i = i.replace(/ /g,"_");
            let new_i2 = i.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');

            HSTableHtml +=  `<td id =${new_i2}_td ><input type="checkbox" id="server" name="variables" value=${new_i} /> ${i}</td>`;
            // HSTableHtml += `<th scope="row">${i}</th>
            // <td><input type="checkbox" name="server_${i}" id="server" value=${i}></td>
            // <td>${i}</td>`

          })

              HSTableHtml += '</tr>';
        })

        // HSTableHtml += '</td>'+'</tr>'
        // HSTableHtml += '</tr>'

        HSTableHtml += "</tbody></table>"
      //console.log(HSTableHtml)
      $("#modalKeyWordSearch").find("#groups_variables").html(HSTableHtml);
      $("#KeywordLoading").addClass("hidden");

      // var json_response = JSON.parse(data)
      // var services_ava = json_response['services']
      // var i = 1;
      // var row = ""
      // services_ava.forEach(function(serv){
      //   var title_new = serv['title'].replace(/ /g,"_");
      //   row += `<tr>
      //             <th scope="row">${i}</th>
      //             <td><input type="checkbox" name="server_${i}" id="server" value=${title_new}></td>
      //             <td>${serv['title']}</td>
      //           </tr>`
      //   i += 1;
      // })
      // $("#modalAddGroupServer").find("#rows_servs").html(row)
      //
      // $("#available_services").removeClass("hidden");
      // $("#soapAddLoading-group").addClass("hidden")

    },
    error: function(error){
      $("#KeywordLoading").addClass("hidden")
      //console.log(error)
      $.notify(
          {
              message: `There was an error retrieving the different web services from the HIS catalog  `
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

available_regions = function(){
  // countries_json['features']
  //console.log("MNOE ME USES")
  $("#KeywordLoading").removeClass("hidden");
  $.ajax({
    type: "GET",
    url: `available-regions/`,
    dataType: "JSON",
    success: function(data){
      countries_available = data['countries']
      //console.log(data)
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      let arr=chunk(countries_available, 2);
      //console.log(arr)

      var HSTableHtml =
          `<table id="data-table" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

        arr.forEach(l_arr => {
          HSTableHtml +=  '<tr class="odd gradeX">'
          l_arr.forEach(i =>{
            let new_i = i.replace(/ /g,"_");
            HSTableHtml +=  `<td><input type="checkbox" id= "server" name="countries" value=${new_i} /> ${i}</td>`;
          })

              HSTableHtml += '</tr>';
        })

        // HSTableHtml += '</td>'+'</tr>'
        // HSTableHtml += '</tr>'

        HSTableHtml += "</tbody></table>"
      //console.log(HSTableHtml)
      $("#modalKeyWordSearch").find("#groups_countries").html(HSTableHtml);
      $("#KeywordLoading").addClass("hidden");
      // let checkboxes = $('#data-table').find("input[type=checkbox][name=countries]")
      //console.log(checkboxes)
      // let countries_selected = [];

      // Attach a change event handler to the checkboxes of the countries to receive the countries.

      // checkboxes.click(function() {
      //   countries_selected = checkboxes
      //     .filter(":checked") // Filter out unchecked boxes.
      //     .map(function() { // Extract values using jQuery map.
      //       return this.value.replace(/_/g, ' ');
      //     })
      //     .get() // Get array.
      //   if (countries_selected.length > 0){
      //     //console.log(countries_selected);
      //     listener_checkbox(countries_selected)
      //   }
      //   else{
      //     show_variables_groups()
      //   }
      // });
    },
    error: function(error){
      $("#KeywordLoading").addClass("hidden")
      //console.log(error)
      $.notify(
          {
              message: `There was an error retrieving the different web services from the HIS catalog  `
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

listener_checkbox = function(list_countries){
  let le_object = {
    "countries": list_countries
  };
  //console.log(le_object);
  $("#KeywordLoading").removeClass("hidden")

  $.ajax({
    type: "GET",
    url: `get-variables-for-country/`,
    dataType: "JSON",
    data: le_object,
    success: function(result){

      $("#modalKeyWordSearch").find("#groups_variables").empty();
      variables_list = result['variables'];
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      let arr=chunk(variables_list, 2);
      //console.log(arr)

      var HSTableHtml =
          `<table id="data-table-var" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

        arr.forEach(l_arr => {
          HSTableHtml +=  '<tr class="odd gradeX">'
          l_arr.forEach(i =>{
            let new_i = i.replace(/ /g,"_");
            HSTableHtml +=  `<td><input type="checkbox" id="server" name="variables" value=${new_i} /> ${i}</td>`;
          })

              HSTableHtml += '</tr>';
        })

        HSTableHtml += "</tbody></table>"
      //console.log(HSTableHtml)
      $("#modalKeyWordSearch").find("#groups_variables").html(HSTableHtml);
      $("#KeywordLoading").addClass("hidden");

    },
    error: function(error){
      //console.log(error)
      $("#KeywordLoading").addClass("hidden")
      //console.log(error)
      $.notify(
          {
              message: `There was an error retrieving the different web services from the HIS catalog  `
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

load_search_group_modal = function(){

  // clean the modal //
  $("#modalFilterGroup").find("#groups_countries2").empty();
  $("#modalFilterGroup").find("#groups_variables2").empty();
  show_variables_group();
  available_regions_group();

}
// $("#btn-filter-group-f").on("click", load_search_group_modal);
$(document).on("click", "#btn-filter-group-f", load_search_group_modal);

available_regions_group = function(){
  let arrayActual_group=actual_group.split('=')[1];
  let group_obj = {
    'group': arrayActual_group
  };
  $("#KeywordLoading2").removeClass("hidden");
  $.ajax({
    type: "GET",
    url: `available-regions/`,
    dataType: "JSON",
    data: group_obj,

    success: function(data){
      countries_available = data['countries']
      //console.log(data)
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      let arr=chunk(countries_available, 2);
      // //console.log(arr)

      var HSTableHtml =
          `<table id="data-table2" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

        arr.forEach(l_arr => {
          HSTableHtml +=  '<tr class="odd gradeX">'
          l_arr.forEach(i =>{
            let new_i = i.replace(/ /g,"_");
            HSTableHtml +=  `<td><input type="checkbox" id= "server" name="countries" value=${new_i} /> ${i}</td>`;
          })

              HSTableHtml += '</tr>';
        })


        HSTableHtml += "</tbody></table>"
      // //console.log(HSTableHtml)
      $("#modalFilterGroup").find("#groups_countries2").html(HSTableHtml);
      $("#KeywordLoading2").addClass("hidden");


      // // Attach a change event handler to the checkboxes to filter the variables.

      // let checkboxes = $('#data-table2 input[type=checkbox][name=countries]')
      // let countries_selected = [];
      // checkboxes.click(function() {
      //   countries_selected = checkboxes
      //     .filter(":checked") // Filter out unchecked boxes.
      //     .map(function() { // Extract values using jQuery map.
      //       return this.value.replace(/_/g, ' ');
      //     })
      //     .get() // Get array.
      //   if (countries_selected.length > 0){
      //     //console.log(countries_selected);
      //     listener_checkbox_group(countries_selected)
      //   }
      //   else{
      //     show_variables_group()
      //   }
      // });
    },
    error: function(error){
      $("#KeywordLoading2").addClass("hidden")
      //console.log(error)
      $.notify(
          {
              message: `There was an error retrieving the different web services from the HIS catalog  `
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

listener_checkbox_group = function(list_countries){
  let arrayActual_group=actual_group.split('=')[1];

  let le_object = {
    "countries": list_countries,
    "group":arrayActual_group
  };
  //console.log(le_object);
  $("#KeywordLoading2").removeClass("hidden")

  $.ajax({
    type: "GET",
    url: `get-variables-for-country/`,
    dataType: "JSON",
    data: le_object,
    success: function(result){

      $("#modalFilterGroup").find("#groups_variables2").empty();
      variables_list = result['variables'];
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      let arr=chunk(variables_list, 2);
      //console.log(arr)

      var HSTableHtml =
          `<table id="data-table-var2" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

        arr.forEach(l_arr => {
          HSTableHtml +=  '<tr class="odd gradeX">'
          l_arr.forEach(i =>{
            let new_i = i.replace(/ /g,"_");
            HSTableHtml +=  `<td><input type="checkbox" id="server" name="variables" value=${new_i} /> ${i}</td>`;
          })

              HSTableHtml += '</tr>';
        })

        HSTableHtml += "</tbody></table>"
      //console.log(HSTableHtml)
      $("#modalFilterGroup").find("#groups_variables2").html(HSTableHtml);
      $("#KeywordLoading2").addClass("hidden");

    },
    error: function(error){
      $("#KeywordLoading2").addClass("hidden")
      //console.log(error)
      $.notify(
          {
              message: `There was an error trying to find the varaiables for the selected country`
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

show_variables_group = function(){
  let arrayActual_group=actual_group.split('=')[1];
  let group_obj = {
    'group': arrayActual_group
  };
  $("#KeywordLoading2").removeClass("hidden");
  $.ajax({
    type: "GET",
    url: `available-variables/`,
    dataType: "JSON",
    data: group_obj,
    success: function(data){
      //console.log(data)
      variables_list = data['variables'];
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      let arr=chunk(variables_list, 2);
      //console.log(arr)

      var HSTableHtml =
          `<table id="data-table-var2" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

        arr.forEach(l_arr => {
          HSTableHtml +=  '<tr class="odd gradeX">'
          l_arr.forEach(i =>{
            let new_i = i.replace(/ /g,"_");
            let new_i2 = i.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');

            HSTableHtml +=  `<td id =${new_i2}_td2 ><input type="checkbox" id="server" name="variables" value=${new_i} /> ${i}</td>`;

          })

              HSTableHtml += '</tr>';
        })

        HSTableHtml += "</tbody></table>"
      //console.log(HSTableHtml)
      $("#modalFilterGroup").find("#groups_variables2").html(HSTableHtml);
      $("#KeywordLoading2").addClass("hidden");

    },
    error: function(error){
      $("#KeywordLoading2").addClass("hidden")
      //console.log(error)
      $.notify(
          {
              message: `There was an error retrieving the different web services from the HIS catalog  `
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
    // if ($("#addGroup-title").val() != "") {
    //   var regex = new RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")
    //   var title = $("#soap-title").val()
    //   if (!regex.test(title)) {
    //     $modalAddGroupHydro
    //           .find(".warning")
    //           .html("<b>Please enter Letters only for the title.</b>");
    //       return false
    //   }
    // }
    if ($("#addGroup-title").val() != "") {
      // var regex = new RegExp("^(?![0-9]*$)[a-zA-Z0-9_]+$")
      var regex = new RegExp("^(?![0-9]*$)[a-zA-Z0-9]+$")
      var title = $("#addGroup-title").val()
      if (!regex.test(title)) {
          $modalAddGroupHydro
              .find(".warning")
              // .html("<b>Please note that only numbers and other characters besides the underscore ( _ ) are not allowed</b>");
              .html("<b>Please enter Letters only for the title.</b>");
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
    //console.log(typeof(datastring));
    //console.log(datastring);
    $("#soapAddLoading-group").removeClass("hidden");

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
              information_model[`${title}`] = [];
              let id_group_separator = `${title}_list_separator`;
              let newHtml;
              if(can_delete_hydrogroups){
                newHtml = html_for_groups(can_delete_hydrogroups, title, id_group_separator);
              }
              else{
                newHtml = html_for_groups(false, title, id_group_separator);
              }

              $(newHtml).appendTo("#current-Groupservers");

              // let no_servers = `<button class="btn btn-danger btn-block" id = "${title}-noGroups"> The group does not have hydroservers</button>`
              // $(no_servers).appendTo(`#${id_group_separator}`);
              $(`#${title}-noGroups`).show();

              let li_object = document.getElementById(`${title}`);
              let input_check = li_object.getElementsByClassName("chkbx-layers")[0];


              // load_individual_hydroservers_group(title);
              // let servers_checks = document.getElementById(`${id_group_separator}`).getElementsByClassName("chkbx-layers");
              // //console.log(servers_checks);
              // input_check.addEventListener("change", function(){
              //   change_effect_groups(this,id_group_separator);
              // });
              console.log(input_check);



              if(!input_check.checked){
                console.log("HERE NOT CHECKEC")
                load_individual_hydroservers_group(title);
              }
              input_check.addEventListener("change", function(){
                change_effect_groups(this,id_group_separator);
              });


              let $title="#"+title;
              let $title_list="#"+title+"list";
              //console.log($title_list);


              $($title).click(function(){
                $("#pop-up_description2").html("");

                actual_group = `&actual-group=${title}`;

                let description_html=`
                <h1>Group Metadata<h1>
                <h3>Group Title</h3>
                <p>${title}</p>
                <h3>Group Description</h3>
                <p>${description}</p>`;
                // $("#pop-up_description").html(description_html);
                $("#pop-up_description2").html(description_html);

              });

              $(".ui-state-default").click(function(){
                //console.log("hola");
              });
                  $("#soapAddLoading-group").addClass("hidden")
                  $("#btn-add-addHydro").show()

                  $("#modalAddGroupServer").modal("hide")
                  $("#modalAddGroupServerForm").each(function() {
                      this.reset()
                  })

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
                  $("#modalAddGroupServer").modal("hide");
                  $("#rows_servs").empty();
                  $("#available_services").hide();
            }

            else {
                $("#soapAddLoading-group").addClass("hidden")
                $("#btn-add-addHydro").show()
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
            $("soapAddLoading-group").addClass("hidden")
            $("#btn-add-addHydro").show()
            //console.log(error)
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
****** FU1NCTION NAME : load_group_hydroservers*********
****** FUNCTION PURPOSE: LOADS THE GROUPS OF HYDROSERVERS THAT ARE THERE *********
*/
 load_group_hydroservers = function(){
     //console.log("hola");

     $.ajax({
         type: "GET",
         url: `load-groups`,
         dataType: "JSON",
         success: result => {
           //console.log(result);
             let groups =result["hydroservers"];

             $(".divForServers").empty() //Resetting the catalog
             let extent = ol.extent.createEmpty()
             // //console.log(groups);
             ind = 1;
             groups.forEach(group => {
                 let {
                     title,
                     description
                 } = group
                 let id_group_separator = `${title}_list_separator`;
                 information_model[`${title}`] = []

                 // let no_servers = `<button class="btn btn-danger btn-block" id = "${title}-noGroups"> The group does not have hydroservers</button>`
                 // $(no_servers).appendTo(`#${id_group_separator}`);
                 console.log($(`#${title}-noGroups`))
                 $(`#${title}-noGroups`).show();

                 let newHtml;



                 if(can_delete_hydrogroups){
                   newHtml = html_for_groups(can_delete_hydrogroups, title, id_group_separator);
                 }
                 else{
                   newHtml = html_for_groups(false, title, id_group_separator);
                 }
                 $(newHtml).appendTo("#current-Groupservers");



                 let li_object = document.getElementById(`${title}`);
                 //console.log("hola");

                 let input_check = li_object.getElementsByClassName("chkbx-layers")[0];
                 //console.log(input_check);
                 load_individual_hydroservers_group(title);
                 let servers_checks = document.getElementById(`${id_group_separator}`).getElementsByClassName("chkbx-layers");
                 //console.log(servers_checks);
                 input_check.addEventListener("change", function(){
                   change_effect_groups(this,id_group_separator);
                 });


                 let $title="#"+title;
                 let $title_list="#"+title+"list";
                 //console.log($title_list);


                 $($title).click(function(){
                   $("#pop-up_description2").html("");

                   actual_group = `&actual-group=${title}`;

                   let description_html=`
                   <h1>Group Metadata<h1>
                   <h3>Group Title</h3>
                   <p>${title}</p>
                   <h3>Group Description</h3>
                   <p>${description}</p>`;
                   $("#pop-up_description2").html(description_html);

                 });
                 ind = ind +1;
                 //console.log(layersDictExt);
                 //console.log(information_model);

             })

     },
     error: function(error) {
         $("#soapAddLoading").addClass("hidden")
         $("#btn-add-addHydro").show()
         //console.log(error);
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
 ****** FU1NCTION NAME : REMOVE_INDIVIDUAL_HYDROSERVERS_GROUPS *********
 ****** FUNCTION PURPOSE: MAKES THE LAYERS OF HYDROSERVERS AND THE GROUP TAG TO DISSAPEAR WHEN THE GROUP NAME IS UNCHECK*********
 */
   remove_individual_hydroservers_group = function(group_name){

       let group_name_obj={
         group: group_name
       };
       //console.log(group_name_obj);
       $.ajax({
           type: "GET",
           url: `catalog-group`,
           dataType: "JSON",
           data: group_name_obj,
           success: result => {
               //console.log(result);
               let servers = result["hydroserver"]
               //console.log("this are the servers");
               //console.log(servers);

               //USE A FUNCTION TO FIND THE LI ASSOCIATED WITH THAT GROUP  AND DELETE IT FROM THE MAP AND MAKE ALL
               // THE CHECKBOXES VISIBLE //

               let extent = ol.extent.createEmpty();
               //console.log(servers);
               let id_group_separator = `${group_name}_list_separator`;
               // let tag_to_delete = document.getElementById(id_group_separator);
               // //console.log(tag_to_delete);
               // tag_to_delete.parentNode.removeChild(tag_to_delete);
               // $("#current-servers").remove(id_group_separator);

               // let lis = document.getElementById("current-servers").getElementsByTagName("li");
               // let lis = document.getElementById("current-Groupservers").getElementsByTagName("li");
               let lis = document.getElementById(`${id_group_separator}`).getElementsByTagName("li");
               // Object.values($("#current-Groupservers").find(".buttonAppearance > .chkbx-layer"))
               let li_arrays = Array.from(lis);
               //console.log(li_arrays);
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
                   delete layerColorDict[title]
                   map.updateSize()
                   let lis_to_delete = li_arrays.filter(x => title === x.attributes['layer-name'].value);

                   // so the deletion will be //

                   // let ul_servers = document.getElementById("current-servers");
                   // let ul_servers = document.getElementById("current-Groupservers");
                   let ul_servers = document.getElementById(`${id_group_separator}`);

                   // lis_to_delete.forEach(function(li_tag){
                   //   ul_servers.removeChild(li_tag);
                   // });


               })

           },
           error: function(error) {
               //console.log(error)
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
****** FU1NCTION NAME: MAKE_LIST_GROUPS*********
****** FUNCTION PURPOSE: GET THE LIST OF THE GROUPS THAT THE APP CONTAINS *********
*/
make_list_groups = function(){
  let groupsDiv = $("#current-Groupservers").find(".panel.panel-default");
  //console.log(groupsDiv);
  let arrayGroups = Object.values(groupsDiv);
  //console.log(arrayGroups);
  let finalGroupArray=[];
  arrayGroups.forEach(function(g){
    if(g.id){
      let stringGroups = g.id.split("_");
      let stringGroup = ""
      for(var i = 0; i < stringGroups.length - 1 ; i++){
        if (i >0){
          stringGroup = stringGroup +"_"+stringGroups[i]
        }
        else{
          stringGroup = stringGroup + stringGroups[i]
        }
      }
      // let stringGroup = g.id.split("_")[0];
      finalGroupArray.push(stringGroup);


    }
  });
  var HSTableHtml =
      '<table id="tbl-hydrogroups"><thead><th>Select</th><th>Title</th></thead><tbody>'
  if (finalGroupArray.length < 0) {
    $("#modalDeleteGroups").find(".modal-body")
          .html(
              "<b>There are no groups in the Water Data Explorer</b>"
          )
  } else {
      for (var i = 0; i < finalGroupArray.length; i++) {
          var title = finalGroupArray[i]
          HSTableHtml +=
              `<tr id="${title}deleteID">` +
              '<td><input class="chkbx-group" type="checkbox" name="server" value="' +
              title +
              '"></td>' +
              '<td class="hs_title">' +
              title +
              "</td>" +
              "</tr>"
      }
      HSTableHtml += "</tbody></table>"
      $("#modalDeleteGroups").find(".modal-body").html(HSTableHtml);
  }
  //console.log(finalGroupArray);
}

$("#btn-del-groups-f").on("click", make_list_groups);


/*
****** FUNCTION NAME: GET_HS_LIST_FROM_HYDROSERVER *********
****** FUNCTION PURPOSE: GET THE LIST OF HYDROSERVERS THAT A GROUP OF HYDROSERVER CONTAINS *********
*/
get_hs_list_from_hydroserver = function(){
  //console.log("inside list");
  if(actual_group == undefined){
    actual_group="";
  }
  let arrayActual_group=actual_group.split('=')[1];
  //console.log(arrayActual_group);
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
                        `<tr id="${title}deleteID">` +
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
            //console.log(error)
        }
    })
}
$(document).on("click",'#delete-server', get_hs_list_from_hydroserver);
/*
****** FU1NCTION NAME : delete_group_of_hydroservers *********
****** FUNCTION PURPOSE: DELETES THE HYDROSERVER GROUP AND THE HYDROSERVERS INSIDE THE GROUP*********
*/
  delete_group_of_hydroservers = function(){
    // let datastring = Object.values($("#current-Groupservers").find(".buttonAppearance > .chkbx-layer"));
    let datastring = Object.values($("#tbl-hydrogroups").find(".chkbx-group"));
    //console.log(datastring);
    let groups_to_delete=[];
    datastring.forEach(function(data){
      if(data.checked== true){
        let group_name = data.value;
        groups_to_delete.push(group_name);
      }
    });
    //console.log("delete REQUEST");
    //console.log(groups_to_delete);
    if(groups_to_delete.length > 0){
      let groups_to_delete_obj={
        groups:groups_to_delete
      };
      $.ajax({
        type: "POST",
        url: `delete-group/`,
        dataType: "JSON",
        data: groups_to_delete_obj,
        success: function(result){
          //console.log("Result Delete");
          //console.log(result);
          // var json_response = JSON.parse(result)

          let groups_to_erase = result.groups;
          let hydroservers_to_erase = result.hydroservers;
          //console.log(groups_to_erase);
          //console.log(hydroservers_to_erase);
          $("#pop-up_description2").empty();

          groups_to_erase.forEach(function(group){
            let element=document.getElementById(group);
            element.parentNode.removeChild(element);
            let id_group_separator = `${group}_list_separator`;
            let separator = document.getElementById(id_group_separator);
            separator.parentNode.removeChild(separator);
            let group_panel_id = `${group}_panel`;
            let group_panel = document.getElementById(group_panel_id);
            group_panel.parentNode.removeChild(group_panel);
            $(`#${group}deleteID`).remove();
          });

          hydroservers_to_erase.forEach(function(hydroserver){

              map.removeLayer(layersDict[hydroserver]);
              if (layersDict.hasOwnProperty(hydroserver))
              delete layersDict[hydroserver]
              $(`#${hydroserver}-row-complete`).remove()

          });
          if(layersDict['selectedPoint']){
            map.removeLayer(layersDict['selectedPoint'])
            map.updateSize()
          }

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
    else{
      $.notify(
          {
              message: `You need to select at least one group to delete`
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

  $("#btn-del-hydro-groups").on("click", delete_group_of_hydroservers);

  /*
  ************ FUNCTION NAME : GET_KEYWORDS_FROM_GROUPS
  ************ PURPOSE : THE FUNCTION LETS YOU FILTER THE HYDROSERVERS LIST FROM THE SELECTED GROUPS OF HYDROSERVERS

  */
catalog_filter = function(){
  let elementForm= $("#modalKeyWordSearch");
  //console.log(elementForm)
  let datastring= elementForm.serialize();
  //console.log(datastring);
  $("#KeywordLoading").removeClass("hidden");

  $.ajax({
      type: "GET",
      url: `catalog-filter/`,
      dataType: "HTML",
      data: datastring,
      success: function(result) {
        // let check_for_none = []
        console.log(result)
        let hs_available = JSON.parse(result)['hs'];
        let new_hs_available = []
        hs_available.forEach(function(hs){
          hs = hs.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
          new_hs_available.push(hs.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,''));
        })
        let sitesObj =  JSON.parse(result)['stations'];
        for(let i = 0;  i< sitesObj.length; ++i){
          let title = sitesObj[i]['title']
          let url = sitesObj[i]['url']
          let sites = sitesObj[i]['sites'];
          var vectorLayer = map_layers(sites,title,url)[0]
          var vectorSource = map_layers(sites,title,url)[1]
          map.getLayers().forEach(function(layer) {
               if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
                   layer.setStyle(new ol.style.Style({}));
                 }
           });

          //console.log("layer added to map");
          map.addLayer(vectorLayer)
          // ol.extent.extend(extent, vectorSource.getExtent());
          vectorLayer.set("selectable", true)
          layer_object_filter[title] = vectorLayer;

          if(layersDict['selectedPoint']){
            map.removeLayer(layersDict['selectedPoint'])
            // delete layersDict[title]
            map.updateSize()
          }
        }
        // let hs_available = JSON.parse(result);
        //console.log(hs_available)

        // $("#panel-bodyh").append(`<button type="button" id="btn-r-reset" class="btn btn-danger">Reset</button>`)
        $("#btn-r-reset").show()
        $("#btn-r-reset").on("click", reset_keywords);

        $("#current-Groupservers").find("li").each(function()
           {
              var $li=$(this)['0'];
              //console.log($li)
              let id_li = $li['id'];

              if(new_hs_available.includes(id_li)){
              // if(hs_available.includes(id_li)){
                console.log(hs_available);
                console.log(new_hs_available);
                console.log(id_li);
                // $(`#${id_li}`).removeClass("hidden");
                // check_for_none.push(id_li);
                $(`#${id_li}`).css({"opacity": "1",
                                    "border-color": "#ac2925",
                                    "border-width": "2px",
                                    "border-style": "solid",
                                    "color": "black",
                                    "font-weight": "bold"});
                $(`#${id_li} input[type=checkbox]`).each(function() {
                  this.checked = true;
                });

              }
              else{
                let groups_divs = Object.keys(information_model);
                console.log(groups_divs);
                if (!groups_divs.includes(id_li)){
                  $(`#${id_li}`).css({"opacity": "0.5",
                                       "border-color": "#d3d3d3",
                                       "border-width":"1px",
                                       "border-style":"solid",
                                       "color":"#555555",
                                       "font-weight": "normal"});
                }
                // $(`#${id_li}`).addClass("hidden");

              }
           });
           let groups_divs = Object.keys(information_model);
           for(let i=0; i< groups_divs.length; ++i){
             // let check_all = false;
             let check_all = []
             console.log(information_model[groups_divs[i]])
             for(let j=0; j< information_model[groups_divs[i]].length; ++j){

               let service_div = information_model[groups_divs[i]][j]
               service_div = service_div.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
               $(`#${service_div} input[type=checkbox]`).each(function(){
                 if(this.checked){
                   // check_all = true;
                   check_all.push(true);
                 }
                 else{
                   check_all.push(false);
                 }
               });
             }
             console.log(check_all)
             // if(check_all){
             if(!check_all.includes(false)){
               $(`#${groups_divs[i]} input[type=checkbox]`).each(function() {
                 this.checked = true;
               });
             }
           }


        $("#KeywordLoading").addClass("hidden");

      },
      error: function(error) {
        $("#KeywordLoading").addClass("hidden");

        //console.log(error);
        // get_notification("danger",`Something were wrong when applying the filter with the keywords`);
        $.notify(
            {
                message: `Something were wrong when applying the filter with variables and regions`
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
$("#btn-key-search").on("click", catalog_filter);

catalog_filter_server = function(){
  let elementForm= $("#modalFilterGroup");
  //console.log(elementForm)
  let datastring= elementForm.serialize();
  datastring += actual_group;
  //console.log(datastring);
  $("#KeywordLoading2").removeClass("hidden");

  $.ajax({
      type: "GET",
      url: `catalog-filter/`,
      dataType: "HTML",
      data: datastring,
      success: function(result) {
        let check_for_none = []
        let hs_available = JSON.parse(result)['hs'];
        // let hs_available = JSON.parse(result);
        //console.log(hs_available)
        let arrayActual_group=actual_group.split('=')[1];
        $(`#${arrayActual_group}_list_separator`).find("li").each(function()
           {
              var $li=$(this)['0'];
              //console.log($li)
              let id_li = $li['id'];
              //console.log(id_li)

              if(hs_available.includes(id_li)){
                // $(`#${id_li}`).removeClass("hidden");
                $(`#${id_li}`).css({"opacity": "1",
                                    "border-color": "#ac2925",
                                    "border-width": "2px",
                                    "border-style": "solid",
                                    "color": "black",
                                    "font-weight": "bold"});
                // $(`#${id_li}`).css("border-color", "#ac2925");
                // check_for_none.push(id_li);
              }
              else{
                // $(`#${id_li}`).addClass("hidden");
                // $(`#${id_li}`).css("opacity", "0.5");
                // $(`#${id_li}`).css("border-color", "#d3d3d3");
                $(`#${id_li}`).css({"opacity": "0.5",
                                    "border-color": "#d3d3d3",
                                    "border-width":"1px",
                                    "border-style":"solid",
                                    "color":"#555555",
                                    "font-weight": "normal"});
              }
           });





           $("#KeywordLoading2").addClass("hidden");

      },
      error: function(error) {
        $("#KeywordLoading2").addClass("hidden");

        //console.log(error);
        // get_notification("danger",`Something were wrong when applying the filter with the keywords`);
        $.notify(
            {
                message: `Something were wrong when applying the filter with variables and regions`
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
$("#btn-key-search-catalog").on("click", catalog_filter_server);

reset_keywords = function(){
  // $('#btn-r-reset').last().remove();
  $('#btn-r-reset').hide();
  Object.keys(information_model).forEach(function(key) {
        // $(`#${key}-noGroups`).addClass("hidden");
        //add the reset button ///
        console.log(key)
        for(let i = 0; i< information_model[key].length; ++i){
          if (layer_object_filter.hasOwnProperty(information_model[key][i])){
            map.removeLayer(layer_object_filter[information_model[key][i]])
            if(layersDict.hasOwnProperty(information_model[key][i])){
              map.getLayers().forEach(function(layer) {
                   if(layer instanceof ol.layer.Vector && layer == layersDict[information_model[key][i]]){
                     layer.setStyle(featureStyle(layerColorDict[information_model[key][i]]));
                     }
               });
            }
          }
        }


  });
  layer_object_filter={};

  $("#current-Groupservers").find("li").each(function()
     {
        var $li=$(this)['0'];
        let id_li = $li['id'];
        // $(`#${id_li}`).removeClass("hidden");
        $(`#${id_li}`).css({"opacity": "1",
                            "border-color": "#d3d3d3",
                            "border-width":"1px",
                            "border-style":"solid",
                            "color":"#555555",
                            "font-weight": "normal"});

     });
}

$("#btn-r-reset").on("click", reset_keywords);
$("#btn-r-reset-catalog").on("click", reset_keywords);

    /*
    ************ FUNCTION NAME : GET_ALL_THE_CHECKED_KEYWORDS
    ************ PURPOSE : GET ALL THE CHECKED KEYWORDS FROM THE POP-UP MENU
    */
    get_all_the_checked_keywords = function(){
      // ONLY THE KEY WORDS //
      let datastring = Array.from(document.getElementsByClassName("odd gradeX"));
      // //console.log(datastring);
      let key_words_to_search=[];
      datastring.forEach(function(data){
        // //console.log(Array.from(data.children));
        Array.from(data.children).forEach(function(column){
          if(Array.from(column.children)[0].checked ==true){
            // //console.log();
            key_words_to_search.push(Array.from(column.children)[0].nextSibling.nodeValue.trim())
          }
        })
      });
      // filter_words = key_words_to_search;
      //console.log(key_words_to_search);
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
      ////console.log(array_active_groups_hydroservers);
      array_active_groups_hydroservers = array_active_groups_hydroservers.filter(x => x.attributes['layer-name'].value == "none");

      array_active_groups_hydroservers.forEach(function(group){
        let input_type = Array.from(group.getElementsByTagName("INPUT"))[0];
        //console.log(input_type);
        if(input_type.checked){
          input_check_array.push(group.id);
        }
      })
      //console.log(input_check_array);
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
          //console.log(key, value);
      }
      //console.log(keywords_in_servers);
      return keywords_in_servers;
    }

    generateListServices = function(){

      var HSTableHtml =
          `<table id="infoModel-info-table" class="table table-striped table-bordered nowrap" width="100%"><tbody>`
      if (information_model.length === 0) {
          $("#modalKeyWordSearch")
              .find("#groups_services")
              .html(
                  "<b>There are no data available, please add a group.</b>"
              )
      }
      else {
          for (var i = 0; i < result1['siteInfo'].length; i++) {
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
          HSTableHtml += "</tbody></table>"
          $("#modalHydroserInformation").find("#infoTable").html(HSTableHtml);
    }
  }

  load_info_model = function(){
    var HSTableHtml = ''
      Object.keys(information_model).forEach(function(key) {
      //console.log(key, information_model[key]);
      HSTableHtml +=
        `<h4 id="titleSite">${key}</h4>`
      information_model[key].forEach(function(serviceView){
        HSTableHtml +=
        `<p class= "fakeRow">${serviceView}</p>`
      })


    });

    $("#modalKeyWordSearch").find("#groups_services").html(HSTableHtml);
  }

  load_search_modal = function(){
    load_info_model();
    // show_variables_groups();
    available_regions();

  }
  $("#btn-filter-groups-f").on("click", load_search_modal);

searchGroups = function() {
  general_search("myInputKeyword","data-table");
}
document.getElementById('myInputKeyword').addEventListener("keyup", searchGroups);

// searchVariables = function() {
//   general_search("myInputKeyword2","data-table-var");
// }
// document.getElementById('myInputKeyword2').addEventListener("keyup", searchVariables);

// for only one group
searchGroups_group = function() {
  general_search("myInputKeywordGroup","data-table2");
}
document.getElementById('myInputKeywordGroup').addEventListener("keyup", searchGroups_group);

searchVariablesGroup = function() {
  general_search("myInputKeywordGroup2","data-table-var2");
}
document.getElementById('myInputKeywordGroup2').addEventListener("keyup", searchVariablesGroup);



general_search = function(id_search_input, id_table){
  input = document.getElementById(`${id_search_input}`);

  // input = document.getElementById("myInputKeyword");
  //console.log(input)
  filter = input.value.toUpperCase();
  table = document.getElementById(`${id_table}`);

  // table = document.getElementById(`data-table`);
  tr = table.getElementsByTagName("tr");
  //console.log(tr)
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






    // reset_k= function(){
    //   input = document.getElementById("myInputKeyword");
    //   //console.log(input)
    //   filter = input.value.toUpperCase();
    //   table = document.getElementById(`data-table`);
    //   tr = table.getElementsByTagName("tr");
    //   //console.log(tr)
    //   for (i = 0; i < tr.length; i++) {
    //     td = tr[i].getElementsByTagName("td")[0];
    //     if (td) {
    //       txtValue = td.textContent || td.innerText;
    //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //         tr[i].style.display = "";
    //       } else {
    //         tr[i].style.display = "none";
    //       }
    //     }
    //   }
    // }
    // document.getElementById('myInputKeyword').addEventListener("keyup", reset_k);
