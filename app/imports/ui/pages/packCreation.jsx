import React from 'react';

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
import ColorRadioButton from '../components/colorRadioButton';

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
  const columns = [
    {
      title: 'id',
      field: 'id',
      editable: 'never',
      hide: true,
    },
    {
      title: 'appName',
      field: 'appName',
      editable: 'never',
      width: 250,
    },
    {
      title: 'description',
      field: 'description',
      width: 500,
    },
    {
      title: 'version',
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

  const data = [
    {
      id: 1,
      appName: 'app1',
      description: 'Lorem ipsum dolor sit amet consectetur',
      version: 'V0.0.01',
    },
  ];

  return (
    <Fade in>
      <Container sx={containerStyle}>
        <Typography variant="h3" component="div">
          Création du pack
        </Typography>
        <Paper sx={paperStyle}>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              id="packName"
              label="nomDuPack"
              name="packName"
              type="text"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              id="packDescription"
              label="descriptionPack"
              name="packDescription"
              type="text"
              variant="outlined"
              multiline
              rows={4}
              maxRows={4}
              inputProps={{ maxLength: 512 }}
            />
            <FormControlLabel control={<Checkbox />} label="isPublic" labelPlacement="start" />
            <Divider />
            <Typography variant="h6" component="div">
              Couleur du pack
            </Typography>
            <ColorRadioButton />
            <Divider />
            <div style={divDatagridStyle}>
              <DataGrid hideFooterPagination columns={columns} rows={data} />
            </div>
            <div style={divButtonStyle}>
              <Button variant="contained">Ajouter</Button>
              <Button variant="contained">Supprimer</Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Fade>
  );
}

export default CreatePackPage;
