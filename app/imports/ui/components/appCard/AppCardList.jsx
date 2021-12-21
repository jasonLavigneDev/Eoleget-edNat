import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import AppCard from './AppCard';

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

function AppCardList({ applications, isUpperCase }) {
  const classes = useStyles();

  return (
    <span className={classes.cardContainer}>
      {applications.map((app) => {
        let { description } = app;
        if (isUpperCase(app.description)) {
          description = app.description.toLowerCase();
        }
        return <AppCard title={app.nom} content={description} />;
      })}
    </span>
  );
}

AppCardList.propTypes = {
  applications: PropTypes.node.isRequired,
  isUpperCase: PropTypes.func.isRequired,
};

export default AppCardList;
