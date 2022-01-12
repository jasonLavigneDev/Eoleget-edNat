import React from 'react';
import { Link } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AppBadge from './AppBadge';
import AppAvatar from './AppAvatar';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    width: '300px',
    height: '300px',
    margin: '1%',
    boxShadow: theme.shadows[3],
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    maxHeight: '150px',
  },
  cardSelected: {
    outline: 'solid #011CAA',
  },
  cardHeader: {
    background: 'linear-gradient(#5aa1d8,#555BE6 100%)',
    color: 'white',
  },
  cardActions: {
    position: 'absolute',
    bottom: '-1%',
    right: '30%',
  },
}));

function AppCard({ app, cart }) {
  const classes = useStyles();

  const addAppToCart = () => {
    cart.push(app);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const isUpperCase = (str) => {
    return str === str.toUpperCase();
  };

  const des = isUpperCase(app.description) ? app.description.toLowerCase() : app.description;

  return (
    <Card className={classes.card}>
      <CardHeader
        title={<Typography variant="h6">{app.nom}</Typography>}
        subheader={
          <Typography variant="body2" component="div">
            {app.versions === undefined ? 'N/A' : app.versions[0]}
          </Typography>
        }
        avatar={
          <AppBadge>
            <AppAvatar detailApp={false} />
          </AppBadge>
        }
        action={
          <Tooltip title={i18n.__('components.Card.addButtonTooltip')}>
            <IconButton
              aria-label="add"
              onClick={() => {
                addAppToCart();
              }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        }
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body1" component="div">
          {des}
        </Typography>
        {app.url !== undefined ? <a href={app.url}>{app.url}</a> : null}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Link to={`/detailapp/${app.identification}`} className={classes.imgLogo}>
          <Button variant="contained">Voir plus</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

AppCard.propTypes = {
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  cart: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default AppCard;
