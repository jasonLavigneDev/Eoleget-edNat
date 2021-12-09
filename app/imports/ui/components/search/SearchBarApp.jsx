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

function SearchBarApp({ opened, app, pack }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isApp, setApp] = useState(false);
  const [isPack, setPack] = useState(false);

  React.useEffect(() => {
    setOpen(opened);
  }, [opened]);

  React.useEffect(() => {
    setApp(app);
  }, [isApp]);
  React.useEffect(() => {
    setPack(pack);
  }, [isPack]);

  function setLabel() {
    let label = '';
    if (isApp) {
      label = i18n.__('components.Search.searchingApp');
    } else if (isPack) {
      label = i18n.__('components.Search.searchingPacks');
    } else {
      label = i18n.__('components.Search.searchingError');
    }
    return label;
  }

  return (
    <TextField
      label={setLabel()}
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
  pack: false,
};

SearchBarApp.propTypes = {
  opened: PropTypes.bool,
  app: PropTypes.bool,
  pack: PropTypes.bool,
};

export default SearchBarApp;
