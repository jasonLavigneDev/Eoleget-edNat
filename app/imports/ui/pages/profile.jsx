import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

import Fade from '@mui/material/Fade';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MailIcon from '@mui/icons-material/Mail';

import { useAppContext } from '../contexts/context';
import { useObjectState } from '../../api/utils/hooks';
import LanguageSwitcher from '../components/system/LanguageSwitcher';
import AvatarPicker from '../components/users/AvatarPicker';
import Spinner from '../components/system/Spinner';
import theme from '../themes/light';

// Styles CSS //
const primaryMain = 'primary.main';
const secondaryMain = 'secondary.main';
const containerStyle = {
  marginTop: theme.spacing(10),
  marginLeft: theme.spacing(45),
};
const paperStyle = {
  padding: theme.spacing(5),
  border: '2px solid black',
  borderColor: secondaryMain,
};
const gridFormStyle = {
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 3,
};
const buttonGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  marginTop: '10px',
};
const labelLanguageStyle = {
  fontSize: 16,
  margin: 10,
  marginTop: 20,
  marginBottom: 20,
};
const keycloakMessage = {
  padding: theme.spacing(2),
  border: '2px solid black',
  borderColor: primaryMain,
  marginTop: -10,
  marginBottom: 2,
  color: 'primary.main',
};
const keycloakLink = {
  textDecoration: 'underline',
  '&:hover, &:focus': {
    color: theme.palette.secondary.main,
    outline: 'none',
  },
};
const textfieldStyle = {
  width: '80%',
};

// End styles //

const defaultState = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
};

function ProfilePage() {
  const [userData, setUserData] = useState(defaultState);
  const [submitOk, setSubmitOk] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [{ user, loadingUser }] = useAppContext();
  const [errors, setErrors] = useObjectState(defaultState);
  const { enableKeycloak } = Meteor.settings.public;
  const accountURL = `${Meteor.settings.public.keycloakUrl}/realms/${Meteor.settings.public.keycloakRealm}/account`;

  const usernameLabel = React.useRef(null);
  const [labelUsernameWidth, setLabelUsernameWidth] = React.useState(0);
  useEffect(() => {
    setLabelUsernameWidth(usernameLabel.current.offsetWidth);
  }, []);

  const setData = (data, reset = false) => {
    const dataEmail = data.emails ? data.emails[0].address : '';
    setUserData({
      username: errors.username === '' || reset ? data.username : userData.username,
      firstName: errors.firstName === '' || reset ? data.firstName || '' : userData.firstName,
      lastName: errors.lastName === '' || reset ? data.lastName || '' : userData.lastName,
      email: errors.email === '' || reset ? dataEmail : userData.email,
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
      userData.email === user.emails
        ? user.emails[0].address
        : '' && userData.avatar === user.avatar
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
      <Container sx={containerStyle}>
        <Typography variant="h4" sx={{ marginBottom: 5, color: primaryMain }}>
          {i18n.__('pages.ProfilePage.title')}
        </Typography>
        <Paper sx={paperStyle}>
          <form noValidate autoComplete="off">
            <Grid container sx={gridFormStyle} spacing={2}>
              <Grid container spacing={2} style={{ alignItems: 'center' }}>
                <Grid item xs={8} style={{ paddingLeft: '18px' }}>
                  {enableKeycloak ? (
                    <Paper sx={keycloakMessage}>
                      <Typography>{i18n.__('pages.ProfilePage.keycloakProcedure')}</Typography>
                      <br />
                      <Typography>
                        <a href={accountURL} style={keycloakLink}>
                          {i18n.__('pages.ProfilePage.keycloakProcedureLink')}
                        </a>
                      </Typography>
                    </Paper>
                  ) : null}
                  <TextField
                    disabled={enableKeycloak}
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
                    sx={textfieldStyle}
                  />
                  <TextField
                    disabled={enableKeycloak}
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
                    sx={textfieldStyle}
                  />
                  <TextField
                    disabled={enableKeycloak}
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
                    sx={textfieldStyle}
                  />
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel
                      disabled={enableKeycloak}
                      error={errors.username !== ''}
                      htmlFor="username"
                      id="username-label"
                      ref={usernameLabel}
                      sx={textfieldStyle}
                    >
                      {i18n.__('api.users.labels.username')}
                    </InputLabel>
                    <OutlinedInput
                      id="username"
                      name="username"
                      disabled={enableKeycloak}
                      value={userData.username}
                      error={errors.username !== ''}
                      onChange={onUpdateField}
                      labelwidth={labelUsernameWidth}
                      label={i18n.__('api.users.labels.username')}
                      sx={textfieldStyle}
                      endAdornment={
                        <InputAdornment position="end">
                          <Tooltip
                            title={i18n.__('pages.ProfilePage.useEmail')}
                            aria-label={i18n.__('pages.ProfilePage.useEmail')}
                          >
                            <span>
                              <IconButton onClick={useEmail} disabled={enableKeycloak}>
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
                <Grid item xs={4} sx={{ height: 1 / 1, marginTop: enableKeycloak ? 10 : 0, marginLeft: -5 }}>
                  <AvatarPicker
                    userAvatar={userData.avatar || ''}
                    userFirstName={userData.firstName || ''}
                    onAssignAvatar={onAssignAvatar}
                    url="avatar"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2} style={{ alignItems: 'center', marginLeft: 20 }}>
                <p style={labelLanguageStyle}>{i18n.__('pages.ProfilePage.languageLabel')}</p>
                <LanguageSwitcher relative />
              </Grid>
            </Grid>
            <div style={buttonGroupStyle}>
              <Button variant="contained" onClick={resetForm} sx={{ backgroundColor: 'primary.purple' }}>
                {i18n.__('pages.ProfilePage.reset')}
              </Button>
              <Button
                variant="contained"
                disabled={!submitOk}
                onClick={submitUpdateUser}
                sx={{ backgroundColor: 'primary.purple' }}
              >
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
