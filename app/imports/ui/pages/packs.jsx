import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Collapse from '@material-ui/core/Collapse';
import ListIcon from '@material-ui/icons/ViewList';
import CardIcon from '@material-ui/icons/Dashboard';

import SearchBarApp from '../components/search/SearchBarApp';
import PackCardList from '../components/packsCard/packCardList';

const useStyle = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    padding: '0 15%',
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
    boxShadow: theme.shadows[5],
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
          <SearchBarApp opened={showSearchApp} pack />
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
          <div className={classes.cardContainer}>
            <Collapse in={!showModeList} collapsedsize={0}>
              <PackCardList />
            </Collapse>
          </div>
          <Collapse in={showModeList} collapsedsize={0}>
            TODO 2
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Packs;
