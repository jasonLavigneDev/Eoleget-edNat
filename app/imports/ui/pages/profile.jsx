import React, { useState, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';

import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { useAppContext } from '../contexts/context';
import { useObjectState } from '../../api/utils/hooks';
import LanguageSwitcher from '../components/system/LanguageSwitcher';
import AvatarPicker from '../components/users/AvatarPicker';
import Spinner from '../components/system/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(40),
  },
  rootPaper: {
    padding: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '10px',
  },
  keycloakMessage: {
    padding: theme.spacing(1),
  },
  inputFile: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  fileWrap: {
    position: 'relative',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  maxWidth: {
    maxWidth: '88vw',
  },
  labelLanguage: {
    fontSize: 16,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  keycloakLink: {
    textDecoration: 'underline',
    '&:hover, &:focus': {
      color: theme.palette.secondary.main,
      outline: 'none',
    },
  },
}));

const defaultState = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
};

function ProfilePage() {
  const classes = useStyles();
  const [userData, setUserData] = useState(defaultState);
  const [submitOk, setSubmitOk] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [{ user, loadingUser }] = useAppContext();
  const [errors, setErrors] = useObjectState(defaultState);

  const usernameLabel = React.useRef(null);
  const [labelUsernameWidth, setLabelUsernameWidth] = React.useState(0);
  useEffect(() => {
    setLabelUsernameWidth(usernameLabel.current.offsetWidth);
  }, []);

  const setData = (data, reset = false) => {
    setUserData({
      username: errors.username === '' || reset ? data.username : userData.username,
      firstName: errors.firstName === '' || reset ? data.firstName || '' : userData.firstName,
      lastName: errors.lastName === '' || reset ? data.lastName || '' : userData.lastName,
      email: errors.email === '' || reset ? data.emails[0].address : userData.email,
      avatar: userData.avatar === '' || reset ? data.avatar : userData.avatar,
    });
    if (reset === true) {
      setErrors(defaultState);
      setSubmitted(false);
    }
  };

  useEffect(() => {
    if (
      submitted &&
      userData.username === user.username &&
      userData.firstName === user.firstName &&
      userData.lastName === user.lastName &&
      userData.email === user.emails[0].address &&
      userData.avatar === user.avatar
    ) {
      msg.success(i18n.__('pages.ProfilePage.updateSuccess'));
      setSubmitted(false);
    }
    if (user._id) {
      setData(user);
    }
  }, [user]);

  const resetForm = () => {
    setData(user, true);
  };

  const checkSubmitOk = () => {
    const errSum = Object.keys(errors).reduce((sum, name) => {
      if (name === 'advancedPersonalPage' || name === 'articlesEnable') {
        // checkbox not concerned by errors
        return sum;
      }
      return sum + errors[name];
    }, '');
    if (errSum !== '') {
      return false;
    }
    return true;
  };

  const onUpdateField = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    if (value.trim() === '') {
      setErrors({ [name]: i18n.__('pages.ProfilePage.valueRequired') });
    } else if (name === 'username') {
      setSubmitOk(false);
    } else {
      setErrors({ [name]: '' });
    }
  };

  const submitUpdateUser = () => {
    setSubmitted(true);
    let modifications = false;
    if (userData.username !== user.username) {
      modifications = true;
      Meteor.call('users.setUsername', { username: userData.username.trim() }, (error) => {
        if (error) {
          msg.error(error.message);
        }
      });
    }
    if (userData.email !== user.emails[0].address) {
      modifications = true;
      Meteor.call('users.setEmail', { email: userData.email.trim() }, (error) => {
        if (error) {
          if (error.error === 'validation-error') {
            setErrors({ email: error.details[0].message });
          } else if (error.message === 'Email already exists. [403]') {
            setErrors({ email: i18n.__('pages.ProfilePage.emailAlreadyExists') });
          } else setErrors({ email: error.message });
        }
      });
    }
    if (userData.firstName !== user.firstName || userData.lastName !== user.lastName) {
      modifications = true;
      Meteor.call(
        'users.setName',
        { firstName: userData.firstName.trim(), lastName: userData.lastName.trim() },
        (error) => {
          if (error) {
            if (error.error === 'validation-error') {
              error.details.forEach((detail) => {
                if (detail.name === 'firstName') {
                  setErrors({ firstName: detail.message });
                } else setErrors({ lastName: detail.message });
              });
            } else {
              msg.error(error.message);
            }
          }
        },
      );
    }
    if (userData.avatar !== user.avatar) {
      modifications = true;
      Meteor.call('users.setAvatar', { avatar: userData.avatar }, (error) => {
        if (error) {
          msg.error(error.message);
        }
      });
    }
    if (modifications === false) msg.info(i18n.__('pages.ProfilePage.noModifications'));
  };

  const useEmail = () => {
    setUserData({ ...userData, username: userData.email });
    setErrors({ username: '' });
  };

  useEffect(() => {
    setSubmitOk(checkSubmitOk());
  }, [errors]);

  const onAssignAvatar = (avatarObj) => {
    setUserData({ ...userData, avatar: avatarObj.url });
  };

  if (loadingUser) {
    return <Spinner />;
  }

  return (
    <Fade in>
      <Container className={classes.root}>
        <Paper className={classes.rootPaper}>
          <Typography variant="h4">{i18n.__('pages.ProfilePage.title')}</Typography>
          <form noValidate autoComplete="off">
            <Grid container className={classes.form} spacing={2}>
              <Grid container spacing={2} style={{ alignItems: 'center' }}>
                <Grid item xs={8} style={{ paddingLeft: '18px' }}>
                  <TextField
                    margin="normal"
                    autoComplete="fname"
                    id="firstName"
                    label={i18n.__('pages.ProfilePage.firstname')}
                    name="firstName"
                    error={errors.firstName !== ''}
                    helperText={errors.firstName}
                    onChange={onUpdateField}
                    fullWidth
                    type="text"
                    value={userData.firstName || ''}
                    variant="outlined"
                  />
                  <TextField
                    margin="normal"
                    autoComplete="lname"
                    id="lastName"
                    label={i18n.__('pages.ProfilePage.lastname')}
                    name="lastName"
                    error={errors.lastName !== ''}
                    helperText={errors.lastName}
                    onChange={onUpdateField}
                    fullWidth
                    type="text"
                    value={userData.lastName || ''}
                    variant="outlined"
                  />
                  <TextField
                    margin="normal"
                    autoComplete="email"
                    id="email"
                    label={i18n.__('pages.ProfilePage.email')}
                    name="email"
                    error={errors.email !== ''}
                    helperText={errors.email}
                    onChange={onUpdateField}
                    fullWidth
                    type="text"
                    value={userData.email || ''}
                    variant="outlined"
                  />
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel
                      error={errors.username !== ''}
                      htmlFor="username"
                      id="username-label"
                      ref={usernameLabel}
                    >
                      {i18n.__('api.users.labels.username')}
                    </InputLabel>
                    <OutlinedInput
                      id="username"
                      name="username"
                      value={userData.username}
                      error={errors.username !== ''}
                      onChange={onUpdateField}
                      labelWidth={labelUsernameWidth}
                      endAdornment={
                        <InputAdornment position="end">
                          <Tooltip
                            title={i18n.__('pages.ProfilePage.useEmail')}
                            aria-label={i18n.__('pages.ProfilePage.useEmail')}
                          >
                            <span>
                              <IconButton onClick={useEmail}>
                                <MailIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText id="username-helper-text" error={errors.username !== ''}>
                      {errors.username}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <AvatarPicker
                    userAvatar={userData.avatar || ''}
                    userFirstName={userData.firstName || ''}
                    onAssignAvatar={onAssignAvatar}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2} style={{ alignItems: 'center' }}>
                <p className={classes.labelLanguage}>{i18n.__('pages.ProfilePage.languageLabel')}</p>
                <LanguageSwitcher relative />
              </Grid>
            </Grid>
            <div className={classes.buttonGroup}>
              <Button variant="contained" onClick={resetForm}>
                {i18n.__('pages.ProfilePage.reset')}
              </Button>
              <Button variant="contained" disabled={!submitOk} color="primary" onClick={submitUpdateUser}>
                {i18n.__('pages.ProfilePage.update')}
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Fade>
  );
}

export default ProfilePage;