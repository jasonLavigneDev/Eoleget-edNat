import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

import AppBadge from '../appCard/AppBadge';
import AppImg from '../appCard/AppImg';

// Styles CSS //
const cardStyle = {
  height: '6em',
  marginBottom: '1%',
};
const cardContentStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const divNameStyle = {
  display: 'flex',
  flexDirection: 'column',
};
// End styles //

function AppPacksCard({ app }) {
  const getVersion = () => {
    return app.version ? `v${app.version}` : 'latest';
  };
  return (
    <Card sx={cardStyle}>
      <CardContent sx={cardContentStyle}>
        <AppBadge invisible>
          <AppImg appIdent={app.identification} size={50} />
        </AppBadge>
        <div style={divNameStyle}>
          <Typography variant="body1">{app.nom}</Typography>
          <Typography variant="body1" align="center" sx={{ opacity: 0.6 }}>
            {getVersion()}
          </Typography>
        </div>
        <CardActions>
          <Tooltip title={i18n.__('components.AppPacksCard.infoTooltip')}>
            <IconButton>
              <Link to={`/detailapp/${app.identification}`}>
                <InfoIcon />
              </Link>
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
}

AppPacksCard.propTypes = {
  app: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AppPacksCard;
