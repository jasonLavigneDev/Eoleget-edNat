import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// Styles CSS //
const cardStyle = {
  position: 'relative',
  width: '300px',
  height: '300px',
  margin: '1%',
  boxShadow: 3,
};
const cardContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  maxHeight: 180,
};
const cardHeaderStyle = {
  background: 'linear-gradient(#5aa1d8,#555BE6 100%)',
  color: 'white',
  maxHeight: 80,
};
const cardActionsStyle = {
  position: 'absolute',
  bottom: '-1%',
  right: '30%',
};
const typographieHeaderStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '11rem',
};
const typographieContentStyle = {
  overflow: 'scroll',
  overflowY: 'auto',
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
};
const cardContentLinkStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
const appImage = {
  height: 50,
  width: 50,
};
// End styles //

function AppCard({ app, cart }) {
  const checkAppAllreadyAdded = () => {
    let res;
    const tab = [];
    cart[0].map((appli) => tab.push(appli.identification));
    if (tab.includes(app.identification)) res = true;
    else res = false;
    return res;
  };

  const addAppToCart = () => {
    if (checkAppAllreadyAdded()) {
      msg.error(i18n.__('components.Card.addAppError'));
    } else {
      const appFinal = {
        nom: app.nom,
        identification: app.identification,
        description: app.description,
        version: '',
      };
      cart[1]([...cart[0], appFinal]);
      msg.success(i18n.__('components.Card.addAppSuccess'));
    }
  };

  const removeAppToCart = () => {
    if (checkAppAllreadyAdded()) {
      cart[1](cart[0].filter((appli) => appli.identification !== app.identification));
      msg.success(i18n.__('components.Card.removeAppSuccess'));
    } else {
      msg.error(i18n.__('components.Card.removeAppError'));
    }
  };

  const isUpperCase = (str) => {
    return str === str.toUpperCase();
  };

  const des = isUpperCase(app.description) ? app.description.toLowerCase() : app.description;
  const [avatar, setAvatar] = useState(`/images/appli/${app.identification}`);

  const defaultImage = () => {
    setAvatar('/images/appli/default.svg');
  };

  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={
          <Typography variant="body1" style={typographieHeaderStyle}>
            {app.nom}
          </Typography>
        }
        subheader={
          <Typography variant="body2" component="div">
            {app.versions === undefined ? 'N/A' : app.versions[0]}
          </Typography>
        }
        avatar={<img src={avatar} alt="" style={appImage} onError={() => defaultImage()} />}
        action={
          !checkAppAllreadyAdded() ? (
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
          ) : (
            <Tooltip title={i18n.__('components.Card.removeButtonTooltip')}>
              <IconButton
                aria-label="remove"
                onClick={() => {
                  removeAppToCart();
                }}
              >
                <RemoveIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          )
        }
        sx={cardHeaderStyle}
      />
      <CardContent sx={cardContentStyle}>
        <Typography sx={typographieContentStyle} variant="body1" component="div">
          {des}
        </Typography>
        {app.url !== undefined ? (
          <a style={cardContentLinkStyle} href={app.url}>
            {app.url}
          </a>
        ) : null}
      </CardContent>
      <CardActions sx={cardActionsStyle}>
        <Link to={`/detailapp/${app.identification}`}>
          <Button variant="contained">{i18n.__('components.Card.showMore')}</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

AppCard.propTypes = {
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AppCard;
