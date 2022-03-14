import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import Button from '@mui/material/Button';
import { useAppContext } from '../contexts/context';
import LoginDialog from '../components/system/LoginDialog';

// Styles CSS //
const divWrapperStyle = {
  height: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};
// End styles //

const NotLoggedIn = () => {
  const [{ loggingIn }] = useAppContext();
  const { enableKeycloak } = Meteor.settings.public;

  return (
    <div style={divWrapperStyle}>
      {enableKeycloak ? (
        <Button variant="contained" color="primary" onClick={Meteor.loginWithKeycloak}>
          {i18n.__(loggingIn ? 'system.loading' : 'system.login')}
        </Button>
      ) : (
        <LoginDialog />
      )}
    </div>
  );
};

export default NotLoggedIn;
