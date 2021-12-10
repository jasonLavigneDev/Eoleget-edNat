import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AppPacksCard from '../components/packsCard/appPacksCard';

const useStyle = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    padding: '0 25%',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f1f1fc',
    boxShadow: theme.shadows[5],
  },
}));

function DetailPack() {
  const classes = useStyle();

  return (
    <div className={classes.main}>
      <Typography variant="h4" component="div">
        Détail du pack
      </Typography>
      <div className={classes.mainContent}>
        <Typography variant="h6" component="div">
          Nom du pack
        </Typography>
        <p>Description du pack</p>
        <AppPacksCard />
        <AppPacksCard />
        <AppPacksCard />
        <AppPacksCard />
        <Button variant="contained">Obtenir le pack</Button>
      </div>
    </div>
  );
}

export default DetailPack;
