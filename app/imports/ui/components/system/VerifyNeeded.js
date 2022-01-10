import React from 'react';
import i18n from 'meteor/universe:i18n';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

const useStyles = (isMobile) =>
  makeStyles(() => ({
    wrapper: {
      height: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    root: {
      width: '100%',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
    },
    paper: {
      overflow: 'auto',
      position: 'absolute',
      width: isMobile ? '95%' : '25%',
      maxHeight: '100%',
      top: isMobile ? 0 : '50%',
      left: isMobile ? '2.5%' : '50%',
      transform: isMobile ? 'translateY(50%)' : 'translate(-50%, -50%)',
    },
    link: {
      color: 'blue',
    },
    marginTop: {
      marginTop: '8px;',
    },
    textButton: {
      textTransform: 'none',
    },
    buttonRight: {
      marginTop: '8px;',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
    },
  }));

const doVerify = () => {
  Meteor.call('users.verifyEmail', {}, (err) => {
    if (err) {
      msg.error(`${i18n.__('components.VerifyNeeded.error')} (${err.reason || err.message || err})`);
    } else {
      msg.success(i18n.__('components.VerifyNeeded.success'));
    }
  });
};

const VerifyNeeded = () => {
  const classes = useStyles(false)();
  return (
    <div className={classes.wrapper}>
      <Dialog open className={classes.root}>
        <DialogTitle>{i18n.__(`components.VerifyNeeded.title`)}</DialogTitle>
        <DialogContent>
          <DialogContentText>{i18n.__('components.VerifyNeeded.info')}</DialogContentText>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={doVerify} variant="contained" color="primary">
            {i18n.__(`components.VerifyNeeded.doVerify`)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerifyNeeded;
