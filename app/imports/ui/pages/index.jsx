import React, { useState, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Roles } from 'meteor/alanning:roles';

import Fade from '@mui/material/Fade';
import { Typography } from '@mui/material';

import AppListPage from '../components/appTable/AppListPage';
import AppCardPage from '../components/appCard/AppCardPage';
import AppCart from '../components/appCart/appCart';
import ToggleButtonEole from '../components/buttons/toggleButtonEole';

// Styles CSS //
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3%',
  padding: '0 15%',
  marginBottom: '2%',
  minWidth: '100%',
};
const divStoreTitleStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: '4%',
};
const spanIconListStyle = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'start',
  flexGrow: 3,
  marginTop: -1,
  marginLeft: 5,
  height: '90%',
};
const spanCartStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
};
// End styles //

function Index() {
  const [viewMode, setViewMode] = useState('card');
  const [total, setTotal] = useState(0);
  const [loadingCart, setLoadingCart] = useState(true);

  const cart = useState(() => {
    const saved = localStorage.getItem('cart');
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue;
  });

  useEffect(() => {
    // update cart in localStorage when it's updated (except for initial load)
    // eslint-disable-next-line no-unused-expressions
    loadingCart ? setLoadingCart(false) : localStorage.setItem('cart', JSON.stringify(cart[0]));
  }, [cart[0]]);

  return (
    <Fade in>
      <div style={divMainStyle}>
        <div style={divStoreTitleStyle}>
          <Typography variant="h4" component="div" sx={{ color: 'primary.main' }}>
            {i18n.__('pages.Store.storeTitle')}({total})
          </Typography>
          <div style={spanIconListStyle}>
            <span style={spanCartStyle}>
              <AppCart cart={cart} />
            </span>
            <span style={spanIconListStyle}>
              <ToggleButtonEole viewMode={viewMode} setViewMode={setViewMode} />
            </span>
          </div>
        </div>
        {viewMode === 'card' ? (
          <AppCardPage cart={cart} setTotal={setTotal} />
        ) : (
          <AppListPage cart={cart} setTotal={setTotal} />
        )}
      </div>
    </Fade>
  );
}

export default Index;
