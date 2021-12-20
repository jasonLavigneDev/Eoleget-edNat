import '../imports/startup/server';
import Applications from '../imports/api/applications/applications';

Meteor.startup(() => {
  if (Applications.find({}).count > 0) {
    Applications.insert({ nom: 'Hello, world!', identificationName: 'world', description: 'bla bla' });
  }
});
