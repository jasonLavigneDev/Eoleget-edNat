import React from 'react';
import PropTypes from 'prop-types';
import { Select, FormControl, MenuItem } from '@mui/material';

// Styles CSS //
const formControlStyle = {
  width: 150,
  borderRadius: 25,
};
// End style //

function ListVersion({ versions, app, setCommand }) {
  const ver = JSON.parse(localStorage.getItem(`version_${app.identification}`)) || '';
  const [version, setVersion] = React.useState(ver);

  const generateCommand = (v) => {
    let c = '';
    if (v === '') c = `winget install --id ${app.identification} -e`;
    else c = `winget install --id ${app.identification} -v "${v}" -e`;
    setCommand(c);
  };

  const handleChange = (event) => {
    setVersion(event.target.value);
    generateCommand(event.target.value);
    localStorage.setItem(`version_${app.identification}`, JSON.stringify(event.target.value));
  };
  return (
    <FormControl sx={formControlStyle}>
      <Select
        value={version}
        inputProps={{
          'aria-label': 'Versions',
        }}
        displayEmpty
        onChange={handleChange}
        sx={{
          height: 30,
          backgroundColor: 'primary.purple',
          color: 'primary.light',
          '& .MuiSvgIcon-root': {
            color: 'primary.light',
          },
        }}
      >
        <MenuItem value="">latest</MenuItem>
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

ListVersion.defaultProps = {
  setCommand: () => '',
};

ListVersion.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  versions: PropTypes.arrayOf(PropTypes.any).isRequired,
  setCommand: PropTypes.func,
};

export default ListVersion;
