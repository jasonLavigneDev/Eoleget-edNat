import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';
import AppRoles from '../../../api/users/users';

// required: loads accounts customization before initial users creation

if (Meteor.settings.smtp && Meteor.settings.smtp.url) {
  process.env.MAIL_URL = Meteor.settings.smtp.url;
}

Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl(`reset-password/${token}`);
};
Accounts.urls.verifyEmail = (token) => {
  return Meteor.absoluteUrl(`verify-email/${token}`);
};
Accounts.emailTemplates.siteName = i18n.__('emailTemplates.siteName');
Accounts.emailTemplates.from = i18n.__('emailTemplates.from');
Accounts.emailTemplates.resetPassword = {
  subject() {
    return i18n.__('emailTemplates.resetSubject');
  },
  text(user, url) {
    return i18n.__('emailTemplates.resetText', { user: user.firstName, url });
  },
};
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return i18n.__('emailTemplates.verifySubject');
  },
  text(user, url) {
    return i18n.__('emailTemplates.verifyText', { user: user.firstName, url });
  },
};

if (Meteor.settings.keycloak && Meteor.settings.public.enableKeycloak === true) {
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
} else {
  Accounts.onCreateUser((options, user) => {
    // get additional data from options
    const newUser = { ...user };
    if (options.firstName) newUser.firstName = options.firstName;
    if (options.lastName) newUser.lastName = options.lastName;
    return newUser;
  });
}

/* ensure all roles exist */
const existingRoles = Roles.getAllRoles()
  .fetch()
  .map((role) => role._id);
AppRoles.forEach((role) => {
  if (existingRoles.indexOf(role) === -1) Roles.createRole(role);
});
