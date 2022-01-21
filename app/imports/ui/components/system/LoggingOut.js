import React from 'react';
import i18n from 'meteor/universe:i18n';
import Button from '@mui/material/Button';

// Styles CSS //
const wrapperStyle = {
  height: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
// End Styles //

const LoggingOut = () => {
  return (
    <div className={wrapperStyle}>
      <Button variant="contained" color="primary">
        {i18n.__('system.logout')}
      </Button>
    </div>
  );
};

export default LoggingOut;
