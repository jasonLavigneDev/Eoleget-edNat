import React from 'react';
import PropTypes from 'prop-types';

// import MaterialTable from '@material-table/core';
import { DataGrid } from '@mui/x-data-grid';

function PackList({ packs }) {
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
      title: 'Description',
      field: 'description',
      width: '250',
    },
    {
      title: 'Applications',
      field: 'applications',
      width: '830',
    },
  ];

  const data = [];
  let _id = 0;
  packs.map((pack) => {
    const appli = pack.applications;

    const tab = appli.map((app) => app.nom);
    _id += 1;
    return data.push({
      id: _id,
      packName: pack.name,
      description: pack.description,
      applications: tab,
    });
  });

  return (
    <div style={{ height: 600 }}>
      <DataGrid columns={columns} rows={data} rowHeight={30} />
    </div>
  );
  // return <MaterialTable columns={columns} data={data} title="Liste des applications" options={options} />;
}

PackList.propTypes = {
  packs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PackList;
