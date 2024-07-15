import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { ThemeContext } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const history = useNavigate(); 
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSave = () => {
    // Implement saving logic
    alert("saved successfully!")
    console.log('Settings saved:', { username, email, password });
    history("/");
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ marginTop: '20px' }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        onClick={toggleTheme}
        sx={{ marginTop: '20px', marginLeft: '10px' }}
      >
        Toggle Theme
      </Button>
    </Box>
  );
};

export default Settings;
