#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate fake data for eoleGet

Creates fake users and fake packs.
Be sure to have all applications by launching getDatas.py first.
And grab the applications images with getImages.py.
We recommand to create your own user before the fake datas generation.
"""
import argparse
import datetime
from random import randint, choice, choices, sample
from faker import Faker  # https://github.com/joke2k/faker
from utils import get_mongodb


def getRandomColor():
    colors = [
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#009688",
        "#4caf50",
        "#8bc34a",
        "#cddc39",
        "#ffeb3b",
        "#ffc107",
        "#ff9800",
        "#ff5722",
        "#f44336",
    ]
    return choice(colors)


def generateID():
    st = "23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz"
    return "".join(choices(st, k=17))


def getRandomIcon():
    # 1 chance sur 3 icon aléatoire sinon vide
    if randint(0, 99) % 3:
        return ""
    return f"/images/packs/packs-{randint(1, 329):03d}.svg"


def getApplications():
    all_apps = list(db.applications.find({}))
    randomApplis = sample(all_apps, randint(2, 10))
    packAppli = []
    for app in randomApplis:
        packAppli.append(
            {
                "identification": app["identification"],
                "nom": app["nom"],
                "description": app["description"],
                "version": app["versions"][0],
            }
        )

    return packAppli


def createPack():
    collection = db["packs"]
    users = db.users.find({})
    u = choice(list(users))

    mongoPack = {
        "_id": generateID(),
        "name": f.unique.bs().capitalize(),
        "description": f.paragraph(nb_sentences=randint(1, 8)),
        "applications": getApplications(),
        "isValidated": True,
        "color": getRandomColor(),
        "icon": getRandomIcon(),
        "isPublic": f.boolean(),
        "creationDate": datetime.datetime.utcnow(),
        "owner": u["_id"],
        "ownerName": u["username"],
    }
    collection.insert_one(mongoPack)


def createUser():
    collection = db["users"]
    nom = f.unique.last_name()
    prenom = f.first_name()
    username = f"{prenom}{nom}"

    mongoUser = {
        "_id": generateID(),
        "username": username,
        "firstName": prenom,
        "lastName": nom,
        "services": {
            "password": {
                "bcrypt": "$2y$10$ffD3NTA0A7UoKHhFLvQWheCK3eHCTv06Etx5w5DwtVkfqdFeMj/1."
            }
        },
        "emails": [
            {
                "address": f"{username}@ac-test.fr",
                "verified": False,
            }
        ],
        "createdAt": datetime.datetime.utcnow(),
    }
    collection.insert_one(mongoUser)

    print(f"Utilisateur {username} créé")


#####################################

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Fake data generator for eoleget.")
    parser.add_argument(
        "-p", "--packs", help="Number of packs to create.", type=int, default=100
    )
    args = parser.parse_args()

    db = get_mongodb()
    f = Faker("fr_FR")  # localisation fr du faker

    # Génération users
    users_collection = db.users
    totalUser = users_collection.count_documents({})
    if totalUser < 2:
        for i in range(10):
            createUser()

    # Génération packs
    for i in range(args.packs):
        createPack()
    print(f"{args.packs} packs générés.")
