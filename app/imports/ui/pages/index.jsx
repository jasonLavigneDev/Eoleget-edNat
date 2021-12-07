import React from 'react';
// import { Roles } from 'meteor/alanning:roles';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import { useAppContext } from '../contexts/context';

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
  // const [{ user }] = useAppContext();
  // const isAdmin = user ? Roles.userIsInRole(user._id, 'admin') : false;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TopBar />
      <main className={classes.main}>
        <Typography variant="h4" component="div">
          Magasin d&apos;applications
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
