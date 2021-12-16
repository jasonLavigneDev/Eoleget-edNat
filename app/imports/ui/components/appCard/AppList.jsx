import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';

import MaterialTable from '@material-table/core';

function AppList({ title, content }) {
  const columns = [
    {
      title: i18n.__('components.AppList.application'),
      field: 'application',
      editable: 'never',
    },
    {
      title: i18n.__('components.AppList.description'),
      field: 'description',
    },
    {
      title: i18n.__('components.AppList.version'),
      field: 'version',
    },
    {
      title: i18n.__('components.AppList.url'),
      field: 'url',
    },
  ];

  const options = {
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    paginationType: 'stepped',
    actionsColumnIndex: 6,
    addRowPosition: 'first',
    emptyRowsWhenPaging: false,
    headerStyle: {
      backgroundColor: '#95B5F0',
    },
  };

  const data = [
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
  ];

  return <MaterialTable columns={columns} data={data} title="Liste des applications" options={options} />;
}

AppList.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default AppList;
