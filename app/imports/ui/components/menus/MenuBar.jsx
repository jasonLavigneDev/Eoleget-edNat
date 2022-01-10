import React from 'react';
import i18n from 'meteor/universe:i18n';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const links = [
  {
    path: '/',
    content: 'menuApp',
  },
  {
    path: '/packs',
    content: 'menuPacks',
  },
];

const useStyles = (mobile) =>
  makeStyles((theme) => ({
    tabs: {
      color: theme.palette.text.primary,
    },
    mobileTabs: {
      textTransform: 'none',
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    indicator: {
      top: mobile ? 0 : null,
      height: 3,
      borderTopLeftRadius: mobile ? 0 : theme.shape.borderRadius,
      borderTopRightRadius: mobile ? 0 : theme.shape.borderRadius,
      borderBottomLeftRadius: !mobile ? 0 : theme.shape.borderRadius,
      borderBottomRightRadius: !mobile ? 0 : theme.shape.borderRadius,
    },
  }));

const MenuBar = ({ mobile }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const classes = useStyles(mobile)();
  const T = i18n.createComponent('components.MenuBar');
  const currentLink = links.find((link) => {
    if (link.path === pathname || (pathname.search(link.path) > -1 && link.path !== '/')) {
      return true;
    }
    return false;
  });

  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }

  return (
    <Tabs
      className={classes.tabs}
      classes={{
        flexContainer: classes.flexContainer,
        indicator: classes.indicator,
      }}
      value={currentLink ? currentLink.path : false}
      indicatorColor="secondary"
      textColor="primary"
      aria-label="menu links"
      variant="scrollable"
      scrollButtons
    >
      {links.map((link, index) => (
        <Tab
          {...a11yProps(index)}
          key={link.path}
          value={link.path}
          title={link.tooltip ? i18n.__(`components.MenuBar.${link.tooltip}`) : ''}
          disableFocusRipple={mobile}
          disableRipple={mobile}
          className={mobile ? classes.mobileTabs : null}
          icon={mobile ? link.icon : undefined}
          label={<T>{link.contentMobile || link.content}</T>}
          onClick={() => history.push(link.path)}
        />
      ))}
    </Tabs>
  );
};

export default MenuBar;

MenuBar.propTypes = {
  mobile: PropTypes.bool,
};

MenuBar.defaultProps = {
  mobile: false,
};
