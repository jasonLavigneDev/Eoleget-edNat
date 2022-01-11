import { Meteor } from 'meteor/meteor';
import Packs from '../packs';

// A supprimer quand le fichier utils.js sera commit
function isActive() {
  return false;
}

// publish all packs
Meteor.publish('packs.all', function packsAll() {
  if (!isActive(this.userId)) {
    return this.ready();
  }
  return Packs.find({}, { fields: Packs.publicFields, sort: { name: 1 }, limit: 5000 });
});
