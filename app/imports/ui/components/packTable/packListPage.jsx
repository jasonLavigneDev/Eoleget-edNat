import React, { useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import SearchIcon from '@mui/icons-material/Search';

import { useTracker } from 'meteor/react-meteor-data';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PackList from '../packsCard/packList';

import { useAppContext } from '../../contexts/context';

import Packs from '../../../api/packs/packs';
import { debounce } from '../../utils';

// Styles CSS //
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5%',
  marginBottom: '2%',
};
const divPackTitleContainerStyle = {
  minWidth: '100%',
};
// End styles //

// eslint-disable-next-line no-unused-vars
function packListPage({ isUserPack }) {
  const [{ packPage }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = packPage;

  const packs = useTracker(() => {
    Meteor.subscribe('packs.table.all');
    const data = Packs.find({ isPublic: true }).fetch();
    return data;
  });

  const inputRef = useRef(null);
  // focus on search input when it appears
  useEffect(() => {
    if (inputRef.current && searchToggle) {
      inputRef.current.focus();
    }
  }, [searchToggle]);

  const updateGlobalState = (key, value) =>
    dispatch({
      type: 'packPage',
      data: {
        ...packPage,
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

  const filterPack = (pack) => {
    let searchText = pack.name + pack.description || '';
    searchText = searchText.toLowerCase();
    if (!search) return true;
    return searchText.indexOf(search.toLowerCase()) > -1;
  };

  const mapList = (func) => packs.filter((pack) => filterPack(pack)).map(func);

  const searchField = (
    <TextField
      margin="normal"
      id="search"
      label={i18n.__('pages.Packs.searchText')}
      name="search"
      fullWidth
      onChange={debouncedSearch}
      onKeyDown={checkEscape}
      type="text"
      defaultValue={packPage.search}
      variant="outlined"
      inputRef={searchRef}
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
        <div style={divPackTitleContainerStyle}>
          {searchField}
          <PackList packs={mapList((pack) => pack)} isUserPack />
        </div>
      </div>
    </Fade>
  );
}

packListPage.defaultProps = {
  isUserPack: false,
};

packListPage.propTypes = {
  isUserPack: PropTypes.bool,
};

export default packListPage;
