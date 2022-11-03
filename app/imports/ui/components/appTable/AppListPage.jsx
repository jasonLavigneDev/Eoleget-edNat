import React, { useState, useRef, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import { useTracker } from 'meteor/react-meteor-data';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Fade from '@mui/material/Fade';
import { Typography, Paper, Button } from '@mui/material';

import { useAppContext } from '../../contexts/context';
import Applications from '../../../api/applications/applications';
import { debounce } from '../../utils';
import IconButtonEole from '../buttons/iconButtonEole';
import MaterialTable from './MaterialTable';
import ListVersion from '../version/listVersion';

// Styles CSS //
const divMainStyle = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  marginBottom: '2%',
};
const divStoreTitleStyle = {
  minWidth: '100%',
};
const spanHelperText = {
  fontSize: 'large',
};
const textfieldStyle = {
  marginLeft: 50,
  width: '70%',
  marginTop: -35,
  paddingBottom: 20,
  backgroundColor: 'white', // can't use theme color
};
// End styles //

function AppListPage({ modal, editModal, cart, setTotal }) {
  const [{ appPage }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = appPage;

  const applications = useTracker(() => {
    Meteor.subscribe('applications.table.all', { search });
    let data;
    if (search.startsWith('#')) {
      const tags = appPage.search.slice(1).split(' ');
      data = Applications.find({ tags: { $all: tags } }).fetch();
    } else {
      const regex = new RegExp(search, 'i');
      data = Applications.find({
        $or: [
          {
            nom: { $regex: regex },
          },
          {
            description: { $regex: regex },
          },
        ],
      }).fetch();
    }

    return data;
  });

  const inputRef = useRef(null);
  // focus on search input when it appears
  useEffect(() => {
    if (inputRef.current && searchToggle) {
      inputRef.current.focus();
    }
  }, [searchToggle]);

  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    // update cart in localStorage when it's updated (except for initial load)
    // eslint-disable-next-line no-unused-expressions
    editModal
      ? loadingCart
        ? setLoadingCart(false)
        : localStorage.setItem('cart_edit', JSON.stringify(cart[0]))
      : loadingCart
      ? setLoadingCart(false)
      : localStorage.setItem('cart', JSON.stringify(cart[0]));
  }, [cart[0]]);

  useEffect(() => {
    setTotal(applications.length);
  }, [applications.length]);

  const updateGlobalState = (key, value) =>
    dispatch({
      type: 'appPage',
      data: {
        ...appPage,
        [key]: value,
      },
    });

  const searchRef = useRef();
  const updateSearch = () => updateGlobalState('search', searchRef.current.value);
  const resetSearch = () => {
    updateGlobalState('search', '');
    searchRef.current.value = '';
  };
  const debouncedSearch = debounce(updateSearch, 300);
  const checkEscape = (e) => {
    if (e.keyCode === 27) {
      // ESCAPE key
      updateGlobalState('searchToggle', false);
      updateGlobalState('search', '');
      searchRef.current.value = '';
    }
  };

  const column = [
    {
      header: i18n.__('components.AppList.application'),
      id: 'nom',
      accessorKey: 'nom',
      width: 250,
    },
    {
      header: i18n.__('components.AppList.description'),
      id: 'description',
      accessorKey: 'description',
      width: 650,
    },
    {
      header: i18n.__('components.AppList.version'),
      id: 'versions',
      accessorKey: 'versions',
      width: 130,
      // FIXME: Remove disabled prop validation
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell }) => <ListVersion versions={cell.getValue()} app={cell} />,
    },
    {
      header: i18n.__('components.AppList.url'),
      id: 'url',
      accessorKey: 'url',
      width: 250,
      Cell: ({ cell }) => (
        // eslint-disable-next-line react/prop-types
        <a href={cell.getValue()} target="_blank" rel="noreferrer">
          {
            // FIXME: Remove disabled prop validation
            // eslint-disable-next-line react/prop-types
            cell.getValue()
          }
        </a>
      ),
    },
  ];

  const searchField = (
    <TextField
      margin="normal"
      id="search"
      label={i18n.__('pages.Store.searchText')}
      placeholder={i18n.__('pages.Store.searchHelp')}
      name="search"
      fullWidth
      onChange={debouncedSearch}
      onKeyDown={checkEscape}
      type="text"
      defaultValue={appPage.search}
      inputRef={searchRef}
      variant="outlined"
      style={textfieldStyle}
      sx={{
        '& .MuiInput-underline:after': {
          borderBottomColor: 'secondary.main',
        },
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'secondary.main',
          },
        },
      }}
      helperText={
        appPage.search ? (
          appPage.search.startsWith('#') ? (
            <span style={spanHelperText}>
              {i18n.__('components.Search.helperTextByTags')} &quot;{appPage.search.slice(1)}&quot;
            </span>
          ) : (
            <span style={spanHelperText}>
              {i18n.__('components.Search.helperText')} &quot;{appPage.search}&quot;
            </span>
          )
        ) : (
          ''
        )
      }
      inputProps={{
        ref: inputRef,
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: search ? (
          <InputAdornment position="end">
            <IconButtonEole
              onClick={resetSearch}
              icon={<ClearIcon />}
              style={{ backgroundColor: 'none', color: 'secondary.main' }}
            />
          </InputAdornment>
        ) : null,
      }}
    />
  );

  return (
    <Fade in>
      <Paper sx={{ border: '2px solid', borderColor: 'secondary.main', padding: 2, marginTop: 5 }}>
        <div style={divMainStyle}>
          <div style={divStoreTitleStyle}>
            {searchField}
            {applications.length !== 0 ? (
              // <AppList applications={applications} cart={cart} isModal={modal} editPack={editModal} />
              <MaterialTable columns={column} data={applications} cart={cart} />
            ) : (
              <div sx={{ padding: 6 }}>
                <Typography variant="h5" align="center">
                  {i18n.__('pages.Store.noResult')}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </Paper>
    </Fade>
  );
}

AppListPage.propTypes = {
  modal: PropTypes.bool,
  editModal: PropTypes.bool,
  cart: PropTypes.arrayOf(PropTypes.any),
  setTotal: PropTypes.func,
};

AppListPage.defaultProps = {
  modal: false,
  editModal: false,
  cart: [],
  setTotal: () => {},
};
export default AppListPage;
