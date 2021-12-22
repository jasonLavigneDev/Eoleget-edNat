import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
import AppBadge from './AppBadge';
import AppAvatar from './AppAvatar';
import lightTheme from '../../themes/light';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    width: '300px',
    height: '300px',
    margin: '1%',
    backgroundColor: lightTheme.palette.primary.light,
    boxShadow: theme.shadows[3],
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
    bottom: '0',
    right: '30%',
  },
}));

function AppCard({ nom, description, versions, url }) {
  const classes = useStyles();
  const [selected, setSelected] = useState(false);
  const isSelected = selected ? `${classes.card} ${classes.cardSelected}` : classes.card;

  React.useEffect(() => {
    setSelected(selected);
  }, [selected]);

  const isUpperCase = (str) => {
    return str === str.toUpperCase();
  };

  const des = isUpperCase(description) ? description.toLowerCase() : description;

  return (
    <Card className={isSelected}>
      <CardHeader
        title={<Typography variant="h6">{nom}</Typography>}
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
                setSelected(!selected);
              }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        }
        className={classes.cardHeader}
      />
      <CardContent>
        <Typography variant="body1" component="div">
          Description: {des}
        </Typography>
        <Typography variant="body2" component="div">
          Version: {versions === undefined ? 'N/A' : versions[0]}
        </Typography>
        <Typography variant="body2" component="div">
          URL: {url === undefined ? 'N/A' : url}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Link to="/detailapp" className={classes.imgLogo}>
          <Button variant="contained">Voir plus</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

AppCard.defaultProps = {
  description: '',
  versions: [],
  url: '',
};

AppCard.propTypes = {
  nom: PropTypes.string.isRequired,
  description: PropTypes.string,
  versions: PropTypes.arrayOf(String),
  url: PropTypes.string,
};

export default AppCard;
