#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Get images from url of eoleGet's applications
"""
import requests
import urlimage
from base64 import b64decode
from pathlib import Path
from utils import get_mongodb


def get_image_appli(name, url):
    """Get image from an application from its url and download it localy"""

    image_filename = imagePath / name
    if image_filename.exists():
        # print("=> File already exists")
        return

    print(name, url)
    try:
        icon = urlimage.get_image_for_url(url)
        if not icon:
            print("=> No Favicon found")
            return

        if "data:image/" in icon:
            # base64 string
            png_recovered = b64decode(icon.split(",")[1])
            with open(image_filename, "wb") as image:
                image.write(png_recovered)
        else:
            # normal url image
            response = requests.get(icon, stream=True)
            with open(image_filename, "wb") as image:
                for chunk in response.iter_content(1024):
                    image.write(chunk)
    except Exception as e:
        print("=> Error : ", e)
        return


#####################################

if __name__ == "__main__":

    eoleGetPath = Path(__file__).resolve().parents[1]
    imagePath = eoleGetPath / "app" / "public" / "images" / "appli"
    imagePath.mkdir(parents=True, exist_ok=True)

    db = get_mongodb()
    collection = db.applications
    all_apps = collection.find({"url": {"$ne": ""}}).sort("identification")
    total = collection.count_documents({"url": {"$ne": ""}})
    for cpt, app in enumerate(all_apps):
        print(f"{cpt+1}/{total} => {app['identification']}")
        get_image_appli(app["identification"], app["url"])
