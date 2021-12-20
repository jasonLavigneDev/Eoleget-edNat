import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Roles } from 'meteor/alanning:roles';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/ViewList';
import CardIcon from '@material-ui/icons/Dashboard';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import SearchBarApp from '../components/search/SearchBarApp';
import AppCardList from '../components/appCard/AppCardList';
import AppList from '../components/appCard/AppList';
// import { useAppContext } from '../contexts/context';
// import { usePagination } from '../../api/utils/hooks';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'relative',
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
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1fc',
  },
}));

// const ITEM_PER_PAGE = 9;

export default function Index() {
  const [showSearchApp, setShowSearchApp] = useState(false);
  const [showModeList, setModeList] = useState(false);
  const classes = useStyles();
  // Add when data will be up
  // const [filterChecked, setFilterChecked] = React.useState(true);
  // const [{ user }] = useAppContext();
  // const isAdmin = user ? Roles.userIsInRole(user._id, 'admin') : false;

  // const { changePage, page, items, total } = !filterChecked
  //   ? usePagination('groups.all', {}, {}, {}, { sort: { name: 1 } }, ITEM_PER_PAGE)
  //   : usePagination('groups.memberOf', {}, {}, {}, { sort: { name: 1 } }, ITEM_PER_PAGE);

  // const handleChangePage = (event, value) => {
  //   changePage(value);
  // };

  // React.useEffect(() => {
  //   setModeList(showModeList);
  // }, [showSearchApp]);

  // React.useEffect(() => {
  //   if (page !== 1) {
  //     changePage(1);
  //   }
  // }, [search]);

  //  const updateFilterCheck = () => {
  //    setFilterChecked(!filterChecked);
  //    changePage(1);
  //  };

  return (
    <Fade in>
      <div className={classes.main}>
        <div className={classes.storeTitleContainer}>
          <div className={classes.storeTitleContent}>
            <Typography variant="h4" component="div">
              {i18n.__('pages.Store.storeTitle')}
            </Typography>
            <Tooltip title={i18n.__('pages.Store.searchApp')}>
              <IconButton onClick={() => setShowSearchApp(!showSearchApp)}>
                <SearchIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
          <Collapse in={showSearchApp} collapsedsize={0} className={classes.searchBar}>
            <SearchBarApp opened={showSearchApp} app />
          </Collapse>
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
                  <AppCardList title="ça claque" content="Je suis un super contenu qui déchire." />
                </Collapse>
              </div>
            </Paper>
            <Collapse in={showModeList} collapsedsize={0}>
              <AppList title="ça claque" content="Je suis un super contenu qui déchire." />
            </Collapse>
          </div>
        </div>
      </div>
    </Fade>
  );
}
