import React from 'react';
import PropTypes from 'prop-types';
import { Select, FormControl, MenuItem } from '@mui/material';

// Styles CSS //
const formControlStyle = {
  width: 150,
};
// End style //

function ListVersion({ versions, app, setCommand }) {
  const [version, setVersion] = React.useState('');

  const generateCommand = (v) => {
    let c = '';
    if (v === '') c = `winget install --id=${app.identification} -e`;
    else c = `winget install --id=${app.identification} -v "${v}" -e`;
    setCommand(c);
  };

  const handleChange = (event) => {
    setVersion(event.target.value);
    generateCommand(event.target.value);
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

ListVersion.defaultProps = {
  setCommand: undefined,
};

ListVersion.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  versions: PropTypes.arrayOf(PropTypes.any).isRequired,
  setCommand: PropTypes.func,
};

export default ListVersion;
