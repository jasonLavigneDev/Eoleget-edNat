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

import ListVersion from '../version/listVersion';
import EnhancedTableHead from './tableHead';

function AppList({ applications, cart }) {
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
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

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
    const selectedIndex = selected.indexOf(app.identification);
    let newSelected = [];

    if (selectedIndex === -1) {
      addAppToCart(app);
      newSelected = newSelected.concat(selected, app.identification);
    } else if (selectedIndex === 0) {
      removeAppToCart(app);
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      removeAppToCart(app);
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      removeAppToCart(app);
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getVersion = (app) => {
    const ver = JSON.parse(localStorage.getItem(`version_${app.identification}`)) || 'latest';
    return ver;
  };

  return (
    <div style={{ height: 600 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, app)}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>{app.nom}</TableCell>
                    <TableCell>{app.description}</TableCell>
                    {isSelected(app) ? (
                      <TableCell>{getVersion(app)}</TableCell>
                    ) : (
                      <ListVersion versions={app.versions} app={app} />
                    )}
                    <TableCell>{app.url}</TableCell>
                    <TableCell>
                      <Tooltip title={i18n.__('components.AppList.detailTooltip')}>
                        <Link to={`/detailapp/${app.identification}`}>
                          <IconButton>
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
        rowsPerPageOptions={[5, 10, 25]}
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

AppList.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.object).isRequired,
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AppList;
