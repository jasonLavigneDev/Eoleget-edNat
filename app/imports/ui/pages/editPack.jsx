import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Container, Fade, Paper, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';

import Spinner from '../components/system/Spinner';
import ColorRadioButton from '../components/packCreation/colorRadioButton';
import Packs from '../../api/packs/packs';
import TableAppEditPack from '../components/appTable/tableAppEditPack';
import PackIconPicker from '../components/packs/PackIconPicker';
import ButtonEole from '../components/buttons/buttonEole';

// Style CSS //
const mainBlue = 'primary.main';
const mainOrange = 'secondary.main';
const containerStyle = {
  marginTop: '3%',
};
const divDatagridStyle = {
  maxHeight: 400,
  width: '90%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 10,
  marginBottom: 10,
};
const divButtonStyle = {
  marginTop: 200,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};
const paperStyle = {
  paddingLeft: 5,
  paddingRight: 5,
  paddingBottom: 2,
  border: '2px solid black',
  borderColor: mainOrange,
};
// End Style //

const EditPackPage = ({ pack, ready }) => {
  if (!ready) return <Spinner full />;
  const [values, setValues] = React.useState(pack.description ? pack.description.length : 0);
  const [valuesName, setValuesName] = React.useState(pack.name ? pack.name.length : 0);
  const history = useHistory();
  const [name, setName] = useState(pack.name);
  const [isPublic, setIsPublic] = useState(pack.isPublic);
  const [description, setDescription] = useState(pack.description);
  const [icon, setIcon] = useState(pack.icon || '/images/packs/packs-000.png');

  const isDisable = !!(name === undefined || name === '' || description === undefined || description === '');

  const onUpdateName = (event) => {
    setName(event.target.value);
    setValuesName(event.target.value.length);
  };

  const onUpdateDescription = (event) => {
    setDescription(event.target.value);
    setValues(event.target.value.length);
  };

  const data = [];
  let _id = -1;
  pack.applications.map((app) => {
    localStorage.setItem(`version_edit_${app.identification}`, JSON.stringify(app.version));
    _id += 1;
    return data.push({
      id: _id,
      nom: app.nom,
      description: app.description,
      identification: app.identification,
      version: app.version,
    });
  });

  localStorage.setItem('cart_edit', JSON.stringify(data));

  const goBack = () => {
    history.goBack();
  };

  const editPack = () => {
    const finalCart = JSON.parse(localStorage.getItem('cart_edit'));
    if (finalCart) {
      const finalApps = [];
      finalCart.map((app) => {
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
        { _id: pack._id, name, applications: finalApps, description, color, icon, isPublic },
        (err) => {
          if (err) msg.error(err.reason);
          else msg.success(i18n.__('pages.packEditPage.updateSuccess'));
        },
      );
    } else {
      msg.error(i18n.__('api.packs.emptyPacks'));
    }
  };

  const handleOnChange = () => {
    setIsPublic(!isPublic);
  };

  return (
    <Fade in>
      <Container sx={containerStyle}>
        <Typography variant="h3" component="div" sx={{ color: mainBlue }}>
          {i18n.__('pages.packEditPage.title')}
        </Typography>
        <Paper sx={paperStyle}>
          <form noValidate autoComplete="off">
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginRight: 40 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  id="packName"
                  label={
                    <div>
                      {i18n.__('pages.packEditPage.packName')}&nbsp;
                      {valuesName !== 0 ? `${valuesName}/32` : null}
                    </div>
                  }
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
                  label={
                    <div>
                      {i18n.__('pages.packEditPage.packDescription')}&nbsp;
                      {values !== 0 ? `${values}/512` : null}
                    </div>
                  }
                  name="packDescription"
                  type="text"
                  variant="outlined"
                  multiline
                  value={description}
                  inputProps={{ maxLength: 512 }}
                  onChange={onUpdateDescription}
                />
              </div>
              <PackIconPicker packIcon={icon} onAssignIcon={setIcon} />
            </div>
            <FormControlLabel
              control={<Checkbox />}
              label={i18n.__('pages.packCreation.packPublic')}
              checked={isPublic}
              onChange={handleOnChange}
              labelPlacement="start"
              sx={{ marginTop: -1 }}
            />
            <Typography variant="h6" component="div">
              {i18n.__('pages.packEditPage.color')}
            </Typography>
            <ColorRadioButton packColor={pack.color} />
            <div style={divDatagridStyle}>
              <TableAppEditPack />
            </div>
            <div style={divButtonStyle}>
              <ButtonEole onClick={goBack} text={i18n.__('pages.packEditPage.back')} />
              <ButtonEole onClick={editPack} disabled={isDisable} text={i18n.__('pages.packEditPage.edit')} />
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
