import React from 'react';
import i18n from 'meteor/universe:i18n';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

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
        <AppBadge>
          <AppAvatar />
        </AppBadge>
        <Typography variant="body1">Nom application</Typography>
        <CardActions>
          <Tooltip title={i18n.__('components.AppPacksCard.infoTooltip')}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default AppPacksCard;
