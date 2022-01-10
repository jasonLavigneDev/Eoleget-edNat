import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles(() => ({
  searchBar: {
    width: '100%',
  },
}));

function SearchBarApp({ opened, app }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isApp, setApp] = useState(false);

  React.useEffect(() => {
    setOpen(opened);
  }, [opened]);

  React.useEffect(() => {
    setApp(app);
  }, [isApp]);

  return (
    <TextField
      label={isApp ? i18n.__('components.Search.searchingApp') : i18n.__('components.Search.searchingPack')}
      variant="outlined"
      className={classes.searchBar}
      open={open}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

SearchBarApp.defaultProps = {
  opened: false,
  app: false,
};

SearchBarApp.propTypes = {
  opened: PropTypes.bool,
  app: PropTypes.bool,
};

export default SearchBarApp;
