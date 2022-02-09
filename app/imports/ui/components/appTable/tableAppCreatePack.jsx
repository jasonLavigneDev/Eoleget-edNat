import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Button, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import AppListPage from './AppListPage';

import EnhancedTableHead from './tableHeadAppPack';
import Applications from '../../../api/applications/applications';
import Spinner from '../system/Spinner';
import ListVersionEdit from '../version/listVersionEdit';

const modalStyle = {
  overflow: 'auto',
  position: 'absolute',
  width: '90%',
  maxHeight: '100%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

function TableAppCreatePack({ ready }) {
  if (!ready) return <Spinner full />;

  const cart = React.useState(() => {
    // getting stored value
    const saved = localStorage.getItem('cart');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

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

  const getVersion = (app) => {
    return app.version || 'latest';
  };

  let _id = -1;
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
  const [rows, setRows] = React.useState(data);

  const ReloadData = () => {
    data = [];
    _id = -1;
    cart[0] = JSON.parse(localStorage.getItem('cart'));
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const GetAllAppVersions = (app) => {
    const { versions } = Applications.findOne({ identification: app.identification });
    return versions;
  };

  const handleDeleteButton = (event, app) => {
    if (app.id > -1) {
      cart[0] = JSON.parse(localStorage.getItem('cart'));
      cart[0].splice(app.id, 1);
      setRows(data);
      localStorage.setItem('cart', JSON.stringify(cart[0]));
      ReloadData();
      msg.success(i18n.__('components.Card.removeAppSuccess'));
    } else {
      msg.error(i18n.__('components.Card.removeAppError'));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onClose = () => {
    setOpenModal(false);
    ReloadData();
  };

  const openList = () => {
    setOpenModal(true);
  };

  return (
    <div style={{ height: 600 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((app) => {
                return (
                  <TableRow hover tabIndex={-1} key={app.identification}>
                    <TableCell>{app.appName}</TableCell>
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
                      <Tooltip title={i18n.__('components.AppList.detailTooltip')}>
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
        count={rows.length}
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
            <AppListPage modal />
          </Paper>
        </Modal>
      ) : null}
    </div>
  );
}

TableAppCreatePack.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subApps = Meteor.subscribe('applications.table.all');
  const ready = subApps.ready();
  return {
    ready,
  };
})(TableAppCreatePack);