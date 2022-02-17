import { Meteor } from 'meteor/meteor';
import { FindFromPublication } from 'meteor/percolate:find-from-publication';
import { publishComposite } from 'meteor/reywood:publish-composite';
import SimpleSchema from 'simpl-schema';
import { checkPaginationParams } from '../../utils';
import logServer from '../../logging';
import Packs from '../packs';

const queryAllPacks = ({ search }) => {
  const regex = new RegExp(search, 'i');
  return {
    isPublic: true,
    $or: [
      {
        name: { $regex: regex },
      },
      {
        description: { $regex: regex },
      },
    ],
  };
};

// publish all existing applications
FindFromPublication.publish('packs.all', function packsAll({ page, search, itemPerPage, ...rest }) {
  try {
    checkPaginationParams.validate({ page, itemPerPage, search });
  } catch (err) {
    logServer(`publish packs.all : ${err}`);
    this.error(err);
  }

  try {
    let query;
    if (search.startsWith('@')) {
      const finalsearch = search.slice(1);
      query = queryAllPacks({ finalsearch });
    } else query = queryAllPacks({ search });

    return Packs.find(query, {
      fields: Packs.publicFields,
      skip: itemPerPage * (page - 1),
      limit: itemPerPage,
      sort: { name: 1 },
      ...rest,
    });
  } catch (error) {
    return this.ready();
  }
});

Meteor.methods({
  'get_packs.all_count': function getPackAllCount({ nodrafts, search, userId }) {
    try {
      const query = queryAllPacks({ nodrafts, search, userId: userId || this.userId });
      return Packs.find(query).count();
    } catch (error) {
      return 0;
    }
  },
});

const queryAllPackOwned = ({ search, userId }) => {
  const regex = new RegExp(search, 'i');
  const fieldsToSearch = [
    'name',
    'version',
    'applications',
    'description',
    'color',
    'isValidated',
    'creationDate',
    'isPublic',
  ];
  const searchQuery = fieldsToSearch.map((field) => ({
    [field]: { $regex: regex },
    owner: userId,
  }));
  return {
    $or: searchQuery,
  };
};

Meteor.publish('packs.table.all', function publishPacks() {
  return Packs.find({});
});

Meteor.methods({
  'get_packs.user_count': function getPackAllCount({ nodrafts, search, userId }) {
    try {
      const query = queryAllPackOwned({ nodrafts, search, userId: userId || this.userId });
      return Packs.find(query).count();
    } catch (error) {
      return 0;
    }
  },
});

FindFromPublication.publish('packs.user', function packsOfUser({ page, search, userId, itemPerPage, ...rest }) {
  try {
    checkPaginationParams.validate({ page, itemPerPage, search });
  } catch (err) {
    logServer(`publish packs.user : ${err}`);
    this.error(err);
  }

  try {
    return Packs.find(
      { owner: userId },
      {
        fields: Packs.publicFields,
        skip: itemPerPage * (page - 1),
        limit: itemPerPage,
        sort: { name: 1 },
        ...rest,
      },
    );
  } catch (error) {
    return this.ready();
  }
});

publishComposite('packs.single', function packSingle({ _id }) {
  try {
    new SimpleSchema({
      _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
      },
    }).validate({ _id });
  } catch (err) {
    logServer(`publish packs.single : ${err}`);
    this.error(err);
  }

  return {
    find() {
      return Packs.find({ _id }, { fields: Packs.publicFields, limit: 1, sort: { name: -1 } });
    },
  };
});
