import React from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import i18n from 'meteor/universe:i18n';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Spinner from '../components/system/Spinner';
import AppPacksCard from '../components/packsCard/appPacksCard';
import Packs from '../../api/packs/packs';
import theme from '../themes/light';

// Styles CSS //
const containerStyle = {
  marginTop: theme.spacing(10),
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
  marginTop: '2%',
};
const divButtonStyle = {
  marginTop: 10,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};
const ButtonCommandStyle = {
  textTransform: 'none',
  width: 'fit-content',
  marginBottom: 5,
};
// End styles //

function DetailPack({ pack, ready }) {
  if (!ready) return <Spinner full />;

  const history = useHistory();
  const goBack = () => {
    history.push('/packs');
  };
  if (!ready) return <Spinner full />;

  const apps = pack.applications;

  const mapList = (func) => apps.map(func);

  const generateCommand = () => {
    let str = '';
    apps.map((app) => {
      let c = '';
      if (app.version === '') c = `winget install --id=${app.identification} -e`;
      else c = `winget install --id=${app.identification} -v "${app.version}" -e`;
      if (str !== '') str += ` && ${c}`;
      else str += c;
      return str;
    });
    return str;
  };

  const command = generateCommand();

  const copyCommand = () => {
    navigator.clipboard.writeText(command).then(msg.success(i18n.__('pages.detailPack.copyCommand')));
  };

  return (
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
            <Typography variant="body1" component="div">
              {`${i18n.__('components.PackList.owner')} : ${pack.ownerName}`}
            </Typography>
            <textarea readOnly value={pack.description} rows="4" style={{ resize: 'none', border: 0 }} />
            <Button title={i18n.__('pages.detailApp.download')} onClick={copyCommand} sx={ButtonCommandStyle}>
              <ContentCopyIcon />
              <Typography variant="paragraph">{command}</Typography>
            </Button>
            {mapList((app) => (
              <AppPacksCard key={app.identification} app={app} />
            ))}
            <div style={divButtonStyle}>
              <Button variant="contained" sx={ButtonGetPackStyle}>
                {i18n.__('pages.detailPack.getPack')}
              </Button>
              <Button variant="contained" sx={ButtonGetPackStyle} onClick={goBack}>
                {i18n.__('pages.detailPack.back')}
              </Button>
            </div>
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
    const subPack = Meteor.subscribe('packs.single', { _id });
    const pack = Packs.findOne(_id);

    const ready = subPack.ready();
    return {
      pack,
      ready,
    };
  },
)(DetailPack);

DetailPack.propTypes = {
  pack: PropTypes.objectOf(PropTypes.any),
  ready: PropTypes.bool.isRequired,
};

DetailPack.defaultProps = {
  pack: {},
};
