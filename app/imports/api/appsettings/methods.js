import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';

import { isActive, getLabel } from '../utils';
import AppSettings from './appsettings';

export const addDefaultSettings = () => {
  AppSettings.insert({
    _id: 'settings',
    maintenance: false,
    textMaintenance: '',
  });
};

export const switchMaintenanceStatus = new ValidatedMethod({
  name: 'appSettings.switchMaintenanceStatus',
  validate: null,

  run() {
    try {
      const appSettings = AppSettings.findOne({ _id: 'settings' });
      if (appSettings === undefined) addDefaultSettings();

      const authorized = isActive(this.userId) && Roles.userIsInRole(this.userId, 'admin');
      if (!authorized) {
        throw new Meteor.Error(
          'api.appsettings.switchMaintenanceStatus.notPermitted',
          i18n.__('api.users.adminNeeded'),
        );
      }
      const appsettings = AppSettings.findOne({ _id: 'settings' });
      const newValue = !(appsettings.maintenance || false);
      return AppSettings.update({ _id: 'settings' }, { $set: { maintenance: newValue } });
    } catch (error) {
      throw new Meteor.Error(error, error);
    }
  },
});

export const updateTextMaintenance = new ValidatedMethod({
  name: 'appSettings.updateTextMaintenance',
  validate: new SimpleSchema({
    text: {
      type: String,
      label: getLabel('api.appsettings.labels.textMaintenance'),
      optional: true,
    },
  }).validator({ clean: true }),

  run({ text }) {
    try {
      const appSettings = AppSettings.findOne({ _id: 'settings' });
      if (appSettings === undefined) addDefaultSettings();

      // check if current user is admin
      const authorized = isActive(this.userId) && Roles.userIsInRole(this.userId, 'admin');
      if (!authorized) {
        throw new Meteor.Error('api.appsettings.updateTextMaintenance.notPermitted', i18n.__('api.users.adminNeeded'));
      }
      return AppSettings.update({ _id: 'settings' }, { $set: { textMaintenance: text } });
    } catch (error) {
      throw new Meteor.Error(error, error);
    }
  },
});

// Get list of all method names on User
const LISTS_METHODS = _.pluck([updateTextMaintenance, switchMaintenanceStatus], 'name');

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule(
    {
      name(name) {
        return _.contains(LISTS_METHODS, name);
      },

      // Rate limit per connection ID
      connectionId() {
        return true;
      },
    },
    5,
    1000,
  );
}
