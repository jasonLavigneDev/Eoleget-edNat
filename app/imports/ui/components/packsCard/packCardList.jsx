import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';

import PackCard from './packCard';
import Pagination from '../Pagination/pagination';

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

// eslint-disable-next-line no-unused-vars
const PackCardList = ({ isUserPack }) => {
  const classes = useStyles();

  return (
    <>
      <Pagination nbPages={20} page={1} />
      <span className={classes.cardContainer}>
        <PackCard isUserPack={isUserPack} />
        <PackCard isUserPack={isUserPack} />
        <PackCard isUserPack={isUserPack} />
        <PackCard isUserPack={isUserPack} />
        <PackCard isUserPack={isUserPack} />
        <PackCard isUserPack={isUserPack} />
        <PackCard isUserPack={isUserPack} />
        <PackCard isUserPack={isUserPack} />
        <PackCard isUserPack={isUserPack} />
      </span>
      <Pagination nbPages={20} page={1} />
    </>
  );
};

PackCardList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  isUserPack: PropTypes.bool,
};

PackCardList.defaultProps = {
  isUserPack: false,
};

export default PackCardList;
