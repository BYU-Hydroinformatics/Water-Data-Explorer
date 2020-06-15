from sqlalchemy.orm import sessionmaker
from .model import Base, Catalog, HISCatalog, HydroServer_Individual, Groups

# Initialize an empty database, if the database has not been created already.


def init_catalog_db(engine, first_time):
    Base.metadata.create_all(engine)
    print("hola this is the db")
    if first_time:
        # Make session
        SessionMaker = sessionmaker(bind=engine)
        session = SessionMaker()

        # Default HIS Central

        central_one = HISCatalog(title="CUAHSI",
                                 url="http://hiscentral.cuahsi.org/webservices/hiscentral.asmx")

        hs_one=Catalog(title="Dominican Republic", url="http://128.187.106.131/app/index.php/dr/services/cuahsi_1_1.asmx?WSDL", siteinfo="this data is from Dominican Republic")

        # THESE TWO WERE ADDED FOR THE GROUPS AND FOR THE INDIVIDUAL HYDROSERVER WITH RELATIONSHIPS BETWEEN THE TWO TABLES
        hydroserver_individual=HydroServer_Individual(title="Dominican Republic", url="http://128.187.106.131/app/index.php/dr/services/cuahsi_1_1.asmx?WSDL", siteinfo="this data is from Dominican Republic")
        group_default=Groups(title="Default group", description= "This is the default group")

        print("hola")
        session.add(hs_one)
        session.add(central_one)
        session.add(hydroserver_individual)
        session.add(group_default)
        session.commit()
        session.close()
