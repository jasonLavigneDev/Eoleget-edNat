import React from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import ButtonEole from '../buttons/buttonEole';

const primaryMain = 'primary.main';
const root = {
  width: '100%',
  border: '2px solid',
  borderColor: primaryMain,
  borderRadius: '10px',
};
const actions = {
  display: 'flex',
  justifyContent: 'center',
};
const paper = {
  overflow: 'auto',
  position: 'absolute',
  width: '35%',
  maxHeight: '100%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
const buttonDelete = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 10,
};

const PackDelete = ({ pack, open, onClose }) => {
  const deletePack = () => {
    Meteor.call('packs.removePack', { packId: pack._id }, (err) => {
      if (err) msg.error(err.reason);
      else msg.success(i18n.__('components.packDelete.deleteSuccess'));
      onClose();
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={paper}>
        <Card sx={root}>
          <CardHeader
            title={i18n.__('components.packDelete.title')}
            action={
              <IconButton onClick={onClose}>
                <ClearIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography>{i18n.__('components.packDelete.mainText')}</Typography>
          </CardContent>
          <CardActions sx={actions}>
            <div style={buttonDelete}>
              <ButtonEole
                style={{ marginRight: 10 }}
                onClick={onClose}
                text={i18n.__('components.packDelete.cancel')}
              />
              <ButtonEole onClick={deletePack} text={i18n.__('components.packDelete.validateForm')} />
            </div>
          </CardActions>
        </Card>
      </div>
    </Modal>
  );
};

PackDelete.propTypes = {
  pack: PropTypes.objectOf(PropTypes.any).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PackDelete;
