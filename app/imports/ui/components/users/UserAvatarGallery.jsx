/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { useAppContext } from '../../contexts/context';
import IconButtonEole from '../buttons/iconButtonEole';

const UserAvatarGallery = ({ open, onClose, onSendImage }) => {
  const [{ isMobile }] = useAppContext();

  // Styles CSS //
  const cardStyle = {
    width: '100%',
  };
  const paperStyle = {
    overflow: 'auto',
    position: 'absolute',
    width: isMobile ? '95%' : '50%',
    maxHeight: '100%',
    top: isMobile ? 0 : '50%',
    left: isMobile ? '2.5%' : '50%',
    transform: isMobile ? 'translateY(50%)' : 'translate(-50%, -50%)',
  };
  // End styles //

  const avImages = () => {
    const images = [];
    for (let i = 1; i < 257; i += 1) {
      images.push(`/images/avatar/avatar-${i.toString().padStart(3, '0')}.svg`);
    }
    return images;
  };

  const onLocalSendImage = (src) => {
    onSendImage({ url: Meteor.absoluteUrl(src) });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={paperStyle}>
        <Card sx={cardStyle}>
          <CardHeader
            title={i18n.__('components.UserAvatarGallery.title')}
            subheader={i18n.__('components.UserAvatarGallery.subtitle')}
            action={
              <IconButtonEole
                icon={<ClearIcon />}
                onClick={onClose}
                style={{ backgroundColor: 'none', color: 'primary.purple' }}
              />
            }
          />
          <CardContent>
            <Grid container>
              {avImages().map((src) => (
                <Grid item key={src}>
                  <Button onClick={() => onLocalSendImage(src)} onKeyDown={() => onLocalSendImage(src)}>
                    <img alt="" src={src} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                  </Button>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            Icons made by
            <a href="https://www.flaticon.com/authors/flat-icons"> Flat Icons </a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon">
              {' '}
              www.flaticon.com
            </a>
          </Typography>
        </Card>
      </div>
    </Modal>
  );
};

UserAvatarGallery.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSendImage: PropTypes.func.isRequired,
};

export default UserAvatarGallery;
