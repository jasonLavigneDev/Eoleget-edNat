# Application **EOLEGet** en environnement DEV

Sommaire :

- Installation
  - Application
  - Paramètres
- Lancer le projet

## Installation

### Application : EOLEGet

Procédure d'nstallation :

```
git clone git@gitlab.mim-libre.fr:EOLE/eole-2/eoleget.git
cd eoleget
cp config/settings.development.json.sample config/settings.development.json
cd app
meteor npm install
```

## Lancer le projet

```
cd eoleget/app
meteor npm start
```

Il est possible de vérifier le fonctionnement d'eoleget en tapant la ligne suivante à partir d'un navigateur

```
http://localhost:3000
```
