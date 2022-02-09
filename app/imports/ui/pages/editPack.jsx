import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import {
  Button,
  Container,
  Fade,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import Spinner from '../components/system/Spinner';
import ColorRadioButton from '../components/packCreation/colorRadioButton';
import Packs from '../../api/packs/packs';
import TableAppPack from '../components/appTable/tableAppEditPack';

// Style CSS //
const containerStyle = {
  marginTop: '5%',
};
const divDatagridStyle = {
  height: 400,
  width: '90%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 10,
};
const divButtonStyle = {
  marginTop: 10,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};
const paperStyle = {
  paddingLeft: 5,
  paddingRight: 5,
  paddingBottom: 2,
};
// End Style //

const EditPackPage = ({ pack, ready }) => {
  if (!ready) return <Spinner full />;

  const history = useHistory();
  const [name, setName] = useState(pack.name);
  const [isPublic, setIsPublic] = useState(pack.isPublic);
  const [description, setDescription] = useState(pack.description);
  const apps = pack.applications;

  const isDisable = !!(name === undefined || name === '' || description === undefined || description === '');

  const onUpdateName = (event) => {
    setName(event.target.value);
  };

  const onUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  const goBack = () => {
    history.push('/packs');
  };

  const editPack = () => {
    const finalApps = [];
    const editApps = JSON.parse(localStorage.getItem('editApplications'));
    editApps.map((app) => {
      let ver = JSON.parse(localStorage.getItem(`version_edit_${app.identification}`)) || app.version;
      if (ver === 'latest') ver = '';

      localStorage.removeItem(`version_edit_${app.identification}`);

      return finalApps.push({
        nom: app.nom,
        description: app.description,
        identification: app.identification,
        version: ver,
      });
    });
    const color = JSON.parse(localStorage.getItem('color'));
    Meteor.call(
      'packs.updatePack',
      { _id: pack._id, name, applications: finalApps, description, color, isPublic },
      (err) => {
        if (err) msg.error(err.reason);
        else {
          msg.success(i18n.__('pages.packEditPage.updateSuccess'));
          localStorage.removeItem('cart_edit');
          localStorage.removeItem('editApplications');
        }
      },
    );
  };

  const handleOnChange = () => {
    setIsPublic(!isPublic);
  };

  return !ready ? (
    <Spinner full />
  ) : (
    <Fade in>
      <Container sx={containerStyle}>
        <Typography variant="h3" component="div">
          {i18n.__('pages.packEditPage.title')}
        </Typography>
        <Paper sx={paperStyle}>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              id="packName"
              label={i18n.__('pages.packEditPage.packName')}
              name="packName"
              type="text"
              variant="outlined"
              value={name}
              onChange={onUpdateName}
            />
            <TextField
              fullWidth
              margin="normal"
              id="packDescription"
              label={i18n.__('pages.packEditPage.packDescription')}
              name="packDescription"
              type="text"
              variant="outlined"
              multiline
              value={description}
              inputProps={{ maxLength: 512 }}
              onChange={onUpdateDescription}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={i18n.__('pages.packEditPage.packPublic')}
              checked={isPublic}
              onChange={handleOnChange}
              labelPlacement="start"
            />
            <Divider />
            <Typography variant="h6" component="div">
              {i18n.__('pages.packEditPage.color')}
            </Typography>
            <ColorRadioButton pack={pack} />
            <Divider />
            <div style={divDatagridStyle}>
              <TableAppPack applications={apps} />
            </div>
            <div style={divButtonStyle}>
              <Button variant="contained" onClick={editPack} disabled={isDisable}>
                {i18n.__('pages.packEditPage.edit')}
              </Button>
              <Button variant="contained" onClick={goBack}>
                {i18n.__('pages.packEditPage.back')}
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Fade>
  );
};

export default withTracker(
  ({
    match: {
      params: { _id },
    },
  }) => {
    const subPack = Meteor.subscribe('packs.single', { _id });
    const pack = Packs.findOne(_id);

    const ready = subPack.ready();
    return {
      pack,
      ready,
    };
  },
)(EditPackPage);

EditPackPage.propTypes = {
  pack: PropTypes.objectOf(PropTypes.any),
  ready: PropTypes.bool.isRequired,
};

EditPackPage.defaultProps = {
  pack: {},
};
