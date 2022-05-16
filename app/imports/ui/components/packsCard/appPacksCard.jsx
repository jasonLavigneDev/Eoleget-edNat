import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';

import AppBadge from '../appCard/AppBadge';
import AppImg from '../appCard/AppImg';
import IconButtonEole from '../buttons/iconButtonEole';

// Styles CSS //
const cardStyle = {
  height: '6em',
  marginBottom: '1%',
  backgroundColor: 'rgba(255,255,255,0.6)',
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
          <Link to={`/app/${app.identification}`}>
            <IconButtonEole
              tooltipText={i18n.__('components.AppPacksCard.infoTooltip')}
              icon={<InfoIcon />}
              style={{
                background: 'none',
                color: 'primary.main',
                '&:hover': { backgroundColor: 'secondary.main', color: 'primary.purple' },
              }}
            />
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
}

AppPacksCard.propTypes = {
  app: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AppPacksCard;
