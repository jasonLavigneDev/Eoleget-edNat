import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import AppAvatar from '../components/appCard/AppAvatar';
import Applications from '../../api/applications/applications';

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '20px',
  },
  listIcon: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconButtonList: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconSpan: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonSave: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%',
  },
}));

function DetailApp() {
  const applications = useTracker(() => {
    Meteor.subscribe('applications.all');
    return Applications.find({}).fetch();
  });

  console.log(`test`, applications);

  const classes = useStyle();

  return (
    <Fade in>
      <Container className={classes.root}>
        <Paper className={classes.rootPaper}>
          <Typography variant="h4" component="div">
            Détail de lapplication
          </Typography>
          <Grid container className={classes.main}>
            <Grid item xs={8} style={{ paddingLeft: '18px' }}>
              <Typography variant="h6" component="div">
                Nom de lapplication
              </Typography>
              <Typography variant="body1" component="div" wrap="nowrap">
                Description de lapplication
              </Typography>
              <p>commande winget</p>
              <p>Verison v 1.1.1.1.1.1.1.1.1.1.1.1.1.1</p>
              <span className={classes.iconSpan}>
                <IconButton title="Vers le site de l'application">
                  <LanguageIcon />
                </IconButton>
                <p>Vers le site</p>
              </span>
              <span className={classes.iconSpan}>
                <IconButton title="Télecharger l'application">
                  <GetAppIcon />
                </IconButton>
                <p>Télécharger</p>
              </span>
              <span className={classes.iconSpan}>
                <IconButton disabled>
                  <MonetizationOnIcon />
                </IconButton>
                <p>Licence</p>
              </span>
              <span className={classes.iconSpan}>
                <IconButton disabled>
                  <LocalOfferIcon />
                </IconButton>
                <p>Tags</p>
              </span>
              <span className={classes.iconSpan}>
                <Button variant="outlined">Tag 1</Button>
                <Button variant="outlined">Tag 2</Button>
                <Button variant="outlined">Tag 3</Button>
              </span>
            </Grid>
            <AppAvatar detailApp />
          </Grid>
          <div className={classes.buttonSave}>
            <Button variant="contained">Enregistrer lapplication</Button>
          </div>
        </Paper>
      </Container>
    </Fade>
  );
}

export default DetailApp;
