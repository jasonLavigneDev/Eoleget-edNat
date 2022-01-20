import glob
import os
import yaml
import subprocess
from pymongo import MongoClient


class Application:
    def __init__(self, identification, nom, description, version):
        self.identification = identification
        self.nom = nom
        self.description = description
        self.tags = []
        self.versions = [str(version)]
        self.url = ""

    def append_version(self, version):
        self.versions.append(str(version))


def get_yaml_files(yamlFiles):
    yamlFiles = list(dict.fromkeys(yamlFiles))
    yamlFiles_without_doublon = []
    for yamlFile in yamlFiles:
        stream = open(yamlFile, "r")
        data = yaml.load(stream, Loader=yaml.SafeLoader)
        stream.close()

        if "PackageUrl" not in data.keys():
            pass

        if not any(
            app.identification == data["PackageIdentifier"]
            for app in yamlFiles_without_doublon
        ):
            appli = Application(
                data["PackageIdentifier"],
                data["PackageName"],
                data["ShortDescription"],
                data["PackageVersion"],
            )
            if "Tags" in data.keys():
                appli.tags = data["Tags"]
            if "PublisherUrl" in data.keys():
                appli.url = data["PublisherUrl"]

            yamlFiles_without_doublon.append(appli)
        else:
            appli.append_version(data["PackageVersion"])

    return yamlFiles_without_doublon


def get_collection():
    mongoURL = "mongodb://127.0.0.1:3001/meteor"
    if "MONGO_URL" in os.environ:
        mongoURL = os.environ["MONGO_URL"]
    try:
        conn = MongoClient(mongoURL)
        print("Connected successfully to MongoDB")
    except:
        print("Could not connect to MongoDB")

    db = conn.meteor
    return db.applications


# insert data to the database
def insertData(apps, manifest_dir=""):
    collection = get_collection()
    for app in apps:
        collection.insert_one(app.__dict__)
    print("Database updated")


def removeData():
    collection = get_collection()
    collection.delete_many({})
    print("applications deleted")


def clone_winget_repo(eoleGetPath):

    winget_pkgs = os.path.join(eoleGetPath, "winget-pkgs")
    needs_update = False

    if not os.path.exists(winget_pkgs):
        p = subprocess.Popen(
            ["git", "clone", "https://github.com/microsoft/winget-pkgs.git"],
            cwd=eoleGetPath,
        )
        p.wait()
        print("winget-pkgs repository cloned")
        needs_update = True
    else:
        print("folder winget-pkgs already exist")
        # update and check repository (forced english output)
        with subprocess.Popen(
            'LANG="en-US" git pull',
            stdout=subprocess.PIPE,
            stderr=None,
            shell=True,
            cwd=winget_pkgs,
        ) as process:
            output = process.communicate()[0].decode("utf-8")
        if "Already up to date" not in output:
            needs_update = True

    if needs_update:
        print("Updating applications from winget-pkgs repository")
        removeData()
        manifest_dir = os.path.join(winget_pkgs, "manifests")

        yamlFiles = glob.glob(
            os.path.join(manifest_dir, "**/*.locale.en-US.yaml"), recursive=True
        )
        apps = get_yaml_files(yamlFiles)
        insertData(apps, manifest_dir)


dir_path = os.path.dirname(os.path.realpath(__file__))
eoleGetPath = os.path.abspath(os.path.join(dir_path, os.pardir))
clone_winget_repo(eoleGetPath)
