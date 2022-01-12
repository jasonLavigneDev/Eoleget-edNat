import React, { useRef, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import { useAppContext } from '../../contexts/context';
import AppCard from './AppCard';
import { usePagination } from '../../../api/utils/hooks';

import Applications from '../../../api/applications/applications';

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

function AppCardList() {
  const ITEM_PER_PAGE = 15;
  const classes = useStyles();
  const appPage = useAppContext();
  const { search = '', searchToggle = false } = appPage;

  const { changePage, page, items, total } = usePagination(
    'applications.all',
    { search },
    Applications,
    {},
    { sort: { nom: 1 } },
    ITEM_PER_PAGE,
  );

  const cart = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('cart');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const handleChangePage = (event, value) => {
    changePage(value);
  };

  const inputRef = useRef(null);
  // focus on search input when it appears
  useEffect(() => {
    if (inputRef.current && searchToggle) {
      inputRef.current.focus();
    }
  }, [searchToggle]);

  useEffect(() => {
    if (page !== 1) {
      changePage(1);
    }
  }, [search]);

  const filterApp = (app) => {
    let searchText = app.nom + app.description + app.identificationName || '';
    searchText = searchText.toLowerCase();
    if (!search) return true;
    return searchText.indexOf(search.toLowerCase()) > -1;
  };
  const mapList = (func) => items.filter((app) => filterApp(app)).map(func);

  return (
    <span className={classes.cardContainer}>
      {total > ITEM_PER_PAGE && (
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.pagination}>
          <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
        </Grid>
      )}
      {mapList((app) => {
        <AppCard app={app} cart={cart} />;
      })}
      {total > ITEM_PER_PAGE && (
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.pagination}>
          <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
        </Grid>
      )}
    </span>
  );
}

export default AppCardList;
