import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useHistory } from 'react-router-dom';

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
  let data = [];

  const getVersion = (app) => {
    return app.version || 'latest';
  };

  let _id = 0;
  cart[0].map((app) => {
    _id += 1;
    return data.push({
      id: _id,
      appName: app.nom,
      description: app.description,
      identification: app.identification,
      version: getVersion(app),
    });
  });

  const [rows, setRows] = useState(data);

  const reloadData = () => {
    data = [];
    _id = 0;
    cart[0].map((app) => {
      _id += 1;
      return data.push({
        id: _id,
        appName: app.nom,
        description: app.description,
        identification: app.identification,
        version: getVersion(app),
      });
    });
    setRows(data);
  };

  const deleteAppFromCart = (e) => {
    if (e.row.id > -1) {
      cart[0].splice(e.row.id - 1, 1);
    }

    reloadData();

    localStorage.setItem('cart', JSON.stringify(cart[0]));
  };

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
      title: 'identification',
      field: 'identification',
      editable: 'never',
      hide: true,
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
      renderCell: (cellValues) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          deleteAppFromCart(cellValues);
        };
        return (
          <IconButton onClick={onClick}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const isDisable = !!(name === undefined || name === '' || description === undefined || description === '');

  const onUpdateName = (event) => {
    setName(event.target.value);
  };

  const onUpdateDescription = (event) => {
    setDescription(event.target.value);
  };

  const history = useHistory();

  const createPack = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const date = today.toUTCString();
    const color = JSON.parse(localStorage.getItem('color'));
    const apps = [];
    cart[0].map((app) => {
      localStorage.removeItem(`version_${app.identification}`);
      return apps.push(app);
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
      },
      (err) => {
        if (err) msg.error(err.reason);
        else {
          msg.success(i18n.__('pages.packCreation.createPackSuccess'));
          cart[0] = [];
          localStorage.removeItem('cart');
          history.push('/packs');
          window.location.reload();
        }
      },
    );
  };
  const goBack = () => {
    history.push('/');
    window.location.reload();
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
              inputProps={{ maxLength: 32 }}
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
              <DataGrid hideFooterPagination columns={columns} rows={rows} />
            </div>
            <div style={divButtonStyle}>
              <Button variant="contained" onClick={createPack} disabled={isDisable}>
                {i18n.__('pages.packCreation.add')}
              </Button>
              <Button variant="contained" onClick={goBack}>
                {i18n.__('pages.packCreation.delete')}
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Fade>
  );
}

export default CreatePackPage;
