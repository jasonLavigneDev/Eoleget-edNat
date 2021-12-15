import { Meteor } from 'meteor/meteor';
// import { isActive } from '../../utils';
import Applications from '../applications';

// A supprimer quand le fichier utils.js sera commit
function isActive() {
  return false;
}

// publish all Applications
Meteor.publish('applications.all', function () {
  if (!isActive(this.userId)) {
    return this.ready();
  }
  console.log(Applications.find({}).fetch());
  return Applications.find({}).fetch();
});
