import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import ListIcon from '@mui/icons-material/ViewList';
import CardIcon from '@mui/icons-material/Dashboard';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import PackListPage from '../components/packTable/packListPage';
import PackCardPage from '../components/packsCard/packCardPage';

// Styles CSS //
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  marginTop: '3%',
  padding: '0 10%',
  marginBottom: '2%',
};
const divPackTitleContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
};
const divPackContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: '3%',
};
const spanIconListStyle = {
  display: 'flex',
  flexDirection: 'row-reverse',
  marginTop: -10,
  marginLeft: 5,
};
// End styles //

function PackPage() {
  const [viewMode, setViewMode] = useState('card');

  const [total, setTotal] = useState(0);

  return (
    <Fade in>
      <div style={divMainStyle}>
        <div style={divPackContainerStyle}>
          <div style={divPackTitleContainerStyle}>
            <Typography variant="h4" component="div" sx={{ color: 'primary.purple' }}>
              {i18n.__('pages.UserPacks.userPacksTitle')}({total})
            </Typography>
          </div>
          <span style={spanIconListStyle}>
            <ToggleButtonGroup value={viewMode} exclusive>
              <ToggleButton
                value="card"
                onClick={() => {
                  setViewMode('card');
                }}
              >
                <Tooltip title="Mode carte">
                  <CardIcon fontSize="large" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton
                value="list"
                onClick={() => {
                  setViewMode('list');
                }}
              >
                <Tooltip title="Mode liste">
                  <ListIcon fontSize="large" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </span>
        </div>
        {viewMode === 'card' ? (
          <PackCardPage isUserPack setTotal={setTotal} />
        ) : (
          <PackListPage isUserPack setTotal={setTotal} />
        )}
      </div>
    </Fade>
  );
}

export default PackPage;
