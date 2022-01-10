import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useAppContext } from '../contexts/context';
import LoginDialog from '../components/system/LoginDialog';

const useStyles = makeStyles(() => ({
  wrapper: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const NotLoggedIn = () => {
  const classes = useStyles();
  const [{ loggingIn }] = useAppContext();
  const { enableKeycloak } = Meteor.settings.public;

  return (
    <div className={classes.wrapper}>
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
