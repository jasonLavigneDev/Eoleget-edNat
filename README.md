# The DEV environment **Eoleget** application :

- [Install](#install)
  - [Application : Eoleget](#application-eoleget)
  - [Parameters](#parameters)
- [Run project](#run-project)
  - [Run a terminal **eoleget**](#run-a-terminal-eoleget)
- [Create your first pack](#create-your-first-pack)
  - [Select applications](#select-applications)
  - ['Card' mode](#card-mode)
  - ['Liste' mode](#liste-mode)
  - [Cart validation](#cart-validation)
- [Download your pack](#download-your-pack)
  - [For a private pack](#for-a-private-pack)
  - [For a public pack](#for-a-public-pack)
  - [In card mode and list mode](#in-card-mode-and-list-mode)
- [Other pages of **Eoleget**](#other-pages-of-eoleget)
  - [Applications store](#applications-store)
  - [Applicaion detail](#applicaion-detail)
  - [Pack store](#pack-store)
  - [Pack detail](#pack-detail)
  - [Pack edition](#pack-edition)

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

The goal of **Eoleget** is to be able to create packs composed of all the applications wanted and available in the
application store.

### Select applications

> You must select at least one application to create a package.

### 'Card' mode

You can browse the store in 'card' mode thanks to the pagination at the bottom of the page and/or thanks to the
search bar. Once the desired application is found, you can add it to your cart by clicking on the '+' icon in
top right of the 'card'. You can also add the application by going into the details of the latter in
clicking on the `View More` button. From the [Application Detail](###applicaion-detail), you can
select the version of the application and click the `Add to Cart` button to add the application.

### 'Liste' mode

You can navigate through the list with pagination at the bottom of the page and choose the number of applications per page and/or
use the search bar. Once the application is found, you can choose the desired version and click
the checkbox to select it. You can also access the [Application Detail](###applicaion-detail)
with the button at the end of the line where you can select the version of the application and click on the button
`Add to cart` to add to cart.

### Cart validation

Once all the desired applications have been found, you can access your cart by clicking on the icon at the top of
right of the page. You arrive in the pack creation page. You can customize the title of your
pack, its description, choose whether your pack will be public (visible to all users) or not and you can also
choose the color of your pack. This will set his color display in the [pack store page](#pack-store).
You will also find a summary of the applications you have chosen. From the table you have the opportunity to:

- change the version of the selected applications
- access to the details of each application
- remove applications from pack
- add another application to your pack

Once your package is complete and valid you can create it by clicking on the `Create pack` button.

## Download your pack

### For a private pack

You can find your private packs in the `My packs` page. This page is accessible from the user menu in
top right where your pseudonym appears. In `My packs` page, you will find all the packs you have
created on **Eoleget**. The packs with the 'Crosseye' icon are your private packs. You can browse all your
packs via paging at the bottom of the page and/or by the search bar.

### For a public pack

To find your pack you can use the same method as for [private pack](#for-a-private-pack).

You can also go to the [pack store](#pack-store) by clicking on the `Packs` tab. Once on this page, you
can browse all the public packs to find your own or search for it using the search bar.

### In card mode and list mode

Once the download pack is found:

You can click on the first icon (at the top of the card/ at the end of the line) to access the [pack detail](#pack-detail).

in [pack detail](#pack-detail) page, you will find a summary of your pack. From this page, you can retrieve the installation
command of your package in 3 formats: Batch, Powershell and JSON.

For the Batch and Powershell format, you can click the command to copy it to the clipboard and
use it outside the application. For the JSON format, you can download a JSON file that contains the
items needed to install the pack.

## Other pages of **Eoleget**

### Applications store

The application store allows you to find all applications available on **Eoleget** with two display modes:
'card' and 'list'. From this page you can access the [application detail](#applicaion-detail),
add the application to the cart or browse to the application’s website by clicking on its name.

### Applicaion detail

From the details of an application, you can find several information:

- the application name
- winget id
- selected version
- a link to the site of the application
- the winget command to install the application
- its license of use
- his tags

### Pack store

In the pack store you can find all the packs published by users of**Eoleget**. Two modes display are available 'card'
and 'list'. From this page you can access the [pack detail](#pack-detail) for another user’s pack.
For a pack that belongs to you, you can [edit your pack](#pack-edition) or delete your pack. You can also access the
[detail of each application in the packages](#applicaion-detail).

### Pack detail

From the details of a pack, you can find several information:

- the owner of the pack
- the visibility of the pack
- the pack description
- the 3 buttons to obtain the various commands to install the pack
- the applications in the pack

### Pack edition

The pack edition page is very similar to the [pack creation](#create-your-first-pack).
You can customize from this page:

- his name
- his description
- his picture
- his visibility
- his color
- the applications in the pack
