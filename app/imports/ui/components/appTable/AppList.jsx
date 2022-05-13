import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';

import ListVersion from '../version/listVersion';
import EnhancedTableHead from './tableHead';
import ListVersionEdit from '../version/listVersionEdit';

// Styles CSS //
const tableCellStyle = {
  color: 'primary.light',
  textAlign: 'center',
};
// End styles //

function AppList({ applications, cart, isModal, editPack }) {
  const handleUrlButton = (app) => window.open(app.url, '_blank');

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
  const [orderBy, setOrderBy] = React.useState('nom');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = isModal ? React.useState(5) : React.useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const checkAppAllreadyAdded = (app) => {
    let res;
    const tab = [];
    cart[0].map((appli) => tab.push(appli.identification));
    if (tab.includes(app.identification)) res = true;
    else res = false;
    return res;
  };

  const isSelected = (app) => {
    return checkAppAllreadyAdded(app);
  };

  const addAppToCart = (app) => {
    if (checkAppAllreadyAdded(app)) {
      msg.error(i18n.__('components.Card.addAppError'));
    } else {
      const ver = JSON.parse(localStorage.getItem(`version_${app.identification}`)) || '';
      const appFinal = {
        nom: app.nom,
        identification: app.identification,
        description: app.description,
        version: ver,
      };
      cart[1]([...cart[0], appFinal]);
      msg.success(i18n.__('components.Card.addAppSuccess'));
    }
  };

  const removeAppToCart = (app) => {
    if (checkAppAllreadyAdded(app)) {
      cart[1](cart[0].filter((appli) => appli.identification !== app.identification));
      msg.success(i18n.__('components.Card.removeAppSuccess'));
    } else {
      msg.error(i18n.__('components.Card.removeAppError'));
    }
  };

  const handleClick = (event, app) => {
    if (checkAppAllreadyAdded(app)) {
      removeAppToCart(app);
    } else {
      addAppToCart(app);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getVersion = (app) => {
    if (editPack) {
      const ver = JSON.parse(localStorage.getItem(`version_edit_${app.identification}`)) || app.version;
      const finalver = ver || 'latest';
      return finalver;
    }
    const ver = JSON.parse(localStorage.getItem(`version_${app.identification}`)) || 'latest';
    return ver;
  };

  return (
    <div style={{ height: isModal ? 400 : 600 }}>
      <TableContainer component={Paper}>
        <Table
          size="small"
          aria-label={i18n.__('components.AppList.ariaAppList')}
          sx={{ backgroundColor: 'primary.purple', color: 'primary.light', overflow: 'hidden' }}
        >
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {stableSort(applications, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((app, index) => {
                const isItemSelected = isSelected(app);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={app.identification}
                    selected={isItemSelected}
                    sx={!isSelected(app) ? { backgroundColor: 'primary.lightPurple' } : null}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, app)}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        sx={{
                          color: 'primary.light',
                          '&.Mui-checked': {
                            color: 'primary.light',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={tableCellStyle}>{app.nom}</TableCell>
                    <TableCell sx={tableCellStyle}>{app.description}</TableCell>
                    {isSelected(app) ? (
                      <TableCell sx={{ color: 'primary.light' }}>{getVersion(app)}</TableCell>
                    ) : (
                      <TableCell>
                        {editPack ? (
                          <ListVersionEdit versions={app.versions} actualVersion={app.version} app={app} />
                        ) : (
                          <ListVersion versions={app.versions} app={app} />
                        )}
                      </TableCell>
                    )}
                    <TableCell style={{ textAlign: 'center' }}>
                      <Button
                        onClick={() => handleUrlButton(app)}
                        sx={{ textTransform: 'unset', color: 'primary.light', textDecoration: 'underline' }}
                      >
                        {app.url}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={i18n.__('components.AppList.detailTooltip')}>
                        <Link to={`/app/${app.identification}`}>
                          <IconButton
                            sx={{
                              color: 'primary.light',
                            }}
                          >
                            <OpenInNewIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={isModal ? [5] : [25, 50, 100, 250]}
        component="div"
        count={applications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

AppList.defaultProps = {
  isModal: false,
  editPack: false,
};

AppList.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.object).isRequired,
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
  isModal: PropTypes.bool,
  editPack: PropTypes.bool,
};

export default AppList;
