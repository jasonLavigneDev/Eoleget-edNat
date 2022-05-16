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
import { useAppContext } from '../../contexts/context';
import PackDelete from './packDelete';
import { generateGradiant } from '../../utils';
import PackIcon from '../packs/PackIcon';
import IconButtonEole from '../buttons/iconButtonEole';

// Styles CSS //
const divCardContainerStyle = {
  margin: '1%',
};
const expendMoreStyle = {
  marginRight: '42%',
  backgroundColor: 'rgba(255,255,255,0.6)',
  '&:hover': {
    transition: 'all 1s ease-out',
    backgroundColor: 'rgba(255,255,255)',
  },
};
const iconButtonStyle = {
  color: 'primary.light',
  backgroundColor: 'none',
  marginLeft: -1,
  '&:hover': {
    backgroundColor: 'primary.light',
    color: 'primary.purple',
  },
};
const typographieHeaderStyle = {
  overflow: 'ellipsis',
  textOverflow: 'ellipsis',
  margin: 'auto',
  paddingLeft: 10,
  width: '18rem',
  height: '4rem',
};
const typographieSubheaderStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '18rem',
};
// End Style //

const PackCard = ({ pack, isUserPack }) => {
  const cardStyle = {
    position: 'relative',
    width: '28em',
    height: 'auto',
    margin: '1%',
    background: `linear-gradient(${generateGradiant(pack.color)})`,
    boxShadow: 4,
  };
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

  const mapList = appli.slice(0, 2);

  const mapTotalList = appli.slice(2, appli.length);

  const openDetailPack = () => {
    history.push(`/packs/detail/${pack._id}`);
  };

  const GetClassName = () => {
    return {
      display: 'flex',
      color: 'primary.light',
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
                    <VisibilityOffIcon sx={{ backgroundColor: 'primary.light', borderRadius: 25, color: 'black' }} />
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
              <PackIcon icon={pack.icon} />
              <Typography variant="h6" style={typographieHeaderStyle}>
                {pack.name}
                {!isUserPack ? (
                  <Typography style={typographieSubheaderStyle} variant="body1">
                    {pack.ownerName}
                  </Typography>
                ) : null}
              </Typography>
            </Badge>
          }
          sx={GetClassName()}
          action={
            <>
              {pack.owner === userId ? (
                <div>
                  <IconButtonEole
                    tooltipText={i18n.__('components.PacksCard.packTooltip')}
                    icon={<OpenInNewIcon />}
                    style={iconButtonStyle}
                    onClick={openDetailPack}
                  />
                  <IconButtonEole
                    tooltipText={i18n.__('components.PacksCard.editPack')}
                    icon={<EditIcon />}
                    style={iconButtonStyle}
                    onClick={handleEditButton}
                  />
                  <IconButtonEole
                    tooltipText={i18n.__('components.PacksCard.deletePack')}
                    icon={<ClearIcon />}
                    style={iconButtonStyle}
                    onClick={handleDeleteButton}
                  />
                </div>
              ) : (
                <IconButtonEole
                  tooltipText={i18n.__('components.PacksCard.packTooltip')}
                  icon={<OpenInNewIcon />}
                  style={iconButtonStyle}
                  onClick={openDetailPack}
                />
              )}
            </>
          }
        />
        <CardContent>
          {mapList.map((app) => (
            <AppPacksCard key={app.identification} app={app} />
          ))}
          <Collapse in={showMore} unmountOnExit>
            {mapTotalList.map((app) => (
              <AppPacksCard key={app.identification} app={app} />
            ))}
          </Collapse>
        </CardContent>
        <CardActions>
          {appli.length !== 2 ? (
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
                <ExpandMoreIcon
                  fontSize="large"
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      color: 'secondary.main',
                    },
                  }}
                />
              </ExpandMore>
            </Tooltip>
          ) : (
            <div style={{ height: 50 }} />
          )}
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
