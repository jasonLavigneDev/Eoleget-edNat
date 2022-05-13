import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import { useAppContext } from '../contexts/context';
import LoginDialog from '../components/system/LoginDialog';
import ButtonEole from '../components/buttons/buttonEole';

// Styles CSS //
const paperStyle = {
  display: 'flex',
  margin: '10% auto',
  padding: '5%',
  flexDirection: 'column',
  border: '2px solid',
  borderColor: 'secondary.main',
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
          <ButtonEole onClick={handleLogging} text={i18n.__(loggingIn ? 'system.loading' : 'system.login')} />
        ) : (
          <LoginDialog />
        )}
      </div>
    </Paper>
  );
};

export default NotLoggedIn;
