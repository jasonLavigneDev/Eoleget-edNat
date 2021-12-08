import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Roles } from 'meteor/alanning:roles';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/ViewList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// import { useAppContext } from '../contexts/context';
import AppCard from '../components/card/AppCard';
import SearchBarApp from '../components/search/SearchBarApp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    padding: '0 15%',
  },
  storeTitleContainer: {
    width: '100%',
    marginBottom: '2%',
  },
  storeTitleContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1fc',
    boxShadow: theme.shadows[5],
  },
  iconListe: {
    alignItems: 'end',
  },
}));

export default function Index() {
  // const [{ user }] = useAppContext();
  // const isAdmin = user ? Roles.userIsInRole(user._id, 'admin') : false;
  const [showSearchApp, setShowSearchApp] = useState(false);
  const classes = useStyles();

  return (
    <main className={classes.main}>
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
          <Tooltip title="Mode liste">
            <IconButton>
              <ListIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
        <Collapse in={showSearchApp} collapsedSize={0}>
          <SearchBarApp opened={showSearchApp} />
        </Collapse>
      </div>
      <span className={classes.cardContainer}>
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />

        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
      </span>
    </main>
  );
}
