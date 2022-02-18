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
      defaultValue: [],
      label: getLabel('api.packs.labels.applications'),
    },
    'applications.$': {
      type: Object,
      label: getLabel('api.packs.labels.applications'),
    },
    'applications.$.identification': { type: String, label: getLabel('api.applications.labels.identification') },
    'applications.$.nom': {
      type: String,
      label: getLabel('api.applications.labels.name'),
    },

    'applications.$.description': {
      type: String,
      label: getLabel('api.applications.labels.description'),
    },

    'applications.$.version': {
      type: String,
      label: getLabel('api.applications.labels.version'),
    },
    owner: {
      type: String,
      label: getLabel('api.packs.labels.owner'),
    },
    ownerName: {
      type: String,
      label: getLabel('api.packs.labels.ownerName'),
    },
    description: {
      type: String,
      label: getLabel('api.packs.labels.description'),
    },
    color: {
      type: String,
      label: getLabel('api.packs.labels.color'),
    },
    isPublic: {
      type: Boolean,
      label: getLabel('api.packs.labels.isPublic'),
    },
  },
  { clean: { removeEmptyStrings: false }, tracker: Tracker },
);

Packs.publicField = {
  name: 1,
  creationDate: 1,
  isValidated: 1,
  applications: 1,
  owner: 1,
  ownerName: 1,
  description: 1,
  color: 1,
  isPublic: 1,
};

Packs.attachSchema(Packs.schema);

export default Packs;
