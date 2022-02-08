import React, { useState, useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

import { useAppContext } from '../../contexts/context';
import { usePagination } from '../../../api/utils/hooks';

import AppCard from './AppCard';
import Applications from '../../../api/applications/applications';
import AppCart from '../appCart/appCart';
import { debounce } from '../../utils';

// Styles CSS //
const gridPaginationStyle = {
  display: 'flex',
};
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5%',
  marginBottom: '2%',
};
const divStoreTitleStyle = {
  minWidth: '100%',
};
const divCardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
};
const textfieldStyle = {
  marginLeft: 15,
  width: '98%',
};
// End styles //

const ITEM_PER_PAGE = 16;

function AppCardPage() {
  const [{ appPage }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = appPage;

  const { changePage, page, items, total } = usePagination(
    'applications.all',
    { search, sort: { nom: 1 } },
    Applications,
    {},
    { sort: { nom: 1 } },
    ITEM_PER_PAGE,
  );

  const cart = useState(() => {
    const saved = localStorage.getItem('cart');
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue;
  });

  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    // update cart in localStorage when it's updated (except for initial load)
    // eslint-disable-next-line no-unused-expressions
    loadingCart ? setLoadingCart(false) : localStorage.setItem('cart', JSON.stringify(cart[0]));
  }, [cart[0]]);

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
    let searchText = app.nom + app.description || '';
    searchText = searchText.toLowerCase();
    if (!search) return true;
    return searchText.indexOf(search.toLowerCase()) > -1;
  };

  const mapList = (func) => items.filter((app) => filterApp(app)).map(func);

  const updateGlobalState = (key, value) =>
    dispatch({
      type: 'appPage',
      data: {
        ...appPage,
        [key]: value,
      },
    });

  const searchRef = useRef();
  const updateSearch = () => updateGlobalState('search', searchRef.current.value);
  const resetSearch = () => {
    updateGlobalState('search', '');
    searchRef.current.value = '';
  };
  const debouncedSearch = debounce(updateSearch, 300);
  const checkEscape = (e) => {
    if (e.keyCode === 27) {
      // ESCAPE key
      updateGlobalState('searchToggle', false);
      updateGlobalState('search', '');
      searchRef.current.value = '';
    }
  };

  const searchField = (
    <TextField
      margin="normal"
      id="search"
      label={i18n.__('pages.Store.searchText')}
      name="search"
      fullWidth
      onChange={debouncedSearch}
      onKeyDown={checkEscape}
      type="text"
      inputRef={searchRef}
      variant="outlined"
      style={textfieldStyle}
      inputProps={{
        ref: inputRef,
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: search ? (
          <InputAdornment position="end">
            <IconButton onClick={resetSearch}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );

  return (
    <Fade in>
      <div style={divMainStyle}>
        <div style={divStoreTitleStyle}>
          <AppCart cart={cart} />
          <div>
            <Paper>
              {searchField}
              <div style={divCardContainerStyle}>
                <span style={divCardContainerStyle}>
                  {mapList((app) => (
                    <AppCard key={app.identification} app={app} cart={cart} />
                  ))}
                </span>
                {total > ITEM_PER_PAGE && (
                  <Grid sx={gridPaginationStyle}>
                    <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
                  </Grid>
                )}
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default AppCardPage;
