import React from 'react';
import i18n from 'meteor/universe:i18n';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AppCard from '../components/card/AppCard';
import TopBar from '../components/menus/TopBar';

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
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function Index() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TopBar />
      <main className={classes.main}>
        <Typography variant="h4" component="div">
          {i18n.__('pages.Store.storeTitle')}
        </Typography>
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
