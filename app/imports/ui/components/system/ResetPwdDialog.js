import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = (isMobile) =>
  makeStyles(() => ({
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

const ResetPwdDialog = ({ token }) => {
  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [isValid, setIsValid] = useState(false);
  const classes = useStyles(false)();
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
        history.replace('/');
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
    <div className={classes.paper}>
      <Dialog open={open} className={classes.root}>
        <DialogTitle>{i18n.__('components.ResetPwdDialog.title')}</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.marginTop}
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
            className={classes.marginTop}
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
        <DialogActions className={classes.actions}>
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
