import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';

import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';

import PackListPage from '../components/packTable/packListPage';
import PackCardPage from '../components/packsCard/packCardPage';
import ToggleButtonEole from '../components/buttons/toggleButtonEole';

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
  marginTop: -1,
  marginLeft: 5,
  height: '90%',
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
              {i18n.__('pages.UserPacks.userPacksTitle')} ({total})
            </Typography>
          </div>
          <span style={spanIconListStyle}>
            <ToggleButtonEole viewMode={viewMode} setViewMode={setViewMode} />
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
