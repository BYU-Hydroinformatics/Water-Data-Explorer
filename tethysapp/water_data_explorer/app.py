from tethys_sdk.base import TethysAppBase
from tethys_sdk.app_settings import PersistentStoreDatabaseSetting, CustomSetting
from tethys_sdk.permissions import Permission, PermissionGroup


class WaterDataExplorer(TethysAppBase):
    """
    Tethys app class for Water Data Explorer.
    """

    name = 'Water Data Explorer'
    index = 'home'
    icon = 'water_data_explorer/images/wde.png'
    package = 'water_data_explorer'
    root_url = 'water-data-explorer'
    color = '#868e96'
    description = '"A tethys app that lets the user to visualize and query WSDL enpoints'
    tags = '"Hydrology", "WMO", "BYU"'
    enable_feedback = False
    feedback_emails = []

    controller_modules = ['startAll', 'sites', 'endpoints', 'catalogs', ]

    def permissions(self):
        """
        Example permissions method.
        """
        # Viewer Permissions
        delete_hydrogroups = Permission(
            name='delete_hydrogroups',
            description='Delete a Hydrogroup from the App',
        )

        block_map = Permission(
            name='block_map',
            description='locks the map to a certain limit',
        )
        use_wde = Permission(
            name='use_wde',
            description='Use WDE'
        )
        can_download = Permission(
            name='can_download',
            description='download data if logged in'
        )
        download_at_least = PermissionGroup(
            name='download_at_least',
            permissions=(can_download,)
        )

        admin = PermissionGroup(
            name='admin',
            permissions=(delete_hydrogroups, block_map, use_wde)
        )

        permissions = (admin, download_at_least)

        return permissions

    def custom_settings(self):
        custom_settings = (

            CustomSetting(
                name='Views Names',
                type=CustomSetting.TYPE_STRING,
                description='Name of the region holding the views (e.g. La Plata Basin)',
                required=False
            ),
            CustomSetting(
                name='InstitutionLogo',
                type=CustomSetting.TYPE_STRING,
                description='Link containing the institution logo.',
                required=False
            ),
            CustomSetting(
                name='Boundary Geoserver Endpoint',
                type=CustomSetting.TYPE_STRING,
                description='Geoserver endpoint for the hydroshare resource containning the layer \
                  (e.g:"https://geoserver.hydroshare.org/geoserver/layerID")',
                required=False
            ),
            CustomSetting(
                name='Boundary Workspace Name',
                type=CustomSetting.TYPE_STRING,
                description='workspace and layer name (e.g workspace:layername)',
                required=False
            ),
            CustomSetting(
                name='Boundary Layer Name',
                type=CustomSetting.TYPE_STRING,
                description='layer name (e.g workspace:layername)',
                required=False
            ),
            CustomSetting(
                name='Boundary Movement',
                type=CustomSetting.TYPE_BOOLEAN,
                description='Block or Allow movement outside the map boundary layer (True/False)',
                required=False

            ),
            CustomSetting(
                name='Boundary Color',
                type=CustomSetting.TYPE_STRING,
                description='The color style for the boundary (e.g #ffcc33)',
                required=False
            ),
            CustomSetting(
                name='Boundary Width',
                type=CustomSetting.TYPE_STRING,
                description='Width of the boundary. A number from 1 to 10',
                required=False
            ),
            CustomSetting(
                name='GA_MEASUREMENT_ID',
                type=CustomSetting.TYPE_STRING,
                description='GA_MEASUREMENT_ID for Google Analytics gtag.js',
                required=False
            ),

        )
        return custom_settings

    # Persistant storage
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
