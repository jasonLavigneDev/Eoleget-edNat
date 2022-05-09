import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import MenuBar from './MenuBar';
import MainMenu from './MainMenu';
import { useAppContext } from '../../contexts/context';

// Styles CSS //
const appBarStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '15%',
  paddingRight: '15%',
  minHeight: 75,
  boxShadow: 'none',
  backgroundColor: '#F9F9FD',
};
const imgLogoStyle = {
  maxHeight: '60px',
  paddingTop: '5px',
  outline: 'none',
};
const divRightContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItem: 'center',
  height: 75,
  borderRadius: '10px',
  paddingLeft: '20px',
  paddingRight: '20px',
};
// End styles //

const SMALL_LOGO = 'puce_eole.png';
const LONG_LOGO = 'Logo-09.png';

function TopBar() {
  const [{ isMobile, user }] = useAppContext();
  const LOGO = `/images/${isMobile ? SMALL_LOGO : LONG_LOGO}`;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="fixed" sx={appBarStyle}>
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
    </Slide>
  );
}

export default TopBar;
