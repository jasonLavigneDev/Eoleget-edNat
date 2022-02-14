import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { getLabel } from '../utils/functions';

const Applications = new Mongo.Collection('applications');

Applications.schema = new SimpleSchema({
  identification: {
    type: String,
    optional: true,
    label: getLabel('api.applications.labels.identification'),
  },

  nom: {
    type: String,
    optional: true,
    label: getLabel('api.applications.labels.name'),
  },

  description: {
    type: String,
    optional: true,
    label: getLabel('api.applications.labels.description'),
  },

  tags: {
    type: Array,
    optional: true,
    label: getLabel('api.applications.labels.tags'),
  },
  'tags.$': {
    type: String,
    label: getLabel('api.applications.labels.tags'),
  },

  versions: {
    type: Array,
    optional: true,
    label: getLabel('api.applications.labels.version'),
  },
  'versions.$': {
    type: String,
    label: getLabel('api.applications.labels.version'),
  },

  license: {
    type: String,
    optional: true,
    label: getLabel('api.applications.labels.license'),
  },

  url: {
    type: String,
    optional: true,
    label: getLabel('api.applications.labels.url'),
  },
});

Applications.publicFields = {
  nom: 1,
  identification: 1,
  description: 1,
  tags: 1,
  versions: 1,
  url: 1,
  license: 1,
};

Applications.attachSchema(Applications.schema);

export default Applications;
