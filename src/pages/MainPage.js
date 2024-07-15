import React, { useState, useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { ThemeContext } from '../contexts/ThemeContext';
import ChatList from '../components/ChatList';
import ChatMessages from '../components/ChatMessages';
import Sidebar from '../components/Sidebar';
//import MenuBar from '../components/MenuBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Display from '../components/Display';
import Settings from '../components/Settings';
import NavigationBar from '../components/NavigationBar';

const MainPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSidebarOpen(false);
  };

  const handleSelectChat = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavigationBar onSidebarOpen={handleSidebarOpen} onThemeToggle={toggleTheme} darkMode={darkMode} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} onFilter={handleFilterChange} onSettings={handleOpenSettings} />
      <Grid container spacing={2}>
        <Grid item xs={2} >
          <ChatList onSelectChat={handleSelectChat} filter={filter} />
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route exact path="/" element={<Display />} />
            <Route path="/chat/:chatId" element={<ChatMessages filter={filter} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
