import React, { useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';

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

function packCardPage() {
  const [{ packPage }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = packPage;

  const { changePage, page, items, total } = usePagination(
    'packs.all',
    { search, sort: { name: 1 } },
    Packs,
    {},
    { sort: { name: 1 } },
    ITEM_PER_PAGE,
  );

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

  const filterPack = (pack) => {
    let searchText = pack.name + pack.description || '';
    searchText = searchText.toLowerCase();
    if (!search) return true;
    return searchText.indexOf(search.toLowerCase()) > -1;
  };

  const mapList = (func) => items.filter((pack) => filterPack(pack)).map(func);

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
      onChange={debouncedSearch}
      onKeyDown={checkEscape}
      type="text"
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

export default packCardPage;
