import React from 'react';
import PropTypes from 'prop-types';
import { Select, FormControl, MenuItem } from '@mui/material';

// Styles CSS //
const formControlStyle = {
  width: 150,
};
// End style //

function ListVersion({ versions, app }) {
  const [version, setVersion] = React.useState('');

  const handleChange = (event) => {
    setVersion(event.target.value);
    localStorage.setItem(`version_${app.identification}`, JSON.stringify(event.target.value));
  };
  return (
    <FormControl sx={formControlStyle}>
      <Select value={version} inputProps={{ 'aria-label': 'Versions' }} displayEmpty onChange={handleChange}>
        <MenuItem value="">latest</MenuItem>
        {versions
          .sort()
          .reverse()
          .map((vers) => (
            <MenuItem value={vers}>{vers}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

ListVersion.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  versions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ListVersion;
