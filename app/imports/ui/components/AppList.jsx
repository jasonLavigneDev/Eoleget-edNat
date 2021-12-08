import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import MaterialTable from '@material-table/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  tableContainer: {
    width: '100%',
  },
  tableHeader: {
    backgroundColor: '#95B5F0',
  },
}));

function AppList({ title, content }) {
  const classes = useStyles();

  const columns = [
    {
      title: i18n.__('components.List.application'),
      field: 'application',
      editable: 'never',
    },
    {
      title: i18n.__('components.List.description'),
      field: 'description',
    },
    {
      title: i18n.__('components.List.version'),
      field: 'version',
    },
    {
      title: i18n.__('components.List.url'),
      field: 'url',
    },
  ];

  const data = [
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
    { application: title, description: content, version: content, url: content },
  ];

  return (
    <div className={classes.tableContainer}>
      <MaterialTable style={{ width: 'auto' }} columns={columns} data={data} title="Demo Title" />
    </div>
  );
}

AppList.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default AppList;
