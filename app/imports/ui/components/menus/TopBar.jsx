import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import MenuBar from './MenuBar';
import MainMenu from './MainMenu';
import { useAppContext } from '../../contexts/context';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: 48,
  },
  imgLogo: {
    maxHeight: '30px',
    height: 30,
    outline: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItem: 'center',
    height: 48,
  },
}));

const SMALL_LOGO = 'puceEOLE.png';
const LONG_LOGO = 'logoEole.png';

function TopBar() {
  const [{ isMobile, user }] = useAppContext();
  const classes = useStyles();
  const LOGO = `/images/${isMobile ? SMALL_LOGO : LONG_LOGO}`;

  return (
    <AppBar position="fixed" className={classes.root} color="tertiary" sx={{ display: 'flex', flexDirection: 'row' }}>
      <Link to="/" className={classes.imgLogo}>
        <img src={LOGO} className={classes.imgLogo} alt="Logo" />
      </Link>

      {!isMobile && !!user && <MenuBar />}
      {!!user && (
        <div className={classes.rightContainer}>
          <MainMenu user={user} />
        </div>
      )}
    </AppBar>
  );
}

export default TopBar;
