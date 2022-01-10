import React from 'react';

// import MaterialTable from '@material-table/core';
import { DataGrid } from '@mui/x-data-grid';

function PackList() {
  const columns = [
    {
      title: 'id',
      field: 'id',
      editable: 'never',
      hide: true,
    },
    {
      title: 'Nom du pack',
      field: 'packName',
      width: '250',
    },
    {
      title: 'Catégorie',
      field: 'category',
      width: '250',
    },
    {
      title: 'Applications',
      field: 'applications',
      width: '830',
    },
  ];

  const data = [
    {
      id: 1,
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
    {
      id: 2,
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
    {
      id: 3,
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
    {
      id: 4,
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
    {
      id: 5,
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
  ];

  return (
    <div style={{ height: 600 }}>
      <DataGrid columns={columns} rows={data} rowHeight={30} />
    </div>
  );
  // return <MaterialTable columns={columns} data={data} title="Liste des applications" options={options} />;
}

export default PackList;
