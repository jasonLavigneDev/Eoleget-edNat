import React, { useState } from 'react';
import { IconButton, Collapse, Paper, Box, Divider, Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import AppCardCart from './appCartCard';

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  position: 'fixed',
  left: 10,
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
};

function AppCart({ cart }) {
  const [showMore, setShowMore] = useState(false);
  const history = useHistory();
  React.useEffect(() => {
    setShowMore(showMore);
  }, [showMore]);

  const mapList = (func) => cart[0].map(func);

  const isDisable = cart[0].lenght > 0;

  const handleCreatePackButton = () => history.push('/packs/creation');

  return (
    <div style={divStyle}>
      <Box>
        <IconButton
          onClick={() => {
            setShowMore(!showMore);
          }}
          color="secondary"
          sx={iconButtonStyle}
        >
          <ShoppingBasketIcon fontSize="large" />
        </IconButton>
        <Collapse in={showMore} orientation="horizontal" unmountOnExit>
          <Paper sx={paperStyle}>
            {mapList((app) => (
              <AppCardCart app={app} cart={cart} />
            ))}
            <Divider />
            <Button sx={buttonCreateStyle} variant="contained" disabled={isDisable} onClick={handleCreatePackButton}>
              {' '}
              {i18n.__('components.appCart.createPack')}
            </Button>
          </Paper>
        </Collapse>
      </Box>
    </div>
  );
}

AppCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AppCart;
