import React from 'react';
import PropTypes from 'prop-types';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ListIcon from '@mui/icons-material/ViewList';
import CardIcon from '@mui/icons-material/Dashboard';
import Tooltip from '@mui/material/Tooltip';

const toggleButtonStyle = {
  color: 'primary.purple',
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'orange',
    backgroundColor: 'primary.purple',
    cursor: 'default',
  },
  '&:hover': {
    backgroundColor: 'secondary.main',
  },
};

function ToggleButtonEole({ viewMode, setViewMode }) {
  return (
    <>
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
    </>
  );
}

ToggleButtonEole.propTypes = {
  viewMode: PropTypes.string.isRequired,
  setViewMode: PropTypes.func.isRequired,
};

export default ToggleButtonEole;
