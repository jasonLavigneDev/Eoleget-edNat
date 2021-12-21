import { Mongo } from 'meteor/mongo';
import { arrayOf } from 'prop-types';
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
    type: arrayOf(String),
    optional: true,
    label: getLabel('api.applications.labels.tags'),
  },

  versions: {
    type: arrayOf(String),
    optional: true,
    label: getLabel('api.applications.labels.version'),
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
};

Applications.attachSchema(Applications.schema);

export default Applications;
