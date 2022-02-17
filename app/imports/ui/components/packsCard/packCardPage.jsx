import React, { useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import PackCard from './packCard';

import { useAppContext } from '../../contexts/context';
import { usePagination } from '../../../api/utils/hooks';

import Packs from '../../../api/packs/packs';
import { debounce } from '../../utils';
import Spinner from '../system/Spinner';

// Styles CSS //
const gridPaginationStyle = {
  display: 'flex',
  justifyContent: 'center',
};
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  marginTop: '5%',
  marginBottom: '2%',
};
const divCardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
};
const textfieldStyle = {
  marginLeft: 2,
  width: '97%',
};
// End styles //

const ITEM_PER_PAGE = 9;

function packCardPage({ isUserPack, ready }) {
  if (!ready) return <Spinner full />;
  const [{ packPage, userId }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = packPage;
  const { changePage, page, items, total } = usePagination(
    isUserPack ? 'packs.user' : 'packs.all',
    { search, userId, sort: { name: 1 } },
    Packs,
    {},
    { sort: { name: 1 } },
    ITEM_PER_PAGE,
  );

  const findUser = (pack) => {
    const user = Meteor.users.findOne({ _id: pack.owner });
    Object.defineProperty(pack, 'ownerName', {
      value: user.username,
      writable: false,
    });
  };

  items.map((p) => {
    return findUser(p);
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
    let searchText;
    if (search.startsWith('@')) {
      searchText = pack.ownerName || '';
    } else searchText = pack.name + pack.description || '';
    searchText = searchText.toLowerCase();
    if (!search) return true;

    if (search.startsWith('@')) {
      const finalSearch = search.slice(1);
      return searchText.indexOf(finalSearch.toLowerCase()) > -1;
    }
    return searchText.indexOf(search.toLowerCase()) > -1;
  };

  const mapList = (func) => items.filter((pack) => filterPack(pack)).map(func);

  const searchField = (
    <TextField
      margin="normal"
      id="search"
      label={i18n.__('pages.Packs.searchText')}
      name="search"
      fullWidth
      placeholder={i18n.__('pages.Packs.searchHelp')}
      onChange={debouncedSearch}
      onKeyDown={checkEscape}
      type="text"
      defaultValue={packPage.search}
      variant="outlined"
      inputRef={searchRef}
      sx={textfieldStyle}
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
        <Paper>
          {searchField}
          <div style={divCardContainerStyle}>
            <span style={divCardContainerStyle}>
              {mapList((pack) => (
                <PackCard key={pack._id} pack={pack} />
              ))}
            </span>
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

packCardPage.defaultProps = {
  isUserPack: false,
};

packCardPage.propTypes = {
  isUserPack: PropTypes.bool,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subUser = Meteor.subscribe('users.all');
  const ready = subUser.ready();
  return {
    ready,
  };
})(packCardPage);
