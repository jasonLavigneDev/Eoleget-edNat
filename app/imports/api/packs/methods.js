import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import i18n from 'meteor/universe:i18n';
import { getLabel } from '../utils/functions';
import Packs from './packs';

function _createPack({
  name,
  applications,
  creationDate,
  isValidated,
  owner,
  ownerName,
  description,
  color,
  icon,
  isPublic,
}) {
  try {
    Packs.insert({
      name,
      creationDate,
      isValidated,
      applications,
      owner,
      ownerName,
      description,
      color,
      icon,
      isPublic,
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Meteor.Error('api.packs.duplicateName', i18n.__('api.packs.packAlreadyExist'));
    } else {
      throw error;
    }
  }
}

function _updatePack(_id, name, applications, description, color, icon, isPublic) {
  try {
    Packs.update(_id, { $set: { name, applications, description, color, icon, isPublic } });
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
    icon: { type: String, label: getLabel('api.packs.labels.icon') },
    isPublic: { type: Boolean, label: getLabel('api.packs.labels.isPublic') },
    ownerName: { type: String, label: getLabel('api.packs.labels.ownerName') },
  }).validator({ clean: true }),

  run({ name, applications, creationDate, isValidated, ownerName, description, color, icon, isPublic }) {
    if (applications === undefined || applications.length === 0) {
      throw new Meteor.Error('api.packs.emptyPack', i18n.__('api.packs.emptyPack'));
    }

    if (applications.length < 2) {
      throw new Meteor.Error('api.packs.notEnoughApp', i18n.__('api.packs.notEnoughPack'));
    }

    return _createPack({
      name,
      applications,
      creationDate,
      isValidated,
      owner: this.userId,
      ownerName,
      description,
      color,
      icon,
      isPublic,
    });
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
    icon: { type: String, label: getLabel('api.packs.labels.icon') },
    isPublic: { type: Boolean, label: getLabel('api.packs.labels.isPublic') },
  }).validator({ clean: true }),

  run({ _id, name, applications, description, color, icon, isPublic }) {
    const pack = Packs.findOne(_id);
    if (pack === undefined) {
      throw new Meteor.Error('api.packs.unknownPack', i18n.__('api.packs.unknownPack'));
    }

    if (applications === undefined || applications.length === 0) {
      throw new Meteor.Error('api.packs.emptyPack', i18n.__('api.packs.emptyPack'));
    }

    if (applications.length < 2) {
      throw new Meteor.Error('api.packs.notEnoughApp', i18n.__('api.packs.notEnoughPack'));
    }

    const authorized = pack.owner === this.userId;
    if (!authorized) {
      throw new Meteor.Error('api.packs.updatePack.notPermitted', i18n.__('api.packs.needToBeOwner'));
    }

    _updatePack(_id, name, applications, description, color, icon, isPublic);
    return null;
  },
});
