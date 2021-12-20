import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import i18n from 'meteor/universe:i18n';
import logServer, { getLabel } from '../utils/functions';

const AppRoles = ['admin'];

Meteor.users.schema = new SimpleSchema(
  {
    username: {
      type: String,
      optional: true,
      label: getLabel('api.users.labels.username'),
    },
    firstName: {
      type: String,
      optional: true,
      label: getLabel('api.users.labels.firstName'),
    },
    lastName: {
      type: String,
      optional: true,
      label: getLabel('api.users.labels.lastName'),
    },
    emails: {
      type: Array,
      optional: true,
      label: getLabel('api.users.labels.emails'),
    },
    'emails.$': {
      type: Object,
    },
    'emails.$.address': {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      label: getLabel('api.users.labels.emailAddress'),
    },
    'emails.$.verified': {
      type: Boolean,
      label: getLabel('api.users.labels.emailVerified'),
    },
    createdAt: {
      type: Date,
      label: getLabel('api.users.labels.createdAt'),
    },
    lastLogin: {
      type: Date,
      label: getLabel('api.users.labels.lastLogin'),
      optional: true,
    },
    profile: {
      type: Object,
      optional: true,
      blackbox: true,
      label: getLabel('api.users.labels.profile'),
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
      type: Object,
      optional: true,
      blackbox: true,
      label: getLabel('api.users.labels.services'),
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
      type: Date,
      optional: true,
      label: getLabel('api.users.labels.heartbeat'),
    },
    primaryEmail: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      optional: true,
      label: getLabel('api.users.labels.primaryEmail'),
    },
    language: {
      type: String,
      optional: true,
      label: getLabel('api.users.labels.language'),
    },
    logoutType: {
      type: String,
      optional: true,
      allowedValues: ['ask', 'local', 'global'],
      label: getLabel('api.users.labels.logoutType'),
    },
    avatar: {
      type: String,
      optional: true,
      label: getLabel('api.users.labels.avatar'),
    },
  },
  { tracker: Tracker },
);

Meteor.users.selfFields = {
  username: 1,
  firstName: 1,
  lastName: 1,
  emails: 1,
  createdAt: 1,
  language: 1,
  logoutType: 1,
  lastLogin: 1,
  avatar: 1,
};

Meteor.users.publicFields = {
  username: 1,
  firstName: 1,
  lastName: 1,
  emails: 1,
  avatar: 1,
};

Meteor.users.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

Meteor.users.attachSchema(Meteor.users.schema);

if (Meteor.isServer) {
  // server side login hook
  Accounts.onLogin((details) => {
    const loginDate = new Date();
    if (details.type === 'keycloak') {
      // update user informations from keycloak service data
      const updateInfos = {
        lastLogin: loginDate,
        primaryEmail: details.user.services.keycloak.email,
      };
      if (details.user.services.keycloak.given_name) {
        updateInfos.firstName = details.user.services.keycloak.given_name;
      }
      if (details.user.services.keycloak.family_name) {
        updateInfos.lastName = details.user.services.keycloak.family_name;
      }
      if (
        details.user.services.keycloak.preferred_username &&
        details.user.services.keycloak.preferred_username !== details.user.username
      ) {
        // use preferred_username as username if defined
        // (should be set as mandatory in keycloak)
        updateInfos.username = details.user.services.keycloak.preferred_username;
      }
      Meteor.users.update({ _id: details.user._id }, { $set: updateInfos });
      // Manage primary email change
      if (details.user.primaryEmail !== details.user.services.keycloak.email) {
        updateInfos.email = details.user.services.keycloak.email;
        Accounts.addEmail(details.user._id, details.user.services.keycloak.email, true);
        if (details.user.primaryEmail !== undefined) {
          Accounts.removeEmail(details.user._id, details.user.primaryEmail);
        }
      }
      // check if user is defined as admin in settings
      if (Meteor.settings.private.adminEmails) {
        if (Meteor.settings.private.adminEmails.indexOf(details.user.services.keycloak.email) !== -1) {
          if (!Roles.userIsInRole(details.user._id, 'admin')) {
            Roles.addUsersToRoles(details.user._id, 'admin');
            logServer(`${i18n.__('api.users.adminGiven')} : ${details.user.services.keycloak.email}`);
          }
        }
      }
    } else {
      const updateInfos = {
        lastLogin: loginDate,
      };
      // check if email is in adminEmails
      if (Meteor.settings.private.adminEmails) {
        if (Meteor.settings.private.adminEmails.indexOf(details.user.emails[0].address) !== -1) {
          if (!Roles.userIsInRole(details.user._id, 'admin')) {
            Roles.addUsersToRoles(details.user._id, 'admin');
            logServer(`${i18n.__('api.users.adminGiven')} : ${details.user.emails[0].address}`);
          }
          if (!details.user.isActive) updateInfos.isActive = true;
        }
      }
      Meteor.users.update({ _id: details.user._id }, { $set: updateInfos });
    }
  });
}

export default AppRoles;
