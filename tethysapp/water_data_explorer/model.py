# Put your persistent store models in this file
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import JSON, JSONB
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy.orm import sessionmaker, relationship
from .app import WaterDataExplorer as app
from sqlalchemy.sql import func

Base = declarative_base()


class Catalog(Base):
    __tablename__ = 'hydroservers'

    id = Column(Integer, primary_key=True)  # Record number.
    title = Column(String(50))  # Tile as given by the admin
    url = Column(String(2083))  # URL of the SOAP endpointx
    siteinfo = Column(JSON)
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

    def __init__(self, title, url, siteinfo):
        self.title = title
        self.url = url
        self.siteinfo = siteinfo

class HISCatalog(Base):
    __tablename__ = 'hiscentrals'

    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    url = Column(String(2083))

    def __init__(self, title, url):
        self.title = title
        self.url = url

# class CatalogGroup(Base):
#     __tablename__ = 'GroupsHydroservers'
#
#     id = Column(Integer, primary_key=True)  # Record number.
#     title = Column(String(50))  # Tile as given by the admin
#     url = Column(String(2083))  # URL of the SOAP endpointx
#     siteinfo = Column(JSON)
#     group_id = Column(Integer, ForeignKey('groups.id'))
#     group = relationship("Groups", back_populates="catalogGroups")  # Tile as given by the admin
#     time_updated = Column(DateTime(timezone=True), onupdate=func.now())
#
#     def __init__(self, title, url, siteinfo,group):
#         self.title = title
#         self.url = url
#         self.siteinfo = siteinfo
#         self.group= group

class Groups(Base):
    __tablename__ = 'Group_Hydroserver_Individuals'

    id = Column(Integer, primary_key=True)  # Record number.
    title = Column(String(50))  # Tile as given by the admin
    description = Column(Text)  # URL of the SOAP endpointx
    hydroserver = relationship("HydroServer_Individual", back_populates ="group", cascade = "all,delete, delete-orphan" )
    #all, delete-orphan,save-update
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

    def __init__(self, title, description):
        self.title = title
        self.description= description


class HydroServer_Individual(Base):
    __tablename__ = 'Hydroserver_Singular'

    id = Column(Integer, primary_key=True)  # Record number.
    title = Column(String(50))  # Tile as given by the admin
    url = Column(String(2083))  # URL of the SOAP endpointx
    siteinfo = Column(JSON)
    group_id = Column(Integer, ForeignKey('Group_Hydroserver_Individuals.id'))
    group = relationship("Groups", back_populates="hydroserver")  # Tile as given by the admin
    #cascade="all, delete-orphan"
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

    def __init__(self, title, url, siteinfo):
        self.title = title
        self.url = url
        self.siteinfo = siteinfo







# #THIS IS A GENERIC CLASS AND IT IS USEFUL TO DEFINE AND TABLE CLASS, SO IT CAN BE USED FOR DIFFERENT
# # TABLES THAT CONTAIN HYDROSERVERS THAT ARE RELATED TO EACH ONE.
# class GroupCatalog(Base):
#     def __init__(self, title, url, siteinfo):
#         self.title = title
#         self.url = url
#         self.siteinfo = siteinfo



# def init_group_table(table_name):
#     group_hydroserver = Table(table_name, Base,
#         Column('id', Integer, primary_key=True),
#         Column('title', String(50)),
#         Column('url', String(2083)),
#         Column('siteinfo', JSON),
#         Column('time_updated', DateTime(timezone=True), onupdate=func.now())
#     )
#     Base.metadata.create_all(engine)
#     mapper(GroupCatalog, group_hydroserver)
#
# def declare_group_table(request, table_name):
#     return_obj=[]
#     init_group_table(table_name)
#     return JsonResponse(return_obj)
