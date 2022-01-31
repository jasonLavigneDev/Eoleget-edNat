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
import AppAvatar from '../appCard/AppAvatar';

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
// End styles //

function AppPacksCard({ app }) {
  return (
    <Card sx={cardStyle}>
      <CardContent sx={cardContentStyle}>
        <AppBadge invisible>
          <AppAvatar nameApp={app.identification} isDetailApp={false} />
        </AppBadge>
        <Typography variant="body1">{app.nom}</Typography>
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
