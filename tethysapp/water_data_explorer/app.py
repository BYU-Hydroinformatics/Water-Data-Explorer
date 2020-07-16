from tethys_sdk.base import TethysAppBase, url_map_maker
from tethys_sdk.app_settings import PersistentStoreDatabaseSetting, SpatialDatasetServiceSetting, CustomSetting
from tethys_sdk.permissions import Permission, PermissionGroup

class WaterDataExplorer(TethysAppBase):
    """
    Tethys app class for Water Data Explorer.
    """

    name = 'Water Data Explorer'
    index = 'water_data_explorer:home'
    icon = 'water_data_explorer/images/logoo.png'
    package = 'water_data_explorer'
    root_url = 'water-data-explorer'
    color = '#f2910d'
    description = '"A tethys app that lets the user to visualize and query WSDL enpoints'
    tags = '"Hydrology", "WMO", "BYU"'
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='water-data-explorer',
                controller='water_data_explorer.controllers.home'
            ),
            UrlMap(name='his-server',
                   url='his-server',
                   controller='water_data_explorer.controllers.get_his_server'),
            # Returns the selected HIS server from the select HIS
            # server modal.

            UrlMap(name='catalog',
                   url='catalog',
                   controller='water_data_explorer.controllers.catalog'),
           UrlMap(name='delete',
                   url='delete',
                   controller='water_data_explorer.controllers.delete'),
            # Deletes a selected HydroServer from the local database
            UrlMap(name='add-central',
                   url='add-central/',
                   controller='water_data_explorer.controllers.add_central'),
            # Add a central catalog, but it is still in progress.
            UrlMap(name='create-group',
                   url='create-group/',
                   controller='water_data_explorer.controllers.create_group'),
            # Create a new group for the hydroservers ##
            UrlMap(name='load-groups',
                   url='load-groups/',
                   controller='water_data_explorer.controllers.get_groups_list'),
            # Load groups for the hydroservers ##
            UrlMap(name='add-hydrosever-groups',
                   url='soap-group/',
                   controller='water_data_explorer.controllers.soap_group'),
            # Load groups for the hydroservers ##
            UrlMap(name='load-hydroserver-of-groups',
                   url='catalog-group',
                   controller='water_data_explorer.controllers.catalog_group'),
            # Load the hydroservers from a specific group##

            UrlMap(name='delete-group-hydroserver',
                   url='delete-group-hydroserver/',
                   controller='water_data_explorer.controllers.delete_group_hydroserver'),
            ## Delete an speicific hydroserver or multiple from a specific group ##

            UrlMap(name='delete-group',
                   url='delete-group/',
                   controller='water_data_explorer.controllers.delete_group'),
            ## Delete an speicific hydroserver or multiple from a specific group ##
            UrlMap(name='keyword-group',
                   url='keyword-group',
                   controller='water_data_explorer.controllers.keyWordsForGroup'),
            ## Find the keywords for each hydrpserver in a group##
            UrlMap(name='get-values-hs',
                   url='get-values-hs',
                   controller='water_data_explorer.controllers.get_values_hs'),
            ## Get the variables of a hydroserver
            UrlMap(name='get-values-hs',
                   url='get-values-graph-hs',
                   controller='water_data_explorer.controllers.get_values_graph_hs'),
            ## Get the values of a hydroserver
            UrlMap(name='get-variables-hs',
                   url='get-variables-hs',
                   controller='water_data_explorer.controllers.get_variables_hs'),
            ## Get the values of a hydroserver
            UrlMap(name='get-available-sites',
                   url='get-available-sites',
                   controller='water_data_explorer.controllers.get_available_sites'),
            ## Get the values of a hydroserver

        )

        return url_maps

    def permissions(self):
        """
        Example permissions method.
        """
        # Viewer Permissions
        delete_hydrogroups = Permission(
            name = 'delete_hydrogroups',
            description = 'Delete a Hydrogroup from the App',
        )

        block_map = Permission(
            name='block_map',
            description='locks the map to a certain limit',
        )

        admin = PermissionGroup(
            name='admin',
            permissions=(delete_hydrogroups, block_map)
        )


        permissions = (admin, )

        return permissions

    def custom_settings(self):
        custom_settings = (
            CustomSetting(
                name='Hydroserver Group',
                type = CustomSetting.TYPE_STRING,
                description='name of the group that will contain the hydroservers',
                required = True
            ),
            CustomSetting(
                name='Hydroserver Group Description',
                type = CustomSetting.TYPE_STRING,
                description='Description of the group that will contain the hydroserver',
                required = True
            ),
            CustomSetting(
                name='Hydroserver Name # 1',
                type = CustomSetting.TYPE_STRING,
                description='Hydroserver # 1 Name',
                required = True
            ),
            CustomSetting(
                name='Hydroserver Endpoint # 1',
                type = CustomSetting.TYPE_STRING,
                description='Hydroserver WSDL Endpoint (e.g. http://hydroportal.cuahsi.org/cedarriver/cuahsi_1_1.asmx?WSDL)',
                required = True
            ),
            CustomSetting(
                name='Hydroserver Name # 2',
                type = CustomSetting.TYPE_STRING,
                description='Hydroserver # 2 Name',
                required = True
            ),
            CustomSetting(
                name='Hydroserver Endpoint # 2',
                type = CustomSetting.TYPE_STRING,
                description='Hydroserver WSDL Endpoint (e.g. http://hydroportal.cuahsi.org/cedarriver/cuahsi_1_1.asmx?WSDL)',
                required = True
            ),
            CustomSetting(
                name='Hydroserver Name # 3',
                type = CustomSetting.TYPE_STRING,
                description='Hydroserver # 3 Name',
                required = True
            ),
            CustomSetting(
                name='Hydroserver Endpoint # 3',
                type = CustomSetting.TYPE_STRING,
                description='Hydroserver WSDL Endpoint (e.g. http://hydroportal.cuahsi.org/cedarriver/cuahsi_1_1.asmx?WSDL)',
                required = True
            ),
            CustomSetting(
                name='Boundary Geoserver Endpoint',
                type = CustomSetting.TYPE_STRING,
                description='Geoserver endpoint for the hydroshare resource containning the layer (e.g:"https://geoserver.hydroshare.org/geoserver/layerID")',
                required=False
            ),
            CustomSetting(
                name='Boundary Workspace Name',
                type = CustomSetting.TYPE_STRING,
                description='workspace and layer name (e.g workspace:layername)',
                required=False
            ),
            CustomSetting(
                name='Boundary Layer Name',
                type = CustomSetting.TYPE_STRING,
                description='layer name (e.g workspace:layername)',
                required=False
            ),
            CustomSetting(
                name='Boundary Movement',
                type = CustomSetting.TYPE_BOOLEAN,
                description='Block or Allow movement outside the map boundary layer (True/False)',
                required=False

            ),
            CustomSetting(
                name='Boundary Color',
                type = CustomSetting.TYPE_STRING,
                description='The color style for the boundary (e.g #ffcc33)',
                required=False
            ),
            CustomSetting(
                name='Boundary Width',
                type = CustomSetting.TYPE_STRING,
                description='Width of the boundary. A number from 1 to 10',
                required=False
            ),
        )
        # return
        return custom_settings

    #### Persistant storage ###
    def persistent_store_settings(self):
        ps_settings = (
            PersistentStoreDatabaseSetting(
                name='catalog_db',
                description='catalogs database',
                initializer='water_data_explorer.init_stores.init_catalog_db',
                required=True
            ),
        )
        return ps_settings
