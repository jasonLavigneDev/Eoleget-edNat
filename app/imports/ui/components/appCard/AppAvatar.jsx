import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
  avatarDetails: {
    width: 250,
    height: 250,
  },
  iconProfil: {
    fontSize: 100,
  },
}));
function AppAvatar({ detailApp }) {
  const classes = useStyles();
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
      <Avatar alt="group" src={avatar} className={isDetailApp ? classes.avatarDetails : classes.avatar} />
    </Badge>
  );
}

AppAvatar.propTypes = {
  detailApp: PropTypes.bool.isRequired,
};

export default AppAvatar;
