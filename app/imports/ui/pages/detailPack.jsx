import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import AppPacksCard from '../components/packsCard/appPacksCard';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(15),
    marginLeft: theme.spacing(60),
    maxWidth: '1000px',
    minWidth: '550px',
  },
  rootPaper: {
    padding: theme.spacing(1),
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    padding: '0 25%',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
  },
  getPackButton: {
    width: '30%',
    marginLeft: '35%',
    marginTop: '2%',
  },
}));

function DetailPack() {
  const classes = useStyle();

  return (
    <Fade in>
      <Container className={classes.root}>
        <Paper className={classes.rootPaper}>
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
            <Button variant="contained" className={classes.getPackButton}>
              Obtenir le pack
            </Button>
          </div>
        </Paper>
      </Container>
    </Fade>
  );
}

export default DetailPack;
