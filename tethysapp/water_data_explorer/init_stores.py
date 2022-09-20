from sqlalchemy.orm import sessionmaker
from .model import Base

# Initialize an empty database, if the database has not been created already.


def init_catalog_db(engine, first_time):
    print("Initializing Persistant Storage")
    Base.metadata.create_all(engine)
    if first_time:
        # # Make session
        SessionMaker = sessionmaker(bind=engine)
        session = SessionMaker()

        session.close()
        print("Finishing Initializing Persistant Storage")
