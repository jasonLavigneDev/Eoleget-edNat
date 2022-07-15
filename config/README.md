# Configuration

Copy `settings-development.json.sample` to `settings-development.json` and update values matching your configuration

## public:

| Key             | Type    | Default value | Description                                                     |
| --------------- | ------- | ------------- | --------------------------------------------------------------- |
| enableKeycloak  | boolean | false         | If true, authentication through keycloak is enabled             |
| keycloakUrl     | string  | ""            | Keycloak auth base URL                                          |
| keycloakRealm   | string  | ""            | Keycloak Realm                                                  |
| emailValidation | boolean | true          | if true, users must validate their email to use the application |
| theme           | string  | "eole"        | Define application theme                                        |

If keycloak is enabled, users will be auto created after keycloak authentication.
In this case, user email will be considered verified by default (validation is delegated to Keycloak)

## keycloak:

| Key           | Type   | Default value | Description             |
| ------------- | ------ | ------------- | ----------------------- |
| pubkey        | string | ""            | Keycloak public key     |
| client        | string | ""            | Keycloak client type    |
| adminUser     | string | ""            | Keycloak admin user     |
| adminPassword | string | ""            | Keycloak admin password |

## private:

| Key         | Type     | Default value | Description                                     |
| ----------- | -------- | ------------- | ----------------------------------------------- |
| adminEmails | [string] | []            | users with these emails will receive admin role |

## smtp:

| Key | Type     | Default value | Description                                     |
| --- | -------- | ------------- | ----------------------------------------------- |
| url | [string] | ""            | email server url (smtps://user:password@server) |
