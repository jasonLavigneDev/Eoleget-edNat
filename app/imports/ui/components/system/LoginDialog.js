import React, { useState, useEffect } from 'react';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

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

const LoginDialog = () => {
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const classes = useStyles(false)();

  useEffect(() => {
    if (mode === 'signup') {
      setIsValid(!!username && !!password && !!firstName && !!lastName && !!email && password === verify);
    } else if (mode === 'signin') {
      setIsValid(!!username && !!password);
    } else {
      setIsValid(!!username);
    }
  }, [username, password, verify, firstName, lastName, email, mode]);

  const dosignin = () => {
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        msg.error(i18n.__('components.LoginDialog.signinError'));
      } else setOpen(false);
    });
  };

  const dosignup = () => {
    Accounts.createUser({ username, email, password, firstName, lastName }, (err) => {
      if (err) {
        msg.error(`${i18n.__('components.LoginDialog.signupError')} (${err.reason || err.message || err})`);
      } else {
        msg.success(i18n.__('components.LoginDialog.signupSuccess'));
        setOpen(false);
      }
    });
  };

  const doreset = () => {
    Accounts.forgotPassword({ email: username }, (err) => {
      if (err) {
        msg.error(`${i18n.__('components.LoginDialog.resetError')} (${err.reason || err.message || err})`);
      } else {
        msg.success(i18n.__('components.LoginDialog.resetSuccess'));
      }
    });
  };

  const handleKeyDown = (event) => {
    const enterKey = 13;
    if (event.target.name === 'password' && !!password && event.which === enterKey && mode === 'signin') {
      dosignin();
    }
    if (event.target.name === 'username' && !!username && event.which === enterKey && mode === 'reset') {
      doreset();
    }
  };

  return (
    <div className={classes.paper}>
      <Dialog open={open} className={classes.root}>
        <DialogTitle>{i18n.__(`components.LoginDialog.${mode}Title`)}</DialogTitle>
        <DialogContent>
          {mode === 'reset' ? (
            <DialogContentText>{i18n.__('components.LoginDialog.resetInfo')}</DialogContentText>
          ) : null}
          <TextField
            value={username}
            name="username"
            onKeyDown={handleKeyDown}
            label={i18n.__(
              `components.LoginDialog.${
                mode === 'signin' ? 'labelUsernameEmail' : mode === 'signup' ? 'labelUsername' : 'labelEmail'
              }`,
            )}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            fullWidth
          />
          {mode !== 'reset' ? (
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
          ) : null}
          {mode === 'signup' ? (
            <>
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
              <TextField
                className={classes.marginTop}
                value={firstName}
                name="firstName"
                label={i18n.__('components.LoginDialog.labelFirstName')}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <TextField
                className={classes.marginTop}
                value={lastName}
                name="lastName"
                label={i18n.__('components.LoginDialog.labelLastName')}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <TextField
                className={classes.marginTop}
                value={email}
                name="email"
                label={i18n.__('components.LoginDialog.labelEmail')}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </>
          ) : null}
          <div className={classes.buttonRight}>
            {mode === 'signin' ? (
              <>
                <Button className={classes.textButton} variant="text" color="primary" onClick={() => setMode('signup')}>
                  {i18n.__('components.LoginDialog.toSignup')}
                </Button>
                <Button className={classes.textButton} variant="text" color="primary" onClick={() => setMode('reset')}>
                  {i18n.__('components.LoginDialog.toResetPwd')}
                </Button>
              </>
            ) : (
              <Button className={classes.textButton} variant="text" color="primary" onClick={() => setMode('signin')}>
                {i18n.__('components.LoginDialog.toSignin')}
              </Button>
            )}
          </div>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button
            onClick={mode === 'signup' ? dosignup : mode === 'reset' ? doreset : dosignin}
            disabled={!isValid}
            variant="contained"
            color="primary"
          >
            {i18n.__(`components.LoginDialog.do${mode}`)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
