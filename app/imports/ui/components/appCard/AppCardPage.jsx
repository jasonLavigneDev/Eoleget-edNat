/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';

import { useAppContext } from '../../contexts/context';
import { usePagination } from '../../../api/utils/hooks';

import AppCard from './AppCard';
import Applications from '../../../api/applications/applications';
import { debounce } from '../../utils';

// Styles CSS //
const gridPaginationStyle = {
  display: 'flex',
  justifyContent: 'center',
};
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  marginTop: '4%',
  marginBottom: '2%',
};
const divCardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
};
const textfieldStyle = {
  marginLeft: 50,
  width: '70%',
  marginTop: -20,
  backgroundColor: 'white', // can't use theme color
};
const spanHelperText = {
  fontSize: 'large',
};
// End styles //

const ITEM_PER_PAGE = 16;

function AppCardPage({ cart, setTotal }) {
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

  useEffect(() => {
    setTotal(total);
  }, [total]);

  const handleChangePage = (event, value) => {
    changePage(value);
  };

  useEffect(() => {
    if (page !== 1) {
      changePage(1);
    }
  }, [search]);

  const inputRef = useRef(null);
  // focus on search input when it appears
  useEffect(() => {
    if (inputRef.current && searchToggle) {
      inputRef.current.focus();
    }
  }, [searchToggle]);

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
  const debouncedSearch = debounce(updateSearch, 800);
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
      placeholder={i18n.__('pages.Store.searchHelp')}
      name="search"
      fullWidth
      onChange={debouncedSearch}
      onKeyDown={checkEscape}
      type="text"
      defaultValue={appPage.search}
      inputRef={searchRef}
      variant="outlined"
      style={textfieldStyle}
      helperText={
        appPage.search ? (
          appPage.search.startsWith('#') ? (
            <span style={spanHelperText}>
              {i18n.__('components.Search.helperTextByTags')} &quot;{appPage.search.slice(1)}&quot;
            </span>
          ) : (
            <span style={spanHelperText}>
              {i18n.__('components.Search.helperText')} &quot;{appPage.search}&quot;
            </span>
          )
        ) : (
          ''
        )
      }
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
        <Paper sx={{ border: '2px solid', borderColor: 'secondary.main' }}>
          {searchField}
          <div style={divCardContainerStyle}>
            {total !== 0 ? (
              <span style={divCardContainerStyle}>
                {items.map((app) => (
                  <AppCard key={app.identification} app={app} cart={cart} />
                ))}
              </span>
            ) : (
              <div style={{ padding: 30 }}>
                <Typography variant="h5">{i18n.__('pages.Store.noResult')}</Typography>
              </div>
            )}
          </div>
          {total > ITEM_PER_PAGE && (
            <Grid sx={gridPaginationStyle}>
              <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
            </Grid>
          )}
        </Paper>
      </div>
    </Fade>
  );
}

AppCardPage.defaultProps = {
  setTotal: () => {},
};

AppCardPage.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
  setTotal: PropTypes.func,
};

export default AppCardPage;
