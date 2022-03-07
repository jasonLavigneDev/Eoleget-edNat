import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';

import i18n from 'meteor/universe:i18n';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Spinner from '../components/system/Spinner';
import AppPacksCard from '../components/packsCard/appPacksCard';
import Packs from '../../api/packs/packs';
import theme from '../themes/light';
import { generateJSONFile } from '../utils';
import { useAppContext } from '../contexts/context';
import PackIcon from '../components/packs/PackIcon';

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
  flexGrow: 1,
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
const ButtonGetCommandStyle = {
  width: '20%',
  marginTop: 2,
  marginBottom: 5,
};
const divButtons = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const paperButtons = {
  marginBottom: 5,
  padding: 1,
};
const dlJsonButton = {
  marginTop: 3,
  width: '20%',
};
const buttonJsonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const titleStyle = {
  padding: 3,
  display: 'flex',
  flexDirection: 'row',
};
// End styles //

function DetailPack({ pack, ready }) {
  if (!ready) return <Spinner full />;

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  if (!ready) return <Spinner full />;

  const CMD_BATCH = 1;
  const CMD_POWERSHELL = 2;
  const CMD_JSON = 3;

  const apps = pack.applications;
  const [{ userId }] = useAppContext();
  const [displayCmd, setDisplayCmd] = useState(CMD_BATCH);
  const id = Math.floor(Math.random() * 9999);
  const fileName = `eoleget-winstall-${id}.json`;

  const generateCommand = () => {
    let str = '';
    if (displayCmd === CMD_BATCH) {
      apps.map((app) => {
        let c = '';
        if (app.version === '') c = `winget install --id=${app.identification} -e`;
        else c = `winget install --id=${app.identification} -v "${app.version}" -e`;
        if (str !== '') str += ` && ${c}`;
        else str += c;
        return str;
      });
    } else if (displayCmd === CMD_POWERSHELL) {
      apps.map((app) => {
        let c = '';
        if (app.version === '') c = `winget install --id=${app.identification} -e`;
        else c = `winget install --id=${app.identification} -v "${app.version}" -e`;
        if (str !== '') str += ` ; ${c}`;
        else str += c;
        return str;
      });
    } else if (displayCmd === CMD_JSON) {
      str = `winget import --import-file "${fileName}"`;
    }
    return str;
  };

  const changeDisplay = (type) => {
    setDisplayCmd(type);
  };

  const command = generateCommand();

  const copyCommand = () => {
    navigator.clipboard.writeText(command).then(msg.success(i18n.__('pages.detailPack.copyCommand')));
  };

  const generateFile = () => {
    generateJSONFile(apps, fileName);
  };

  const handleEditButton = () => {
    history.push(`/packs/edit/${pack._id}`);
  };

  return (
    <Fade in>
      <Container sx={containerStyle}>
        <Paper sx={paperStyle}>
          <div style={titleStyle}>
            <Typography variant="h4" component="div">
              {i18n.__('pages.detailPack.details')}
            </Typography>
            {pack.owner === userId ? (
              <Tooltip title={i18n.__('components.PacksCard.editPack')}>
                <IconButton onClick={handleEditButton}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={divMainContentStyle}>
              <Typography variant="h6" component="div">
                {pack.name}
              </Typography>
              <Typography variant="body1" component="div">
                {`${i18n.__('components.PackList.owner')} : ${pack.ownerName}`}
              </Typography>
              <Typography variant="body1" component="div">
                {i18n.__('components.PackList.visibility')} :{pack.isPublic ? ' publique' : ' privé'}
              </Typography>
              <textarea readOnly value={pack.description} rows="5" style={{ resize: 'none', border: 0 }} />
            </div>
            <div style={{ marginRight: 50 }}>
              <PackIcon big icon={pack.icon} />
            </div>
          </div>
          <Paper sx={paperButtons}>
            <div style={divButtons}>
              <Button
                title="batch"
                variant="outlined"
                onClick={() => changeDisplay(CMD_BATCH)}
                sx={ButtonGetCommandStyle}
              >
                Batch
              </Button>
              <Button
                title="powershell"
                variant="outlined"
                onClick={() => changeDisplay(CMD_POWERSHELL)}
                sx={ButtonGetCommandStyle}
              >
                Powershell
              </Button>
              <Button
                title="json"
                variant="outlined"
                onClick={() => changeDisplay(CMD_JSON)}
                sx={ButtonGetCommandStyle}
              >
                JSON
              </Button>
            </div>
            <Button title={i18n.__('pages.detailPack.copyToClipboard')} onClick={copyCommand} sx={ButtonCommandStyle}>
              <ContentCopyIcon />
              <Typography variant="paragraph">{command}</Typography>
            </Button>
            {displayCmd === CMD_JSON ? (
              <div style={buttonJsonContainerStyle}>
                <Typography variant="paragraph" align="center">
                  <IconButton disabled>
                    <InfoIcon />
                  </IconButton>
                  {i18n.__('pages.detailPack.instructions')}
                </Typography>
                <Button
                  variant="contained"
                  title={i18n.__('pages.detailPack.copyToClipboard')}
                  sx={dlJsonButton}
                  onClick={generateFile}
                >
                  {i18n.__('pages.detailPack.downloadJSON')}
                </Button>
              </div>
            ) : null}
          </Paper>

          {apps.map((app) => (
            <AppPacksCard key={app.identification} app={app} />
          ))}
          <div style={divButtonStyle}>
            <Button variant="contained" sx={ButtonGetPackStyle} onClick={goBack}>
              {i18n.__('pages.detailPack.back')}
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
