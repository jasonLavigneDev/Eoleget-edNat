import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useAppContext } from '../../contexts/context';
import UserAvatarGallery from './UserAvatarGallery';
import UserAvatar from './UserAvatar';

// Styles CSS //
const buttonWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
};
// End Styles //

const AvatarPicker = ({ userAvatar, userFirstName, onAssignAvatar }) => {
  const [{ isMobile }] = useAppContext();
  const [openAvatarGallery, setOpenAvatarGallery] = useState(false);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sx={buttonWrapperStyle}>
          <Tooltip title={i18n.__('pages.ProfilePage.useGallery')} aria-label={i18n.__('pages.ProfilePage.useGallery')}>
            <IconButton onClick={() => setOpenAvatarGallery(true)}>
              {isMobile ? (
                <UserAvatar userAvatar={userAvatar || ''} userFirstName={userFirstName || ''} />
              ) : (
                <UserAvatar big userAvatar={userAvatar || ''} userFirstName={userFirstName || ''} />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {openAvatarGallery ? (
        <UserAvatarGallery
          open={openAvatarGallery}
          onClose={() => setOpenAvatarGallery(false)}
          onSendImage={onAssignAvatar}
        />
      ) : null}
    </div>
  );
};

AvatarPicker.propTypes = {
  userAvatar: PropTypes.string.isRequired,
  userFirstName: PropTypes.string.isRequired,
  onAssignAvatar: PropTypes.func.isRequired,
};

export default AvatarPicker;
