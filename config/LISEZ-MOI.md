# Configuration

Copier `settings-development.json.sample` dans `settings-development.json` et mettre à jour les valeurs correspondant à votre configuration.

## public:

| Key             | Type    | Default value | Description                                                             |
| --------------- | ------- | ------------- | ----------------------------------------------------------------------- |
| enableKeycloak  | boolean | false         | Si true, authentication keycloak est activé                             |
| keycloakUrl     | string  | ""            | Keycloak URL                                                            |
| keycloakRealm   | string  | ""            | Keycloak Realm                                                          |
| emailValidation | boolean | true          | Si true, l'utilisateur doit valider son mail pour utilisé l'application |
| theme           | string  | "eole"        | Défini le thème de l'application                                        |

Si keycloak est activé, les utilisateurs seront créés automatiquement après l’authentification keycloak.
Dans ce cas, le courriel de l’utilisateur sera considéré comme vérifié par défaut (la validation est déléguée à Keycloak)

## keycloak:

| Key           | Type   | Default value | Description             |
| ------------- | ------ | ------------- | ----------------------- |
| pubkey        | string | ""            | Keycloak public key     |
| client        | string | ""            | Keycloak client type    |
| adminUser     | string | ""            | Keycloak admin user     |
| adminPassword | string | ""            | Keycloak admin password |

## private:

| Key         | Type     | Default value | Description                                                          |
| ----------- | -------- | ------------- | -------------------------------------------------------------------- |
| adminEmails | [string] | []            | les utilisateurs avec ces e-mails recevront le rôle d’administrateur |

## smtp:

| Key | Type     | Default value | Description                                     |
| --- | -------- | ------------- | ----------------------------------------------- |
| url | [string] | ""            | email server url (smtps://user:password@server) |
