import sys
import os
import pymongo
from pymongo import mongo_client

cluster = pymongo.MongoClient('mongodb+srv://admin:admin@electron-python.wykyj.mongodb.net/myLoginDB?retryWrites=true&w=majority')

