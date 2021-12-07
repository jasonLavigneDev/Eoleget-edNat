import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

import AppBadge from './AppBadge';
import AppAvatar from './AppAvatar';

const useStyles = makeStyles(() => ({
  card: {
    position: 'relative',
    width: '300px',
    height: '300px',
    margin: '1%',
    backgroundColor: '#ECEEF8',
  },
  cardHeader: {
    backgroundColor: '#95B5F0',
  },
  cardActions: {
    position: 'absolute',
    bottom: '0',
    right: '30%',
  },
}));

function AppCard({ title, subTitle, content }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
        subheader={subTitle}
        avatar={
          <AppBadge className={classes.badge}>
            <AppAvatar />
          </AppBadge>
        }
        action={
          <IconButton aria-label="add">
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        }
        className={classes.cardHeader}
      />
      <CardContent>
        <div>Nom: {content}</div>
        <div>Version: {content}</div>
        <div>URL: {content}</div>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button variant="contained">Voir plus</Button>
      </CardActions>
    </Card>
  );
}

AppCard.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default AppCard;
