import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

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
import Spinner from '../components/system/Spinner';
import ColorRadioButton from '../components/packCreation/colorRadioButton';
import Packs from '../../api/packs/packs';
import Applications from '../../api/applications/applications';

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

const EditPackPage = ({ pack, apps, ready }) => {
  if (!ready) return <Spinner full />;

  const [name, setName] = useState(pack.name);
  const [description, setDescription] = useState(pack.description);

  let data = [];

  let _id = 0;
  apps.map((app) => {
    _id += 1;
    return data.push({
      id: _id,
      appName: app.nom,
      description: app.description,
      identification: app.identification,
      version: app.versions[0],
    });
  });
  let dataId = data.map((app) => app.identification);

  const [rows, setRows] = useState(data);

  const deleteAppFromPack = (e) => {
    if (e.row.id > -1) {
      apps.splice(e.row.id - 1, 1);
    }

    data = [];
    dataId = [];
    _id = 0;
    apps.map((app) => {
      _id += 1;
      return data.push({
        id: _id,
        appName: app.nom,
        description: app.description,
        identification: app.identification,
        version: app.versions[0],
      });
    });
    dataId = data.map((app) => app.identification);
    setRows(data);
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
          deleteAppFromPack(cellValues);
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

  const editPack = () => {
    Meteor.call('packs.updatePack', { _id: pack._id, name, applications: dataId, description }, (err) => {
      if (err) msg.error(err.reason);
      else msg.success(i18n.__('pages.packEditPage.updateSuccess'));
    });
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
            <FormControlLabel control={<Checkbox />} label="isPublic" labelPlacement="start" />
            <Divider />
            <Typography variant="h6" component="div">
              {i18n.__('pages.packEditPage.color')}
            </Typography>
            <ColorRadioButton />
            <Divider />
            <div style={divDatagridStyle}>
              <DataGrid hideFooterPagination columns={columns} rows={rows} />
            </div>
            <div style={divButtonStyle}>
              <Button variant="contained" onClick={editPack} disabled={isDisable}>
                {i18n.__('pages.packEditPage.edit')}
              </Button>
              <Button variant="contained">{i18n.__('pages.packEditPage.cancel')}</Button>
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
    let subApp;
    let apps;
    const pack = Packs.findOne(_id);
    if (pack !== undefined) {
      subApp = Meteor.subscribe('applications.pack', { packAppli: pack.applications });
      apps = Applications.find({ identification: { $in: pack.applications } }).fetch();
    }

    const ready = subPack.ready() && subApp.ready();
    return {
      pack,
      apps,
      ready,
    };
  },
)(EditPackPage);

EditPackPage.propTypes = {
  pack: PropTypes.objectOf(PropTypes.any),
  apps: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ready: PropTypes.bool.isRequired,
};

EditPackPage.defaultProps = {
  pack: {},
  apps: [],
};
