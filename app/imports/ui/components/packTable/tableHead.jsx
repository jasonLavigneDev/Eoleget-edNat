import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, isUserPack } = props;
  let column = [];

  if (isUserPack) {
    column = [
      {
        title: i18n.__('components.PackList.name'),
        id: 'name',
      },
      {
        title: i18n.__('components.PackList.visibility'),
        id: 'isPublic',
      },
      {
        title: i18n.__('components.PackList.description'),
        id: 'description',
      },
      {
        title: i18n.__('components.PackList.number'),
        id: 'number',
      },
    ];
  } else {
    column = [
      {
        title: i18n.__('components.PackList.name'),
        id: 'name',
      },
      {
        title: i18n.__('components.PackList.owner'),
        id: 'user',
      },
      {
        title: i18n.__('components.PackList.description'),
        id: 'description',
      },
      {
        title: i18n.__('components.PackList.number'),
        id: 'number',
      },
    ];
  }

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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

EnhancedTableHead.defaultProps = {
  isUserPack: false,
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  isUserPack: PropTypes.bool,
};
