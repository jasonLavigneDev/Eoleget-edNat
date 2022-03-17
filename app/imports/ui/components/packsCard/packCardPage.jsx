import React, { useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import PackCard from './packCard';
import { useAppContext } from '../../contexts/context';
import { usePagination } from '../../../api/utils/hooks';

import Packs from '../../../api/packs/packs';
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
  marginTop: '1%',
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
const spanHelperText = {
  fontSize: 'large',
};
// End styles //

const ITEM_PER_PAGE = 9;

function packCardPage({ isUserPack, setTotal }) {
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

  useEffect(() => {
    setTotal(total);
  }, [total]);

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
      sx={textfieldStyle}
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
        <Paper>
          {searchField}
          <div style={divCardContainerStyle}>
            {total !== 0 ? (
              <span style={divCardContainerStyle}>
                {items.map((pack) => (
                  <PackCard key={pack._id} pack={pack} isUserPack={isUserPack} />
                ))}
              </span>
            ) : (
              <div style={{ padding: 50 }}>
                {search !== '' ? (
                  <Typography variant="h5">{i18n.__('pages.Packs.noResult')}</Typography>
                ) : (
                  <Typography variant="h5">{i18n.__('pages.Packs.noPacks')}</Typography>
                )}
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

packCardPage.defaultProps = {
  isUserPack: false,
  setTotal: () => {},
};

packCardPage.propTypes = {
  isUserPack: PropTypes.bool,
  setTotal: PropTypes.func,
};

export default packCardPage;
