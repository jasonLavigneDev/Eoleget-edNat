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
    backgroundColor: '#95B5F0',
  },
  cardActions: {
    position: 'absolute',
    bottom: '0',
    right: '30%',
  },
}));

function AppCard({ title, content }) {
  const classes = useStyles();
  const [selected, setSelected] = useState(false);
  const isSelected = selected ? `${classes.card} ${classes.cardSelected}` : classes.card;

  React.useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <Card className={isSelected}>
      <CardHeader
        title={<Typography variant="h6">{title}</Typography>}
        avatar={
          <AppBadge>
            <AppAvatar />
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
          Description: {content}
        </Typography>
        <Typography variant="body2" component="div">
          Version: {content}
        </Typography>
        <Typography variant="body2" component="div">
          URL: {content}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button variant="contained">Voir plus</Button>
      </CardActions>
    </Card>
  );
}

AppCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default AppCard;
