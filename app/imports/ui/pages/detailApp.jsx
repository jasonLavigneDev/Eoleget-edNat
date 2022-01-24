import React, { useState, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

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
import lightTheme from '../themes/light';
import ListVersion from '../components/version/listVersion';

// Styles CSS //
const containerStyle = {
  marginTop: lightTheme.spacing(10),
  maxWidth: '1000px',
  minWidth: '550px',
};
const paperStyle = {
  padding: lightTheme.spacing(1),
};
const gridContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyItems: 'center',
};
const iconSpanStyle = {
  display: 'flex',
  flexDirection: 'row',
};
const divButtonStyle = {
  marginTop: 20,
  marginBottom: 5,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};
// End styles //

const detailApp = ({ app, ready }) => {
  const history = useHistory();
  const goBack = () => {
    history.push('/');
    window.location.reload();
  };
  const cart = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('cart');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    // update cart in localStorage when it's updated (except for initial load)
    // eslint-disable-next-line no-unused-expressions
    loadingCart ? setLoadingCart(false) : localStorage.setItem('cart', JSON.stringify(cart[0]));
  }, [cart[0]]);

  const checkAppAllreadyAdded = () => {
    let res;
    const tab = [];
    cart[0].map((appli) => tab.push(appli.identification));
    if (tab.includes(app.identification)) res = true;
    else res = false;
    return res;
  };

  const addAppToCart = () => {
    if (checkAppAllreadyAdded()) {
      msg.error(i18n.__('components.Card.addAppError'));
    } else {
      cart[1]([...cart[0], app]);
      msg.success(i18n.__('components.Card.addAppSuccess'));
    }
  };

  const removeAppFromCart = () => {
    if (checkAppAllreadyAdded()) {
      cart[1](cart[0].filter((appli) => appli.identification !== app.identification));
      msg.success(i18n.__('components.Card.removeAppSuccess'));
    } else {
      msg.error(i18n.__('components.Card.removeAppError'));
    }
  };

  const mapList = (func) => app.tags.map(func);

  return !ready ? (
    <Spinner full />
  ) : (
    <Fade in>
      <Container sx={containerStyle}>
        <Paper sx={paperStyle}>
          <Typography variant="h4" component="div">
            {i18n.__('pages.detailApp.title')}
          </Typography>
          <Grid container sx={gridContainerStyle}>
            <Grid item xs={8} style={{ paddingLeft: '18px' }}>
              <Typography variant="h6" component="div">
                {app.nom}
              </Typography>
              <Typography variant="body1" component="div" wrap="nowrap">
                {app.description}
              </Typography>
              <p>{i18n.__('pages.detailApp.winget')}</p>
              <div style={{ display: 'flex' }}>
                <p style={{ paddingRight: 5 }}>Versions :</p>
                <ListVersion versions={app.versions} />
              </div>
              <span style={iconSpanStyle}>
                <IconButton title={i18n.__('pages.detailApp.redirect')}>
                  <LanguageIcon />
                </IconButton>
                <p>{i18n.__('pages.detailApp.redirectLabel')}</p>
              </span>
              <span style={iconSpanStyle}>
                <IconButton title={i18n.__('pages.detailApp.download')}>
                  <GetAppIcon />
                </IconButton>
                <p>{i18n.__('pages.detailApp.downloadLabel')}</p>
              </span>
              <span style={iconSpanStyle}>
                <IconButton disabled>
                  <MonetizationOnIcon />
                </IconButton>
                <p>{i18n.__('pages.detailApp.Licence')}</p>
              </span>
              <span style={iconSpanStyle}>
                <IconButton disabled>
                  <LocalOfferIcon />
                </IconButton>
                <p>{i18n.__('pages.detailApp.Tags')}</p>
              </span>
              <span style={iconSpanStyle}>
                {mapList((tag) => (
                  <Button variant="outlined">{tag}</Button>
                ))}
              </span>
            </Grid>
            <AppAvatar detailApp />
          </Grid>
          <div style={divButtonStyle}>
            {checkAppAllreadyAdded() ? (
              <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={removeAppFromCart}>
                {i18n.__('pages.detailApp.Remove')}
              </Button>
            ) : (
              <Button variant="contained" onClick={addAppToCart}>
                {i18n.__('pages.detailApp.Save')}
              </Button>
            )}
            <Button variant="contained" onClick={goBack}>
              {i18n.__('pages.detailApp.back')}
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
