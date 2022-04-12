#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Get images from url of eoleGet's applications and store it in mongo db
"""
import argparse
import requests
import re
import urlimage
from sys import exit
from base64 import b64encode
from mimetypes import guess_type
from utils import get_mongodb


def get_image_appli(name, url):
    """Get image from an application from its url and store it in mongo db"""

    global new_images

    # print(name, url)
    try:
        icon = urlimage.get_image_for_url(url)
        if not icon:
            if args.verbose:
                print("=> No Favicon found")
            return

        if "data:image/" in icon:
            # base64 string
            mtype = re.search("data:(image/[^,;]*)", icon).group(1) or "image/png"
            b64 = icon.split(",")[1]
        else:
            # normal url image
            mtype = guess_type(icon)[0]
            if mtype and not "image" in mtype:
                raise Exception("Not an image")
            if not mtype:
                mtype = "image/png"
            b64 = b64encode(requests.get(icon).content).decode("utf-8")

        images.replace_one(
            {"identification": name},
            {"identification": name, "datas": b64, "mtype": mtype},
            True,
        )

        if args.verbose:
            print("=> Found new image !")
        new_images += 1
    except Exception as e:
        if args.verbose:
            print("=> Error : ", e)
        return


#####################################

if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Get images from url of eoleGet's applications."
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Print more information during image scan",
    )
    parser.add_argument(
        "-f",
        "--force",
        action="store_true",
        help="Force an update of all images",
    )
    args = parser.parse_args()

    try:
        db = get_mongodb()
    except:
        exit("\nCould not connect to MongoDB. Is eoleGet running ?")

    collection = db.applications
    images = db.images
    all_apps = collection.find({"url": {"$ne": ""}}).sort("identification")
    total = collection.count_documents({"url": {"$ne": ""}})
    new_images = 0
    print(f"Scanning {total} application's url...")
    for cpt, app in enumerate(all_apps):
        if args.verbose:
            print(f"{cpt+1}/{total} => {app['identification']}")
        if not images.find_one({"identification": app["identification"]}) or args.force:
            get_image_appli(app["identification"], app["url"])

    print(f"Found {new_images} new images")
