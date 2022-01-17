import React, { useState } from 'react';

import { Fade, Container, Typography, Paper, Collapse, Tooltip, IconButton, Box } from '@mui/material';
import ListIcon from '@mui/icons-material/ViewList';
import CardIcon from '@mui/icons-material/Dashboard';

import PackCardList from '../components/packsCard/packCardList';
import PackList from '../components/packsCard/packList';

// Style CSS //
const iconModeStyle = {
  display: 'flex',
  flexDirection: 'row-reverse',
  width: '100%',
};
const containerStyle = {
  marginTop: '5%',
};
// End style //

export default function EditPack() {
  const [showModeList, setModeList] = useState(false);

  return (
    <Fade in>
      <Container sx={containerStyle}>
        <Typography variant="h4">Mes packs</Typography>
        <Box sx={iconModeStyle}>
          <Tooltip title="Mode liste">
            <IconButton
              onClick={() => {
                setModeList(true);
              }}
            >
              <ListIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mode carte">
            <IconButton
              onClick={() => {
                setModeList(false);
              }}
            >
              <CardIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
        <Paper>
          <Collapse in={!showModeList} collapsedsize={0}>
            <PackCardList isUserPack />
          </Collapse>
        </Paper>
        <Collapse in={showModeList} collapsedsize={0}>
          <PackList />
        </Collapse>
      </Container>
    </Fade>
  );
}
