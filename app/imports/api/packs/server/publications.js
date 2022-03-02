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

const queryAllPacksByOwner = ({ search }) => {
  const regex = new RegExp(search, 'i');
  return {
    isPublic: true,
    $or: [
      {
        ownerName: { $regex: regex },
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
      query = queryAllPacksByOwner({ search: finalsearch });
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
      if (search.startsWith('@')) {
        const finalSearch = search.slice(1);
        const query = queryAllPacksByOwner({ nodrafts, search: finalSearch, userId: userId || this.userId });
        return Packs.find(query).count();
      }
      const query = queryAllPacks({ nodrafts, search, userId });
      return Packs.find(query).count();
    } catch (error) {
      return 0;
    }
  },
});

const queryAllPackOwned = ({ search, userId }) => {
  const regex = new RegExp(search, 'i');
  const fieldsToSearch = ['name', 'description'];
  const searchQuery = fieldsToSearch.map((field) => ({
    [field]: { $regex: regex },
  }));
  return {
    owner: userId,
    $or: searchQuery,
  };
};

Meteor.publish('packs.table.all', function publishPacks({ search }) {
  if (search.startsWith('@')) {
    const name = search.slice(1);
    const regex = new RegExp(name, 'i');
    return Packs.find({
      isPublic: true,
      $or: [
        {
          ownerName: { $regex: regex },
        },
      ],
    });
  }
  const regex = new RegExp(search, 'i');
  return Packs.find({
    isPublic: true,
    $or: [
      {
        name: { $regex: regex },
      },
      {
        description: { $regex: regex },
      },
    ],
  });
});
Meteor.publish('packs.table.user', function publishOwnedPacks({ search, userId }) {
  const regex = new RegExp(search, 'i');
  return Packs.find({
    owner: userId,
    $or: [
      {
        name: { $regex: regex },
      },
      {
        description: { $regex: regex },
      },
    ],
  });
});

Meteor.methods({
  'get_packs.user_count': function getPackAllCountForOwner({ nodrafts, search, userId }) {
    try {
      const query = queryAllPackOwned({ nodrafts, search, userId });
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

  const query = queryAllPackOwned({ search, userId });
  try {
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
