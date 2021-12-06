import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(() => ({
  badge: {
    borderRadius: '50%',
    boxShadow: `0 0 0 2px black`,
    padding: '4px',
    color: '#FFFFFF',
  },
  public: {
    backgroundColor: 'white',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  avatarMobile: {
    width: 120,
    height: 120,
  },
  iconProfil: {
    fontSize: 100,
  },
}));

const AppAvatar = () => {
  const classes = useStyles();
  const avatar = '/images/i18n/fr.png';

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar alt="group" src={avatar} className={classes.avatar} />
    </Badge>
  );
};

export default AppAvatar;
