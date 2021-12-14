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

export { setLogoutType, verifyEmail };
