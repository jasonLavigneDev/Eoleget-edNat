import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';

import {
  Button,
  IconButton,
  Container,
  Fade,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import ColorRadioButton from '../components/packCreation/colorRadioButton';

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

function CreatePackPage() {
  const cart = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('cart');
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue;
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const columns = [
    {
      title: 'id',
      field: 'id',
      editable: 'never',
      hide: true,
    },
    {
      title: i18n.__('components.AppList.application'),
      field: 'appName',
      editable: 'never',
      width: 250,
    },
    {
      title: i18n.__('components.AppList.description'),
      field: 'description',
      width: 500,
    },
    {
      title: i18n.__('components.AppList.version'),
      field: 'version',
      width: 100,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: () => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
        };
        return (
          <IconButton onClick={onClick}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const data = [];
  let _id = 0;
  cart[0].map((app) => {
    _id += 1;
    return data.push({
      id: _id,
      appName: app.nom,
      description: app.description,
      identification: app.identification,
      version: app.versions[0],
    });
  });

  const isDisable = !!(name === undefined || name === '' || description === undefined || description === '');

  const dataId = data.map((app) => app.identification);

  const onUpdateName = (event) => {
    setName(event.target.value);
  };

  const onUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  const createPack = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const date = today.toUTCString();
    Meteor.call(
      'packs.createPack',
      { name, applications: dataId, creationDate: date, isValidated: true, description },
      (err) => {
        if (err) console.log(err);
      },
    );
  };

  return (
    <Fade in>
      <Container sx={containerStyle}>
        <Typography variant="h3" component="div">
          {i18n.__('pages.packCreation.title')}
        </Typography>
        <Paper sx={paperStyle}>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              id="packName"
              label={i18n.__('pages.packCreation.packName')}
              name="packName"
              type="text"
              variant="outlined"
              onChange={onUpdateName}
            />
            <TextField
              fullWidth
              margin="normal"
              id="packDescription"
              label={i18n.__('pages.packCreation.packDescription')}
              name="packDescription"
              type="text"
              variant="outlined"
              multiline
              inputProps={{ maxLength: 512 }}
              onChange={onUpdateDescription}
            />
            <FormControlLabel control={<Checkbox />} label="isPublic" labelPlacement="start" />
            <Divider />
            <Typography variant="h6" component="div">
              {i18n.__('pages.packCreation.color')}
            </Typography>
            <ColorRadioButton />
            <Divider />
            <div style={divDatagridStyle}>
              <DataGrid hideFooterPagination columns={columns} rows={data} />
            </div>
            <div style={divButtonStyle}>
              <Button variant="contained" onClick={createPack} disabled={isDisable}>
                {i18n.__('pages.packCreation.add')}
              </Button>
              <Button variant="contained">{i18n.__('pages.packCreation.delete')}</Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Fade>
  );
}

export default CreatePackPage;
