import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { getLabel } from '../utils/functions';

const Applications = new Mongo.Collection('applications');

Applications.schema = new SimpleSchema(
  {
    name: {
      type: String,
      label: getLabel('api.application.label'),
    },
    architecture: {
      type: String,
      label: getLabel('api.application.architecture'),
    },
    url: {
      type: String,
      label: getLabel('api.application.url'),
    },
    version: {
      type: String,
      label: getLabel('api.application.version'),
    },
    creationDate: {
      type: Date,
      label: getLabel('api.application.creationDate'),
    },
  },
  { tracker: Tracker },
);

Applications.publicField = {
  name: 1,
  architecture: 1,
  url: 1,
  version: 1,
  creationDate: 1,
};

Applications.attachSchema(Applications.schema);

export default Applications;
