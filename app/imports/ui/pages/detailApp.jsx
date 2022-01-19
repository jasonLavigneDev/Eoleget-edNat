import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import LanguageIcon from '@mui/icons-material/Language';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import GetAppIcon from '@mui/icons-material/GetApp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import Spinner from '../components/system/Spinner';
import Applications from '../../api/applications/applications';
import AppAvatar from '../components/appCard/AppAvatar';

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

const detailApp = ({ app, ready }) => {
  const classes = useStyle();

  const cart = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('cart');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const addAppToCart = () => {
    cart[0].push(app);
    localStorage.setItem('cart', JSON.stringify(cart[0]));
    msg.success(i18n.__('pages.detailApp.addAppSuccess'));
  };

  const mapList = (func) => app.tags.map(func);

  return !ready ? (
    <Spinner full />
  ) : (
    <Fade in>
      <Container className={classes.root}>
        <Paper className={classes.rootPaper}>
          <Typography variant="h4" component="div">
            {i18n.__('pages.detailApp.title')}
          </Typography>
          <Grid container className={classes.main}>
            <Grid item xs={8} style={{ paddingLeft: '18px' }}>
              <Typography variant="h6" component="div">
                {app.nom}
              </Typography>
              <Typography variant="body1" component="div" wrap="nowrap">
                {app.description}
              </Typography>
              <p>{i18n.__('pages.detailApp.winget')}</p>
              <p>{app.versions[0]}</p>
              <span className={classes.iconSpan}>
                <IconButton title={i18n.__('pages.detailApp.redirect')}>
                  <LanguageIcon />
                </IconButton>
                <p>{i18n.__('pages.detailApp.redirectLabel')}</p>
              </span>
              <span className={classes.iconSpan}>
                <IconButton title={i18n.__('pages.detailApp.download')}>
                  <GetAppIcon />
                </IconButton>
                <p>{i18n.__('pages.detailApp.downloadLabel')}</p>
              </span>
              <span className={classes.iconSpan}>
                <IconButton disabled>
                  <MonetizationOnIcon />
                </IconButton>
                <p>{i18n.__('pages.detailApp.Licence')}</p>
              </span>
              <span className={classes.iconSpan}>
                <IconButton disabled>
                  <LocalOfferIcon />
                </IconButton>
                <p>{i18n.__('pages.detailApp.Tags')}</p>
              </span>
              <span className={classes.iconSpan}>
                {mapList((tag) => (
                  <Button variant="outlined">{tag}</Button>
                ))}
              </span>
            </Grid>
            <AppAvatar detailApp />
          </Grid>
          <div className={classes.buttonSave}>
            <Button variant="contained" onClick={addAppToCart}>
              {i18n.__('pages.detailApp.Save')}
            </Button>
          </div>
        </Paper>
      </Container>
    </Fade>
  );
};

export default withTracker(
  ({
    match: {
      params: { identification },
    },
  }) => {
    const subApp = Meteor.subscribe('applications.single', { identification });
    const app = Applications.findOne({ identification }) || {};

    const ready = subApp.ready();
    return {
      app,
      ready,
    };
  },
)(detailApp);

detailApp.propTypes = {
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  ready: PropTypes.bool.isRequired,
};
