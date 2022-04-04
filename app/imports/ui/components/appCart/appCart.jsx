import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Paper, Box, Button, Popover, Badge, Tooltip } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useHistory } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import DeleteIcon from '@mui/icons-material/Delete';
import AppCardCart from './appCartCard';

const divStyle = {
  position: 'static',
};

const iconButtonStyle = {
  color: 'blue',
};
const buttonCreateStyle = {
  margin: 1,
};
const paperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 1,
  overflow: 'auto',
  maxHeight: 300,
};

function AppCart({ cart }) {
  const [showMore, setShowMore] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  React.useEffect(() => {
    setShowMore(showMore);
  }, [showMore]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const isDisable = cart[0].length === 0;

  const RemoveAppFromCart = (appId) => {
    cart[0].splice(0, cart[0].length);
    cart[1](cart[0].filter((appli) => appli.identification !== appId));
    if (cart[0].length === 0) {
      handleClose();
    }
  };

  const handleCreatePackButton = () => history.push('/packs/creation');
  const handleDeleteAll = () => {
    cart[0].splice(0, cart[0].length);
    cart[1](cart[0].splice(0, cart[0].length));
    handleClose();
  };

  return (
    <div style={divStyle}>
      <Paper>
        <Box>
          <Badge badgeContent={cart[0].length} color="secondary">
            <IconButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
              color="secondary"
              sx={iconButtonStyle}
              disabled={isDisable}
            >
              <ShoppingBasketIcon fontSize="large" />
            </IconButton>
          </Badge>
        </Box>
      </Paper>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper sx={paperStyle}>
          {cart[0].length
            ? cart[0].map((app) => <AppCardCart key={app.identification} app={app} handleClose={RemoveAppFromCart} />)
            : null}
          <div>
            <Button sx={buttonCreateStyle} variant="contained" disabled={isDisable} onClick={handleCreatePackButton}>
              {i18n.__('components.appCart.createPack')}
            </Button>
            <Tooltip title={i18n.__('components.appCart.deleteAll')}>
              <IconButton variant="contained" disabled={isDisable} onClick={handleDeleteAll} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      </Popover>
    </div>
  );
}

AppCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AppCart;
