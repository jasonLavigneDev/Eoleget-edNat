import glob
import os
import yaml
import subprocess
import time
from pymongo import MongoClient
import json


class Application:
    def __init__(self, identification, nom, description, version, tags=[]):
        self.identification = identification
        self.nom = nom
        self.description = description
        self.tags = tags
        self.versions = []
        self.versions.append(version)
        self.url = ""

    def append_version(self, version):
        self.versions.append(version)


def get_yaml_files(yamlFiles):
    yamlFiles = list(dict.fromkeys(yamlFiles))
    yamlFiles_without_doublon = []
    for yamlFile in yamlFiles:
        stream = open(yamlFile, "r")
        data = yaml.load(stream)
        stream.close()

        if "PackageUrl" not in data.keys():
            pass

        if not any(
            app.identification == data["PackageIdentifier"]
            for app in yamlFiles_without_doublon
        ):
            if "Tags" in data.keys():
                appli = Application(
                    data["PackageIdentifier"],
                    data["PackageName"],
                    data["ShortDescription"],
                    data["PackageVersion"],
                    data["Tags"],
                )
            else:
                appli = Application(
                    data["PackageIdentifier"],
                    data["PackageName"],
                    data["ShortDescription"],
                    data["PackageVersion"],
                )

            if "PublisherUrl" in data.keys():
                appli.url = data["PublisherUrl"]

            yamlFiles_without_doublon.append(appli)
        else:
            appli.append_version(data["PackageVersion"])

    return yamlFiles_without_doublon


# insert data to the database
def insertData(apps, manifest_dir=""):
    try:
        conn = conn = MongoClient("127.0.0.1", 3001)
        print(conn.list_database_names())
        print("Connected successfully!!!")
    except:
        print("Could not connect to MongoDB")

    db = conn.meteor

    collection = db.applications
    for app in apps:
        collection.insert_one(app.__dict__)


def removeData():

    try:
        conn = conn = MongoClient("127.0.0.1", 3001)
        print("Connected successfully!!!")
    except:
        print("Could not connect to MongoDB")

    db = conn.meteor
    collection = db.applications
    collection.delete_many({})
    print("applications deleted")


def clone_winget_repo(eoleGetPath):

    winget_pkgs = eoleGetPath + "/winget-pkgs"

    if not os.path.exists(winget_pkgs):
        p = subprocess.Popen(
            ["git", "clone", "https://github.com/microsoft/winget-pkgs.git"],
            cwd=eoleGetPath,
        )
        p.wait()
        print("repo cloned")

        winget_dir = ""
        list_subfolders_with_paths = [
            f.path for f in os.scandir(eoleGetPath) if f.is_dir()
        ]
        for dir in list_subfolders_with_paths:
            print(dir)
            if dir.endswith("winget-pkgs"):
                winget_dir = dir
                break

        manifest_dir = winget_dir + "/manifests"

        yamlFiles = glob.glob(manifest_dir + "/**/*.locale.en-US.yaml", recursive=True)

        apps = get_yaml_files(yamlFiles)
        insertData(apps)

    else:
        list_subfolders_with_paths = [
            f.path for f in os.scandir(eoleGetPath) if f.is_dir()
        ]
        for dir in list_subfolders_with_paths:
            if dir.endswith("winget-pkgs"):
                winget_dir = dir
                break
        manifest_dir = winget_dir + "/manifests"

        print("folder winget-pkgs already exist")
        from subprocess import PIPE

        with subprocess.Popen(
            "git pull", stdout=PIPE, stderr=None, shell=True
        ) as process:
            output = process.communicate()[0].decode("utf-8")
            print(output)
        if "Already up to date" not in output:

            yamlFiles = glob.glob(
                manifest_dir + "/**/*.locale.en-US.yaml", recursive=True
            )
            apps = get_yaml_files(yamlFiles)
            print("out ", output)
            removeData()
            insertData(apps, manifest_dir)


dir_path = os.path.dirname(os.path.realpath(__file__))
eoleGetPath = os.path.abspath(os.path.join(dir_path, os.pardir))
clone_winget_repo(eoleGetPath)
