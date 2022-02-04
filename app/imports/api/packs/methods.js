import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import i18n from 'meteor/universe:i18n';
import { getLabel } from '../utils/functions';
import Packs from './packs';

function _createPack({ name, applications, creationDate, isValidated, owner, description, color }) {
  try {
    Packs.insert({
      name,
      creationDate,
      isValidated,
      applications,
      owner,
      description,
      color,
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Meteor.Error('api.packs.duplicateName', i18n.__('api.packs.packAlreadyExist'));
    } else {
      throw error;
    }
  }
}

function _updatePack(_id, name, applications, description, color) {
  try {
    Packs.update(_id, { $set: { name, applications, description, color } });
    return null;
  } catch (error) {
    if (error.code === 11000) {
      throw new Meteor.Error('api.packs.duplicateName', i18n.__('api.packs.packAlreadyExist'));
    } else {
      throw error;
    }
  }
}

export const createPack = new ValidatedMethod({
  name: 'packs.createPack',
  validate: new SimpleSchema({
    name: { type: String, min: 1, label: getLabel('api.packs.labels.name') },
    applications: { type: Array, label: getLabel('api.packs.labels.applications') },
    'applications.$': { type: Object, label: getLabel('api.packs.labels.applications') },
    'applications.$.identification': { type: String, label: getLabel('api.applications.labels.identification') },
    'applications.$.nom': {
      type: String,
      label: getLabel('api.applications.labels.name'),
    },
    'applications.$.version': {
      type: String,
      defaultValue: '',
      label: getLabel('api.applications.labels.version'),
    },
    'applications.$.description': {
      type: String,
      label: getLabel('api.applications.labels.description'),
    },
    creationDate: { type: Date, label: getLabel('api.packs.labels.creationDate') },
    isValidated: { type: Boolean, label: getLabel('api.packs.labels.isValidated') },
    description: { type: String, label: getLabel('api.packs.labels.description') },
    color: { type: String, label: getLabel('api.packs.labels.color') },
  }).validator({ clean: true }),

  run({ name, applications, creationDate, isValidated, description, color }) {
    const packWithName = Packs.findOne({ name });
    if (packWithName !== undefined) {
      throw new Meteor.Error('api.packs.nameAlreadyTaken', i18n.__('api.packs.nameAlreadyTaken'));
    }

    return _createPack({ name, applications, creationDate, isValidated, owner: this.userId, description, color });
  },
});

export const removePack = new ValidatedMethod({
  name: 'packs.removePack',
  validate: new SimpleSchema({
    packId: { type: String, regEx: SimpleSchema.RegEx.Id, label: getLabel('api.packs.labels.id') },
  }).validator(),

  run({ packId }) {
    const pack = Packs.findOne({ _id: packId });
    if (pack === undefined) {
      throw new Meteor.Error('api.packs.unknownPack', i18n.__('api.packs.packNotFound'));
    }

    const authorized = this.userId === pack.owner;
    if (!authorized) {
      throw new Meteor.Error('api.packs.removePack.notPermitted', i18n.__('api.packs.needToBeOwner'));
    }

    Packs.remove(packId);
    return null;
  },
});

export const updatePack = new ValidatedMethod({
  name: 'packs.updatePack',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    name: { type: String, min: 1, label: getLabel('api.packs.labels.name') },
    applications: { type: Array, label: getLabel('api.packs.labels.applications') },
    'applications.$': { type: Object, label: getLabel('api.packs.labels.applications') },
    'applications.$.identification': { type: String, label: getLabel('api.applications.labels.identification') },
    'applications.$.nom': {
      type: String,
      label: getLabel('api.applications.labels.name'),
    },
    'applications.$.version': {
      type: String,
      defaultValue: '',
      label: getLabel('api.applications.labels.version'),
    },
    'applications.$.description': {
      type: String,
      label: getLabel('api.applications.labels.description'),
    },
    description: { type: String, label: getLabel('api.packs.labels.description') },
    color: { type: String, label: getLabel('api.packs.labels.color') },
  }).validator({ clean: true }),

  run({ _id, name, applications, description, color }) {
    const pack = Packs.findOne(_id);
    if (pack === undefined) {
      throw new Meteor.Error('api.packs.unknownPack', i18n.__('api.packs.unknownPack'));
    }

    if (pack.name !== name) {
      const packWithName = Packs.findOne({ name });
      if (packWithName !== undefined) {
        throw new Meteor.Error('api.packs.nameAlreadyTaken', i18n.__('api.packs.nameAlreadyTaken'));
      }
    }

    const authorized = pack.owner === this.userId;
    if (!authorized) {
      throw new Meteor.Error('api.packs.updatePack.notPermitted', i18n.__('api.packs.needToBeOwner'));
    }

    _updatePack(_id, name, applications, description, color);
    return null;
  },
});
