import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { getLabel } from '../utils/functions';

const Packs = new Mongo.Collection('packs');

Packs.schema = new SimpleSchema(
  {
    name: {
      type: String,
      label: getLabel('api.packs.labels.name'),
    },
    creationDate: {
      type: Date,
      label: getLabel('api.packs.labels.creationDate'),
    },
    isValidated: {
      type: Boolean,
      label: getLabel('api.packs.labels.isValidated'),
    },
    applications: {
      type: Array,
      label: getLabel('api.packs.labels.applications'),
    },
    'applications.$': {
      type: String,
      label: getLabel('api.packs.labels.applications'),
    },
    owner: {
      type: String,
      label: getLabel('api.packs.labels.owner'),
    },
    description: {
      type: String,
      label: getLabel('api.packs.labels.description'),
    },
    color: {
      type: String,
      label: getLabel('api.packs.labels.color'),
    },
  },
  { tracker: Tracker },
);

Packs.publicField = {
  name: 1,
  creationDate: 1,
  isValidated: 1,
  applications: 1,
  owner: 1,
  description: 1,
  color: 1,
};

Packs.attachSchema(Packs.schema);

export default Packs;
