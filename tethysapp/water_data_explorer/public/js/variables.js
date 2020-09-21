/************************************************************************
 *                     GLOBAL VARIABLES
 *************************************************************************/
var colors,
    current_layer,
    layers,
    layersDict, //Dictionary for keeping track of the new layers that are being added to the map
    map,
    map2,
    shpSource,
    shpLayer,
    wmsLayer,
    wmsSource,
    actualLayerModal,
    actualCoordinatesModal=[];
/************************************************************************
 *                    PUBLIC FUNCTION DECLARATIONS
 *************************************************************************/
var filter_words,
    add_soap,
    addDefaultBehaviorToAjax,
    checkCsrfSafe,
    getCookie,
    click_catalog,
    clear_coords,
    generate_graph,
    generate_plot,
    get_climate_serv,
    get_data_rods,
    get_his_server,
    get_hs_list,
    get_random_color,
    init_map,
    init_menu,
    init_jquery_var,
    init_events,
    load_catalog,
    location_search,
    $modalAddHS,
    $modalAddSOAP,
    set_color,
    $SoapVariable,
    $modalAddGroupHydro,
    $modalHIS,
    $modalClimate,
    $modalDelete,
    $modalDataRods,
    $modalInterface,
    $modalUpload,
    $btnUpload,
    onClickZoomTo,
    onClickDeleteLayer,
    $hs_list,
    prepare_files,
    update_catalog,
    upload_file,
    createExportCanvas,
    create_group_hydroservers,
    load_group_hydroservers,
    load_individual_hydroservers_group,
    actual_group,
    add_hydroserver,
    delete_hydroserver,
    delete_hydroserver_Individual,
    make_list_groups,
    get_hs_list_from_hydroserver,
    delete_group_of_hydroservers,
    get_keywords_from_group,
    remove_individual_hydroservers_group,
    get_all_the_checked_keywords,
    get_servers_with_keywords_from_group,
    remove_list_and_layers_from_hydroservers,
    reset_keywords,
    get_active_hydroservers_groups,
    lis_deleted = [],
    layers_deleted = [],
    lis_separators = [],
    activate_deactivate_graphs,
    activate_layer_values,
    initialize_graphs,
    object_request_graphs ={},
    // object_request_variable={},
    select_variable_change,
    select_variable_change2,
    codes_variables_array={},
    change_type_graphs_group,
    change_type_graphs_individual,
    add_boundary_map,
    disable_map,
    active_map_feature_graphs = {
      'scatter':{},
      'bar':{},
      'pie':{},
      'whisker':{}
    },
    cleanGraphs,
    showVariables,
    showAvailableSites,
    filterSites={
      'group':"none",
      'hs':"none"
    },
    layer_object_filter={},
    hydroserver_information,
    searchSites,
    ind2 = "\n\u2022",
    ind = 1,
    group_show_actual,
    hs_show_actual;

  /************************************************************************
 *                    PRIVATE FUNCTION IMPLEMENTATIONS : How are these private? JS has no concept of that
 *************************************************************************/
colors = [
    "#ff0000",
    "#0033cc",
    "#000099",
    "#ff0066",
    "#ff00ff",
    "#800000",
    "#6699ff",
    "#6600cc",
    "#00ffff"
]
