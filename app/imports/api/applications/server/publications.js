import { FindFromPublication } from 'meteor/percolate:find-from-publication';
import { publishComposite } from 'meteor/reywood:publish-composite';
import SimpleSchema from 'simpl-schema';
import { checkPaginationParams, getLabel } from '../../utils';
import logServer from '../../logging';
import Applications from '../applications';

// build query for all applications
const queryAllApplications = ({ search }) => {
  const regex = new RegExp(search, 'i');
  return {
    $or: [
      {
        nom: { $regex: regex },
      },
      {
        description: { $regex: regex },
      },
    ],
  };
};

const queryAllApplicationsByTags = ({ tags }) => {
  return {
    tags: { $all: tags },
  };
};

// publish all existing applications
FindFromPublication.publish('applications.all', function applicationsAll({ page, search, itemPerPage, ...rest }) {
  try {
    checkPaginationParams.validate({ page, itemPerPage, search });
  } catch (err) {
    logServer(`publish applications.all : ${err}`);
    this.error(err);
  }

  try {
    let query;
    if (search.startsWith('#')) {
      const finalSearch = search.slice(1);
      const tags = finalSearch.split(' ');
      query = queryAllApplicationsByTags({ tags });
    } else query = queryAllApplications({ search });

    return Applications.find(query, {
      fields: Applications.publicFields,
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
  'get_applications.all_count': function getApplicationsAllCount({ nodrafts, search }) {
    try {
      let query;
      if (search.startsWith('#')) {
        const finalSearch = search.slice(1);
        const tags = finalSearch.split(' ');
        query = queryAllApplicationsByTags({ tags });
      } else query = queryAllApplications({ nodrafts, search });
      return Applications.find(query).count();
    } catch (error) {
      return 0;
    }
  },
});

Meteor.publish('applications.table.all', function publishApps({ search }) {
  if (search.startsWith('#')) {
    const tags = search.slice(1).split(' ');
    return Applications.find({ tags: { $all: tags } });
  }
  const query = queryAllApplications({ search });
  return Applications.find(query, {});
});

Meteor.publish('applications.pack', function publishPacksApps({ packAppli }) {
  return Applications.find({ identification: { $in: packAppli } });
});

publishComposite('applications.single', function publishOneApp({ identification }) {
  try {
    new SimpleSchema({
      identification: {
        type: String,
        label: getLabel('api.applications.labels.identification'),
      },
    }).validate({ identification });
  } catch (err) {
    logServer(`publish applications.single : ${err}`);
    this.error(err);
  }
  return {
    find() {
      return Applications.find({ identification }, { fields: Applications.publicFields, limit: 1, sort: { name: -1 } });
    },
  };
});
