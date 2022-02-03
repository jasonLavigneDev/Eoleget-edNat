import React from 'react';
import { Card, CardActions, CardContent, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

// Style CSS //
const cardContentStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop: 0,
  paddingBottom: 0,
  '&:last-child': {
    paddingBottom: 0,
  },
};

function AppCardCart({ app, cart }) {
  const RemoveAppFromCart = () => {
    cart[1](cart[0].filter((appli) => appli.identification !== app.identification));
  };

  const getVersion = () => {
    return app.version || 'latest';
  };

  return (
    <Card>
      <CardContent sx={cardContentStyle}>
        {app.nom} ({getVersion()})
        <CardActions>
          <Tooltip title="delete">
            <IconButton onClick={RemoveAppFromCart}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
}

AppCardCart.propTypes = {
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AppCardCart;
