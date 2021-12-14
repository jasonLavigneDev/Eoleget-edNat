import React from 'react';
import PropTypes from 'prop-types';
import ResetPwdDialog from '../components/system/ResetPwdDialog';

const ResetPassword = ({
  match: {
    params: { token },
  },
}) => {
  return <ResetPwdDialog token={token} />;
};

ResetPassword.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ResetPassword;
