import React from 'react';
import { Card, CardActions, CardContent, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Style CSS //
const cardContentStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop: 0,
  paddingBottom: 0,
  '&:last-child': {
    paddingBottom: 0,
  },
};

// End Style //
export default function AppCardCart() {
  return (
    <Card>
      <CardContent sx={cardContentStyle}>
        nom de lapplication
        <CardActions>
          <Tooltip title="delete">
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
}
