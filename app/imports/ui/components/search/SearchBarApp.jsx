import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
  searchBar: {
    width: '100%',
  },
}));

function SearchBarApp({ opened }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    setOpen(opened);
  }, [opened]);

  return (
    <TextField
      label={i18n.__('components.Search.searchingApp')}
      variant="outlined"
      className={classes.searchBar}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
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
};

SearchBarApp.propTypes = {
  opened: PropTypes.bool,
};

export default SearchBarApp;
