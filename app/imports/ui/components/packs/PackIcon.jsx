/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'react';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

const PackIcon = ({ icon, big }) => {
  const defaultImage = '/images/packs/packs-000.png';
  return <Avatar src={icon || defaultImage} sx={big ? { width: 200, height: 200 } : { width: 40, height: 40 }} />;
};

PackIcon.defaultProps = {
  big: false,
};

PackIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  big: PropTypes.bool,
};

export default PackIcon;
