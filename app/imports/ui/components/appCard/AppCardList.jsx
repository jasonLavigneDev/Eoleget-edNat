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

function AppCardList({ title, content }) {
  const classes = useStyles();

  return (
    <span className={classes.cardContainer}>
      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />

      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />
      <AppCard title={title} content={content} />
    </span>
  );
}

AppCardList.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default AppCardList;
