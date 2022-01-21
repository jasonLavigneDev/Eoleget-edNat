import React from 'react';
import i18n from 'meteor/universe:i18n';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

// Styles CSS //
const wrapperStyle = {
  height: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const dialogStyle = {
  width: '100%',
};
const dialogActionsStyle = {
  display: 'flex',
  justifyContent: 'center',
};
// End styles //

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
  return (
    <div style={wrapperStyle}>
      <Dialog open sx={dialogStyle}>
        <DialogTitle>{i18n.__(`components.VerifyNeeded.title`)}</DialogTitle>
        <DialogContent>
          <DialogContentText>{i18n.__('components.VerifyNeeded.info')}</DialogContentText>
        </DialogContent>
        <DialogActions sx={dialogActionsStyle}>
          <Button onClick={doVerify} variant="contained" color="primary">
            {i18n.__(`components.VerifyNeeded.doVerify`)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerifyNeeded;
