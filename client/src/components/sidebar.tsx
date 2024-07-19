import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PersonIcon from '@mui/icons-material/Person';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        height: '100vh',
        borderRight: '1px solid #ddd',
        boxSizing: 'border-box',
      }}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <QueryStatsIcon />
          </ListItemIcon>
          <ListItemText primary="All Entities" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeveloperBoardIcon />
          </ListItemIcon>
          <ListItemText primary="Hosts" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
