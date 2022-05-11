import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { useAppContext } from '../../contexts/context';

const LoginDialog = () => {
  const [{ isMobile }] = useAppContext();
  // Styles CSS //
  const dialogStyle = {
    width: '100%',
  };
  const DialogActionStyle = {
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
    '& .MuiInput-underline:after': {
      borderBottomColor: 'secondary.main',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'secondary.main',
      },
    },
  };
  const textButtonStyle = {
    textTransform: 'none',
  };
  const divButtonRight = {
    marginTop: '8px;',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  };
  // End Styles //
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

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
      } else {
        setOpen(false);
        history.push('/app');
      }
    });
  };

  const dosignup = () => {
    Accounts.createUser({ username, email, password, firstName, lastName }, (err) => {
      if (err) {
        msg.error(`${i18n.__('components.LoginDialog.signupError')} (${err.reason || err.message || err})`);
      } else {
        msg.success(i18n.__('components.LoginDialog.signupSuccess'));
        setOpen(false);
        history.push('/app');
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
    <div style={paperStyle}>
      <Dialog
        open={open}
        sx={dialogStyle}
        PaperProps={{
          style: { border: '2px solid', borderColor: 'orange' },
        }}
      >
        <DialogTitle sx={{ color: 'primary.main' }}>{i18n.__(`components.LoginDialog.${mode}Title`)}</DialogTitle>
        <DialogContent>
          {mode === 'reset' ? (
            <DialogContentText>{i18n.__('components.LoginDialog.resetInfo')}</DialogContentText>
          ) : null}
          <TextField
            value={username}
            name="username"
            onKeyDown={handleKeyDown}
            sx={textfieldStyle}
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
          ) : null}
          {mode === 'signup' ? (
            <>
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
              <TextField
                sx={textfieldStyle}
                value={firstName}
                name="firstName"
                label={i18n.__('components.LoginDialog.labelFirstName')}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <TextField
                sx={textfieldStyle}
                value={lastName}
                name="lastName"
                label={i18n.__('components.LoginDialog.labelLastName')}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <TextField
                sx={textfieldStyle}
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
          <div style={divButtonRight}>
            {mode === 'signin' ? (
              <>
                <Button sx={textButtonStyle} variant="text" color="primary" onClick={() => setMode('signup')}>
                  {i18n.__('components.LoginDialog.toSignup')}
                </Button>
                <Button sx={textButtonStyle} variant="text" color="primary" onClick={() => setMode('reset')}>
                  {i18n.__('components.LoginDialog.toResetPwd')}
                </Button>
              </>
            ) : (
              <Button sx={textButtonStyle} variant="text" color="primary" onClick={() => setMode('signin')}>
                {i18n.__('components.LoginDialog.toSignin')}
              </Button>
            )}
          </div>
        </DialogContent>
        <DialogActions sx={DialogActionStyle}>
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
