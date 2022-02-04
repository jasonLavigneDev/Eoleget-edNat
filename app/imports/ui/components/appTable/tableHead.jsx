import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

function EnhancedTableHead(props) {
  const column = [
    {
      title: i18n.__('components.AppList.application'),
      id: 'nom',
      width: 250,
    },
    {
      title: i18n.__('components.AppList.description'),
      id: 'description',
      width: 650,
    },
    {
      title: i18n.__('components.AppList.version'),
      id: 'versions',
      width: 130,
    },
    {
      title: i18n.__('components.AppList.url'),
      id: 'url',
      width: 250,
    },
  ];

  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <ShoppingBasketIcon />
        </TableCell>
        {column.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.title}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};
