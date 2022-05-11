import React, { useState, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
// import { Roles } from 'meteor/alanning:roles';

import ListIcon from '@mui/icons-material/ViewList';
import CardIcon from '@mui/icons-material/Dashboard';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { Typography } from '@mui/material';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import PackListPage from '../components/packTable/packListPage';
import PackCardPage from '../components/packsCard/packCardPage';

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
const toggleButtonStyle = {
  color: 'primary.purple',
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'orange',
    backgroundColor: 'primary.purple',
  },
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
            {i18n.__('pages.Packs.packsStoreTitle')}({total})
          </Typography>
          <span style={spanIconListStyle}>
            <ToggleButtonGroup value={viewMode} exclusive>
              <ToggleButton
                value="card"
                onClick={() => {
                  setViewMode('card');
                }}
                sx={toggleButtonStyle}
              >
                <Tooltip title="Mode carte">
                  <CardIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton
                value="list"
                onClick={() => {
                  setViewMode('list');
                }}
                sx={toggleButtonStyle}
              >
                <Tooltip title="Mode liste">
                  <ListIcon />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </span>
        </div>
        {viewMode === 'card' ? <PackCardPage setTotal={setTotal} /> : <PackListPage setTotal={setTotal} />}
      </div>
    </Fade>
  );
}

export default Packs;
