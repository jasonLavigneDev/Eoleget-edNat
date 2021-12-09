import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import PackCard from './packCard';

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

function PackCardList() {
  const classes = useStyles();

  return (
    <span className={classes.cardContainer}>
      <PackCard />
      <PackCard />
      <PackCard />
      <PackCard />
      <PackCard />
      <PackCard />
      <PackCard />
      <PackCard />
    </span>
  );
}

export default PackCardList;
