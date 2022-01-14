import React, { useState } from 'react';
import { IconButton, Collapse, Paper, Box, Divider, Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
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

export default function AppCart() {
  const [showMore, setShowMore] = useState(false);
  React.useEffect(() => {
    setShowMore(showMore);
  }, [showMore]);

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
            <AppCardCart />
            <AppCardCart />
            <AppCardCart />
            <AppCardCart />
            <AppCardCart />
            <Divider />
            <Button sx={buttonCreateStyle} variant="contained">
              {' '}
              Creer le pack
            </Button>
          </Paper>
        </Collapse>
      </Box>
    </div>
  );
}
