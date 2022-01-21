import React from 'react';
import PropTypes from 'prop-types';

import PackCard from './packCard';
import Pagination from '../Pagination/pagination';

// Styles CSS //
const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};
// End styles //

// eslint-disable-next-line no-unused-vars
const PackCardList = ({ isUserPack }) => {
  return (
    <>
      <Pagination nbPages={20} page={1} />
      <span style={cardContainerStyle}>
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
