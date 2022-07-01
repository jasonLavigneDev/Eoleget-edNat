import React, { useState, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Roles } from 'meteor/alanning:roles';

import Fade from '@mui/material/Fade';
import { Typography } from '@mui/material';

import PackListPage from '../components/packTable/packListPage';
import PackCardPage from '../components/packsCard/packCardPage';
import ToggleButtonEole from '../components/buttons/toggleButtonEole';

// Styles CSS //
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3%',
  padding: '0 10%',
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
  marginTop: -1,
  marginLeft: 5,
  height: '90%',
};
// End styles //

function Packs() {
  const [viewMode, setViewMode] = useState('card');
  const [total, setTotal] = useState(0);

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
          <Typography variant="h4" component="div" color="primary">
            {i18n.__('pages.Packs.packsStoreTitle')} ({total})
          </Typography>
          <span style={spanIconListStyle}>
            <ToggleButtonEole viewMode={viewMode} setViewMode={setViewMode} />
          </span>
        </div>
        {viewMode === 'card' ? <PackCardPage setTotal={setTotal} /> : <PackListPage setTotal={setTotal} />}
      </div>
    </Fade>
  );
}

export default Packs;
