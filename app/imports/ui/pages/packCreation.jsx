import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';

import { useHistory } from 'react-router-dom';

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
import ColorRadioButton from '../components/packCreation/colorRadioButton';
import TableAppCreatePack from '../components/appTable/tableAppCreatePack';
import { useAppContext } from '../contexts/context';
import PackIconPicker from '../components/packs/PackIconPicker';

// Style CSS //
const containerStyle = {
  marginTop: '1%',
};
const divDatagridStyle = {
  maxHeight: 400,
  width: '90%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 10,
  marginBottom: 50,
};
const divButtonStyle = {
  marginTop: 40,
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

function CreatePackPage() {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [{ user }] = useAppContext();
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('/images/packs/packs-000.png');
  const [values, setValues] = React.useState(0);
  const [valuesName, setValuesName] = React.useState(0);

  const isDisable = !!(name === undefined || name === '' || description === undefined || description === '');

  const onUpdateName = (event) => {
    setName(event.target.value);
    setValuesName(event.target.value.length);
  };

  const onUpdateDescription = (event) => {
    setDescription(event.target.value);
    setValues(event.target.value.length);
  };

  const history = useHistory();

  const createPack = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const date = today.toUTCString();
    const color = JSON.parse(localStorage.getItem('color'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) msg.error(i18n.__('api.packs.emptyPack'));
    else {
      const apps = [];
      cart.map((app) => {
        localStorage.removeItem(`version_${app.identification}`);
        let ver = JSON.parse(localStorage.getItem(`version_edit_${app.identification}`)) || app.version;
        if (ver === 'latest') ver = '';

        localStorage.removeItem(`version_edit_${app.identification}`);
        return apps.push({
          identification: app.identification,
          nom: app.nom,
          description: app.description,
          version: ver,
        });
      });
      Meteor.call(
        'packs.createPack',
        {
          name,
          applications: apps,
          creationDate: date,
          isValidated: true,
          description,
          color,
          icon,
          isPublic,
          ownerName: user.username,
        },
        (err) => {
          if (err) msg.error(err.reason);
          else {
            msg.success(i18n.__('pages.packCreation.createPackSuccess'));
            cart[0] = [];
            localStorage.removeItem('cart');
            history.push('/packs');
          }
        },
      );
    }
  };

  const goBack = () => {
    history.goBack();
  };

  const handleOnChange = () => {
    setIsPublic(!isPublic);
  };

  return (
    <Fade in>
      <Container sx={containerStyle}>
        <Typography variant="h3" component="div">
          {i18n.__('pages.packCreation.title')}
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
                      {i18n.__('pages.packCreation.packName')}&nbsp;
                      {valuesName !== 0 ? `${valuesName}/32` : null}
                    </div>
                  }
                  name="packName"
                  type="text"
                  variant="outlined"
                  onChange={onUpdateName}
                  inputProps={{ maxLength: 32 }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="packDescription"
                  label={
                    <div>
                      {i18n.__('pages.packCreation.packDescription')}&nbsp; {values !== 0 ? `${values}/512` : null}
                    </div>
                  }
                  name="packDescription"
                  type="text"
                  variant="outlined"
                  multiline
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
              sx={{ marginTop: -8 }}
            />
            <Divider />
            <Typography variant="h6" component="div">
              {i18n.__('pages.packCreation.color')}
            </Typography>
            <ColorRadioButton packColor="" />
            <Divider />
            <div style={divDatagridStyle}>
              <TableAppCreatePack />
            </div>
            <div style={divButtonStyle}>
              <Button variant="contained" onClick={goBack}>
                {i18n.__('pages.packCreation.delete')}
              </Button>
              <Button variant="contained" onClick={createPack} disabled={isDisable}>
                {i18n.__('pages.packCreation.add')}
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Fade>
  );
}

export default CreatePackPage;
