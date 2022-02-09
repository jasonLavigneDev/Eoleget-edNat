import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Button, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';

import Modal from '@mui/material/Modal';
import AppListPage from './AppListPage';

import EnhancedTableHead from './tableHeadAppPack';
import ListVersionEdit from '../version/listVersionEdit';
import Applications from '../../../api/applications/applications';
import Spinner from '../system/Spinner';

const modalStyle = {
  overflow: 'auto',
  position: 'absolute',
  width: '90%',
  maxHeight: '100%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

function TableAppEditPack({ applications, ready }) {
  if (!ready) return <Spinner full />;

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('application');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openModal, setOpenModal] = React.useState(false);

  let data = [];
  let _id = 0;
  applications.map((app) => {
    _id += 1;
    return data.push({
      id: _id,
      nom: app.nom,
      description: app.description,
      identification: app.identification,
      version: app.version,
    });
  });

  const [rows, setRows] = useState(data);

  const GetAllAppVersions = (app) => {
    const { versions } = Applications.findOne({ identification: app.identification });
    return versions;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ReloadData = () => {
    data = [];
    _id = 0;
    applications.map((appli) => {
      _id += 1;
      return data.push({
        id: _id,
        nom: appli.nom,
        description: appli.description,
        identification: appli.identification,
        version: appli.version,
      });
    });
    setRows(data);
  };

  const handleDeleteButton = (event, app) => {
    if (app.id > -1) {
      applications.splice(app.id - 1, 1);
    }
    ReloadData();
  };

  const onClose = () => {
    setOpenModal(false);
    ReloadData();
  };

  const openList = () => {
    setOpenModal(true);
  };

  return (
    <div style={{ maxHeight: 200 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} isEditPack />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((app) => {
                return (
                  <TableRow hover tabIndex={-1} key={app.identification}>
                    <TableCell>{app.nom}</TableCell>
                    <TableCell>{app.description}</TableCell>
                    <TableCell>
                      <ListVersionEdit versions={GetAllAppVersions(app)} app={app} actualVersion={app.version} />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={i18n.__('components.AppList.detailTooltip')}>
                        <Link to={`/detailapp/${app.identification}`}>
                          <IconButton>
                            <OpenInNewIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={i18n.__('components.AppList.removeTooltip')}>
                        <IconButton onClick={(e) => handleDeleteButton(e, app)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={applications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Button variant="contained" onClick={openList}>
        +
      </Button>
      {openModal ? (
        <Modal open onClose={onClose}>
          <Paper sx={modalStyle}>
            <Typography variant="h4" component="div" style={{ padding: 10, marginBottom: -50 }}>
              {i18n.__('pages.Store.storeTitle')}
            </Typography>
            <AppListPage modal editModal />
          </Paper>
        </Modal>
      ) : null}
    </div>
  );
}

TableAppEditPack.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.any).isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subApps = Meteor.subscribe('applications.table.all');
  const ready = subApps.ready();
  return {
    ready,
  };
})(TableAppEditPack);
