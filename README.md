# The DEV environment **Eoleget** application :

- [Install](#install)
  - [Application : Eoleget](#application-eoleget)
  - [Parameters](#parameters)
- [Run project](#run-project)
  - [Run an other terminal **eoleget**](#run-an-other-terminal-eoleget)

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

### Run an other terminal **eoleget**

```
cd eoleget/app
meteor npm start
```

From the browser, type this :

```
http://localhost:3000

```
