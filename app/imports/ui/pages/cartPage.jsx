import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';

// import MaterialTable from '@material-table/core';
import { DataGrid } from '@mui/x-data-grid';

function cartPage() {
  const cart = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('cart');
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue;
  });

  const columns = [
    {
      title: 'id',
      field: 'id',
      editable: 'never',
      hide: true,
    },
    {
      title: i18n.__('components.AppList.application'),
      field: 'application',
      editable: 'never',
      width: 250,
    },
    {
      title: i18n.__('components.AppList.description'),
      field: 'description',
      width: 700,
    },
    {
      title: i18n.__('components.AppList.version'),
      field: 'versions',
      width: 130,
    },
    {
      title: i18n.__('components.AppList.url'),
      field: 'url',
      width: 250,
    },
  ];

  const data = [];
  let _id = 0;
  cart[0].map((app) => {
    _id += 1;
    return data.push({
      id: _id,
      application: app.nom,
      description: app.description,
      versions: app.versions[0],
      url: app.url,
    });
  });

  return (
    <div style={{ height: 600 }}>
      <DataGrid columns={columns} rows={data} rowHeight={30} />
    </div>
  );
  // return <MaterialTable columns={columns} data={data} title="Liste des applications" options={options} />;
}

export default cartPage;
