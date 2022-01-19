import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { makeStyles, styled } from '@mui/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { useTracker } from 'meteor/react-meteor-data';

import AppPacksCard from './appPacksCard';
import lightTheme from '../../themes/light';
import { useAppContext } from '../../contexts/context';
import Applications from '../../../api/applications/applications';

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

const PackCard = ({ pack }) => {
  const [showMore, setShowMore] = useState(false);
  const [{ userId }] = useAppContext();
  const classes = useStyles();
  const appli = useTracker(() => {
    Meteor.subscribe('applications.pack', { packAppli: pack.applications });
    return Applications.find({ identification: { $in: pack.applications } }).fetch();
  });

  const history = useHistory();
  const ExpandMore = styled(
    React.forwardRef((props, ref) => {
      const { expand, ...other } = props;
      return <IconButton {...other} ref={ref} />;
    }),
  )(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  React.useEffect(() => {
    setShowMore(showMore);
  }, [showMore]);

  const handleEditButton = () => {
    history.push(`/packs/edit/${pack._id}`);
  };

  const mapList = (func) => appli.slice(0, 2).map(func);

  const mapTotalList = (func) => appli.slice(2, appli.length).map(func);

  const openDetailPack = () => {
    history.push(`packs/detail/${pack._id}`);
  };

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardHeader
          title={pack.name}
          className={classes.cardHeader}
          action={
            <>
              <Tooltip title={i18n.__('components.PacksCard.packTooltip')}>
                <IconButton className={classes.iconButton} onClick={openDetailPack}>
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>
              {pack.owner === userId ? (
                <Tooltip title={i18n.__('components.PacksCard.editPack')}>
                  <IconButton className={classes.iconButton} onClick={handleEditButton}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </>
          }
        />
        <CardContent>
          {mapList((app) => (
            <AppPacksCard app={app} />
          ))}
          <Collapse in={showMore} unmountOnExit>
            {mapTotalList((app) => (
              <AppPacksCard app={app} />
            ))}
          </Collapse>
        </CardContent>
        <CardActions>
          <Tooltip title={i18n.__('components.PacksCard.extendPack')}>
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
};

PackCard.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  expand: PropTypes.bool,
  pack: PropTypes.objectOf(PropTypes.any).isRequired,
};

PackCard.defaultProps = {
  expand: false,
};

export default PackCard;
