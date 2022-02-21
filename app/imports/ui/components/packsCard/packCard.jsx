import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Typography, Badge } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import AppPacksCard from './appPacksCard';
import lightTheme from '../../themes/light';
import { useAppContext } from '../../contexts/context';
import PackDelete from './packDelete';

// Styles CSS //
const divCardContainerStyle = {
  margin: '1%',
};
const cardStyle = {
  position: 'relative',
  width: '28em',
  height: 'auto',
  margin: '1%',
  backgroundColor: lightTheme.palette.primary.light,
  boxShadow: 4,
};
const expendMoreStyle = {
  marginRight: '42%',
};
const iconButtonStyle = {
  color: 'white',
};
const typographieHeaderStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '18rem',
  paddingLeft: 20,
};
// End Style //

const PackCard = ({ pack, isUserPack }) => {
  const [showMore, setShowMore] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [{ userId }] = useAppContext();
  const appli = pack.applications;

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

  const handleDeleteButton = () => {
    setOpenModal(true);
  };

  const mapList = (func) => appli.slice(0, 2).map(func);

  const mapTotalList = (func) => appli.slice(2, appli.length).map(func);

  const openDetailPack = () => {
    history.push(`/packs/detail/${pack._id}`);
  };

  const GetClassName = () => {
    console.log(pack.color);
    return {
      display: 'flex',
      backgroundColor: pack.color,
      color: 'white',
    };
  };

  return (
    <div style={divCardContainerStyle}>
      <Card sx={cardStyle}>
        <CardHeader
          title={
            <Badge
              badgeContent={
                !pack.isPublic ? (
                  <Tooltip title={i18n.__('components.PacksCard.privateIcon')} placement="top-start">
                    <VisibilityOffIcon sx={{ backgroundColor: 'white', borderRadius: 25, color: 'black' }} />
                  </Tooltip>
                ) : (
                  ''
                )
              }
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography variant="h6" style={typographieHeaderStyle}>
                {pack.name}
              </Typography>
            </Badge>
          }
          subheader={
            !isUserPack ? (
              <Typography style={typographieHeaderStyle} variant="body1">
                {pack.ownerName}
              </Typography>
            ) : null
          }
          sx={GetClassName()}
          action={
            <>
              {pack.owner === userId ? (
                <div>
                  <Tooltip title={i18n.__('components.PacksCard.packTooltip')}>
                    <IconButton sx={iconButtonStyle} onClick={openDetailPack}>
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={i18n.__('components.PacksCard.editPack')}>
                    <IconButton sx={iconButtonStyle} onClick={handleEditButton}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={i18n.__('components.PacksCard.deletePack')}>
                    <IconButton sx={iconButtonStyle} onClick={handleDeleteButton}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                <Tooltip title={i18n.__('components.PacksCard.packTooltip')}>
                  <IconButton sx={iconButtonStyle} onClick={openDetailPack}>
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          }
        />
        <CardContent>
          {mapList((app) => (
            <AppPacksCard key={app.identification} app={app} />
          ))}
          <Collapse in={showMore} unmountOnExit>
            {mapTotalList((app) => (
              <AppPacksCard key={app.identification} app={app} />
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
              sx={expendMoreStyle}
            >
              <ExpandMoreIcon fontSize="large" />
            </ExpandMore>
          </Tooltip>
        </CardActions>
      </Card>
      {openModal ? <PackDelete pack={pack} open={openModal} onClose={() => setOpenModal(false)} /> : null}
    </div>
  );
};

PackCard.defaultProps = {
  expand: false,
  isUserPack: false,
};

PackCard.propTypes = {
  isUserPack: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  expand: PropTypes.bool,
  pack: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PackCard;
