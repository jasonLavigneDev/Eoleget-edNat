import React, { useRef, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import AppCard from './AppCard';
import { useAppContext } from '../../contexts/context';
import { usePagination } from '../../../api/utils/hooks';
import Applications from '../../../api/applications/applications';

const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

function AppCardList() {
  const ITEM_PER_PAGE = 15;
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

  return (
    <span style={cardContainerStyle}>
      {total > ITEM_PER_PAGE && (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
        </Grid>
      )}
      {items.map((app) => {
        return <AppCard key={app.identification} app={app} cart={cart} />;
      })}
      {total > ITEM_PER_PAGE && (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
        </Grid>
      )}
    </span>
  );
}

export default AppCardList;
