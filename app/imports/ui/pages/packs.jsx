import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import ListIcon from '@mui/icons-material/ViewList';
import CardIcon from '@mui/icons-material/Dashboard';

import PackListPage from '../components/packsCard/packCardPage';
import PackCardPage from '../components/packTable/packListPage';

// Styles CSS //
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  marginTop: '5%',
  padding: '0 10%',
  marginBottom: '2%',
};
const divPackTitleContainerStyle = {
  minWidth: '100%',
};
const divPackTitleContentStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};
const spanIconListStyle = {
  display: 'flex',
  flexDirection: 'row-reverse',
  width: '100%',
};
// End styles //

function PackPage() {
  const [showModeList, setModeList] = useState(false);

  return (
    <Fade in>
      <div style={divMainStyle}>
        <div style={divPackTitleContainerStyle}>
          <div style={divPackTitleContentStyle}>
            <Typography variant="h4" component="div">
              {i18n.__('pages.Packs.packsStoreTitle')}
            </Typography>
          </div>
          <span style={spanIconListStyle}>
            <Tooltip title="Mode liste">
              <IconButton
                onClick={() => {
                  setModeList(true);
                }}
              >
                <ListIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mode carte">
              <IconButton
                onClick={() => {
                  setModeList(false);
                }}
              >
                <CardIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </span>
          <div>{showModeList ? <PackCardPage /> : <PackListPage />}</div>
        </div>
      </div>
    </Fade>
  );
}

export default PackPage;
