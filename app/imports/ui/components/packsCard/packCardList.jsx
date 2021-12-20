import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import PackCard from './packCard';
import Pagination from '../Pagination/pagination';

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
    <>
      <Pagination nbPages={20} page={1} />
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
      <Pagination nbPages={20} page={1} />
    </>
  );
}

export default PackCardList;
