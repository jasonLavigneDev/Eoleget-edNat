import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { Accounts } from 'meteor/accounts-base';
import { useHistory } from 'react-router-dom';

const VerifyEmail = ({
  match: {
    params: { token },
  },
}) => {
  const history = useHistory();
  Accounts.verifyEmail(token, (err) => {
    if (err) msg.error(`${i18n.__('pages.VerifyEmail.error')} (${err.reason || err.message || err})`);
    else {
      msg.success(`${i18n.__('pages.VerifyEmail.success')}`);
      history.replace('/');
    }
  });
  return <div>{i18n.__('pages.VerifyEmail.inProgress')}</div>;
};

VerifyEmail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VerifyEmail;
