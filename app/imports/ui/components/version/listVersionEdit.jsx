import React from 'react';
import PropTypes from 'prop-types';
import { Select, FormControl, MenuItem } from '@mui/material';

// Styles CSS //
const formControlStyle = {
  width: 150,
};
// End style //

function ListVersionEdit({ versions, actualVersion, app }) {
  const ver = actualVersion || 'latest';
  const [version, setVersion] = React.useState(ver);

  const handleChange = (event) => {
    setVersion(event.target.value);
    localStorage.setItem(`version_edit_${app.identification}`, JSON.stringify(event.target.value));
  };
  return (
    <FormControl sx={formControlStyle}>
      <Select value={version} inputProps={{ 'aria-label': 'Versions' }} displayEmpty onChange={handleChange}>
        <MenuItem value="latest">latest</MenuItem>
        {versions
          .sort()
          .reverse()
          .map((vers) => (
            <MenuItem key={vers} value={vers}>
              {vers}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

ListVersionEdit.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  versions: PropTypes.arrayOf(PropTypes.any).isRequired,
  actualVersion: PropTypes.string.isRequired,
};

export default ListVersionEdit;
