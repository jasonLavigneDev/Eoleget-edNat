import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles, styled } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Tooltip from '@material-ui/core/Tooltip';

import AppPacksCard from './appPacksCard';
import lightTheme from '../../themes/light';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    margin: '1%',
  },
  card: {
    position: 'relative',
    width: '28em',
    height: 'auto',
    margin: '1%',
    backgroundColor: lightTheme.palette.primary.light,
    boxShadow: theme.shadows[3],
  },
  cardHeader: {
    display: 'flex',
    background: 'linear-gradient(#6e1bdc,#f138a7 100%)',
    color: 'white',
  },
  expendMore: {
    marginRight: '42%',
  },
  iconButton: {
    color: 'white',
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PackCard() {
  const [showMore, setShowMore] = useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setShowMore(showMore);
  }, [showMore]);

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardHeader
          title="Pack"
          className={classes.cardHeader}
          action={
            <Tooltip title="Voir le pack">
              <IconButton className={classes.iconButton}>
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <CardContent>
          <AppPacksCard />
          <AppPacksCard />
          <Collapse in={showMore} unmountOnExit>
            <AppPacksCard />
            <AppPacksCard />
            <AppPacksCard />
            <AppPacksCard />
            <AppPacksCard />
            <AppPacksCard />
            <AppPacksCard />
          </Collapse>
        </CardContent>
        <CardActions>
          <Tooltip title="Etendre le pack">
            <ExpandMore
              expand={showMore}
              onClick={() => {
                setShowMore(!showMore);
              }}
              aria-expanded={showMore}
              aria-label="show more"
              className={classes.expendMore}
            >
              <ExpandMoreIcon fontSize="large" />
            </ExpandMore>
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  );
}

export default PackCard;
