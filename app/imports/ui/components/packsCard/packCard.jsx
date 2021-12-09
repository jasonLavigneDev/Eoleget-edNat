import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';

import AppPacksCard from './appPacksCard';
import lightTheme from '../../themes/light';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    width: '28em',
    height: '42em',
    margin: '1%',
    backgroundColor: lightTheme.palette.primary.light,
    boxShadow: theme.shadows[3],
  },
  cardHeader: {
    background: 'linear-gradient(#6e1bdc,#f138a7 100%)',
    color: 'white',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardActions: {
    position: 'absolute',
    bottom: '0',
    right: '32%',
  },
}));

function PackCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title="Pack" className={classes.cardHeader} />
      <CardContent className={classes.cardContent}>
        <AppPacksCard />
        <AppPacksCard />
        <AppPacksCard />
        <AppPacksCard />
        <AppPacksCard />
        <CardActions className={classes.cardActions}>
          <Button variant="contained" size="large">
            Voir plus
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default PackCard;
