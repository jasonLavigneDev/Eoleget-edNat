/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'react';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import { useAppContext } from '../../contexts/context';

const UserAvatar = ({ userAvatar, big }) => {
  const [
    {
      user: { avatar, firstName },
    },
  ] = useAppContext();
  const localAvatar = userAvatar || avatar;
  return (
    <Avatar
      alt={firstName}
      src={localAvatar || firstName}
      sx={big ? { width: 250, height: 250 } : { width: 40, height: 40, backgroundColor: 'primary.light' }}
    />
  );
};

UserAvatar.defaultProps = {
  userAvatar: '',
  big: false,
};

UserAvatar.propTypes = {
  userAvatar: PropTypes.string,
  big: PropTypes.bool,
};

export default UserAvatar;
