import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Card, CardActions, CardContent, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

// Style CSS //
const divStyle = {
  width: '100%',
  marginBottom: 3,
};
const cardContentStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop: 0,
  paddingBottom: 0,
  '&:last-child': {
    paddingBottom: 0,
  },
};

function AppCardCart({ app, handleClose }) {
  const getVersion = () => {
    return app.version || 'latest';
  };

  return (
    <div style={divStyle}>
      <Card>
        <CardContent sx={cardContentStyle}>
          {app.nom} ({getVersion()})
          <CardActions>
            <Tooltip title={i18n.__('components.appCart.deleteOne')}>
              <IconButton
                onClick={() => handleClose(app.identification)}
                sx={{
                  color: 'secondary.main',
                  marginLeft: '30%',
                  '&:hover': { color: 'primary.light', backgroundColor: 'secondary.main', borderRadius: 5 },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

AppCardCart.propTypes = {
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AppCardCart;
