import React from 'react';
import { useHistory } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';

import { Button, Paper, Typography } from '@mui/material';

import ButtonEole from '../components/buttons/buttonEole';

// Styles CSS //
const mainDivStyle = {
  margin: 'auto',
  marginTop: '10%',
  textAlign: 'center',
};
const paperStyle = {
  padding: 15,
  border: '2px solid',
  borderColor: 'secondary.main',
};
const spanButtonStyle = {
  marginTop: '10%',
  display: 'flex',
  justifyContent: 'space-evenly',
};
// End styles //

const NotFound = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };
  const handleClick = () => {
    history.push('/app');
  };

  return (
    <div style={mainDivStyle}>
      <Paper sx={paperStyle}>
        <Typography variant="h2" sx={{ color: 'primary.purple' }}>
          {i18n.__('pages.NotFound.message')}
        </Typography>
        <span style={spanButtonStyle}>
          <ButtonEole onClick={goBack} text={i18n.__('pages.NotFound.backButtonLabel')} />
          <ButtonEole onClick={handleClick} text={i18n.__('pages.NotFound.homeButtonLabel')} />
        </span>
      </Paper>
    </div>
  );
};

export default NotFound;
