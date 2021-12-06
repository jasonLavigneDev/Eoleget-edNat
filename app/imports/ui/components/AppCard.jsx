import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import AppBadge from './AppBadge';
import AppAvatar from './AppAvatar';

const useStyles = makeStyles(() => ({
  card: {
    width: '300px',
    height: '300px',
    margin: '1%',
    backgroundColor: '#ECEEF8',
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
      />
      <CardContent>
        <div>{content}</div>
      </CardContent>
    </Card>
  );
}

AppCard.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default AppCard;
