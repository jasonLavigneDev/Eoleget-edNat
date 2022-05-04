import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

function EnhancedTableHead(props) {
  const column = [
    {
      title: i18n.__('components.AppList.application'),
      id: 'application',
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
  ];

  const { order, orderBy, onRequestSort } = props;
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
              sx={{
                color: 'primary.light',
                '&.MuiTableSortLabel-root': {
                  color: 'primary.light',
                },
                '&.MuiTableSortLabel-root:hover': {
                  color: 'primary.light',
                },
                '&.Mui-active': {
                  color: 'primary.light',
                },
                '& .MuiTableSortLabel-icon': {
                  color: 'white !important', // can't use theme color
                },
              }}
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
