import { Meteor } from 'meteor/meteor';
// import { isActive } from '../../utils';
import Applications from '../applications';

// A supprimer quand le fichier utils.js sera commit
function isActive() {
  return false;
}

// publish all Applications
Meteor.publish('applications.all', function applicationsAll() {
  if (!isActive(this.userId)) {
    return this.ready();
  }
  return Applications.find({}, { fields: Applications.publicFields, limit: 2 });
});
