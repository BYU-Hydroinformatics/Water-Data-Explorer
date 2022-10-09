give_available_services = function(){
  try{
    let elementForm= $("#modalAddGroupServerForm");
    let datastring= elementForm.serialize();
    let form_elements = datastring.split("&");
    let url_alone = form_elements[form_elements.length -1]
    $("#soapAddLoading-group").removeClass("hidden");
    $.ajax({
      type: "POST",
      url: `available-services/`,
      dataType: "HTML",
      data: url_alone,
      success: function(data){
        try{
          $("#rows_servs").empty();
          var json_response = JSON.parse(data)
          var services_ava = json_response['services']
          var i = 1;
          var row = ""
          services_ava.forEach(function(serv){
            var title_new = serv['title'].replace(/ /g,"_");
            row += `<tr>
                      <th scope="row">${i}</th>
                      <td><input type="checkbox" class="filter_check" name="server_${i}" value=${title_new}></td>
                      <td>${serv['title']}</td>
                    </tr>`
            i += 1;
          })
          $("#available_services").show();
          $("#modalAddGroupServer").find("#rows_servs").html(row)

          $("#available_services").removeClass("hidden");
          $("#soapAddLoading-group").addClass("hidden")

          $("#btn-check_all").removeClass("hidden");
        }
        catch(e){
          $("#soapAddLoading-group").addClass("hidden");
          new Notify ({
            status: 'error',
            title: 'Error',
            text: `There was an error retrieving the different web services contained in the view`,
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
          //         message: `There was an error retrieving the different web services contained in the view`
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

      },
      error: function(error){
        $("#soapAddLoading-group").addClass("hidden");
        new Notify ({
          status: 'error',
          title: 'Error',
          text: `There was an error retrieving the different web services contained in the view`,
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
        //         message: `There was an error retrieving the different web services contained in the view`
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

  }
  catch(error){
    $("#soapAddLoading-group").addClass("hidden");
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `There was an error retriving the input data from the Web Service`,
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
    //         message: `There was an error retriving the input data from the Web Service`
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
$("#btn-check_available_serv").on("click", give_available_services);
$("#btn-check_all").on("click", function(){

  if($("#btn-check_all").html() == "Select All Views"){
    $("#btn-check_all").html("Unselect All Views");
    $("#modalAddGroupServer :checkbox").each(function(){
      this.checked = true;
    })
  }
  else{
    $("#btn-check_all").html("Select All Views");
    $("#modalAddGroupServer :checkbox").each(function(){
      this.checked = false;
    })
  }


});

show_variables_groups = function(){
  $("#KeywordLoading").removeClass("hidden");
  $.ajax({
    type: "POST",
    url: `available-variables/`,
    dataType: "JSON",
    success: function(data){
      try{
        // console.log(data);
        variables_list = data['variables'];
        variables_codes_list = data['variables_codes'];
        // console.log(variables_codes_list);
        const chunk = (arr, size) =>
          Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
          );
        let arr=chunk(variables_list, 2);
        let arr2=chunk(variables_codes_list, 2);
        // console.log(arr2);


        var HSTableHtml =
            `<table id="data-table-var" class="table table-striped table-bordered nowrap" width="100%"><tbody>`
          let z = 0;
          arr.forEach(l_arr => {
            HSTableHtml +=  '<tr class="odd gradeX">'
            let j = 0;
            l_arr.forEach(i =>{
              let new_i = i.replace(/ /g,"_");
              let new_i2 = i.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
              let new_codei = arr2[z][j].replace(/ /g,"_");

              HSTableHtml +=  `<td id =${new_i2}_td ><input type="checkbox" class="filter_check" name="variables" value=${new_codei} /> ${i}</td>`;

              j = j +1;
            })

                HSTableHtml += '</tr>';
                z = z + 1;
          })


          HSTableHtml += "</tbody></table>"
        ////console.log(HSTableHtml)
        $("#modalKeyWordSearch").find("#groups_variables").html(HSTableHtml);
        $("#KeywordLoading").addClass("hidden");
      }
      catch(e){
        console.log(e);
        $("#KeywordLoading").addClass("hidden");
        new Notify ({
          status: 'error',
          title: 'Error',
          text: `There was an error retrieving the different variables for the selected group`,
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
        //         message: `There was an error retrieving the different variables for the selected group`
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

    },
    error: function(error){
      console.log(e);
      $("#KeywordLoading").addClass("hidden");
      new Notify ({
        status: 'error',
        title: 'Error',
        text: `There was an error retrieving the different variables for the selected group`,
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
      //         message: `There was an error retrieving the different variables for the selected group`
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
}
available_regions = function(){
  $("#KeywordLoading").removeClass("hidden");
  $.ajax({
    type: "POST",
    url: `available-regions/`,
    dataType: "JSON",
    success: function(data){
      try{
        countries_available = data['countries']
        const chunk = (arr, size) =>
          Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
          );
        let arr=chunk(countries_available, 2);
        var HSTableHtml =
            `<table id="data-table" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

          arr.forEach(l_arr => {
            HSTableHtml +=  '<tr class="odd gradeX">'
            l_arr.forEach(i =>{
              let new_i = i.replace(/ /g,"_");
              HSTableHtml +=  `<td><input type="checkbox" class="filter_check" name="countries" value=${new_i} /> ${i}</td>`;
            })

                HSTableHtml += '</tr>';
          })

          HSTableHtml += "</tbody></table>"
        $("#modalKeyWordSearch").find("#groups_countries").html(HSTableHtml);
        $("#KeywordLoading").addClass("hidden");
      }
      catch(e){
        $("#KeywordLoading").addClass("hidden");
        new Notify ({
          status: 'error',
          title: 'Error',
          text: `There was an error trying to retrieve the different countries contained by the web services in the app`,
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
        //         message: `There was an error trying to retrieve the different countries contained by the web services in the app`
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

    },
    error: function(error){
      $("#KeywordLoading").addClass("hidden");
      new Notify ({
        status: 'error',
        title: 'Error',
        text: `There was an error trying to retrieve the different countries contained by the web services in the app`,
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
      //         message: `There was an error trying to retrieve the different countries contained by the web services in the app`
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
}
listener_checkbox = function(list_countries){
  try{
    let le_object = {
      "countries": list_countries
    };
    $("#KeywordLoading").removeClass("hidden")

    $.ajax({
      type: "POST",
      url: `get-variables-for-country/`,
      dataType: "JSON",
      data: le_object,
      success: function(data){
        console.log(data);
        try{
          $("#modalKeyWordSearch").find("#groups_variables").empty();

          variables_list = data['variables'];
          variables_codes_list = data['variables_codes'];
          // console.log(variables_codes_list);
          const chunk = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
              arr.slice(i * size, i * size + size)
            );
          let arr=chunk(variables_list, 2);
          let arr2=chunk(variables_codes_list, 2);
          // console.log(arr2);


          var HSTableHtml =
              `<table id="data-table-var" class="table table-striped table-bordered nowrap" width="100%"><tbody>`
            let z = 0;
            arr.forEach(l_arr => {
              HSTableHtml +=  '<tr class="odd gradeX">'
              let j = 0;
              l_arr.forEach(i =>{
                let new_i = i.replace(/ /g,"_");
                let new_i2 = i.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
                let new_codei = arr2[z][j].replace(/ /g,"_");

                HSTableHtml +=  `<td id =${new_i2}_td ><input type="checkbox" class="filter_check" name="variables" value=${new_codei} /> ${i}</td>`;

                j = j +1;
              })

                  HSTableHtml += '</tr>';
                  z = z + 1;
            })
            HSTableHtml += "</tbody></table>"
          ////console.log(HSTableHtml)
          $("#modalKeyWordSearch").find("#groups_variables").html(HSTableHtml);
          $("#KeywordLoading").addClass("hidden");
        }
        catch(e){
          $("#KeywordLoading").addClass("hidden");
          console.log(e);
          new Notify ({
            status: 'error',
            title: 'Error',
            text: `There was an error retrieving the different variables for the selected web service`,
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
          //         message: `There was an error retrieving the different variables for the selected web service`
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
      },
      error: function(error){
        console.log(error);
        $("#KeywordLoading").addClass("hidden");
        new Notify ({
          status: 'error',
          title: 'Error',
          text: `There was an error retrieving the different variables for the selected web service`,
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
        //         message: `There was an error retrieving the different variables for the selected web service`
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
  }
  catch(e){
    $("#KeywordLoading").addClass("hidden");
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `There was an error retrieving the different variables for the selected web service`,
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
    //         message: `There was an error retrieving the different variables for the selected web service`
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
// $(document).on("click", "#btn-filter-group-f", load_search_group_modal);

load_search_group_modal = function(){
  // clean the modal //
  try{
    $("#modalFilterGroup").find("#groups_countries2").empty();
    $("#modalFilterGroup").find("#groups_variables2").empty();
    show_variables_group();
    available_regions_group();
  }
  catch(e){
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `Problem loading the Filter for the groups of views`,
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
    //         message: `Problem loading the Filter for the groups of views`
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
$(document).on("click", "#btn-key-update-variables", function(){
  let checkboxes = $('#data-table').find("input[type=checkbox][name=countries]")
  let countries_selected = [];

  // Attach a change event handler to the checkboxes of the countries to receive the countries.

    countries_selected = checkboxes
      .filter(":checked") // Filter out unchecked boxes.
      .map(function() { // Extract values using jQuery map.
        return this.value.replace(/_/g, ' ');
      }).get() // Get array.

    console.log(countries_selected);
    if (countries_selected.length > 0){
      ////console.log(countries_selected);
      listener_checkbox(countries_selected)
    }
    else{
      show_variables_groups();
    }

});

available_regions_group = function(){
  try{
    let arrayActual_group=actual_group.split('=')[1];
    let group_obj = {
      'group': arrayActual_group
    };
    $("#KeywordLoading2").removeClass("hidden");
    $.ajax({
      type: "POST",
      url: `available-regions/`,
      dataType: "JSON",
      data: group_obj,

      success: function(data){
        try{
          countries_available = data['countries']
          const chunk = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
              arr.slice(i * size, i * size + size)
            );
          let arr=chunk(countries_available, 2);

          var HSTableHtml =
              `<table id="data-table2" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

            arr.forEach(l_arr => {
              HSTableHtml +=  '<tr class="odd gradeX">'
              l_arr.forEach(i =>{
                let new_i = i.replace(/ /g,"_");
                HSTableHtml +=  `<td><input type="checkbox" class="filter_check" name="countries" value=${new_i} /> ${i}</td>`;
              })

                  HSTableHtml += '</tr>';
            })


            HSTableHtml += "</tbody></table>"
          $("#modalFilterGroup").find("#groups_countries2").html(HSTableHtml);
          $("#KeywordLoading2").addClass("hidden");

        }
        catch(e){
          $("#KeywordLoading2").addClass("hidden");
          new Notify ({
            status: 'error',
            title: 'Error',
            text: `There was an retriving the regions available in the WaterOneFlow web service`,
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
          //       message: `There was an retriving the regions available in the WaterOneFlow web service`

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

      },
      error: function(error){
        $("#KeywordLoading2").addClass("hidden");
        new Notify ({
          status: 'error',
          title: 'Error',
          text: `There was an retrieving the regions available in the WaterOneFlow web service`,
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
        //         message: `There was an retriving the regions available in the WaterOneFlow web service`

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
  }
  catch (error){
    $("#KeywordLoading2").addClass("hidden")
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `We are having a problem to recognize the actual group for the request`,
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
    //       message: `We are having a problem to recognize the actual group for the request`
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

listener_checkbox_group = function(list_countries){
  try{
    let arrayActual_group=actual_group.split('=')[1];
    let le_object = {
      "countries": list_countries,
      "group":arrayActual_group
    };
    $("#KeywordLoading2").removeClass("hidden")

    $.ajax({
      type: "POST",
      url: `get-variables-for-country/`,
      dataType: "JSON",
      data: le_object,

      success: function(data){
        try{
          $("#modalFilterGroup").find("#groups_variables2").empty();
          variables_list = data['variables'];
          const chunk = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
              arr.slice(i * size, i * size + size)
            );
          let arr=chunk(variables_list, 2);

          var HSTableHtml =
              `<table id="data-table-var2" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

            arr.forEach(l_arr => {
              HSTableHtml +=  '<tr class="odd gradeX">'
              l_arr.forEach(i =>{
                let new_i = i.replace(/ /g,"_");
                let new_i2 = i.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');

                HSTableHtml +=  `<td id =${new_i2}_td2 ><input type="checkbox" class="filter_check" name="variables" value=${new_i} /> ${i}</td>`;

              })

                  HSTableHtml += '</tr>';
            })

            HSTableHtml += "</tbody></table>"
          $("#modalFilterGroup").find("#groups_variables2").html(HSTableHtml);

          $("#KeywordLoading2").addClass("hidden");

        }
        catch(e){
          $("#KeywordLoading2").addClass("hidden");
          new Notify ({
            status: 'error',
            title: 'Error',
            text: `There was an error trying to find the variables for the selected country`,
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
          //         message: `There was an error trying to find the variables for the selected country`
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

      },
      error: function(error){
        $("#KeywordLoading2").addClass("hidden");
        new Notify ({
          status: 'error',
          title: 'Error',
          text: `There was an error trying to find the variables for the selected country`,
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
        //         message: `There was an error trying to find the variables for the selected country`
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
  }
  catch (error){
    $("#KeywordLoading2").addClass("hidden")
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `There was an retriving the input data from the Web Service`,
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
    //         message: `There was an retriving the input data from the Web Service`
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

show_variables_group = function(){
  try{
    let arrayActual_group=actual_group.split('=')[1];
    let group_obj = {
      'group': arrayActual_group
    };
    $("#KeywordLoading2").removeClass("hidden");
    $.ajax({
      type: "POST",
      url: `available-variables/`,
      dataType: "JSON",
      data: group_obj,
      success: function(data){
        try{
          variables_list = data['variables'];
          const chunk = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
              arr.slice(i * size, i * size + size)
            );
          let arr=chunk(variables_list, 2);

          var HSTableHtml =
              `<table id="data-table-var2" class="table table-striped table-bordered nowrap" width="100%"><tbody>`

            arr.forEach(l_arr => {
              HSTableHtml +=  '<tr class="odd gradeX">'
              l_arr.forEach(i =>{
                let new_i = i.replace(/ /g,"_");
                let new_i2 = i.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');

                HSTableHtml +=  `<td id =${new_i2}_td2 ><input type="checkbox" class="filter_check" name="variables" value=${new_i} /> ${i}</td>`;

              })

                  HSTableHtml += '</tr>';
            })

            HSTableHtml += "</tbody></table>"
          $("#modalFilterGroup").find("#groups_variables2").html(HSTableHtml);
          $("#KeywordLoading2").addClass("hidden");
        }
        catch(e){
          $("#KeywordLoading2").addClass("hidden");
          new Notify ({
            status: 'error',
            title: 'Error',
            text: `There was an error retrieving the variables from the selected group Web Service`,
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
          //         message: `There was an error retrieving the variables from the selected group Web Service`
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


      },
      error: function(error){
        $("#KeywordLoading2").addClass("hidden");
        new Notify ({
          status: 'error',
          title: 'Error',
          text: `There was an error retrieving the variables from the selected group Web Service`,
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
        //         message: `There was an error retrieving the variables from the selected group Web Service`
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
  }
  catch (error){
    $("#KeywordLoading2").addClass("hidden");
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `There was an retriving the input data from the Web Service`,
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
    //         message: `There was an retriving the input data from the Web Service`
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

/*
************ FUNCTION NAME : CREATE_GROUP_HYDROSERVERS
************ PURPOSE : CREATES A GROUP OF HYDRSOERVERS AND ADDS IT TO THE MENU
*/
create_group_hydroservers = function(){
  try{
    //CHECKS IF THE INPUT IS EMPTY ///
    if($("#addGroup-title").val() == ""){
      $modalAddGroupHydro.find(".warning").html(  "<b>Please enter a title. This field cannot be blank.</b>")
      return false
    }
    else {
      $modalAddGroupHydro.find(".warning").html("")
    }
    if ($("#addGroup-title").val() != "") {
      var regex = new RegExp("^(?![0-9]*$)[a-zA-Z0-9]+$")
      var specials=/[*|\":<>[\]{}`\\()';@&$]/;
      var title = $("#addGroup-title").val()
      if (specials.test(title)){
      // if (!regex.test(title)) {
          $modalAddGroupHydro
              .find(".warning")
              // .html("<b>Please note that only numbers and other characters besides the underscore ( _ ) are not allowed</b>");
              .html("<b>The following characters are not permitted in the title [ * | \" : < > [ \ ] { } ` \ \ ( ) ' ; @ & $ ]</b>");
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
    $("#soapAddLoading-group").removeClass("hidden");
    let unique_id_group = uuidv4()
    id_dictionary[unique_id_group] = title
    $.ajax({
        type: "POST",
        url: `create-group/`,
        dataType: "HTML",
        data: datastring,
        success: function(result) {
            //Returning the geoserver layer metadata from the controller
            try{
              var json_response = JSON.parse(result)

              let group=json_response
              if(group.message !== "There was an error while adding th group.") {
                let title=group.title;
                let description=group.description;
                information_model[`${title}`] = [];
                let new_title = unique_id_group;

                let id_group_separator = `${new_title}_list_separator`;


                let newHtml;
                newHtml = html_for_groups(can_delete_hydrogroups, new_title, id_group_separator);
                
                $(newHtml).appendTo("#current-Groupservers");

                $(`#${title}-noGroups`).show();

                let li_object = document.getElementById(`${new_title}`);
                let input_check = li_object.getElementsByClassName("chkbx-layers")[0];

                if(!input_check.checked){
                  // //console.log("HERE NOT CHECKEC")
                  load_individual_hydroservers_group(title);
                }
                input_check.addEventListener("change", function(){
                  change_effect_groups(this,id_group_separator);
                });


                let $title="#"+new_title;
                let $title_list="#"+new_title+"list";

                $($title).click(function(){
                  $("#pop-up_description2").html("");

                  actual_group = `&actual-group=${title}`;

                  let description_html=`
                  <h3>Catalog Title</h3>
                  <p>${title}</p>
                  <h3>Catalog Description</h3>
                  <p>${description}</p>`;
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
                    new Notify ({
                      status: 'success',
                      title: 'Success',
                      text: `Successfully Created Group of views to the database`,
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
                    //         message: `Successfully Created Group of views to the database`
                    //     },
                    //     {
                    //         type: "success",
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
                    $("#modalAddGroupServer").modal("hide");
                    $("#rows_servs").empty();
                    $("#available_services").hide();
              }

              else {
                  $("#soapAddLoading-group").addClass("hidden")
                  $("#btn-add-addHydro").show();
                  new Notify ({
                    status: 'error',
                    title: 'Error',
                    text: `Failed to add to the group. Please check and try again`,
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
                  //         message: `Failed to add to the group. Please check and try again.`
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
              $("#btn-check_all").addClass("hidden");
            }
            catch(e){
              $("soapAddLoading-group").addClass("hidden");
              $("#btn-add-addHydro").show();
              new Notify ({
                status: 'error',
                title: 'Error',
                text: `There was an error adding the group of views`,
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
              //         message: `There was an error adding the group of views`
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

        },
        error: function(error) {
            $("soapAddLoading-group").addClass("hidden");
            $("#btn-add-addHydro").show();
            new Notify ({
              status: 'error',
              title: 'Error',
              text: `There was an error adding the group of views`,
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
            //         message: `There was an error adding the group of views`
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
  }
  catch(error){
    $("soapAddLoading-group").addClass("hidden");
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `There was an error while adding the group of WaterOneFlow web services`,
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
    //       message: `There was an error while adding the group of WaterOneFlow web services`
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
};

$("#btn-add-addHydro").on("click", create_group_hydroservers);
/*
****** FU1NCTION NAME : load_group_hydroservers*********
****** FUNCTION PURPOSE: LOADS THE GROUPS OF HYDROSERVERS THAT ARE THERE *********
*/
load_group_hydroservers = function(){
   $.ajax({
       type: "GET",
       url: `load-groups/`,
       dataType: "JSON",
       success: result => {
          try{
            let groups =result["hydroservers"];

            $(".divForServers").empty() //Resetting the catalog
            let extent = ol.extent.createEmpty()
            ind = 1;
            groups.forEach(group => {
                let {
                    title,
                    description
                } = group
                let unique_id_group = uuidv4()
                id_dictionary[unique_id_group] = title;

                information_model[`${title}`] = []

                let new_title = unique_id_group;
                let id_group_separator = `${new_title}_list_separator`;


                $(`#${new_title}-noGroups`).show();

                let newHtml;

                newHtml = html_for_groups(can_delete_hydrogroups, new_title, id_group_separator);
                
                $(newHtml).appendTo("#current-Groupservers");


                let li_object = document.getElementById(`${new_title}`);
                let input_check = li_object.getElementsByClassName("chkbx-layers")[0];
                load_individual_hydroservers_group(title);
                let servers_checks = document.getElementById(`${id_group_separator}`).getElementsByClassName("chkbx-layers");
                input_check.addEventListener("change", function(){
                  change_effect_groups(this,id_group_separator);
                });


                let $title="#"+new_title;
                let $title_list="#"+new_title+"list";

                $($title).click(function(){
                  $("#pop-up_description2").html("");

                  actual_group = `&actual-group=${title}`;

                  let description_html=`
                  <h3>Catalog Title</h3>
                  <p>${title}</p>
                  <h3>Catalog Description</h3>
                  <p>${description}</p>`;
                  $("#pop-up_description2").html(description_html);

                });
                ind = ind +1;

            })
          }
          catch(e){
            $("#GeneralLoading").addClass("hidden")
            new Notify ({
              status: 'error',
              title: 'Error',
              text: `There was an error while loading the different Web Services`,
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
            //         message: `There was an error while loading the different Web Services`
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


   },
   error: function(error) {
       $("#GeneralLoading").addClass("hidden")
       new Notify ({
        status: 'error',
        title: 'Error',
        text: `There was an error while loading the different Web Services`,
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
      //  $.notify(
      //      {
      //          message: `There was an error while loading the different Web Services`
      //      },
      //      {
      //          type: "danger",
      //          allow_dismiss: true,
      //          z_index: 20000,
      //          delay: 5000,
      //          animate: {
      //            enter: 'animated fadeInRight',
      //            exit: 'animated fadeOutRight'
      //          },
      //          onShow: function() {
      //              this.css({'width':'auto','height':'auto'});
      //          }
      //      }
      //  )
   }

 })
}

 /*
 ****** FU1NCTION NAME : REMOVE_INDIVIDUAL_HYDROSERVERS_GROUPS *********
 ****** FUNCTION PURPOSE: MAKES THE LAYERS OF HYDROSERVERS AND THE GROUP TAG TO DISSAPEAR WHEN THE GROUP NAME IS UNCHECK*********
 */
remove_individual_hydroservers_group = function(group_name){
  try{
    let group_name_obj={
      group: group_name
    };
    $.ajax({
        type: "POST",
        url: `catalog-group/`,
        dataType: "JSON",
        data: group_name_obj,
        success: result => {
          try{
            let servers = result["hydroserver"]

            //USE A FUNCTION TO FIND THE LI ASSOCIATED WITH THAT GROUP  AND DELETE IT FROM THE MAP AND MAKE ALL
            // THE CHECKBOXES VISIBLE //

            let extent = ol.extent.createEmpty();

            let id_group_separator = `${group_name}_list_separator`;

            let lis = document.getElementById(`${id_group_separator}`).getElementsByTagName("li");
            let li_arrays = Array.from(lis);
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
                let ul_servers = document.getElementById(`${id_group_separator}`);
            })
          }
          catch(e){
            new Notify ({
              status: 'error',
              title: 'Error',
              text: `We are having an error updating the interface, please reload the page`,
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
            //         message: `We are having an error updating the interface, please reload the page`
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


        },
        error: function(error) {
          new Notify ({
            status: 'error',
            title: 'Error',
            text: `We are having an error trying to delete the selected servers from the groups`,
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
            //         message: `We are having an error trying to delete the selected servers from the groups`
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
  }
  catch(error){
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `We are having an error trying to recognize the actual group`,
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
    //         message: `We are having an error trying to recognize the actual group`
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


 };

/*
****** FU1NCTION NAME: MAKE_LIST_GROUPS*********
****** FUNCTION PURPOSE: GET THE LIST OF THE GROUPS THAT THE APP CONTAINS *********
*/
make_list_groups = function(){
  try{
    let groupsDiv = $("#current-Groupservers").find(".accordion-item");
    let arrayGroups = Object.values(groupsDiv);
    let finalGroupArray=[];
    arrayGroups.forEach(function(g){
      if(g.id){
        let stringGroups = g.id.split("_")[0];

        finalGroupArray.push(stringGroups);


      }
    });
    var HSTableHtml =
        '<table class="table table-condensed-xs" id="tbl-hydrogroups"><thead><th>Select</th><th>Catalog Title</th></thead><tbody>'
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
                id_dictionary[title] +
                "</td>" +
                "</tr>"
        }
        HSTableHtml += "</tbody></table>"
        $("#modalDeleteGroups").find(".modal-body").html(HSTableHtml);
    }
  }
  catch(error){
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `We are having an error trying to make the list of groups in the application`,
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
    //         message: `We are having an error trying to make the list of groups in the application`
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
$("#btn-del-groups-f").on("click", make_list_groups);


/*
****** FUNCTION NAME: GET_HS_LIST_FROM_HYDROSERVER *********
****** FUNCTION PURPOSE: GET THE LIST OF HYDROSERVERS THAT A GROUP OF HYDROSERVER CONTAINS *********
*/
get_hs_list_from_hydroserver = function(){
  try{
    if(actual_group == undefined){
      actual_group="";
    }
    let arrayActual_group=actual_group.split('=')[1];
      let group_name_obj={
        group: arrayActual_group
      };

      $.ajax({
          type: "POST",
          url: `catalog-group/`,
          dataType: "JSON",
          data:group_name_obj,
          success: function(result) {
            try{
              //Dynamically generate the list of existing hydroservers
              var server = result["hydroserver"]
              var HSTableHtml =
                  '<table class="table table-condensed-xs" id="tbl-hydroservers"><thead><th>Select</th><th>View Title</th></thead><tbody>'
              if (server.length === 0) {
                  $modalDelete
                      .find(".modal-body")
                      .html(
                          "<b>There are no hydroservers in the Catalog.</b>"
                      )
              } else {
                  for (var i = 0; i < server.length; i++) {
                      var title = server[i].title
                      let new_title;
                      Object.keys(id_dictionary).forEach(function(key) {
                        if(id_dictionary[key] == title ){
                          new_title = key;
                        }
                      });
                      var url = server[i].url
                      HSTableHtml +=
                          `<tr id="${new_title}deleteID">` +
                          '<td><input class = "check_hs_delete" type="checkbox" name="server"  value="' +
                          title +
                          '"></td>' +
                          '<td class="hs_title">' +
                          title +
                          "</td>" +
                          "</tr>"
                  }
                  HSTableHtml += "</tbody></table>"
                  $modalDelete.find(".modal-body").html(HSTableHtml)
              }
            }
            catch(e){
              new Notify ({
                status: 'error',
                title: 'Error',
                text: `We are having an error trying to get the list of servers that are in the group`,
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
              //         message: `We are having an error trying to get the list of servers that are in the group`
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

          },
          error: function(error) {
              console.log(error);
              new Notify ({
                status: 'error',
                title: 'Error',
                text: `We are having an error trying to get the list of servers that are in the group`,
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
              //         message: `We are having an error trying to get the list of servers that are in the group`
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
  }
  catch(error){
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `We are having an error trying to recognize the actual group`,
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
    //         message: `We are having an error trying to recognize the actual group`
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
$(document).on("click",'#delete-server', get_hs_list_from_hydroserver);
/*
****** FU1NCTION NAME : delete_group_of_hydroservers *********
****** FUNCTION PURPOSE: DELETES THE HYDROSERVER GROUP AND THE HYDROSERVERS INSIDE THE GROUP*********
*/
delete_group_of_hydroservers = function(){
  try{
    let datastring = Object.values($("#tbl-hydrogroups").find(".chkbx-group"));
    let groups_to_delete=[];
    datastring.forEach(function(data){
      if(data.checked== true){
        let group_name = data.value;
        groups_to_delete.push(id_dictionary[group_name]);
      }
    });

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
          try{
            let groups_to_erase = result.groups;
            let hydroservers_to_erase = result.hydroservers;

            $("#pop-up_description2").empty();

            groups_to_erase.forEach(function(group){
              let group_name_e3;
              Object.keys(id_dictionary).forEach(function(key) {
                if(id_dictionary[key] == group ){
                  group_name_e3 = key;
                }
              });
              let element=document.getElementById(group_name_e3);
              element.parentNode.removeChild(element);
              let id_group_separator = `${group_name_e3}_list_separator`;
              let separator = document.getElementById(id_group_separator);
              separator.parentNode.removeChild(separator);
              let group_panel_id = `${group_name_e3}_panel`;
              let group_panel = document.getElementById(group_panel_id);
              group_panel.parentNode.removeChild(group_panel);
              $(`#${group_name_e3}deleteID`).remove();
            });

            hydroservers_to_erase.forEach(function(hydroserver){
                let new_title;
                Object.keys(id_dictionary).forEach(function(key) {
                  if(id_dictionary[key] == hydroserver ){
                    new_title = key;
                  }
                });
                map.removeLayer(layersDict[hydroserver]);
                if (layersDict.hasOwnProperty(hydroserver)){
                  delete layersDict[hydroserver]
                  $(`#${new_title}-row-complete`).remove()
                }
            });
            if(layersDict['selectedPointModal']){
              map.removeLayer(layersDict['selectedPointModal'])
              map.updateSize()

            }

            if(layersDict['selectedPoint']){
              map.removeLayer(layersDict['selectedPoint'])
              map.updateSize()
            }

            map.updateSize();
            new Notify ({
              status: 'success',
              title: 'Success',
              text: `Successfully Deleted Group!`,
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
              //         message: `Successfully Deleted Group!`
              //     },
              //     {
              //         type: "success",
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
          catch(e){
            console.log(e);
            new Notify ({
              status: 'error',
              title: 'Error',
              text: `We are having an error deleting the selected groups of views`,
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
            //         message: `We are having an error deleting the selected groups of views`
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



        },
        error: function(error) {
            console.log(error);
            new Notify ({
              status: 'error',
              title: 'Error',
              text: `We are having an error deleting the selected groups of views`,
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
            //         message: `We are having an error deleting the selected groups of views`
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
    }
    else{
      new Notify ({
        status: 'warning',
        title: 'Warning',
        text: `You need to select at least one group to delete`,
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
      //         message: `You need to select at least one group to delete`
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
  catch(err){
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `We are having problems trying to recognize the actual group`,
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
    //         message: `We are having problems tryingto recognize the actual group`
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

$("#btn-del-hydro-groups").on("click", delete_group_of_hydroservers);
/*
************ FUNCTION NAME : GET_KEYWORDS_FROM_GROUPS
************ PURPOSE : THE FUNCTION LETS YOU FILTER THE HYDROSERVERS LIST FROM THE SELECTED GROUPS OF HYDROSERVERS

*/
catalog_filter = function(){
  var styles = {
    'MultiPolygon': [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgb(128,128,128)',
        lineDash: [4],
        width: 3
      }),
      fill: new ol.style.Fill({
        color: 'rgba(119,136,153, 0.05)'
      })
    })],
    'Polygon': [new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgb(128,128,128)',
          lineDash: [4],
          width: 3
        }),
        fill: new ol.style.Fill({
          color: 'rgba(119,136,153, 0.05)'
        })
      })],
  };

  var styleFunction = function(feature, resolution) {
    return styles[feature.getGeometry().getType()];
  };


  try{
    let elementForm= $("#modalKeyWordSearch");
    let datastring= elementForm.serialize();
    $("#KeywordLoading").removeClass("hidden");
    $.ajax({
        type: "POST",
        url: `catalog-filter/`,
        dataType: "HTML",
        data: datastring,
        success: function(result) {
          try{
            let jeojson = JSON.parse(JSON.parse(result)['geojson']);
            map.removeLayer(layer_selected_countries['countries']);

            if(jeojson['features'].length > 0){
              for(let z = 0; z < jeojson['features'].length; ++z){
                if(jeojson['features'][z]['geometry']['type'] == "Polygon"){
                  for (let i = 0; i < jeojson['features'][z]['geometry']['coordinates'][0].length; ++i){
                    jeojson['features'][z]['geometry']['coordinates'][0][i] = ol.proj.transform(jeojson['features'][z]['geometry']['coordinates'][0][i],
                        "EPSG:4326",
                        "EPSG:3857"
                    )
                  }
                }
                if(jeojson['features'][z]['geometry']['type'] == "MultiPolygon"){
                  for (let i = 0; i < jeojson['features'][z]['geometry']['coordinates'].length; ++i){
                    for(let j= 0; j < jeojson['features'][z]['geometry']['coordinates'][i][0].length; ++j){

                      jeojson['features'][z]['geometry']['coordinates'][i][0][j] = ol.proj.transform(jeojson['features'][z]['geometry']['coordinates'][i][0][j],
                          "EPSG:4326",
                          "EPSG:3857"
                      )
                    }
                  }
                }
              }

              var vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(jeojson)
              });

              var vectorLayer2 = new ol.layer.Vector({
                source: vectorSource,
                style: styleFunction

              });
              map.removeLayer(layer_selected_countries['countries']);
              layer_selected_countries['countries'] = vectorLayer2
            }


            let hs_available = JSON.parse(result)['hs'];
            let new_hs_available = []
            hs_available.forEach(function(hs){
              let hs_new2;
              Object.keys(id_dictionary).forEach(function(key) {
                if(id_dictionary[key] == hs ){
                  hs_new2 = key;
                  // console.log(hs_available);
                  new_hs_available.push(hs_new2);

                }
              });
            })
            // console.log(new_hs_available);
            let sitesObj =  JSON.parse(result)['stations'];
            map.getLayers().forEach(function(layer) {
              if(layer instanceof ol.layer.Vector){
                layer.setStyle(new ol.style.Style({}));
              }
            });

            // if(jeojson['features'].length > 0){
            //   map.addLayer(layer_selected_countries['countries']);
            //   map.getView().fit(layer_selected_countries['countries'].getSource().getExtent());
            //   map.updateSize();
            // }


            for(let i = 0;  i< sitesObj.length; ++i){
              let title = sitesObj[i]['title']
              let url = sitesObj[i]['url']
              let sites = sitesObj[i]['sites'];
              var vectorLayer = map_layers(sites,title,url)[0]
              var vectorSource = map_layers(sites,title,url)[1]
              map.getLayers().forEach(function(layer) {
                // if(layer instanceof ol.layer.Vector){
                //   layer.setStyle(new ol.style.Style({}));
                // }
                //
                   if(layer instanceof ol.layer.Vector && layer == layersDict[title]){
                       layer.setStyle(new ol.style.Style({}));
                     }
               });


              map.addLayer(vectorLayer)
              vectorLayer.set("selectable", true)
              layer_object_filter[title] = vectorLayer;

              if(layersDict['selectedPointModal']){
                map.removeLayer(layersDict['selectedPointModal'])
                map.updateSize()
              }
              if(layersDict['selectedPoint']){
                map.removeLayer(layersDict['selectedPoint'])
                map.updateSize()
              }

            }
            $("#btn-r-reset").show()
            $("#btn-r-reset").on("click", reset_keywords);
            $("#current-Groupservers").find("li").each(function()
               {
                 var $li=$(this)['0'];
                 let id_li = $li['id'];
                 $(`#${id_li} input[type=checkbox]`).each(function() {
                   this.checked = false;
                 });
               });
            $("#current-Groupservers").find("li").each(function()
               {
                  var $li=$(this)['0'];
                  let id_li = $li['id'];

                  if(new_hs_available.includes(id_li)){

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
                    let groups_divs_3e = []
                    groups_divs.forEach(function(g3){
                      let g_new2;
                      Object.keys(id_dictionary).forEach(function(key) {
                        if(id_dictionary[key] == g3 ){
                          g_new2 = key;
                        }
                      });
                      groups_divs_3e.push(g_new2);
                    })
                    groups_divs = groups_divs_3e
                    if (!groups_divs.includes(id_li)){
                      $(`#${id_li}`).css({"opacity": "0.5",
                                           "border-color": "#d3d3d3",
                                           "border-width":"1px",
                                           "border-style":"solid",
                                           "color":"#555555",
                                           "font-weight": "normal"});
                    }
                  }
               });
               let groups_divs = Object.keys(information_model);

               for(let i=0; i< groups_divs.length; ++i){
                 let check_all = []
                 for(let j=0; j< information_model[groups_divs[i]].length; ++j){

                   let service_div = information_model[groups_divs[i]][j];
                   let new_service_div;
                   Object.keys(id_dictionary).forEach(function(key) {
                     if(id_dictionary[key] == service_div ){
                       new_service_div = key;
                     }
                   });
                   $(`#${new_service_div} input[type=checkbox]`).each(function(){
                     if(this.checked){
                       check_all.push(true);
                     }
                     else{
                       check_all.push(false);
                     }
                   });
                 }
                 if(!check_all.includes(false) && check_all.length > 0){
                   let groups_divs_3e = []
                   groups_divs.forEach(function(g3){
                     let g_new2;
                     Object.keys(id_dictionary).forEach(function(key) {
                       if(id_dictionary[key] == g3 ){
                         g_new2 = key;
                       }
                     });
                     groups_divs_3e.push(g_new2);
                   })

                   $(`#${groups_divs_3e[i]} input[type=checkbox]`).each(function() {
                     this.checked = true;
                   });
                 }
               }


            $("#KeywordLoading").addClass("hidden");

          }
          catch(e){
            console.log(e);
            $("#KeywordLoading").addClass("hidden");
            new Notify ({
              status: 'error',
              title: 'Error',
              text: `Something were wrong when filtering the web services by region`,
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
            //         message: `Something were wrong when filtering the web services by region`
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

        },
        error: function(error) {
          console.log(error);
          $("#KeywordLoading").addClass("hidden");
          new Notify ({
            status: 'error',
            title: 'Error',
            text: `Something were wrong when filtering the web services by region`,
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
          //         message: `Something were wrong when filtering the web services by region`
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
  }
  catch(error){
    $("#KeywordLoading").addClass("hidden");
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `We are having a problem trying to retrieve the regions to filter the groups`,
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
    //         message: `We are having a problem trying to retrieve the regions to filter the groups`
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
$("#btn-key-search").on("click", catalog_filter);

catalog_filter_server = function(){
  try{
    let elementForm= $("#modalFilterGroup");
    let datastring= elementForm.serialize();
    datastring += actual_group;
    $("#KeywordLoading2").removeClass("hidden");

    $.ajax({
        type: "POST",
        url: `catalog-filter/`,
        dataType: "HTML",
        data: datastring,
        success: function(result) {
          try{
            let check_for_none = []
            let hs_available = JSON.parse(result)['hs'];
            let arrayActual_group=actual_group.split('=')[1];
            $(`#${arrayActual_group}_list_separator`).find("li").each(function()
               {
                  var $li=$(this)['0'];
                  let id_li = $li['id'];
                  if(hs_available.includes(id_li)){
                    $(`#${id_li}`).css({"opacity": "1",
                                        "border-color": "#ac2925",
                                        "border-width": "2px",
                                        "border-style": "solid",
                                        "color": "black",
                                        "font-weight": "bold"});

                  }
                  else{

                    $(`#${id_li}`).css({"opacity": "0.5",
                                        "border-color": "#d3d3d3",
                                        "border-width":"1px",
                                        "border-style":"solid",
                                        "color":"#555555",
                                        "font-weight": "normal"});
                  }
               });

               $("#KeywordLoading2").addClass("hidden");
          }
          catch(e){
            $("#KeywordLoading2").addClass("hidden");
            new Notify ({
              status: 'error',
              title: 'Error',
              text: `Something were wrong when applying the filter with variables and regions`,
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
            //         message: `Something were wrong when applying the filter with variables and regions`
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


        },
        error: function(error) {
          $("#KeywordLoading2").addClass("hidden");
          new Notify ({
            status: 'error',
            title: 'Error',
            text: `Something were wrong when applying the filter with variables and regions`,
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
          //         message: `Something were wrong when applying the filter with variables and regions`
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
  }
  catch(error){
    $("#KeywordLoading2").addClass("hidden");
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `We are having a problem trying to retrieve the regions to filter the group`,
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
    //         message: `We are having a problem trying to retrieve the regions to filter the groups`
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
$("#btn-key-search-catalog").on("click", catalog_filter_server);

reset_keywords = function(){
  try{
    $('#btn-r-reset').hide();
    Object.keys(information_model).forEach(function(key) {

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
    map.removeLayer(layer_selected_countries['countries']);

    layer_object_filter={};


    $("#current-Groupservers").find("li").each(function(){
          var $li=$(this)['0'];
          let id_li = $li['id'];

          $(`#${id_li}`).css({"opacity": "1",
                              "border-color": "#d3d3d3",
                              "border-width":"1px",
                              "border-style":"solid",
                              "color":"#555555",
                              "font-weight": "normal"});


   });
  }
  catch(error){
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `There is a problem resetting the filter`,
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
    //         message: `There is a problem reseting the fitler`
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

$("#btn-r-reset").on("click", reset_keywords);
$("#btn-r-reset-catalog").on("click", reset_keywords);

/*
************ FUNCTION NAME : GET_ALL_THE_CHECKED_KEYWORDS
************ PURPOSE : GET ALL THE CHECKED KEYWORDS FROM THE POP-UP MENU
*/
get_all_the_checked_keywords = function(){
  try{
    // ONLY THE KEY WORDS //
    let datastring = Array.from(document.getElementsByClassName("odd gradeX"));
    let key_words_to_search=[];
    datastring.forEach(function(data){
      Array.from(data.children).forEach(function(column){
        if(Array.from(column.children)[0].checked ==true){
          key_words_to_search.push(Array.from(column.children)[0].nextSibling.nodeValue.trim())
        }
      })
    });
    return key_words_to_search;
  }
  catch(err){
    console.log(err);
  }

}

generateListServices = function(){
  try{
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
                <button type="button" class="btn btn-primary" id="${result1['siteInfo'][i]['sitecode']}_modal"><i class="bi bi-pin-angle-fill"></i></button></p>
                  <p>Station/Platform Code: ${result1['siteInfo'][i]['sitecode']}</p>
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
  catch(error){
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `There is a problem retrieving the list of services from the Web service Endpoint`,
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
    //         message: `There is a problem retrieving the list of services from the Web service Endpoint`
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

load_info_model = function(){
  try{
    var HSTableHtml = ''
      Object.keys(information_model).forEach(function(key) {
      HSTableHtml +=
        `<h4 id="titleSite">${key}</h4>`
      information_model[key].forEach(function(serviceView){
        HSTableHtml +=
        `<p class= "fakeRow">${serviceView}</p>`
      })
    });

    $("#modalKeyWordSearch").find("#groups_services").html(HSTableHtml);
  }
  catch(error){
    console.log(error);
  }

}

load_search_modal = function(){
  try{
    load_info_model();
    show_variables_groups();
    available_regions();
  }
  catch(error){
    console.log(error);
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `We are having an error trying to load the menu`,
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
    //         message: `We are having an error trying to load the menu`
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
$("#btn-filter-groups-f").on("click", load_search_modal);

searchGroups = function() {
  try{
    general_search("myInputKeyword","data-table");
  }
  catch(error){
    console.log(error);
  }
}
document.getElementById('myInputKeyword').addEventListener("keyup", searchGroups);

searchVariables = function() {
  try{
    general_search("myInputKeyword2","data-table-var");

  }
  catch(error){
    console.log(error);
  }
}
document.getElementById('myInputKeyword2').addEventListener("keyup", searchVariables);

// for only one group
searchGroups_group = function() {
  try{
    general_search("myInputKeywordGroup","data-table2");
  }
  catch(error){
    console.log(error);
  }
}
document.getElementById('myInputKeywordGroup').addEventListener("keyup", searchGroups_group);

searchVariablesGroup = function() {
  try{
    general_search("myInputKeywordGroup2","data-table-var2");
  }
  catch(error){
    console.log(error);
  }
}
document.getElementById('myInputKeywordGroup2').addEventListener("keyup", searchVariablesGroup);

general_search = function(id_search_input, id_table){
  try{
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
  }
  catch(error){
    new Notify ({
      status: 'error',
      title: 'Error',
      text: `We are having a problem trying doing the search`,
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
    //         message: `We are having a problem trying doing the search`
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
