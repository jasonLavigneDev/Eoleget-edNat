#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
eoleGet's utils
"""
from os import environ
from pymongo import MongoClient


def get_mongodb():
    """Get Mongo Database found in MONGO_URL env or default local mongodb

    Returns:
        pymongo.database.Database: mongo database named in the mongoURL URI
    """
    mongoURL = "mongodb://127.0.0.1:3001/meteor"
    if "MONGO_URL" in environ:
        mongoURL = environ["MONGO_URL"]

    print("Connecting to MongoDB...", end="\r")
    conn = MongoClient(mongoURL)
    db = conn.get_default_database()
    lc = list(db.list_collections())
    assert "applications" in [k["name"] for k in lc]

    print("Connecting to MongoDB...\tOK")
    return db


def setSiteInMaintenance(status, db):
    """Activate or deactivate maintenance mode for the site"""

    appsettings = db["appsettings"]

    myquery = {"_id": "settings"}
    newvalues = {"$set": {"maintenance": status}}

    appsettings.update_one(myquery, newvalues)
