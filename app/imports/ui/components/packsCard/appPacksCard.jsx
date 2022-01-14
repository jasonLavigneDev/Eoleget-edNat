import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

import AppBadge from '../appCard/AppBadge';
import AppAvatar from '../appCard/AppAvatar';

const useStyles = makeStyles(() => ({
  card: {
    height: '6em',
    marginBottom: '1%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function AppPacksCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <AppBadge invisible>
          <AppAvatar detailApp={false} />
        </AppBadge>
        <Typography variant="body1">Nom application</Typography>
        <CardActions>
          <Tooltip title={i18n.__('components.AppPacksCard.infoTooltip')}>
            <IconButton>
              <Link to="/detailapp" className={classes.imgLogo}>
                <InfoIcon />
              </Link>
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default AppPacksCard;
