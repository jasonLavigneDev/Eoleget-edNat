import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

// Styles CSS //
const avatarStyle = {
  width: 40,
  height: 40,
};
const avatarDetailsStyle = {
  width: 150,
  height: 150,
};
// End styles //

function AppAvatar({ detailApp }) {
  const [isDetailApp, setDetailApp] = useState(false);
  const avatar = '/images/i18n/fr.png';

  React.useEffect(() => {
    setDetailApp(detailApp);
  }, [isDetailApp]);

  return (
    <Badge
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar alt="group" src={avatar} sx={isDetailApp ? avatarDetailsStyle : avatarStyle} />
    </Badge>
  );
}

AppAvatar.propTypes = {
  detailApp: PropTypes.bool.isRequired,
};

export default AppAvatar;
