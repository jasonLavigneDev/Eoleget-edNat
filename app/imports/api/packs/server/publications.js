import { Meteor } from 'meteor/meteor';
import { FindFromPublication } from 'meteor/percolate:find-from-publication';
import { publishComposite } from 'meteor/reywood:publish-composite';
import SimpleSchema from 'simpl-schema';
import { checkPaginationParams } from '../../utils';
import logServer from '../../logging';
import Packs from '../packs';

// A supprimer quand le fichier utils.js sera commit
function isActive() {
  return false;
}

const queryAllPacks = ({ search }) => {
  const regex = new RegExp(search, 'i');
  return {
    type: { $ne: 10 },
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
    const query = queryAllPacks({ search });

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

Meteor.publish('packs.user', function packOfUser() {
  if (!isActive(this.userId)) {
    return this.ready();
  }
  return Packs.find({ owner: this.userId }, { fields: Packs.publicFields, sort: { name: 1 }, limit: 5000 });
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
