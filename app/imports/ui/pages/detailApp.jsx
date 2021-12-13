import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import AppAvatar from '../components/appCard/AppAvatar';

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
  },
  content: {
    margin: '2% 0',
    marginRight: '20%',
    paddingRight: '20%',
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
}));

function DetailApp() {
  const classes = useStyle();

  return (
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
        <AppAvatar detailApp />
      </div>
    </div>
  );
}

export default DetailApp;
