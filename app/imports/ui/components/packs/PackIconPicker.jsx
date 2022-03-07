import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useAppContext } from '../../contexts/context';
import PacksIconGallery from './PackIconGallery';
import PackIcon from './PackIcon';

// Styles CSS //
const buttonWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
};
// End Styles //

const PackIconPicker = ({ packIcon, onAssignIcon }) => {
  const [{ isMobile }] = useAppContext();
  const [openAvatarGallery, setOpenAvatarGallery] = useState(false);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sx={buttonWrapperStyle}>
          <Tooltip title={i18n.__('pages.ProfilePage.useGallery')} aria-label={i18n.__('pages.ProfilePage.useGallery')}>
            <IconButton onClick={() => setOpenAvatarGallery(true)}>
              {isMobile ? <PackIcon icon={packIcon || ''} /> : <PackIcon big icon={packIcon || ''} />}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {openAvatarGallery ? (
        <PacksIconGallery
          open={openAvatarGallery}
          onClose={() => setOpenAvatarGallery(false)}
          onSendImage={onAssignIcon}
        />
      ) : null}
    </div>
  );
};

PackIconPicker.defaultProps = {
  packIcon: '',
};

PackIconPicker.propTypes = {
  packIcon: PropTypes.string,
  onAssignIcon: PropTypes.func.isRequired,
};

export default PackIconPicker;
