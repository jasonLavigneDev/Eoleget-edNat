import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Roles } from 'meteor/alanning:roles';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

// import { useAppContext } from '../contexts/context';
import AppCard from '../components/card/AppCard';
import TopBar from '../components/menus/TopBar';
import SearchBarApp from '../components/search/SearchBarApp';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px',
  },
  storeTitleContainer: {
    width: 'fit-content',
  },
  storeTitleContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function Index() {
  // const [{ user }] = useAppContext();
  // const isAdmin = user ? Roles.userIsInRole(user._id, 'admin') : false;
  const [showSearchApp, setShowSearchApp] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <main className={classes.main}>
        <div className={classes.storeTitleContainer}>
          <div className={classes.storeTitleContent}>
            <Typography variant="h4" component="div">
              {i18n.__('pages.Store.storeTitle')}
            </Typography>
            <IconButton onClick={() => setShowSearchApp(!showSearchApp)}>
              <SearchIcon fontSize="large" />
            </IconButton>
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
    </div>
  );
}
