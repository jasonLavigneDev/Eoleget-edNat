import { Meteor } from 'meteor/meteor';
import AppSettings from '../../../api/appsettings/appsettings';

Meteor.startup(() => {
  if (!AppSettings.findOne()) {
    AppSettings.insert({
      _id: 'settings',
      textMaintenance: '',
      maintenance: false,
    });
  }
});
