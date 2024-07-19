import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import { useNavigate } from 'react-router-dom';
import { getHostDetailsRoute, getHostsRoute, getOrgRoute } from '../router';
import { useAuth } from '../contexts/auth-provider';
import { assertUserLoggedIn } from '../utils/assert-user-logged-in';

const Sidebar = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  assertUserLoggedIn(user);

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
        <ListItem button onClick={() => navigate(getOrgRoute(user?.orgId))}>
          <ListItemIcon>
            <QueryStatsIcon />
          </ListItemIcon>
          <ListItemText primary="All Entities" />
        </ListItem>
        <ListItem button onClick={() => navigate(getHostsRoute(user?.orgId))}>
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
