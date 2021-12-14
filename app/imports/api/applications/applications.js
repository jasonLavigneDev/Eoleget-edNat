import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { getLabel } from '../utils/functions';

const Applications = new Mongo.Collection('applications');

// Deny all client-side updates since we will be using methods to manage this collection
Applications.deny({
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

Applications.schema = new SimpleSchema(
  {
    identification: {
      type: String,
      label: getLabel('api.application.identification'),
    },
    name: {
      type: String,
      label: getLabel('api.application.name'),
    },
    description: {
      type: String,
      label: getLabel('api.application.description'),
    },
    tags: {
      type: Array,
      label: getLabel('appi.application.tags'),
    },
    // version: {
    //   type: String,
    //   label: getLabel('api.application.version'),
    // },
    // url: {
    //   type: String,
    //   label: getLabel('api.application.url'),
    // },
    // architecture: {
    //   type: String,
    //   label: getLabel('api.application.architecture'),
    // },
    // creationDate: {
    //   type: Date,
    //   label: getLabel('api.application.creationDate'),
    // },
  },
  { tracker: Tracker },
);

Applications.publicField = {
  identification: 1,
  name: 1,
  description: 1,
  tags: 1,
};

Applications.attachSchema(Applications.schema);

export default Applications;
