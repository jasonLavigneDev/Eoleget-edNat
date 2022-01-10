import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';

import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/ViewList';
import CardIcon from '@mui/icons-material/Dashboard';

import SearchBarApp from '../components/search/SearchBarApp';
import PackCardList from '../components/packsCard/packCardList';
import PackList from '../components/packsCard/packList';

const useStyle = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    padding: '0 15%',
    marginBottom: '2%',
  },
  packsTitleContainer: {
    width: '100%',
  },
  packsTitleContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    width: '35%',
  },
  iconListe: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1fc',
  },
}));

function Packs() {
  const [showSearchApp, setShowSearchApp] = useState(false);
  const [showModeList, setModeList] = useState(false);
  const classes = useStyle();

  React.useEffect(() => {
    setModeList(showModeList);
  }, [showSearchApp]);

  return (
    <Fade in>
      <div className={classes.main}>
        <div className={classes.packsTitleContainer}>
          <div className={classes.packsTitleContent}>
            <Typography variant="h4" component="div">
              {i18n.__('pages.Packs.packsStoreTitle')}
            </Typography>
            <Tooltip title={i18n.__('pages.Packs.packsSearchApp')}>
              <IconButton onClick={() => setShowSearchApp(!showSearchApp)}>
                <SearchIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
          <Collapse in={showSearchApp} collapsedsize={0} className={classes.searchBar}>
            <SearchBarApp opened={showSearchApp} app={false} />
          </Collapse>
          <span className={classes.iconListe}>
            <Tooltip title="Mode liste">
              <IconButton
                onClick={() => {
                  setModeList(true);
                }}
              >
                <ListIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mode carte">
              <IconButton
                onClick={() => {
                  setModeList(false);
                }}
              >
                <CardIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </span>
          <div>
            <Paper>
              <div className={classes.cardContainer}>
                <Collapse in={!showModeList} collapsedsize={0}>
                  <PackCardList />
                </Collapse>
              </div>
            </Paper>
            <Collapse in={showModeList} collapsedsize={0}>
              <PackList />
            </Collapse>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default Packs;
