import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import { useAppContext } from '../contexts/context';
import LoginDialog from '../components/system/LoginDialog';

// Styles CSS //
const paperStyle = {
  display: 'flex',
  margin: '5% auto',
  padding: '10%',
  flexDirection: 'column',
};
const divWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '10%',
};
// End styles //

const NotLoggedIn = () => {
  const [{ loggingIn }] = useAppContext();
  const { enableKeycloak } = Meteor.settings.public;
  const history = useHistory();

  const handleLogging = () => {
    history.push('/');
    Meteor.loginWithKeycloak();
  };

  return (
    <Paper sx={paperStyle}>
      <Typography variant="h3">{i18n.__('pages.NotLoggedIn.welcome')}</Typography>
      <div style={divWrapperStyle}>
        {enableKeycloak ? (
          <Button variant="contained" color="primary" onClick={handleLogging}>
            {i18n.__(loggingIn ? 'system.loading' : 'system.login')}
          </Button>
        ) : (
          <LoginDialog />
        )}
      </div>
    </Paper>
  );
};

export default NotLoggedIn;
