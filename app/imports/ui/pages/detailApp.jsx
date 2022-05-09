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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Spinner from '../components/system/Spinner';
import Applications from '../../api/applications/applications';
import lightTheme from '../themes/light';
import ListVersion from '../components/version/listVersion';
import AppImg from '../components/appCard/AppImg';

const detailApp = ({ app, ready }) => {
  if (!ready) return <Spinner full />;

  // Styles CSS //
  const containerStyle = {
    marginTop: lightTheme.spacing(10),
    maxWidth: '1000px',
    minWidth: '550px',
  };
  const paperStyle = {
    border: '2px solid',
    borderColor: 'secondary.main',
    padding: 10,
  };
  const gridContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
  };
  const gridDetailAppStyle = {
    border: '1px solid',
    borderColor: 'primary.main',
    borderRadius: '15px',
    backgroundColor: 'white',
    marginTop: -13,
    padding: 2,
  };
  const iconSpanTagStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  };
  const iconSpanStyle = {
    display: 'flex',
    flexDirection: 'row',
  };
  const iconStyle = {
    '&:disabled': {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  };
  const divButtonStyle = {
    marginTop: 50,
    marginBottom: -50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  };
  // End styles //
  const history = useHistory();
  const goBack = () => {
    history.goBack();
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

  const getVersion = () => {
    const ver = JSON.parse(localStorage.getItem(`version_${app.identification}`)) || 'latest';
    return ver;
  };

  const addAppToCart = () => {
    if (checkAppAllreadyAdded()) {
      msg.error(i18n.__('components.Card.addAppError'));
    } else {
      const ver = JSON.parse(localStorage.getItem(`version_${app.identification}`)) || '';
      const appFinal = {
        nom: app.nom,
        identification: app.identification,
        description: app.description,
        version: ver,
      };
      cart[1]([...cart[0], appFinal]);
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

  const handleUrlButton = () => window.open(app.url, '_blank');

  const generateCommand = (v) => {
    let c = '';
    if (v === 'latest') c = `winget install --id=${app.identification} -e`;
    else c = `winget install --id=${app.identification} -v "${v}" -e`;
    return c;
  };

  const [command, setCommand] = useState(generateCommand(getVersion()));

  const copyCommand = () => {
    navigator.clipboard.writeText(command).then(msg.success(i18n.__('pages.detailApp.copyCommand')));
  };

  return (
    <Fade in>
      <Container sx={containerStyle}>
        <Paper sx={paperStyle}>
          <Grid container sx={gridContainerStyle}>
            <Grid item xs={8} style={{ paddingLeft: '18px' }} sx={gridDetailAppStyle}>
              <Typography variant="h4" component="div">
                {i18n.__('pages.detailApp.title')}
              </Typography>
              <Typography variant="h6" component="div">
                {app.nom}
              </Typography>
              <Typography variant="body1" component="div" wrap="nowrap">
                {app.description}
              </Typography>
              <div style={{ display: 'flex', marginTop: 10 }}>
                <Typography style={{ paddingRight: 5, paddingTop: 5, paddingBottom: 10 }}>Versions :</Typography>
                {checkAppAllreadyAdded() ? (
                  <p>{getVersion()}</p>
                ) : (
                  <ListVersion versions={app.versions} app={app} setCommand={setCommand} />
                )}
              </div>
              {app.url ? (
                <span style={iconSpanStyle}>
                  <IconButton title={i18n.__('pages.detailApp.redirect')} onClick={handleUrlButton} color="primary">
                    <LanguageIcon />
                    <Typography variant="body1" sx={{ textDecoration: 'underline' }}>
                      {app.url}
                    </Typography>
                  </IconButton>
                </span>
              ) : null}
              <span style={iconSpanStyle}>
                <Button
                  title={i18n.__('pages.detailApp.download')}
                  onClick={copyCommand}
                  sx={{ textTransform: 'none' }}
                >
                  <ContentCopyIcon />
                  <Typography variant="paragraph">{command}</Typography>
                </Button>
              </span>
              <span style={iconSpanStyle}>
                <IconButton disabled sx={iconStyle}>
                  <MonetizationOnIcon />
                </IconButton>
                <p>
                  {i18n.__('pages.detailApp.Licence')}: {app.license}
                </p>
              </span>
              <span style={iconSpanStyle}>
                <IconButton disabled sx={iconStyle}>
                  <LocalOfferIcon />
                </IconButton>
                <p>{i18n.__('pages.detailApp.Tags')}</p>
              </span>
              <span style={iconSpanTagStyle}>
                {app.tags.map((tag) => (
                  <Button key={tag} variant="outlined">
                    {tag}
                  </Button>
                ))}
              </span>
            </Grid>
            <div style={{ marginLeft: 30, marginTop: -10 }}>
              <AppImg appIdent={app.identification} size={250} />
            </div>
          </Grid>
          <div style={divButtonStyle}>
            {checkAppAllreadyAdded() ? (
              <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={removeAppFromCart}>
                {i18n.__('pages.detailApp.Remove')}
              </Button>
            ) : (
              <Button variant="contained" onClick={addAppToCart} sx={{ backgroundColor: 'primary.purple' }}>
                {i18n.__('pages.detailApp.Save')}
              </Button>
            )}
            <Button variant="contained" onClick={goBack} sx={{ backgroundColor: 'primary.purple' }}>
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
