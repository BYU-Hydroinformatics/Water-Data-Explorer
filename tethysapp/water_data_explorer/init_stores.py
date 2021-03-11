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

        session.close()
