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

import AppAvatar from '../components/appCard/AppAvatar';
import Applications from '../../api/applications/applications';

const useStyle = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    padding: '0 25%',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1fc',
    boxShadow: theme.shadows[5],
    width: '80%',
  },
  content: {
    margin: '2% 0',
    paddingRight: '10%',
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
    marginTop: '10%',
  },
  appFavicon: {
    display: 'flex',
  },
}));

function DetailApp() {
  /*const applications = useTracker(() => {
    Meteor.subscribe('applications.all');
    return Applications.find({}).fetch();
  });*/

  const classes = useStyle();

  return (
    <Fade in>
      <div className={classes.main}>
        <Typography variant="h4" component="div">
          Détail de lapplication
        </Typography>
        <div className={classes.mainContent}>
          <div className={classes.content}>
            <Typography variant="h6" component="div">
              Nom de lapplication
            </Typography>
            <Typography variant="body1" component="div">
              Description de lapplication
            </Typography>
            <p>commande winget</p>
            <p>Verison v 1.1.1.1.1.1.1.1.1.1.1.1.1.1</p>
            <div className={classes.iconButtonList}>
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
            </div>
            <div className={classes.listIcon}>
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
            </div>
            <div className={classes.buttonSave}>
              <Button variant="contained">Enregistrer lapplication</Button>
            </div>
          </div>
          <div className={classes.appFavicon}>
            <AppAvatar detailApp />
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default DetailApp;
