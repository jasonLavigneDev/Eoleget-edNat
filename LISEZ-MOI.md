# Environnement de DEV pour l'application **Eoleget**

- [Installation](#installation)
  - [Application **Eoleget**](#application-eoleget)
  - [Paramètres](#paramètres)
- [Lancer le projet](#lancer-le-projet)
  - [Lancer un terminal **eoleget**](#lancer-un-terminal-eoleget)
- [Créez votre premier pack](#créez-votre-premier-pack)
  - [Sélectionner les applications](#sélectionner-les-applications)
  - [En mode 'card'](#en-mode-card)
  - [En mode 'liste'](#en-mode-liste)
  - [Valider le panier](#valider-le-panier)
- [Télécharger votre pack](#télécharger-votre-pack)
  - [Pour un pack privé](#pour-un-pack-privé)
  - [Pour un pack public](#pour-un-pack-public)
  - [En mode card et en mode liste](#en-mode-card-et-en-mode-liste)
- [Autres pages d'**Eoleget**](#autres-pages-deoleget)
  - [Magasin d'application](#magasin-dapplication)
  - [Détail d'une application](#détail-dune-application)
  - [Magasin de pack](#magasin-de-pack)
  - [Détail d'un pack](#détail-dun-pack)
  - [Edition d'un pack](#edition-dun-pack)

---

## Installation

### Application **Eoleget**

Processus d'installation :

```
git clone https://gitlab.mim-libre.fr/EOLE/eole-2/eoleget.git
cd eoleget
cp config/settings.development.json.sample config/settings.development.json
cd app
meteor npm install
```

### Paramètres

Avant de lancer **Eoleget** localement, voir [le documment de configuration](config/README.md).

## Lancer le projet

### Lancer un terminal **eoleget**

```
cd eoleget/app
meteor npm start
```

Dans le navigateur, tapez ceci :

```
http://localhost:3000

```

## Créez votre premier pack

Le but d'**Eoleget** est de pouvoir créer des packs composés de toutes les applications voulues et disponibles dans le
magasin d'application.

### Sélectionner les applications

> Il faut sélectionner au moins une application pour créer un pack.

### En mode 'card'

Vous pouvez naviguer dans le magasin en mode 'card' grâce à la pagination en bas de page et/ou grâce à la barre de
recherche. Une fois l'application souhaitée trouvée, vous pouvez l'ajouter à votre panier en cliquant sur l'icone '+' en
haut à droite de la 'card'. Vous pouvez aussi ajouter l'application en allant dans le détail de cette dernière en
cliquant sur le bouton `Voir plus`. Depuis le [Détail de l'application](###détail-dune-application), vous pouvez
sélectionner la version de l'application et cliquer sur le bouton `Ajouter au panier` pour ajouter l'application.

### En mode 'liste'

Vous pouvez naviguer dans la liste grâce à la pagination en bas de page et chosir le nombre d'application par page et/ou
utiliser la barre de recherche. Une fois l'application trouvée, vous pouvez choisir la version voulue puis cliquer sur
la checkbox pour la sélectionner. Vous pouvez aussi accéder au [Détail de l'application](###détail-dune-application)
grâce au bouton en bout de ligne où vous pourrez sélectionner la version de l'application et cliquer sur le bouton
`Ajouter au panier` pour ajouter cette dernière au panier.

### Valider le panier

Une fois toutes les applications voulues trouvées, vous pouvez accéder à votre panier en cliquant sur l'icone en haut à
droite de la page. Vous arrivez alors dans la page de création de pack. Vous pouvez personnaliser le titre de votre
pack, sa description, choisir si votre pack sera public (visible de tous les utilisateur) ou non et vous pouvez aussi
choisir la couleur de votre pack. Cela définira son affichage dans la page du [magasin de pack](###magasin-de-pack).
Vous trouverez aussi un résumé sous forme de tableau des applications que vous avez choisies. Depuis le tableau vous
avez la possibilité de :

- changer la version des applications choisies
- accéder au détail de chaque application
- supprimer les applications du pack
- ajouter une autre application à votre pack

Une fois votre pack complet et valide vous pouvez le créer en cliquant sur le bouton `Créer le pack`.

## Télécharger votre pack

### Pour un pack privé

Vous pouvez retrouver vos packs privés dans la page `Mes packs`. Cette page est accessible depuis le menu utilisateur en
haut à droite où votre pseudonyme apparait. Dans la page `Mes packs`, vous retrouverez tous les packs que vous avez
créés sur **Eoleget**. Les packs possédant l'icone 'oeil barré' sont vos packs privés. Vous pouvez parcourir tout vos
packs via la pagination en bas de page et/ou par la barre de recherche.

### Pour un pack public

Pour retrouver votre pack vous pouvez utiliser la même méthode que pour un [pack privé](#pour-un-pack-privé).

Vous pouvez aussi aller dans le [magasin de pack](#magasin-de-pack) en cliquant sur l'onglet `Packs`. Une fois dans
cette page, vous pouvez parcourir tous les packs publics pour trouver le votre ou le chercher grâce à la barre de
recherche.

### En mode card et en mode liste

Une fois le pack à télécharger trouvé :

Vous pouvez cliquer sur le premier icon (en haut de la card / au bout de la ligne) pour accéder au
[détail du pack](#détail-dun-pack).

Une fois dans la page de [détail du pack](#détail-dun-pack), vous retrouvez un résumé de votre pack. Depuis cette page,
vous pouvez récupérer la commande d'installation de votre pack sous 3 formats: Batch, Powershell et JSON.

Pour le format Batch et Powershell, vous pouvez cliquez sur la commande pour la copier dans le presse-papier et
l'utiliser en dehors de l'application. Pour le format JSON, vous pouvez télécharger un fichier JSON qui contient les
éléments nécessaires pour installer le pack.

## Autres pages d'**Eoleget**

### Magasin d'application

Le magasin d'application permet de retrouver toutes applications disponibles sur **Eoleget** avec deux modes d'affichage
: 'card' et 'liste'. Depuis cette page vous pouvez accéder au [détail des applications](#détail-dune-application),
ajouter l'application au panier ou encore naviguer vers le site de l'application en cliquant sur son nom.

### Détail d'une application

Depuis le détail d'une application, vous pouvez retrouver plusieurs informations :

- le nom de l'appliction
- son identifiant winget
- la version sélectionnée
- un lien vers le site de l'application
- la commande winget pour installer l'application
- sa licence d'utilisation
- ses tags

### Magasin de pack

Dans le magasin de packs vous pouvez retrouver tous les packs publiés par les utilisateurs d'**Eoleget**. Deux modes
d'affichage sont disponibles 'card' et 'liste'. Depuis cette page vous pouvez accéder au
[détail d'un pack](#détail-dun-pack) pour un pack d'un autre utilisateur. Pour un pack qui vous appartient, vous pouvez
[éditer votre pack](#edition-dun-pack) ou supprimer votre pack. Vous pouvez aussi accéder au
[détail de chaque application dans les packs](#détail-dune-application).

### Détail d'un pack

Depuis le détail d'un pack, vous pouvez retrouver plusieurs informations :

- le propriétaire du pack
- la visibilité du pack
- la description du pack
- les 3 boutons qui permettent d'obtenir les différentes commandes pour installer le pack
- les applications présentes dans le pack

### Edition d'un pack

La page d'édition de pack est très similaire à la page de [création d'un pack](#créez-votre-premier-pack). Vous pouvez
depuis cette page personnaliser :

- son nom
- sa description
- son image
- sa visibilité
- sa couleur
- les applications présentes dans le pack
