import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';

// import MaterialTable from '@material-table/core';
import { DataGrid } from '@mui/x-data-grid';

function AppList({ applications, isUpperCase }) {
  const columns = [
    {
      title: 'id',
      field: 'id',
      editable: 'never',
      hide: true,
    },
    {
      title: i18n.__('components.AppList.application'),
      field: 'application',
      editable: 'never',
      width: 250,
    },
    {
      title: i18n.__('components.AppList.description'),
      field: 'description',
      width: 700,
    },
    {
      title: i18n.__('components.AppList.version'),
      field: 'versions',
      width: 130,
    },
    {
      title: i18n.__('components.AppList.url'),
      field: 'url',
      width: 250,
    },
  ];

  const data = [];
  let _id = 0;
  applications.map((app) => {
    _id += 1;
    let { description } = app;
    if (isUpperCase(app.description)) {
      description = app.description.toLowerCase();
    }
    return data.push({ id: _id, application: app.nom, description, versions: app.versions[0], url: app.url });
  });

  return (
    <div style={{ height: 600 }}>
      <DataGrid columns={columns} rows={data} rowHeight={30} />
    </div>
  );
  // return <MaterialTable columns={columns} data={data} title="Liste des applications" options={options} />;
}

AppList.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.object).isRequired,
  isUpperCase: PropTypes.func.isRequired,
};

export default AppList;
