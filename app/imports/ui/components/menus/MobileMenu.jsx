import React from 'react';
import AppBar from '@mui/material/AppBar';
import MenuBar from './MenuBar';

// Styles CSS //
const appBarStyle = {
  backgroundColor: 'tertiary.main',
  bottom: 0,
  top: 'auto',
};
// End styles //

const MobileMenu = () => {
  return (
    <AppBar position="fixed" sx={appBarStyle}>
      <MenuBar mobile />
    </AppBar>
  );
};

export default MobileMenu;
