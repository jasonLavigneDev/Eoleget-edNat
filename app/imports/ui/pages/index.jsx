import React, { useState, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Roles } from 'meteor/alanning:roles';

import ListIcon from '@mui/icons-material/ViewList';
import CardIcon from '@mui/icons-material/Dashboard';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { Typography } from '@mui/material';

import AppListPage from '../components/appTable/AppListPage';
import AppCardPage from '../components/appCard/AppCardPage';
import AppCart from '../components/appCart/appCart';

// Styles CSS //
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5%',
  padding: '0 15%',
  marginBottom: '2%',
};
const divStoreTitleStyle = {
  display: 'flex',
  flexDirection: 'row',
};
const spanIconListStyle = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'start',
  flexGrow: 3,
  marginTop: -5,
};
const spanCartStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
};
// End styles //

function Index() {
  const [showModeList, setModeList] = useState(false);

  const cart = useState(() => {
    const saved = localStorage.getItem('cart');
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue;
  });

  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    // update cart in localStorage when it's updated (except for initial load)
    // eslint-disable-next-line no-unused-expressions
    loadingCart ? setLoadingCart(false) : localStorage.setItem('cart', JSON.stringify(cart[0]));
  }, [cart[0]]);

  return (
    <Fade in>
      <div style={divMainStyle}>
        <div style={divStoreTitleStyle}>
          <Typography variant="h4" component="div">
            {i18n.__('pages.Store.storeTitle')}
          </Typography>
          <div style={spanIconListStyle}>
            <span style={spanCartStyle}>
              <AppCart cart={cart} />
            </span>
            <span style={spanIconListStyle}>
              <Tooltip title="Mode liste">
                <IconButton
                  onClick={() => {
                    setModeList(true);
                  }}
                >
                  <ListIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mode carte">
                <IconButton
                  onClick={() => {
                    setModeList(false);
                  }}
                >
                  <CardIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </span>
          </div>
        </div>
        {!showModeList ? <AppCardPage cart={cart} /> : <AppListPage cart={cart} />}
      </div>
    </Fade>
  );
}

export default Index;
