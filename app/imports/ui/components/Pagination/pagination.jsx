/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import PaginationMui from '@material-ui/lab/Pagination';

const useStyles = makeStyles(() => ({
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },
}));

function Pagination({ nbPages, page }) {
  const classes = useStyles();

  return (
    <div className={classes.paginationContainer}>
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
