import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

// Styles CSS //
const avatarStyle = {
  width: 40,
  height: 40,
};
const avatarDetailsStyle = {
  width: 200,
  height: 200,
};
// End styles //

function AppAvatar({ nameApp, isDetailApp }) {
  const avatar = `/images/appli/${nameApp}`;

  return (
    <Badge
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar alt={nameApp} src={avatar} sx={isDetailApp ? avatarDetailsStyle : avatarStyle} />
    </Badge>
  );
}

AppAvatar.propTypes = {
  nameApp: PropTypes.string.isRequired,
  isDetailApp: PropTypes.bool.isRequired,
};

export default AppAvatar;
