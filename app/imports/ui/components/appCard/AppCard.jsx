import React from 'react';
import { Link } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import AppImg from './AppImg';
import ButtonEole from '../buttons/buttonEole';

// Styles CSS //
const cardStyle = {
  position: 'relative',
  width: '300px',
  height: '300px',
  margin: '1%',
  boxShadow: 3,
  backgroundColor: 'primary.lightPurple',
  borderRadius: '20px',
};
const cardContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  maxHeight: 180,
  backgroundColor: 'primary.lightPurple',
};
const cardHeaderStyle = {
  backgroundColor: 'primary.purple',
  color: 'tertiary.main',
  borderBottom: '2px solid',
  borderColor: 'secondary.main',
  maxHeight: 80,
};
const cardActionsStyle = {
  position: 'absolute',
  bottom: '2%',
  backgroundColor: 'primary.lightPurple',
  width: '300px',
  left: '12%',
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
  color: 'primary.light',
};
const cardContentLinkStyle = {
  textDecoration: 'underline',
  textDecorationColor: 'secondary.main',
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

  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={
          app.url !== '' ? (
            <Tooltip title={app.url}>
              <a style={cardContentLinkStyle} href={app.url} rel="external noreferrer" target="_blank">
                <Typography variant="body1" style={typographieHeaderStyle}>
                  {app.nom}
                </Typography>
              </a>
            </Tooltip>
          ) : (
            <Typography variant="body1" style={typographieHeaderStyle}>
              {app.nom}
            </Typography>
          )
        }
        subheader={
          <Typography variant="body2" component="div">
            {app.versions === undefined ? 'N/A' : app.versions[0]}
          </Typography>
        }
        avatar={<AppImg appIdent={app.identification} size={40} />}
        action={
          !checkAppAllreadyAdded() ? (
            <Tooltip title={i18n.__('components.Card.addButtonTooltip')}>
              <IconButton
                aria-label="add"
                onClick={() => {
                  addAppToCart();
                }}
              >
                <AddIcon
                  fontSize="large"
                  sx={{
                    color: 'secondary.main',
                    '&:hover': { color: 'primary.purple', backgroundColor: 'secondary.main', borderRadius: 10 },
                  }}
                />
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
                <RemoveIcon
                  fontSize="large"
                  sx={{
                    color: 'secondary.main',
                    '&:hover': { color: 'primary.purple', backgroundColor: 'secondary.main', borderRadius: 10 },
                  }}
                />
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
      </CardContent>
      <CardActions sx={cardActionsStyle}>
        <Link to={`/app/${app.identification}`}>
          <ButtonEole text={i18n.__('components.Card.showMore')} style={{ width: '200%' }} />
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
