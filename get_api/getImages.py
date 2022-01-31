import os
from pymongo import MongoClient
import requests
import urlimage


def get_image_appli(name, url):
    """Get image from an application from its url and download it localy"""

    image_filename = os.path.join(imagePath, name)
    if os.path.exists(image_filename):
        # print("=> File already exists")
        return

    print(name, url)
    try:
        icon = urlimage.get_image_for_url(url)
        if not icon:
            print("=> No Favicon found")
            return
        print(icon)
        response = requests.get(icon, stream=True)
        with open(image_filename, "wb") as image:
            for chunk in response.iter_content(1024):
                image.write(chunk)
    except Exception as e:
        print("=> Error : ", e)
        return


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


#####################################

if __name__ == "__main__":

    dir_path = os.path.dirname(os.path.realpath(__file__))
    eoleGetPath = os.path.abspath(os.path.join(dir_path, os.pardir))
    imagePath = os.path.abspath(
        os.path.join(eoleGetPath, "app", "public", "images", "appli")
    )
    try:
        os.makedirs(imagePath)
    except FileExistsError:
        pass

    collection = get_collection()
    all_apps = collection.find({"url": {"$ne": ""}}).sort("identification")
    total = collection.count_documents({"url": {"$ne": ""}})
    for cpt, app in enumerate(all_apps):
        print(f"{cpt+1}/{total} => {app['identification']}")
        get_image_appli(app["identification"], app["url"])
