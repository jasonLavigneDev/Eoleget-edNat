import React from 'react';
import MaterialReactTable from 'material-react-table';
import i18n from 'meteor/universe:i18n';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import { ListItemIcon, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

let tempSelect = [];

const MaterialTable = ({ columns, data, cart }) => {
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

  const [rowSelection, setRowSelection] = useState({});

  const handleSelectApp = (app) => {
    if (app !== undefined) {
      if (checkAppAllreadyAdded(app)) {
        removeAppToCart(app);
      } else {
        addAppToCart(app);
      }
    }
  };

  useEffect(() => {
    if (rowSelection) {
      // console.log(data[Object.keys(rowSelection).pop()]);
      const l = Object.keys(rowSelection);

      if (tempSelect.length > l.length) {
        const index = tempSelect.find(function (nombre) {
          if (!l.includes(nombre)) {
            return nombre;
          }
          return undefined;
        });

        if (index !== undefined) {
          handleSelectApp(data[index]);
        }
      } else {
        //handleSelectApp(data[Object.keys(rowSelection).pop()]);

        const index = l.find(function (nombre) {
          if (!tempSelect.includes(nombre)) {
            return nombre;
          }
          return undefined;
        });

        if (index !== undefined) {
          handleSelectApp(data[index]);
        }
      }

      tempSelect = l;
    }
  }, [rowSelection]);

  return (
    <>
      <MaterialReactTable
        columns={columns ?? []}
        data={data ?? []}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
      />
    </>
  );
};

MaterialTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MaterialTable;
