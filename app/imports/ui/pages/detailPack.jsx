import React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import i18n from 'meteor/universe:i18n';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Spinner from '../components/system/Spinner';
import AppPacksCard from '../components/packsCard/appPacksCard';
import Applications from '../../api/applications/applications';
import Packs from '../../api/packs/packs';
import theme from '../themes/light';

// Styles CSS //
const containerStyle = {
  marginTop: theme.spacing(15),
  marginLeft: theme.spacing(60),
  maxWidth: '1000px',
  minWidth: '550px',
};
const paperStyle = {
  padding: theme.spacing(1),
};
const divMainContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '2%',
};
const ButtonGetPackStyle = {
  width: '30%',
  marginLeft: '35%',
  marginTop: '2%',
};
// End styles //

function DetailPack({ pack, apps, ready }) {
  if (!ready) return <Spinner full />;

  const mapList = (func) => apps.map(func);

  return !ready ? (
    <Spinner full />
  ) : (
    <Fade in>
      <Container sx={containerStyle}>
        <Paper sx={paperStyle}>
          <Typography variant="h4" component="div">
            {i18n.__('pages.detailPack.details')}
          </Typography>
          <div style={divMainContentStyle}>
            <Typography variant="h6" component="div">
              {pack.name}
            </Typography>
            <p>{pack.description}</p>
            {mapList((app) => (
              <AppPacksCard app={app} />
            ))}
            <Button variant="contained" sx={ButtonGetPackStyle}>
              {i18n.__('pages.detailPack.getPack')}
            </Button>
          </div>
        </Paper>
      </Container>
    </Fade>
  );
}
export default withTracker(
  ({
    match: {
      params: { _id },
    },
  }) => {
    let subApp;
    let apps;
    const subPack = Meteor.subscribe('packs.single', { _id });
    const pack = Packs.findOne(_id);
    if (pack !== undefined) {
      subApp = Meteor.subscribe('applications.pack', { packAppli: pack.applications });
      apps = Applications.find({ identification: { $in: pack.applications } }).fetch();
    }

    const ready = subPack.ready() && subApp.ready();
    return {
      pack,
      apps,
      ready,
    };
  },
)(DetailPack);

DetailPack.propTypes = {
  pack: PropTypes.objectOf(PropTypes.any),
  apps: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ready: PropTypes.bool.isRequired,
};

DetailPack.defaultProps = {
  pack: {},
  apps: [],
};
