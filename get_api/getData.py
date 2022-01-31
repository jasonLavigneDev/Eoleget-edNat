import glob
import os
import yaml
import subprocess
from pymongo import MongoClient
import pyaml


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
    cpt = 0
    for yamlFile in yamlFiles:
        try:
            stream = open(yamlFile, "r")
            data = yaml.load(stream, Loader=yaml.SafeLoader)
            stream.close()

            if "PackageName" not in data.keys():
                cpt += 1
                pass

            elif not any(
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
        except yaml.YAMLError as exc:
            print(f"scanner error for {yamlFile}")
            if hasattr(exc, "problem_mark"):
                mark = exc.problem_mark
                print(
                    "Error parsing Yaml file at line %s, column %s."
                    % (mark.line, mark.column + 1)
                )
            else:
                print("Something went wrong while parsing yaml file")

    print("app sans PackageName", cpt)
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
def insertData(apps, otherFiles=False):
    collection = get_collection()
    import warnings

    warnings.filterwarnings("ignore", category=DeprecationWarning)
    if not otherFiles:
        for app in apps:
            collection.insert_one(app.__dict__)
    else:
        for app in apps:
            if collection.find({"identification": app.identification}).count() <= 0:
                collection.insert_one(app.__dict__)
    print("Database updated")


def removeData():
    collection = get_collection()
    collection.delete_many({})
    print("applications deleted")


def clone_winget_repo(eoleGetPath):

    winget_pkgs = os.path.join(eoleGetPath, "winget-pkgs")
    needs_update = True

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
        insertData(apps)


def get_others_yaml_files(eoleGetPath):
    from pathlib import Path
    import re

    cpt = 0
    winget_pkgs = os.path.join(eoleGetPath, "winget-pkgs")
    manifest_dir = os.path.join(winget_pkgs, "manifests")
    dirsApps = glob.glob(manifest_dir + "/*/*/*")
    otherApps = []

    for dirsApp in dirsApps:
        App_not_in_database = False
        isLocalUS = False
        for root, dirs, files in os.walk(dirsApp):

            # check if there is not locale.en-US.yaml extension
            for file in files:
                if file.endswith(".locale.en-US.yaml") and len(file):
                    isLocalUS = True
                    break

            isAppend = False
            if not isLocalUS:
                for file in files:
                    if not file.endswith(".installer.yaml") and file.endswith(".yaml"):
                        otherApps.append((os.path.join(root, file)))
                        isAppend = True

                if isAppend:
                    break
    otherAppsFileName = []
    # check if  yamls files does not contains doublon
    otherApps_Without_Doublon = []
    for i in range(len(otherApps)):
        if i < len(otherApps) - 1:
            filename = str(otherApps[i].split("/")[-1:])
            filename2 = str(otherApps[i + 1].split("/")[-1:])

            f = re.search("(.+?).yaml| +.local.*?.yaml", filename).group(1)
            f2 = re.search("(.+?).yaml| +.local.*?.yaml", filename2).group(1)
            # if the next file is not the same than the current
            if f.split(".locale.")[0] != f2.split(".locale.")[0]:
                otherApps_Without_Doublon.append(otherApps[i])

        else:
            filename = str(otherApps[i].split("/")[-1:])
            filename2 = str(otherApps[i - 1].split("/")[-1:])

            f = re.search("(.+?).yaml| +.local.*?.yaml", filename).group(1)
            f2 = re.search("(.+?).yaml| +.local.*?.yaml", filename2).group(1)

            if f.split(".locale.")[0] != f2.split(".locale.")[0]:
                otherApps_Without_Doublon.append(otherApps[i])

        cpt += 1
    print("cpt ", cpt)
    print("otherApps_Without_Doublon ", len(otherApps_Without_Doublon))
    apps = get_yaml_files(otherApps_Without_Doublon)
    print(len(apps))
    insertData(apps, True)

    return otherApps_Without_Doublon


dir_path = os.path.dirname(os.path.realpath(__file__))
eoleGetPath = os.path.abspath(os.path.join(dir_path, os.pardir))
clone_winget_repo(eoleGetPath)
get_others_yaml_files(eoleGetPath)
