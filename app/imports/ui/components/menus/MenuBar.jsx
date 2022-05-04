import React from 'react';
import i18n from 'meteor/universe:i18n';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
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

const MenuBar = ({ mobile }) => {
  // Styles CSS //
  const tabsStyle = {
    borderRadius: '10px',
    color: 'primary.light',
    '& .Mui-selected': {
      backgroundColor: 'primary.main',
      color: 'primary.light',
    },
    '.MuiTabs-indicator': {
      backgroundColor: 'secondary.main',
    },
  };
  const tabsMobileStyle = {
    textTransform: 'none',
  };
  const flexContainerStyle = {
    display: 'flex',
  };
  const indicatorStyle = {
    top: mobile ? 0 : null,
    height: 5,
    borderTopLeftRadius: mobile ? 0 : 8,
    borderTopRightRadius: mobile ? 0 : 8,
    borderBottomLeftRadius: !mobile ? 0 : 8,
    borderBottomRightRadius: !mobile ? 0 : 8,
  };
  const secondaryMain = 'secondary.main';
  // End styles //

  const { pathname } = useLocation();
  const history = useHistory();
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
      sx={tabsStyle}
      classes={{
        flexContainer: flexContainerStyle,
        indicator: indicatorStyle,
      }}
      value={currentLink ? currentLink.path : false}
      aria-label="menu links"
      variant="scrollable"
      scrollButtons
      centered
      TabIndicatorProps={{
        style: { height: 5 },
      }}
    >
      {links.map((link, index) => (
        <Tab
          {...a11yProps(index)}
          key={link.path}
          value={link.path}
          title={link.tooltip ? i18n.__(`components.MenuBar.${link.tooltip}`) : ''}
          disableFocusRipple={mobile}
          disableRipple={mobile}
          sx={
            mobile
              ? tabsMobileStyle
              : {
                  color: 'primary.main',
                  borderBottom: '5px solid',
                  borderColor: 'secondary.main',
                  height: '70px',
                  paddingLeft: 5,
                  paddingRight: 5,
                }
          }
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
