import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { styled } from '@mui/styles';
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

// Styles CSS //
const mainWhite = 'primary.light';
const modalStyle = {
  overflow: 'auto',
  position: 'absolute',
  width: '80%',
  maxHeight: '100%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  paddingLeft: 5,
  paddingRight: 5,
};
const buttonCloseStyle = {
  display: 'block',
  width: 400,
  margin: 'auto',
  bottom: 20,
  color: 'primary.light',
  backgroundColor: 'primary.purple',
  border: '2px solid',
  borderColor: 'secondary.main',
  '&:hover': {
    backgroundColor: 'primary.main',
  },
};
const tableCellStyle = {
  color: mainWhite,
};
// End styles //

function TableAppEditPack({ ready }) {
  if (!ready) return null;

  const cart = useState(() => {
    const saved = localStorage.getItem('cart_edit');
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
  let _id = -1;
  cart[0].map((app) => {
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

  const getVersion = (appli) => {
    const ver = JSON.parse(localStorage.getItem(`version_edit_${appli.identification}`));
    return ver;
  };

  const ReloadData = () => {
    data = [];
    _id = -1;
    cart[0] = JSON.parse(localStorage.getItem('cart_edit'));
    cart[0].map((appli) => {
      _id += 1;
      return data.push({
        id: _id,
        nom: appli.nom,
        description: appli.description,
        identification: appli.identification,
        version: getVersion(appli),
      });
    });
    setRows(data);
  };

  const handleDeleteButton = (event, app) => {
    if (app.id > -1) {
      cart[0] = JSON.parse(localStorage.getItem('cart_edit'));
      cart[0].splice(app.id, 1);
      cart[1](cart[0]);
      setRows(data);
      localStorage.setItem('cart_edit', JSON.stringify(cart[0]));
      ReloadData();
      msg.success(i18n.__('components.Card.removeAppSuccess'));
    } else {
      msg.error(i18n.__('components.Card.removeAppError'));
    }
  };

  const onClose = () => {
    setOpenModal(false);
    ReloadData();
  };

  const openList = () => {
    ReloadData();
    setOpenModal(true);
  };

  const StyledTableCell = styled(TableCell)(() => ({
    fontSize: 13,
    textOverflow: 'ellipsis',
  }));

  return (
    <div style={{ maxHeight: 200, textAlign: 'center' }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, backgroundColor: 'primary.purple', overflow: 'hidden' }}
          size="small"
          aria-label="a dense table"
        >
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} isEditPack />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((app) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={app.identification}
                    sx={{ backgroundColor: 'primary.lightPurple' }}
                  >
                    <TableCell sx={tableCellStyle}>{app.nom}</TableCell>
                    <StyledTableCell sx={tableCellStyle}>{app.description}</StyledTableCell>
                    <TableCell>
                      <ListVersionEdit versions={GetAllAppVersions(app)} app={app} actualVersion={app.version} />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={i18n.__('components.AppList.detailTooltip')}>
                        <Link to={`/app/${app.identification}`}>
                          <IconButton>
                            <OpenInNewIcon sx={tableCellStyle} />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={i18n.__('components.AppList.removeTooltip')}>
                        <IconButton onClick={(e) => handleDeleteButton(e, app)}>
                          <DeleteIcon sx={tableCellStyle} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="outlined"
        onClick={openList}
        sx={{
          width: '90%',
          backgroundColor: 'primary.purple',
          padding: 1,
          marginTop: 1,
          color: mainWhite,
          '&:hover': { backgroundColor: 'primary.main' },
        }}
      >
        {i18n.__('pages.packEditPage.addApp')}
      </Button>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {openModal ? (
        <Modal open onClose={onClose}>
          <div>
            <Paper sx={modalStyle}>
              <Typography variant="h4" component="div" sx={{ padding: 2, color: 'primary.purple' }}>
                {i18n.__('pages.Store.storeTitle')}
              </Typography>
              <AppListPage modal cart={cart} editModal />
              <Button variant="contained" onClick={onClose} sx={buttonCloseStyle} size="large">
                {i18n.__('pages.packEditPage.validateModal')}
              </Button>
            </Paper>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

TableAppEditPack.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subApps = Meteor.subscribe('applications.table.all', { search: '' });
  const ready = subApps.ready();
  return {
    ready,
  };
})(TableAppEditPack);
