import React from 'react';
import i18n from 'meteor/universe:i18n';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';
import { useAppContext } from '../../contexts/context';

const LanguageSwitcher = ({ topbar, relative }) => {
  const allLanguages = i18n.getLanguages();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [{ language }, dispatch] = useAppContext();
  const T = i18n.createComponent('languages');

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const switchLanguage = (lan) => {
    handleClose();
    dispatch({ type: 'language', data: { language: lan } });
  };

  // Styles CSS //
  const switcherStyle = {
    color: 'red',
    marginTop: topbar || relative ? null : 60,
  };
  const flagStyle = {
    height: 20,
    border: '1px solid white',
    borderRadius: '15px',
  };
  // End Styles //

  const flag = (
    <img
      alt={`flag for ${i18n.getLanguageNativeName(language)}`}
      style={flagStyle}
      src={`/images/i18n/${language}.png`}
    />
  );
  return (
    <div style={switcherStyle}>
      {topbar ? (
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          {flag}
        </IconButton>
      ) : (
        <Button
          startIcon={flag}
          variant="contained"
          aria-controls="simple-menu"
          aria-haspopup="true"
          sx={{ backgroundColor: 'primary.purple' }}
          onClick={handleClick}
        >
          <T>{language}</T>
        </Button>
      )}
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {allLanguages.map((lan) => (
          <MenuItem key={lan} onClick={() => switchLanguage(lan)}>
            <T>{lan}</T>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;

LanguageSwitcher.defaultProps = {
  topbar: false, // trigger if the switcher is in the topbar or not
  relative: false, // trigger if the switcher position is absolute or relative
};

LanguageSwitcher.propTypes = {
  topbar: PropTypes.bool,
  relative: PropTypes.bool,
};
