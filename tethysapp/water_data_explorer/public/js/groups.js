
give_available_services = function(){
  //change to vissible//
  let elementForm= $("#modalAddGroupServerForm");
  let datastring= elementForm.serialize();
  let form_elements = datastring.split("&");
  let url_alone = form_elements[form_elements.length -1]
  console.log(url_alone)
  $("#soapAddLoading-group").removeClass("hidden");

  $.ajax({
    type: "GET",
    url: `available-services/`,
    dataType: "HTML",
    data: url_alone,
    success: function(data){
      $("#rows_servs").empty();
      console.log(data)
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
      $("#modalAddGroupServer").find("#rows_servs").html(row)

      $("#available_services").removeClass("hidden");
      $("#soapAddLoading-group").addClass("hidden")

    },
    error: function(error){
      $("#soapAddLoading-group").addClass("hidden")
      console.log(error)
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
  // console.log(url_catalog)
}
$("#btn-check_available_serv").on("click", give_available_services);

show_variables_groups = function(){
  $("#KeywordLoading").removeClass("hidden");
  $.ajax({
    type: "GET",
    url: `available-variables/`,
    dataType: "JSON",
    success: function(data){

      // $("#rows_servs").empty();
      console.log(data)
      variables_list = data['variables'];
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      let arr=chunk(variables_list, 2);
      console.log(arr)

      var HSTableHtml =
          `<table id="data-table" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

        arr.forEach(l_arr => {
          HSTableHtml +=  '<tr class="odd gradeX">'
          l_arr.forEach(i =>{
            HSTableHtml +=  `<td><input type="checkbox" name="name1" /> ${i}</td>`;
          })

              HSTableHtml += '</tr>';
        })

        // HSTableHtml += '</td>'+'</tr>'
        // HSTableHtml += '</tr>'

        HSTableHtml += "</tbody></table>"
      console.log(HSTableHtml)
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
      $("#soapAddLoading-group").addClass("hidden")
      console.log(error)
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
  console.log("MNOE ME USES")
  $("#KeywordLoading").removeClass("hidden");
  $.ajax({
    type: "GET",
    url: `available-regions/`,
    dataType: "JSON",
    success: function(data){
      countries_available = data['countries']
      console.log(data)
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
      let arr=chunk(countries_available, 2);
      console.log(arr)

      var HSTableHtml =
          `<table id="data-table" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

        arr.forEach(l_arr => {
          HSTableHtml +=  '<tr class="odd gradeX">'
          l_arr.forEach(i =>{
            HSTableHtml +=  `<td><input type="checkbox" name="name1" /> ${i}</td>`;
          })

              HSTableHtml += '</tr>';
        })

        // HSTableHtml += '</td>'+'</tr>'
        // HSTableHtml += '</tr>'

        HSTableHtml += "</tbody></table>"
      console.log(HSTableHtml)
      $("#modalKeyWordSearch").find("#groups_countries").html(HSTableHtml);
      $("#KeywordLoading").addClass("hidden");
    },
    error: function(error){
      $("#KeywordLoading").addClass("hidden")
      console.log(error)
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
    console.log(typeof(datastring));
    console.log(datastring);
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
                // newHtml =
                // `
                // <div class="panel panel-default" id="${title}_panel">
                //   <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
                //     <h4 class="panel-title">
                //       <a role="button" data-toggle="collapse" data-target="#collapse_${title}" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
                //       <span class="group-name"><strong>${ind})</strong> ${title}</span>
                //
                //       </a>
                //     </h4>
                //     <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
                //
                //         <input class="chkbx-layers" type="checkbox" checked>
                //         <button class="btn btn-primary btn-sm" data-toggle="modal" data-dismiss="modal" data-target="#modalInterface">
                //           <span class=" glyphicon glyphicon-info-sign "></span>
                //         </button>
                //         <button id="load-from-soap" class="btn btn-primary btn-sm" data-toggle="modal" data-dismiss="modal" data-target="#modalAddSoap">
                //           <span class="glyphicon glyphicon-plus"></span>
                //         </button>
                //         <button id="delete-server" class="btn btn-primary btn-sm" data-toggle="modal"  data-dismiss="modal" data-target="#modalDelete">
                //           <span class="glyphicon glyphicon-trash"></span>
                //         </button>
                //     </li>
                //
                //   </div>
                //
                //   <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
                //   <div class="iconhydro"><img src="https://img.icons8.com/dusk/24/000000/ssd.png"/>Broker Endpoints</div>
                //     <div class="panel-body">
                //         <div id= ${id_group_separator} class="divForServers"></div>
                //     </div>
                //   </div>
                // </div>
                // `
              }
              else{
                newHtml = html_for_groups(false, title, id_group_separator);
                // newHtml =
                // `
                // <div class="panel panel-default" id="${title}_panel">
                //   <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
                //     <h4 class="panel-title">
                //       <a role="button" data-toggle="collapse" data-parent="#current-Groupservers" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
                //       <span class="group-name"><strong>${ind})</strong> ${title}</span>
                //       </a>
                //     </h4>
                //     <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
                //       <input class="chkbx-layers" type="checkbox" checked>
                //       <button class="btn btn-primary btn-sm" data-toggle="modal" data-dismiss="modal" data-target="#modalInterface">
                //         <span class=" glyphicon glyphicon-info-sign "></span>
                //       </button>
                //     </li>
                //   </div>
                //   <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
                //     <div class="panel-body">
                //         <div id= ${id_group_separator} class="divForServers"></div>
                //     </div>
                //   </div>
                // </div>
                // `
              }

              $(newHtml).appendTo("#current-Groupservers");

              let li_object = document.getElementById(`${title}`);
              console.log("hola");
              // console.log(li_object.children[0]);
              // let input_check = li_object.children[0];
              let input_check = li_object.getElementsByClassName("chkbx-layers")[0];

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
                console.log("hola");
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

            } else {
                $("#soapAddLoading").addClass("hidden")
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
            $("#soapAddLoading").addClass("hidden")
            $("#btn-add-addHydro").show()
            console.log(error)
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
     console.log("hola");

     $.ajax({
         type: "GET",
         url: `load-groups`,
         dataType: "JSON",
         success: result => {
           console.log(result);
             let groups =result["hydroservers"];

             $(".divForServers").empty() //Resetting the catalog
             let extent = ol.extent.createEmpty()
             // console.log(groups);
             ind = 1;
             groups.forEach(group => {
                 let {
                     title,
                     description
                 } = group
                 let id_group_separator = `${title}_list_separator`;
                 information_model[`${title}`] = []
                 let newHtml;
                 if(can_delete_hydrogroups){
                   newHtml = html_for_groups(can_delete_hydrogroups, title, id_group_separator);
                   // `
                   // <div class="panel panel-default" id="${title}_panel">
                   //   <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
                   //     <h4 class="panel-title">
                   //       <a role="button" data-toggle="collapse" data-target="#collapse_${title}" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
                   //       <span class="group-name"><strong>${ind})</strong> ${title}</span>
                   //
                   //       </a>
                   //     </h4>
                   //     <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
                   //
                   //         <input class="chkbx-layers" type="checkbox">
                   //         <button class="btn btn-primary btn-sm" data-toggle="modal" data-dismiss="modal" data-target="#modalInterface">
                   //           <span class=" glyphicon glyphicon-info-sign "></span>
                   //         </button>
                   //         <button id="load-from-soap" class="btn btn-primary btn-sm" data-toggle="modal" data-dismiss="modal" data-target="#modalAddSoap">
                   //           <span class="glyphicon glyphicon-plus"></span>
                   //         </button>
                   //         <button id="delete-server" class="btn btn-primary btn-sm" data-toggle="modal"  data-dismiss="modal" data-target="#modalDelete">
                   //           <span class="glyphicon glyphicon-trash"></span>
                   //         </button>
                   //     </li>
                   //
                   //   </div>
                   //
                   //   <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
                   //   <div class="iconhydro"><img src="https://img.icons8.com/dusk/24/000000/ssd.png"/>Broker Endpoints</div>
                   //     <div class="panel-body">
                   //         <div id= ${id_group_separator} class="divForServers"></div>
                   //     </div>
                   //   </div>
                   // </div>
                   // `
                 }
                 else{
                   newHtml = html_for_groups(false, title, id_group_separator);

                   // newHtml =
                   // `
                   // <div class="panel panel-default" id="${title}_panel">
                   //   <div class="panel-heading buttonAppearance" role="tab" id="heading_${title}">
                   //     <h4 class="panel-title">
                   //       <a role="button" data-toggle="collapse" data-parent="#current-Groupservers" href="#collapse_${title}" aria-expanded="true" aria-controls="collapse_${title}">
                   //       <span class="group-name"><strong>${ind})</strong> ${title}</span>
                   //       </a>
                   //     </h4>
                   //     <li class="ui-state-default buttonAppearance" id="${title}" layer-name="none">
                   //       <input class="chkbx-layers" type="checkbox">
                   //       <button class="btn btn-primary btn-sm" data-toggle="modal" data-dismiss="modal" data-target="#modalInterface">
                   //         <span class=" glyphicon glyphicon-info-sign "></span>
                   //       </button>
                   //     </li>
                   //   </div>
                   //   <div id="collapse_${title}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_${title}">
                   //     <div class="panel-body">
                   //         <div id= ${id_group_separator} class="divForServers"></div>
                   //     </div>
                   //   </div>
                   // </div>
                   // `
                 }
                 $(newHtml).appendTo("#current-Groupservers");



                 let li_object = document.getElementById(`${title}`);
                 console.log("hola");

                 let input_check = li_object.getElementsByClassName("chkbx-layers")[0];
                 console.log(input_check);
                 load_individual_hydroservers_group(title);
                 let servers_checks = document.getElementById(`${id_group_separator}`).getElementsByClassName("chkbx-layers");
                 console.log(servers_checks);
                 // if(input_check.checked){
                 //   // load_individual_hydroservers_group(title);
                 //   let servers_checks = document.getElementById(`${id_group_separator}`).getElementsByClassName("chkbx-layers");
                 //   console.log(servers_checks);
                 //   for(i = 0; i < servers_checks.length; i++) {
                 //      servers_checks[i].checked = true;
                 //      let server_name = servers_checks[i].parentElement.id;
                 //      map.removeLayer(layersDict[server_name])
                 //      map.addLayer(layer_object_filter[server_name])
                 //    }
                 //
                 //   labels_x = document.getElementById(`heading_${title}`)
                 //   labels_x.style.backgroundColor = colors_unique[0]
                 // }

                 input_check.addEventListener("change", function(){
                   change_effect_groups(this,id_group_separator);
                   // console.log(this);
                   // if(this.checked){
                   //   console.log(" it is checked");
                   //   // load_individual_hydroservers_group(title);
                   //   let servers_checks = Array.from(document.getElementById(`${id_group_separator}`).children);
                   //   console.log(servers_checks);
                   //   for(i = 0; i < servers_checks.length; i++) {
                   //     let server_name = servers_checks[i].id;
                   //      let checkbox = Array.from(servers_checks[i].children)
                   //      for (var j = 0; j < checkbox.length; j++) {
                   //          if (checkbox[j].className == "chkbx-layer") {
                   //            console.log(checkbox[j])
                   //            checkbox[j].checked = true;
                   //          }
                   //      }
                   //      console.log(checkbox);
                   //      map.getLayers().forEach(function(layer) {
                   //           if(layer instanceof ol.layer.Vector && layer == layersDict[server_name]){
                   //             console.log(layer)
                   //             layer.setStyle(featureStyle(layerColorDict[server_name]));
                   //           }
                   //       });
                   //    }
                   //
                   //
                   // }
                   // else{
                   //   console.log("it is not checked");
                   //   // remove_individual_hydroservers_group(title);
                   //   let servers_checks = Array.from(document.getElementById(`${id_group_separator}`).children);
                   //   console.log(servers_checks);
                   //   for(i = 0; i < servers_checks.length; i++) {
                   //     let server_name = servers_checks[i].id;
                   //      let checkbox = Array.from(servers_checks[i].children)
                   //      for (var j = 0; j < checkbox.length; j++) {
                   //          if (checkbox[j].className == "chkbx-layer") {
                   //            console.log(checkbox[j])
                   //            checkbox[j].checked = false;
                   //          }
                   //      }
                   //      console.log(checkbox);
                   //      map.getLayers().forEach(function(layer) {
                   //           if(layer instanceof ol.layer.Vector && layer == layersDict[server_name]){
                   //             console.log(layer)
                   //             layer.setStyle(new ol.style.Style({}));
                   //           }
                   //       });
                   //    }
                   //
                   // }

                 });


                 let $title="#"+title;
                 let $title_list="#"+title+"list";
                 console.log($title_list);


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
                 console.log(layersDictExt);
                 console.log(information_model);

             })

     },
     error: function(error) {
         $("#soapAddLoading").addClass("hidden")
         $("#btn-add-addHydro").show()
         console.log(error);
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
****** FU1NCTION NAME: MAKE_LIST_GROUPS*********
****** FUNCTION PURPOSE: GET THE LIST OF THE GROUPS THAT THE APP CONTAINS *********
*/
make_list_groups = function(){
  let groupsDiv = $("#current-Groupservers").find(".panel.panel-default");
  console.log(groupsDiv);
  let arrayGroups = Object.values(groupsDiv);
  console.log(arrayGroups);
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
              "<tr>" +
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
  console.log(finalGroupArray);
}

$("#btn-del-groups-f").on("click", make_list_groups);


/*
****** FUNCTION NAME: GET_HS_LIST_FROM_HYDROSERVER *********
****** FUNCTION PURPOSE: GET THE LIST OF HYDROSERVERS THAT A GROUP OF HYDROSERVER CONTAINS *********
*/
get_hs_list_from_hydroserver = function(){
  console.log("inside list");
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
$(document).on("click",'#delete-server', get_hs_list_from_hydroserver);
/*
****** FU1NCTION NAME : delete_group_of_hydroservers *********
****** FUNCTION PURPOSE: DELETES THE HYDROSERVER GROUP AND THE HYDROSERVERS INSIDE THE GROUP*********
*/
  delete_group_of_hydroservers = function(){
    // let datastring = Object.values($("#current-Groupservers").find(".buttonAppearance > .chkbx-layer"));
    let datastring = Object.values($("#tbl-hydrogroups").find(".chkbx-group"));
    console.log(datastring);
    let groups_to_delete=[];
    datastring.forEach(function(data){
      if(data.checked== true){
        let group_name = data.value;
        groups_to_delete.push(group_name);
      }
    });
    console.log("delete REQUEST");
    console.log(groups_to_delete);
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
          console.log("Result Delete");
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
            let group_panel_id = `${group}_panel`;
            let group_panel = document.getElementById(group_panel_id);
            group_panel.parentNode.removeChild(group_panel);
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

          console.log(input_check_array);
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
            // $("#KeywordLoading").css({"margin-left":'40%', position:'relative',"z-index": 9999});
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
                  // $("#modalKeyWordSearch").modal("hide");
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
        console.log(input_type);
        if(input_type.checked){
          input_check_array.push(group.id);
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
             '<tr class="odd gradeX2">'+
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
    var HSTableHtml =
        `<table id="groups-info-table" class="table table-striped table-bordered nowrap" width="100%"><tbody>`
      Object.keys(information_model).forEach(function(key) {
      console.log(key, information_model[key]);
      HSTableHtml +=
        `<p id="titleSite">${key}</p>`
              // `<td> <p id="titleSite">${key}</p>`
      information_model[key].forEach(function(serviceView){
        HSTableHtml +=
         '<tr class="odd gradeX2">'+
         `<td><p>${serviceView}</p></td>`+
         '</tr>'

      })

      // HSTableHtml += '</td>'+'</tr>'
      // HSTableHtml += '</tr>'

      HSTableHtml += "</tbody></table>"
    });
    $("#modalKeyWordSearch").find("#groups_services").html(HSTableHtml);
  }

  load_search_modal = function(){
    load_info_model();
    show_variables_groups();
    available_regions();

  }
  $("#btn-filter-groups-f").on("click", load_search_modal);

    searchGroups = function() {
      //intersection of two bounding boxes lat/long python library
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInputKeyword");
      filter = input.value.toUpperCase();
      table = document.getElementById(`groups-info-table`);
      tr = table.getElementsByTagName("tr");

      //first word filter //
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;

          // if (txtValue.toUpperCase().indexOf(filter) > -1) {
          //   tr[i].style.display = "";
          // } else {
          //   tr[i].style.display = "none";
          // }
          console.log(layersDictExt)
          // second country filter //
          // Object.keys(layersDictExt).forEach(function(key) {

          console.log(txtValue);
          // console.log(key);
          // bbox = layersDictExt[key]
          bbox = layersDictExt[txtValue]
          if (findIntersection(input.value, bbox) == true){
            tr[i].style.display = "";
          }
          else{
            tr[i].style.display = "none";
          }
          // })
        }

      }


    }
    $("#groupsFiltering").on("click", searchGroups);
    reset_k= function(){
      input = document.getElementById("myInputKeyword");
      console.log(input)
      if(input.value == ""){
        table = document.getElementById(`groups-info-table`);
        tr = table.getElementsByTagName("tr");

        //first word filter //
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            tr[i].style.display = "";
          }
        }
      }
    }
    document.getElementById('myInputKeyword').addEventListener("keyup", reset_k);
