import React, { useState, useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import { useTracker } from 'meteor/react-meteor-data';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import { Typography, Paper } from '@mui/material';

import { useAppContext } from '../../contexts/context';
import AppList from './AppList';
import Applications from '../../../api/applications/applications';
import { debounce } from '../../utils';

// Styles CSS //
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  marginTop: '1%',
  marginBottom: '2%',
};
const divStoreTitleStyle = {
  minWidth: '100%',
};
const spanHelperText = {
  fontSize: 'large',
};
// End styles //

function AppListPage({ modal, editModal, cart, setTotal }) {
  const [{ appPage }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = appPage;

  const applications = useTracker(() => {
    Meteor.subscribe('applications.table.all', { search });
    let data;
    if (search.startsWith('#')) {
      const tags = appPage.search.slice(1).split(' ');
      data = Applications.find({ tags: { $all: tags } }).fetch();
    } else data = Applications.find({}).fetch();
    return data;
  });

  if (editModal) {
    // eslint-disable-next-line no-param-reassign
    cart = useState(() => {
      const saved = localStorage.getItem('cart_edit');
      const initialValue = saved ? JSON.parse(saved) : [];
      return initialValue;
    });
  }

  const inputRef = useRef(null);
  // focus on search input when it appears
  useEffect(() => {
    if (inputRef.current && searchToggle) {
      inputRef.current.focus();
    }
  }, [searchToggle]);

  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    // update cart in localStorage when it's updated (except for initial load)
    // eslint-disable-next-line no-unused-expressions
    editModal
      ? loadingCart
        ? setLoadingCart(false)
        : localStorage.setItem('cart_edit', JSON.stringify(cart[0]))
      : loadingCart
      ? setLoadingCart(false)
      : localStorage.setItem('cart', JSON.stringify(cart[0]));
  }, [cart[0]]);

  setTotal(applications.length);

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
      placeholder={i18n.__('pages.Store.searchHelp')}
      name="search"
      fullWidth
      onChange={debouncedSearch}
      onKeyDown={checkEscape}
      type="text"
      defaultValue={appPage.search}
      inputRef={searchRef}
      variant="outlined"
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
        <div style={divStoreTitleStyle}>
          {searchField}
          {applications.length !== 0 ? (
            <AppList applications={applications} cart={cart} isModal={modal} />
          ) : (
            <Paper sx={{ padding: 6 }}>
              <Typography variant="h5" align="center">
                {i18n.__('pages.Store.noResult')}
              </Typography>
            </Paper>
          )}
        </div>
      </div>
    </Fade>
  );
}

AppListPage.propTypes = {
  modal: PropTypes.bool,
  editModal: PropTypes.bool,
  cart: PropTypes.arrayOf(PropTypes.any),
  setTotal: PropTypes.func,
};

AppListPage.defaultProps = {
  modal: false,
  editModal: false,
  cart: [],
  setTotal: () => {},
};
export default AppListPage;
