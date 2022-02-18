#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Feb 11 10:59:06 2022

@author: corentin
"""

from pymongo import MongoClient
import argparse
import datetime
import os
import random

def getRandomColor():
    r = random.randint(0, 4)
    color = ''
    if r==0: color = 'purple'
    if r==1: color = 'red'
    if r==2: color= 'green'
    if r==3: color= 'yellow'
    
    return color

def generateID():
    st = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz'
    mongoId = ''
    for i in range(0, 17):
        index = random.randint(0, len(st)-1)
        mongoId = '{}{}'.format(mongoId, st[index])
        
    return mongoId
    
class Pack():
    
    def __init__(self, name, description, applications, owner, ownerName):
        self._id = generateID()
        self.name = name
        self.description = description
        self.applications = applications
        self.isValidated = True
        self.color = getRandomColor()
        self.isPublic = bool(random.getrandbits(1))
        self.creationDate = datetime.datetime.utcnow()
        self.owner = str(owner)
        self.ownerName = str(ownerName)
        
    def createPack(self):
        mongoURL = "mongodb://127.0.0.1:3001/meteor"
        if "MONGO_URL" in os.environ:
            mongoURL = os.environ["MONGO_URL"]
        try:
            conn = MongoClient(mongoURL)
        except:
            print("Could not connect to MongoDB")
    
        db = conn.meteor  
        collection = db['packs']
        
        mongoPack = {"_id": self._id, "name": self.name, "description": self.description, "applications": self.applications, "isValidated": self.isValidated, 
                     "color": self.color, "isPublic": self.isPublic, "creationDate": self.creationDate, "owner": self.owner, "ownerName": self.ownerName}
        collection.insert_one(mongoPack)
        
        
        
class User():
    def __init__(self, username, firstName, lastName):
      r = random.randint(1, 10000)
      self._id = generateID()
      self.username = username
      self.firstName = firstName
      self.lastName = lastName
      self.services = { "password" : { "bcrypt" : "$2y$10$ffD3NTA0A7UoKHhFLvQWheCK3eHCTv06Etx5w5DwtVkfqdFeMj/1." }}
      self.emails = [{"address" : "{}.{}{}@ac-dijon.fr".format(firstName, lastName, r), "verified": False}]
      self.createdAt= datetime.datetime.utcnow()
      
    
    def createUser(self):
        mongoURL = "mongodb://127.0.0.1:3001/meteor"
        if "MONGO_URL" in os.environ:
            mongoURL = os.environ["MONGO_URL"]
        try:
            conn = MongoClient(mongoURL)
        except:
            print("Could not connect to MongoDB")
    
        db = conn.meteor  
        collection = db['users']
        
        mongoUser = {"_id": self._id, "username": self.username, "firstName": self.firstName, "lastName": self.lastName, "services": self.services, 
                     "emails": self.emails, "createdAt": self.createdAt}
        collection.insert_one(mongoUser)    
        
        print('Utilisateur {} ({}) créé'.format(self.username, self.emails))



def get_apps_collection():
    mongoURL = "mongodb://127.0.0.1:3001/meteor"
    if "MONGO_URL" in os.environ:
        mongoURL = os.environ["MONGO_URL"]
    try:
        conn = MongoClient(mongoURL)
    except:
        print("Could not connect to MongoDB")

    db = conn.meteor
    return db.applications


def get_users_collection():
    mongoURL = "mongodb://127.0.0.1:3001/meteor"
    if "MONGO_URL" in os.environ:
        mongoURL = os.environ["MONGO_URL"]
    try:
        conn = MongoClient(mongoURL)
    except:
        print("Could not connect to MongoDB")
        
    db = conn.meteor
    return db.users

def generate_packs(idPack):
    apps_collection = get_apps_collection()
    all_apps = apps_collection.find({})
    total = apps_collection.count_documents({})
    
    
    #Génération users
    users_collection = get_users_collection()
    totalUser = users_collection.count_documents({})
    if totalUser < 2:
        for i in range(2):
            user = User("JeanDupont_{}".format(i), "Jean", "Dupont")
            user.createUser()
        
    users_collection = get_users_collection()
    all_users = users_collection.find({})
    totalUser = users_collection.count_documents({})
    
    #Génération pack
    r = random.randint(2, 10)
    packAppli = []
    for i in range(0, r):
        r2 = random.randint(1, total)
        packAppli.append({"identification": all_apps[r2]['identification'], "nom": all_apps[r2]['nom'], "description": all_apps[r2]['description'], "version": all_apps[r2]['versions'][0]})
     
    
    packName = "FakePack_{}".format(idPack)
    packDescription = """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."""

    rUser = random.randint(1, totalUser)
    packOwner = all_users[rUser-1]['_id']
    packOwnerName = all_users[rUser-1]['username']

    pack = Pack(packName, packDescription, packAppli, packOwner, packOwnerName)
    pack.createPack()
    
    
    

parser = argparse.ArgumentParser(description='Fake data generator.')
parser.add_argument("-p", "--packs", help="Number of packs to create.", type=int, default=50)
args = parser.parse_args()

for i in range (args.packs):
    r = random.randint(1, 100)
    generate_packs(r)
print('{} packs générés.'.format(args.packs))