import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AppImg({ appIdent, size }) {
  const [img, setImg] = useState(`/appimage/${appIdent}`);
  let ssize = 50;
  if (typeof size === 'number') {
    ssize = size;
  }

  const defaultImage = () => {
    setImg('/images/default.svg');
  };
  return <img src={img} alt="" style={{ height: ssize, width: ssize }} onError={() => defaultImage()} />;
}

AppImg.propTypes = {
  appIdent: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default AppImg;
