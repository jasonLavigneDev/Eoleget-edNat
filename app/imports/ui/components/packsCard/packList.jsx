import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { Link, useHistory } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import EnhancedTableHead from '../packTable/tableHead';
import { useAppContext } from '../../contexts/context';
import PackDelete from './packDelete';

function PackList({ packs }) {
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const [{ userId }] = useAppContext();

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
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [currentPack, setCurrentPack] = React.useState({});

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

  const handleEditButton = (id) => {
    history.push(`/packs/edit/${id}`);
  };

  const handleDeleteButton = (pack) => {
    setOpenModal(true);
    setCurrentPack(pack);
  };

  return (
    <div style={{ height: 600 }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="pack table">
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {stableSort(packs, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pack) => {
                return (
                  <TableRow hover tabIndex={-1} key={pack._id}>
                    <TableCell>{pack.name}</TableCell>
                    <TableCell>{pack.ownerName}</TableCell>
                    <TableCell>
                      <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: 630, display: 'block' }}>
                        {pack.description}
                      </span>
                    </TableCell>
                    <TableCell>{pack.applications.length}</TableCell>
                    <TableCell>
                      {pack.owner === userId ? (
                        <div>
                          <Tooltip title={i18n.__('components.PackList.detailTooltip')}>
                            <Link to={`/packs/detail/${pack._id}`}>
                              <IconButton>
                                <OpenInNewIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip title={i18n.__('components.PacksCard.editPack')}>
                            <IconButton onClick={() => handleEditButton(pack._id)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={i18n.__('components.PacksCard.deletePack')}>
                            <IconButton onClick={() => handleDeleteButton(pack)}>
                              <ClearIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      ) : (
                        <Tooltip title={i18n.__('components.PackList.detailTooltip')}>
                          <Link to={`/packs/detail/${pack._id}`}>
                            <IconButton>
                              <OpenInNewIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={packs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {openModal ? <PackDelete pack={currentPack} open={openModal} onClose={() => setOpenModal(false)} /> : null}
    </div>
  );
}

PackList.propTypes = {
  packs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PackList;
