import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import AppVersion from '../system/AppVersion';
import LogoutDialog from '../system/LogoutDialog';
import UserAvatar from '../system/UserAvatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(1),
  },
}));

export const menu = [
  {
    path: '/add-event',
    content: 'menuAddEvent',
  },
];

const MainMenu = ({ user = {} }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogout, setOpenLogout] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuClick = (path) => {
    history.push(path);
    setAnchorEl(null);
  };
  const T = i18n.createComponent('components.MainMenu');
  const currentLink = menu.find((link) => {
    if (link.path === pathname || pathname.search(link.path) > -1) {
      return true;
    }
    return false;
  });

  const keycloakLogout = () => {
    const { keycloakUrl, keycloakRealm } = Meteor.settings.public;
    const keycloakLogoutUrl = `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/logout`;
    const redirectUri = `${Meteor.absoluteUrl()}/logout`;
    window.location = `${keycloakLogoutUrl}?post_logout_redirect_uri=${redirectUri}`;
  };

  const closeLogoutDialog = () => {
    setOpenLogout(false);
    setAnchorEl(null);
  };

  const onLogout = () => {
    if (Meteor.settings.public.enableKeycloak) {
      const logoutType = user.logoutType || 'ask';
      if (logoutType === 'ask') {
        setOpenLogout(true);
      } else if (logoutType === 'global') {
        keycloakLogout();
      } else Meteor.logout();
    } else {
      Meteor.logout();
    }
  };

  return (
    <>
      <Button
        aria-controls="main-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ textTransform: 'none' }}
        endIcon={<ExpandMoreIcon />}
      >
        {user.firstName || ''}
        <UserAvatar customClass={classes.avatar} />
      </Button>
      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {menu.map((item) => {
          return item.content === 'Divider' ? (
            <Divider key={item.path} />
          ) : (
            <MenuItem
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              selected={currentLink ? currentLink.path === item.path : false}
            >
              <T>{item.content}</T>
            </MenuItem>
          );
        })}
        <Divider />

        <MenuItem onClick={onLogout}>
          <T>menuLogoutLabel</T>
        </MenuItem>
        <Divider />
        <MenuItem>
          <AppVersion />
        </MenuItem>
      </Menu>
      <LogoutDialog open={openLogout} onClose={closeLogoutDialog} onAccept={keycloakLogout} />
    </>
  );
};

export default MainMenu;

MainMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

MainMenu.defaultProps = {
  user: {},
};
