/* eslint-disable import/prefer-default-export */
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { getLabel, isVerified } from '../utils/functions';

const setLogoutType = new ValidatedMethod({
  name: 'users.setLogoutType',
  validate: new SimpleSchema({
    logoutType: { type: String, label: getLabel('api.users.labels.logoutType') },
  }).validator(),

  run({ logoutType }) {
    if (!this.userId) {
      throw new Meteor.Error('api.users.setLogoutType.notPermitted', i18n.__('api.users.mustBeLoggedIn'));
    }
    Meteor.users.update(this.userId, {
      $set: { logoutType },
    });
  },
});

export const setAvatar = new ValidatedMethod({
  name: 'users.setAvatar',
  validate: new SimpleSchema({
    avatar: {
      type: String,
      label: getLabel('api.users.labels.avatar'),
    },
  }).validator(),

  run({ avatar }) {
    if (!this.userId) {
      throw new Meteor.Error('api.users.setAvatar.notPermitted', i18n.__('api.users.mustBeLoggedIn'));
    }
    Meteor.users.update(this.userId, {
      $set: { avatar },
    });
  },
});

export const setUsername = new ValidatedMethod({
  name: 'users.setUsername',
  validate: new SimpleSchema({
    username: { type: String, min: 1, label: getLabel('api.users.labels.username') },
  }).validator(),

  run({ username }) {
    // check that user is logged in
    if (!this.userId) {
      throw new Meteor.Error('api.users.setUsername.notLoggedIn', i18n.__('api.users.mustBeLoggedIn'));
    }
    if (Meteor.settings.public.enableKeycloak) {
      // do not allow if keycloak mode is active
      throw new Meteor.Error('api.users.setUsername.disabled', i18n.__('api.users.managedByKeycloak'));
    }
    // will throw error if username already taken
    Accounts.setUsername(this.userId, username);
  },
});

const verifyEmail = new ValidatedMethod({
  name: 'users.verifyEmail',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('api.users.verifyEmail.notPermitted', i18n.__('api.users.mustBeLoggedIn'));
    }
    if (Meteor.isServer) {
      const user = Meteor.users.findOne(this.userId);
      // check that user has at least one verified email
      if (!!user && !isVerified(user)) {
        Accounts.sendVerificationEmail(this.userId);
      }
    }
  },
});

export const setName = new ValidatedMethod({
  name: 'users.setName',
  validate: new SimpleSchema({
    firstName: {
      type: String,
      min: 1,
      label: getLabel('api.users.labels.firstName'),
      optional: true,
    },
    lastName: {
      type: String,
      min: 1,
      label: getLabel('api.users.labels.lastName'),
      optional: true,
    },
  }).validator(),

  run(data) {
    if (Meteor.settings.public.enableKeycloak === true) {
      throw new Meteor.Error('api.user.setName.disabled', i18n.__('api.users.managedByKeycloak'));
    }
    // check that user is logged in
    if (!this.userId) {
      throw new Meteor.Error('api.users.setName.notLoggedIn', i18n.__('api.users.mustBeLoggedIn'));
    }
    if (Object.keys(data).length !== 0) Meteor.users.update({ _id: this.userId }, { $set: data });
  },
});

export { setLogoutType, verifyEmail };
