import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppContext } from '../../contexts/context';

const ResetPwdDialog = ({ token }) => {
  const [{ isMobile }] = useAppContext();
  // Styles CSS //
  const dialogStyle = {
    width: '100%',
  };
  const dialogActionStyle = {
    display: 'flex',
    justifyContent: 'center',
  };
  const paperStyle = {
    overflow: 'auto',
    position: 'absolute',
    width: isMobile ? '95%' : '25%',
    maxHeight: '100%',
    top: isMobile ? 0 : '50%',
    left: isMobile ? '2.5%' : '50%',
    transform: isMobile ? 'translateY(50%)' : 'translate(-50%, -50%)',
  };
  const textfieldStyle = {
    marginTop: '8px;',
  };
  // End Styles //

  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsValid(!!password && password === verify);
  }, [password, verify]);

  const doResetPwd = () => {
    Accounts.resetPassword(token, password, (err) => {
      if (err) {
        msg.error(`${i18n.__('components.ResetPwdDialog.error')} (${err.reason || err.message || err})`);
      } else {
        msg.success(i18n.__('components.ResetPwdDialog.success'));
        setOpen(false);
        history.replace('/app');
      }
    });
  };

  const handleKeyDown = (event) => {
    const enterKey = 13;
    if (event.which === enterKey) {
      doResetPwd();
    }
  };

  return (
    <div style={paperStyle}>
      <Dialog open={open} sx={dialogStyle}>
        <DialogTitle>{i18n.__('components.ResetPwdDialog.title')}</DialogTitle>
        <DialogContent>
          <TextField
            sx={textfieldStyle}
            value={password}
            name="password"
            onKeyDown={handleKeyDown}
            label={i18n.__('components.LoginDialog.labelPassword')}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            sx={textfieldStyle}
            value={verify}
            name="verify"
            error={!!verify && verify !== password}
            label={i18n.__('components.LoginDialog.labelVerify')}
            type="password"
            onChange={(e) => setVerify(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={dialogActionStyle}>
          <Button onClick={doResetPwd} disabled={!isValid} variant="contained" color="primary">
            {i18n.__('components.ResetPwdDialog.doResetPwd')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ResetPwdDialog.defaultProps = {
  token: PropTypes.string,
};

ResetPwdDialog.propTypes = {
  token: PropTypes.string,
};

export default ResetPwdDialog;
