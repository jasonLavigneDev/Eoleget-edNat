import React from 'react';
import i18n from 'meteor/universe:i18n';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import AppSettings from '../../../api/appsettings/appsettings';

const title = {
  textAlign: 'center',
  marginTop: 100,
};
const paragraph = {
  textAlign: 'center',
};
const SiteInMaintenance = ({ appsettings, ready }) => {
  return (
    <>
      {ready ? (
        <>
          <Typography variant="h6" style={title}>
            {i18n.__('components.SiteInMaintenance.maintenanceInProgress')}
          </Typography>

          <Typography sx={paragraph} paragraph color="inherit">
            {appsettings.textMaintenance}
          </Typography>
        </>
      ) : null}
    </>
  );
};

export default withTracker(() => {
  const subSettings = Meteor.subscribe('appsettings.all');
  const appsettings = AppSettings.findOne();
  const ready = subSettings.ready();
  return {
    appsettings,
    ready,
  };
})(SiteInMaintenance);

SiteInMaintenance.defaultProps = {
  appsettings: {},
};

SiteInMaintenance.propTypes = {
  appsettings: PropTypes.objectOf(PropTypes.any),
  ready: PropTypes.bool.isRequired,
};
