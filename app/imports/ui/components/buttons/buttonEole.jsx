import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

function ButtonEole({ text, style, onClick, disabled }) {
  const buttonStyle = {
    backgroundColor: 'primary.purple',
    color: 'primary.light',
    '&:hover': {
      color: 'primary.purple',
      backgroundColor: 'secondary.main',
    },
    style,
  };

  return (
    <>
      <Button sx={{ ...buttonStyle, ...style }} onClick={onClick} variant="contained" disabled={disabled}>
        {text}
      </Button>
    </>
  );
}

ButtonEole.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.objectOf,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

ButtonEole.defaultProps = {
  style: {},
  onClick: () => {},
  disabled: false,
};

export default ButtonEole;
