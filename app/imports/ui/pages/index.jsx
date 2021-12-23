import React, { useState, useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Roles } from 'meteor/alanning:roles';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { useTracker } from 'meteor/react-meteor-data';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import ListIcon from '@material-ui/icons/ViewList';
import CardIcon from '@material-ui/icons/Dashboard';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import Spinner from '../components/system/Spinner';

import { useAppContext } from '../contexts/context';
import { usePagination } from '../../api/utils/hooks';

import AppCard from '../components/appCard/AppCard';

import AppList from '../components/appCard/AppList';
import Applications from '../../api/applications/applications';

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
    width: '100%',
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
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

const ITEM_PER_PAGE = 15;

function Index() {
  const [showModeList, setModeList] = useState(false);
  const classes = useStyles();

  const [{ appPage }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = appPage;

  const { changePage, page, items, total, loading } = usePagination(
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
    let searchText = app.nom || '';
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
          label={i18n.__('pages.GroupsPage.searchText')}
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

  return loading ? (
    <Spinner />
  ) : (
    <Fade in>
      <div className={classes.main}>
        <div className={classes.storeTitleContainer}>
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
                      <AppCard
                        key={app._id}
                        nom={app.nom}
                        identification={app.identification}
                        description={app.description}
                        versions={app.versions}
                        url={app.url}
                      />
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
