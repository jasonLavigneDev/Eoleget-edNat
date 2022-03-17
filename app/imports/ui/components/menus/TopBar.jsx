import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import MenuBar from './MenuBar';
import MainMenu from './MainMenu';
import { useAppContext } from '../../contexts/context';

// Styles CSS //
const appBarStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 16,
  paddingRight: 16,
  minHeight: 48,
};
const imgLogoStyle = {
  maxHeight: '40px',
  paddingTop: '5px',
  height: 40,
  outline: 'none',
};
const divRightContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItem: 'center',
  height: 48,
};
// End styles //

const SMALL_LOGO = 'puceEOLE.png';
const LONG_LOGO = 'logoEole.png';

function TopBar() {
  const [{ isMobile, user }] = useAppContext();
  const LOGO = `/images/${isMobile ? SMALL_LOGO : LONG_LOGO}`;

  return (
    <AppBar position="fixed" color="tertiary" sx={appBarStyle}>
      <Link to="/" sx={imgLogoStyle}>
        <img src={LOGO} style={imgLogoStyle} alt="Logo" />
      </Link>

      {!isMobile && !!user && <MenuBar />}
      {!!user && (
        <div style={divRightContainerStyle}>
          <MainMenu user={user} />
        </div>
      )}
    </AppBar>
  );
}

export default TopBar;
