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
  marginTop: '1%',
  marginBottom: '2%',
};
const divPackTitleContainerStyle = {
  minWidth: '100%',
};
const spanHelperText = {
  fontSize: 'large',
};
// End styles //

// eslint-disable-next-line no-unused-vars
function packListPage({ isUserPack }) {
  const [{ packPage, userId }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = packPage;

  const packs = useTracker(() => {
    if (isUserPack) {
      Meteor.subscribe('packs.table.user', { userId });
      const data = Packs.find({ owner: userId }).fetch();
      return data;
    }
    Meteor.subscribe('packs.table.all');
    const name = search.slice(1);
    const regex = new RegExp(name, 'i');
    const data = Packs.find({
      isPublic: true,
      $or: [
        {
          ownerName: { $regex: regex },
        },
      ],
    }).fetch();
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
  const updateSearch = () => {
    updateGlobalState('search', searchRef.current.value);
  };
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
      label={i18n.__('pages.Packs.searchText')}
      name="search"
      fullWidth
      placeholder={isUserPack ? null : i18n.__('pages.Packs.searchHelp')}
      onChange={debouncedSearch}
      onKeyDown={checkEscape}
      type="text"
      defaultValue={packPage.search}
      variant="outlined"
      inputRef={searchRef}
      helperText={
        packPage.search ? (
          packPage.search.startsWith('@') ? (
            <span style={spanHelperText}>
              {i18n.__('components.Search.helperTextByOwner')} &quot;{packPage.search.slice(1)}&quot;
            </span>
          ) : (
            <span style={spanHelperText}>
              {i18n.__('components.Search.helperText')} &quot;{packPage.search}&quot;
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
        <div style={divPackTitleContainerStyle}>
          {searchField}
          <PackList packs={packs.map((pack) => pack)} isUserPack={isUserPack} />
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
