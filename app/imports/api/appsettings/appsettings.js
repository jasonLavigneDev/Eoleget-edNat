import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { getLabel } from '../utils';

const AppSettings = new Mongo.Collection('appsettings');

// Deny all client-side updates since we will be using methods to manage this collection
AppSettings.deny({
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

AppSettings.schema = new SimpleSchema(
  {
    maintenance: {
      type: Boolean,
      defaultValue: false,
      label: getLabel('api.appsettings.labels.maintenance'),
    },
    textMaintenance: {
      type: String,
      defaultValue: ' ',
      label: getLabel('api.appsettings.labels.textMaintenance'),
    },
  },
  { clean: { removeEmptyStrings: false }, tracker: Tracker },
);

AppSettings.publicFields = {
  maintenance: 1,
  textMaintenance: 1,
};

AppSettings.attachSchema(AppSettings.schema);

export default AppSettings;
