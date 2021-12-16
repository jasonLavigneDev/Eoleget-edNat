import React from 'react';

import MaterialTable from '@material-table/core';

function PackList() {
  const columns = [
    {
      title: 'Nom du pack',
      field: 'packName',
      width: '15%',
    },
    {
      title: 'Catégorie',
      field: 'category',
      width: '15%',
    },
    {
      title: 'Applications',
      field: 'applications',
    },
  ];

  const options = {
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    paginationType: 'stepped',
    actionsColumnIndex: 6,
    addRowPosition: 'first',
    emptyRowsWhenPaging: false,
    headerStyle: {
      backgroundColor: '#95B5F0',
    },
  };

  const data = [
    {
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
    {
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
    {
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
    {
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
    {
      packName: 'pack',
      category: 'catégorie',
      applications: ['app1 ', 'app2 ', 'app3 ', 'app4 ', 'app5 ', 'app6 ', 'app7 '],
    },
  ];

  return <MaterialTable columns={columns} data={data} title="Liste des applications" options={options} />;
}

export default PackList;
