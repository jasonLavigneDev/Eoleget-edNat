import React, { useState, useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';

import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/ViewList';
import CardIcon from '@mui/icons-material/Dashboard';

import { useTracker } from 'meteor/react-meteor-data';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import PackList from '../components/packsCard/packList';
import PackCard from '../components/packsCard/packCard';

import { useAppContext } from '../contexts/context';
import { usePagination } from '../../api/utils/hooks';

import Packs from '../../api/packs/packs';

const useStyle = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    padding: '0 15%',
    marginBottom: '2%',
  },
  packsTitleContainer: {
    width: '100%',
  },
  packsTitleContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    width: '35%',
  },
  iconListe: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1fc',
  },
}));

const ITEM_PER_PAGE = 15;

function PackPage() {
  const [showModeList, setModeList] = useState(false);
  const classes = useStyle();

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

  const packs = useTracker(() => {
    Meteor.subscribe('packs.table.all');
    const data = Packs.find({}).fetch();
    return data;
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

  const filterPack = (pack) => {
    let searchText = pack.name + pack.description || '';
    searchText = searchText.toLowerCase();
    if (!search) return true;
    return searchText.indexOf(search.toLowerCase()) > -1;
  };
  const isUpperCase = (str) => {
    return str === str.toUpperCase();
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

  const toggleSearch = () => updateGlobalState('searchToggle', !searchToggle);
  const updateSearch = (e) => updateGlobalState('search', e.target.value);
  const resetSearch = () => updateGlobalState('search', '');
  const checkEscape = (e) => {
    if (e.keyCode === 27) {
      // ESCAPE key
      packPage.search = '';
      packPage.searchToggle = false;
      updateGlobalState('searchToggle', false);
    }
  };

  const searchField = (
    <Grid item xs={12} sm={12} md={6} className={searchToggle ? null : classes.small}>
      <Collapse in={searchToggle} collapsedSize={0}>
        <TextField
          margin="normal"
          id="search"
          label={i18n.__('pages.Packs.searchText')}
          name="search"
          fullWidth
          onChange={updateSearch}
          onKeyDown={checkEscape}
          type="text"
          value={search}
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
      </Collapse>
    </Grid>
  );

  return (
    <Fade in>
      <div className={classes.main}>
        <div className={classes.packsTitleContainer}>
          <div className={classes.packsTitleContent}>
            <Typography variant="h4" component="div">
              {i18n.__('pages.Packs.packsStoreTitle')}
            </Typography>
            <Tooltip title={i18n.__('pages.Packs.searchApp')}>
              <IconButton onClick={toggleSearch}>
                <SearchIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
          {searchField}
          <span className={classes.iconListe}>
            <Tooltip title="Mode liste">
              <IconButton
                onClick={() => {
                  setModeList(true);
                }}
              >
                <ListIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mode carte">
              <IconButton
                onClick={() => {
                  setModeList(false);
                }}
              >
                <CardIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </span>
          <div>
            <Paper>
              <div className={classes.cardContainer}>
                <Collapse in={!showModeList} collapsedsize={0}>
                  {total > ITEM_PER_PAGE && (
                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.pagination}>
                      <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
                    </Grid>
                  )}
                  <span className={classes.cardContainer}>
                    {mapList((pack) => (
                      <PackCard pack={pack} />
                    ))}
                  </span>
                  {total > ITEM_PER_PAGE && (
                    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.pagination}>
                      <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
                    </Grid>
                  )}
                </Collapse>
              </div>
            </Paper>
            <Collapse in={showModeList} collapsedsize={0}>
              <PackList packs={packs} isUpperCase={isUpperCase} />
            </Collapse>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default PackPage;
