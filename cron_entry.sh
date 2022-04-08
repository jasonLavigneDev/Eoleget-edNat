#!/bin/sh
python3 /eoleget/getData.py
python3 /eoleget/getImages.py
crond -f -L /eoleget/getData.log