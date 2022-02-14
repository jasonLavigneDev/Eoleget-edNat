import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { publishComposite } from 'meteor/reywood:publish-composite';
import SimpleSchema from 'simpl-schema';
import logServer from '../../utils/functions';

// automatically publish additional fields for current user
Meteor.publish('userData', function publishUserData() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: Meteor.users.selfFields,
      },
    );
  }
  return this.ready();
});

// automatically publish assignments for current user
Meteor.publish(null, function publishAssignments() {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

// publish all admin assignments (global admin)
Meteor.publish('roles.admin', function publishAdmins() {
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }
  return Meteor.roleAssignment.find({ 'role._id': 'admin', scope: null });
});

// publish all users for admin page
Meteor.publish('users.admin', function publishAdmins() {
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }
  return Meteor.users.find({}, { fields: Meteor.users.adminFields });
});

publishComposite('users.single', function userSingle({ _id }) {
  try {
    new SimpleSchema({
      _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
      },
    }).validate({ _id });
  } catch (err) {
    logServer(`publish users.single : ${err}`);
    this.error(err);
  }

  return {
    find() {
      const data = Meteor.users.find({ _id });
      return data;
    },
  };
});

publishComposite('users.all', function usersAll() {
  return {
    find() {
      const data = Meteor.users.find({});
      return data;
    },
  };
});
