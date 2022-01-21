/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';

import PaginationMui from '@mui/material/Pagination';

// Styles CSS //
const paginationContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  margin: '10px 0',
};
// End CSS //

function Pagination({ nbPages, page }) {
  return (
    <div style={paginationContainerStyle}>
      <PaginationMui count={nbPages} page={page} size="large" />
    </div>
  );
}

Pagination.propTypes = {
  nbPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  // Add this code when publication will be up. Add this too:
  // handleChange in function params and onChange={handleChange} in html balise
  // handleChange: PropTypes.func.isRequired,
};

export default Pagination;
