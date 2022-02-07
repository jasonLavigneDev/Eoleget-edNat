import { Meteor } from 'meteor/meteor';
import AppSettings from '../appsettings';

// publish all settings
Meteor.publish('appsettings.all', () => {
  const { publicFields } = AppSettings;
  return AppSettings.find({ _id: 'settings' }, { fields: publicFields, sort: { _id: 1 }, limit: 1 });
});

// publish maintenance settings
Meteor.publish('appsettings.maintenance', () => {
  const { maintenance } = AppSettings;
  return AppSettings.find({ _id: 'settings' }, { fields: maintenance, sort: { _id: 1 }, limit: 1 });
});

// publish textMaintenance settings
Meteor.publish('appsettings.textMaintenance', () => {
  const { textMaintenance } = AppSettings;
  return AppSettings.find({ _id: 'settings' }, { fields: textMaintenance, sort: { _id: 1 }, limit: 1 });
});
