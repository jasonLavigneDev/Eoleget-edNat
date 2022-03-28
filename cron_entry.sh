#!/bin/sh
python3 /eoleget/getData.py
crond -f -L /eoleget/getData.log