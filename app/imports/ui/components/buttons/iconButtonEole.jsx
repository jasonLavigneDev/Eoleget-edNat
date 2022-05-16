import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip, IconButton } from '@mui/material';

function IconButtonEole({ icon, tooltipText, ariaLabel, style, onClick, disabled }) {
  const iconButtonStyle = {
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
      <Tooltip title={tooltipText} aria-label={ariaLabel}>
        <IconButton sx={{ ...iconButtonStyle, ...style }} onClick={onClick} variant="contained" disabled={disabled}>
          {icon}
        </IconButton>
      </Tooltip>
    </>
  );
}

IconButtonEole.propTypes = {
  icon: PropTypes.element.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
  ariaLabel: PropTypes.string,
};

IconButtonEole.defaultProps = {
  style: {},
  onClick: () => {},
  disabled: false,
  tooltipText: '',
  ariaLabel: '',
};

export default IconButtonEole;
