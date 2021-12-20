/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { useAppContext } from '../../contexts/context';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const UserAvatar = ({ userAvatar, customClass }) => {
  const [
    {
      user: { avatar, firstName },
    },
  ] = useAppContext();
  const localAvatar = userAvatar || avatar;
  const classes = useStyles();
  const getClasse = () => {
    if (customClass) return customClass;
    if (localAvatar) return '';
    return classes.avatar;
  };
  return <Avatar alt={firstName} src={localAvatar || firstName} className={getClasse()} />;
};

UserAvatar.defaultProps = {
  userAvatar: '',
  customClass: '',
};

UserAvatar.propTypes = {
  userAvatar: PropTypes.string,
  customClass: PropTypes.string,
};

export default UserAvatar;
