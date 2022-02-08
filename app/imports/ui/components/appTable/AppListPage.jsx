import React, { useState, useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';

import { useTracker } from 'meteor/react-meteor-data';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';

import PropTypes from 'prop-types';
import { useAppContext } from '../../contexts/context';
import AppList from './AppList';
import Applications from '../../../api/applications/applications';
import AppCart from '../appCart/appCart';
import { debounce } from '../../utils';

// Styles CSS //
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5%',
  marginBottom: '2%',
};
const divStoreTitleStyle = {
  minWidth: '100%',
};
// End styles //

function AppListPage({ modal }) {
  const [{ appPage }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = appPage;

  const applications = useTracker(() => {
    Meteor.subscribe('applications.table.all');
    const data = Applications.find({}).fetch();
    return data;
  });

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

  const inputRef = useRef(null);
  // focus on search input when it appears
  useEffect(() => {
    if (inputRef.current && searchToggle) {
      inputRef.current.focus();
    }
  }, [searchToggle]);

  //   const filterApp = (app) => {
  //     let searchText = app.nom + app.description || '';
  //     searchText = searchText.toLowerCase();
  //     if (!search) return true;
  //     return searchText.indexOf(search.toLowerCase()) > -1;
  //   };

  //   const mapList = (func) => items.filter((app) => filterApp(app)).map(func);

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
          {!modal ? <AppCart cart={cart} /> : null}
          {searchField}
          <div>
            <AppList applications={applications} cart={cart} />
          </div>
        </div>
      </div>
    </Fade>
  );
}

AppListPage.propTypes = {
  modal: PropTypes.bool,
};

AppListPage.defaultProps = {
  modal: false,
};

export default AppListPage;
