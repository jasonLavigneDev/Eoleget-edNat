import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';

import MaterialTable from '@material-table/core';

function AppList({ applications, isUpperCase }) {
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
      field: 'versions',
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

  const data = [];
  applications.map((app) => {
    let { description } = app;
    if (isUpperCase(app.description)) {
      description = app.description.toLowerCase();
    }
    return data.push({ application: app.nom, description, versions: app.versions[0], url: app.url });
  });

  return <MaterialTable columns={columns} data={data} title="Liste des applications" options={options} />;
}

AppList.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.object).isRequired,
  isUpperCase: PropTypes.func.isRequired,
};

export default AppList;
