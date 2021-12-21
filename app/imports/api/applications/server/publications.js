import { Meteor } from 'meteor/meteor';
// import { isActive } from '../../utils';
import Applications from '../applications';

// A supprimer quand le fichier utils.js sera commit
function isActive() {
  return false;
}

// Meteor.publish('applications.all', function () {
//   console.log(Applications.find({}).fetch());
//   console.log(` count : `, Applications.find({}).count());
//   return Applications.find({}).fetch();
// });

// publish all Applications
Meteor.publish('applications.all', function publishApps() {
  console.log(` count : `, Applications.find({}, { limit: 30 }).count());
  return Applications.find({}, { limit: 30 });
});
