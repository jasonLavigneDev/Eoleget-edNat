# How to populate the data 

To populate the data, you will have to execute some python scripts in get_api folder.

If pip is not installed, install pip via this command :

```sudo apt install python3-pip```

Go to folder get_api and install the dependencies via this command : 

```pip3 install -r requirements.txt```


All python scripts must execute with eoleget running.
To do this, go to folder app and launch eoleget :
```meteor npm start```

To get the applications, run an other terminal, go to folder get_api and execute :
```python3 getData.py```

After that, you can verify in the web app eoleget (http://localhost:3000) if all applications appear.

To get the applications' image, execute :
```python3 getImages.py```

You can generate fake users and fake packs using the applications.
We recommand to first create your own user and then execute :
```python3 generateFakeData.py```


