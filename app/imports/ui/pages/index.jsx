import React, { useState, useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Roles } from 'meteor/alanning:roles';

import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { useTracker } from 'meteor/react-meteor-data';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import ListIcon from '@mui/icons-material/ViewList';
import CardIcon from '@mui/icons-material/Dashboard';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

import { useAppContext } from '../contexts/context';
import { usePagination } from '../../api/utils/hooks';

import AppCard from '../components/appCard/AppCard';

import AppList from '../components/appCard/AppList';
import Applications from '../../api/applications/applications';
import AppCart from '../components/appCart/appCart';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    padding: '0 15%',
    marginBottom: '2%',
  },
  storeTitleContainer: {
    minWidth: '100%',
  },
  storeTitleContent: {
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
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    minWidth: '1000px',
  },
}));

const ITEM_PER_PAGE = 15;

function Index() {
  const [showModeList, setModeList] = useState(false);
  const classes = useStyles();

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
  const isUpperCase = (str) => {
    return str === str.toUpperCase();
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

  const toggleSearch = () => updateGlobalState('searchToggle', !searchToggle);
  const updateSearch = (e) => updateGlobalState('search', e.target.value);
  const resetSearch = () => updateGlobalState('search', '');
  const checkEscape = (e) => {
    if (e.keyCode === 27) {
      // ESCAPE key
      appPage.search = '';
      appPage.searchToggle = false;
      updateGlobalState('searchToggle', false);
    }
  };

  const searchField = (
    <Grid item xs={12} sm={12} md={6} className={searchToggle ? null : classes.small}>
      <Collapse in={searchToggle} collapsedSize={0}>
        <TextField
          margin="normal"
          id="search"
          label={i18n.__('pages.Store.searchText')}
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
        <div className={classes.storeTitleContainer}>
          <AppCart cart={cart} />

          <div className={classes.storeTitleContent}>
            <Typography variant="h4" component="div">
              {`${i18n.__('pages.Store.storeTitle')} (${total})`}
            </Typography>
            <Tooltip title={i18n.__('pages.Store.searchApp')}>
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
                    {mapList((app) => (
                      <AppCard app={app} cart={cart} />
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
              <AppList applications={applications} isUpperCase={isUpperCase} />
            </Collapse>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default Index;
