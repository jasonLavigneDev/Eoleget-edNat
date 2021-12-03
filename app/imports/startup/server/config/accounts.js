import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';
import logServer from '../../../api/utils/functions';

// required: loads accounts customization before initial users creation

if (Meteor.settings.keycloak) {
  if (Meteor.settings.public.enableKeycloak === true) {
    Accounts.config({
      forbidClientAccountCreation: true,
    });
    ServiceConfiguration.configurations.upsert(
      { service: 'keycloak' },
      {
        $set: {
          loginStyle: 'redirect',
          serverUrl: Meteor.settings.public.keycloakUrl,
          realm: Meteor.settings.public.keycloakRealm,
          clientId: Meteor.settings.keycloak.client,
          realmPublicKey: Meteor.settings.keycloak.pubkey,
          bearerOnly: false,
        },
      },
    );
  }
} else {
  logServer('No Keycloak configuration. Please invoke meteor with a settings file.');
}
