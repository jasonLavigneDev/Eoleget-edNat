# The DEV environment **Eoleget** application :

- [Install](#install)
  - [Application : Eoleget](#application-eoleget)
  - [Parameters](#parameters)
- [Run project](#run-project)
  - [Run a terminal **eoleget**](#run-a-terminal-eoleget)
- [Create your first pack](#create-your-first-pack)

---

## Install

### Application : Eoleget

Install process :

```
git clone https://gitlab.mim-libre.fr/EOLE/eole-2/eoleget.git
cd eoleget
cp config/settings.development.json.sample config/settings.development.json
cd app
meteor npm install
```

### Parameters

To run **Eoleget** locally, see [configuration document for more informations](config/README.md).

## Run project

### Run a terminal **eoleget**

```
cd eoleget/app
meteor npm start
```

From the browser, type this :

```
http://localhost:3000

```

## Create your first pack
