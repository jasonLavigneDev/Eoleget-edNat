import React from 'react';
import i18n from 'meteor/universe:i18n';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(() => ({
  wrapper: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const LoggingOut = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button variant="contained" color="primary">
        {i18n.__('system.logout')}
      </Button>
    </div>
  );
};

export default LoggingOut;
