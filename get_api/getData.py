#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Get applications from the Windows Package Manager Community Repository

Creates a local git repository with all applications and puts all related informations in eoleGet's mongo database.
"""
import argparse
import yaml
import subprocess
from sys import exit
from pathlib import Path
from utils import get_mongodb, setSiteInMaintenance


class Application:
    """eoleGet's application object to insert in database"""

    def __init__(self, identification, nom, description, version, appLicense):
        self.identification = identification
        self.nom = nom
        self.description = description
        self.tags = []
        self.versions = [str(version)]
        self.url = ""
        self.license = appLicense

    def append_version(self, version):
        if str(version) not in self.versions:
            self.versions.append(str(version))


def removeData():
    """Remove all eoleGet's application from the database"""
    collection.delete_many({})
    print("All applications deleted")


def insertData(apps):
    """Insert all application datas in eoleGet's database

    Args:
        apps (array of Application object): contains all Application object to insert
    """
    import warnings

    warnings.filterwarnings("ignore", category=DeprecationWarning)
    for app in apps.values():
        if collection.count_documents({"identification": app.identification}) <= 0:
            collection.insert_one(app.__dict__)
    print("Database updated")


def clone_winget_repo():
    """Clone locally or update an existing Windows Package Manager Community Repository

    Returns:
        bool: True if the repo has been updated
    """
    needs_update = False

    if not winget_pkgs.is_dir():
        print("Cloning winget-pkgs repository")
        p = subprocess.Popen(
            ["git", "clone", "https://github.com/microsoft/winget-pkgs.git"],
            cwd=eoleGetPath,
        )
        p.wait()
        needs_update = True
    else:
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

    return needs_update


def get_app_from_yaml(yamlFile):
    """Get application information from a yaml file

       Append new application found in apps dict or update them with new versions or missing informations

    Args:
        yamlFile (filename): yaml file to scan

    Returns:
        bool: True if all ok, False if no PackageName found
    """
    try:
        with open(yamlFile, "r") as stream:
            data = yaml.load(stream, Loader=yaml.SafeLoader)

        if data["PackageIdentifier"] not in apps:
            # Newly scanned app : create new Application object and put it in apps dict
            appli = Application(
                data["PackageIdentifier"],
                data.get("PackageName", ""),
                data.get("ShortDescription", ""),
                data.get("PackageVersion", ""),
                data.get("License", ""),
            )
            appli.tags = data.get("Tags", [])
            # Priority to PublisherUrl, either watch PackageUrl
            if "PublisherUrl" in data.keys():
                appli.url = data.get("PublisherUrl", "")
            else:
                appli.url = data.get("PackageUrl", "")

            apps[data["PackageIdentifier"]] = appli
            if "PackageName" not in data.keys():
                # print(f"No Name for {yamlFile}")
                return False
        else:
            # Already scanned app : update version and missing informations
            apps[data["PackageIdentifier"]].append_version(
                data.get("PackageVersion", "")
            )
            if not apps[data["PackageIdentifier"]].nom and "PackageName" in data.keys():
                # print(f"PackageName => {yamlFile}")
                apps[data["PackageIdentifier"]].nom = data.get("PackageName", "")
            if (
                not apps[data["PackageIdentifier"]].description
                and "ShortDescription" in data.keys()
            ):
                # print(f"ShortDescription => {yamlFile}")
                apps[data["PackageIdentifier"]].description = data.get(
                    "ShortDescription", ""
                )
            if not apps[data["PackageIdentifier"]].license and "License" in data.keys():
                # print(f"License => {yamlFile}")
                apps[data["PackageIdentifier"]].license = data.get("License", "")
            if not apps[data["PackageIdentifier"]].tags and "Tags" in data.keys():
                # print(f"Tags => {yamlFile}")
                apps[data["PackageIdentifier"]].tags = data.get("Tags", [])
            if (
                not apps[data["PackageIdentifier"]].url
                and "PublisherUrl" in data.keys()
            ):
                # print(f"PublisherUrl => {yamlFile}")
                apps[data["PackageIdentifier"]].url = data.get("PublisherUrl", "")
            else:
                apps[data["PackageIdentifier"]].url = data.get("PackageUrl", "")

    except yaml.YAMLError as exc:
        print(f"Scanner error for {yamlFile}")
        if hasattr(exc, "problem_mark"):
            mark = exc.problem_mark
            print(
                "Error parsing Yaml file at line %s, column %s."
                % (mark.line, mark.column + 1)
            )
        else:
            print("Something went wrong while parsing yaml file")
    return True


def get_app_from_repo():
    """Get all apps by retrieving all yaml in the git repository subdirectories"""
    all_yaml = list(manifest_dir.glob("**/*.yaml"))  # All yaml files
    dir_yaml = list(
        set([y.parent for y in all_yaml])
    )  # Parent directory of all yaml file once

    # dict of yaml file to scan in order and their count
    scan = {
        "fr": ["*.locale.fr-FR.yaml", 0],  # Priority for fr but can miss PackageName
        "us": ["*.locale.en-US.yaml", 0],
        "gb": ["*.locale.en-GB.yaml", 0],
        "loc": ["*.locale.*.yaml", 0],
        # "inst": ["*.installer.yaml", 0],  # Always 0
        "other": ["*.yaml", 0],
    }

    for app_dir in dir_yaml:
        # Each folder in dir_yaml contains an application
        for key, value in scan.items():
            # Each scan entry in the same order
            filename = list(app_dir.glob(value[0]))
            if filename and filename[0]:
                ok = get_app_from_yaml(filename[0])
                if ok:
                    # PackName collected, no need to scan other yaml for this app
                    value[1] += 1
                    break  # go to next app_dir
                # If not ok then go to next scan item for this yaml

    # Print result of scan for each entry
    print(f"Scan found {sum(s[1] for s in scan.values())} yaml :")
    for key, value in scan.items():
        print(f"\t{key} => {value[1]}")


#####################################

if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Get applications from the Windows Package Manager Community Repository."
    )
    parser.add_argument(
        "-f", "--force", action="store_true", help="Force applications update"
    )
    args = parser.parse_args()

    eoleGetPath = Path(__file__).resolve().parents[1]
    winget_pkgs = eoleGetPath / "winget-pkgs"
    manifest_dir = winget_pkgs / "manifests"

    needs_update = clone_winget_repo()

    if needs_update or args.force:

        try:
            db = get_mongodb()
        except:
            exit("\nCould not connect to MongoDB. Is eoleGet running ?")

        collection = db.applications

        # Dict with PackageIdentifier as key and related Application object as value
        apps = {}
        print("Updating applications from winget-pkgs repository")
        get_app_from_repo()
        setSiteInMaintenance(True, db)
        removeData()
        insertData(apps)
        setSiteInMaintenance(False, db)

        print(f"{collection.count_documents({})} applications in database.")
    else:
        print("Already up to date")
