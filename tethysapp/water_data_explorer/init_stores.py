from sqlalchemy.orm import sessionmaker
from .model import Base, Catalog, HISCatalog, HydroServer_Individual, Groups
from .auxiliary2 import *
from .app import WaterDataExplorer as app

# Initialize an empty database, if the database has not been created already.


def init_catalog_db(engine, first_time):
    print("Customizing Persintant Storage")
    Base.metadata.create_all(engine)
    if first_time:
    # # Make session
        SessionMaker = sessionmaker(bind=engine)
        session = SessionMaker()
        # hydro_group_name = app.get_custom_setting('Hydroserver Group')
        # hydro_group_description = app.get_custom_setting('Hydroserver Group Description')
        # hydroserver1_name=app.get_custom_setting('Hydroserver Name # 1')
        # hydroserver1_endpoint=app.get_custom_setting('Hydroserver Endpoint # 1')
        # hydroserver2_name=app.get_custom_setting('Hydroserver Name # 2')
        # hydroserver2_endpoint=app.get_custom_setting('Hydroserver Endpoint # 2')
        # hydroserver3_name=app.get_custom_setting('Hydroserver Name # 3')
        # hydroserver3_endpoint=app.get_custom_setting('Hydroserver Endpoint # 3')

        # hydro_group_name = "Demo Group"
        # hydro_group_description = 'This is a group of hydroservers created at the beginning of every installation for demonstration purposes'
        # hydroserver1_name="Glacial Ridge Hydroserver"
        # hydroserver1_endpoint="http://hydroportal.cuahsi.org/glacialridge/cuahsi_1_1.asmx?WSDL"
        # hydroserver2_name="Para la Naturaleza Hydroserver"
        # hydroserver2_endpoint="http://hydroportal.cuahsi.org/para_la_naturaleza/cuahsi_1_1.asmx?WSDL"
        # hydroserver3_name="Kent State Hydroserver"
        # hydroserver3_endpoint="http://hydroportal.cuahsi.org/KentState/cuahsi_1_1.asmx?WSDL"

        # THESE TWO WERE ADDED FOR THE GROUPS AND FOR THE INDIVIDUAL HYDROSERVER WITH RELATIONSHIPS BETWEEN THE TWO TABLES

        # group_default=Groups(title=hydro_group_name, description= hydro_group_description)
        # session.add(group_default)
        # session.commit()
        session.close()
        # print("Created Hydroservers group")
        #
        # addHydroservers(hydroserver1_endpoint,hydroserver1_name,hydro_group_name)
        # print("Created Hydroserver 1")
        #
        # addHydroservers(hydroserver2_endpoint,hydroserver2_name,hydro_group_name)
        # print("Created Hydroserver 2")
        #
        # addHydroservers(hydroserver3_endpoint,hydroserver3_name,hydro_group_name)
        # print("Created Hydroserver 3")
