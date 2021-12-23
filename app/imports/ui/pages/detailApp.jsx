import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';
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
                <Button variant="outlined">Tag 1</Button>
                <Button variant="outlined">Tag 2</Button>
                <Button variant="outlined">Tag 3</Button>
              </span>
            </Grid>
            <AppAvatar detailApp />
          </Grid>
          <div className={classes.buttonSave}>
            <Button variant="contained">{i18n.__('pages.detailApp.Save')}</Button>
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
