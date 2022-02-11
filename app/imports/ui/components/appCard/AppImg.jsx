import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AppImg({ appIdent, size }) {
  const [avatar, setAvatar] = useState(`/images/appli/${appIdent}`);
  let ssize = 50;
  if (typeof size === 'number') {
    ssize = size;
  }

  const defaultImage = () => {
    setAvatar('/images/appli/default.svg');
  };
  return <img src={avatar} alt="" style={{ height: ssize, width: ssize }} onError={() => defaultImage()} />;
}

AppImg.propTypes = {
  appIdent: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default AppImg;
