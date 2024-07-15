import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
//import InboxIcon from '@mui/icons-material/Inbox';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ isOpen, onClose, onFilter, onSettings }) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <List>
        {/* <ListItem button onClick={() => onFilter('all')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="All Chats" />
        </ListItem> */}
        <ListItem button onClick={onSettings}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
