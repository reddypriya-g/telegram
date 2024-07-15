import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChatMessages, getAllChats } from '../services/chatService';
import { Box, Typography, IconButton, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
//import NavigationBar from './NavigationBar';
import { ThemeContext } from '../contexts/ThemeContext';

const ChatMessages = ({ filter }) => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [chatName, setChatName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getChatMessages(chatId);
      if (response && response.data && Array.isArray(response.data.data)) {
        setMessages(response.data.data);
      } else {
        console.error("Fetched messages data is not in the expected format:", response);
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(error.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  const fetchChatDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let allChats = [];
      let currentPage = 1;
      while (currentPage <= 10) { // Iterate from page 1 to 10
        const response = await getAllChats(currentPage);
        if (response && response.data && Array.isArray(response.data.data.data)) {
          allChats = [...allChats, ...response.data.data.data];
        } else {
          console.error(`Failed to fetch chats for page ${currentPage}`);
        }
        currentPage++;
      }
  
      const uniqueChats = Array.from(new Set(allChats.map(chat => chat.id))) // Remove duplicates
        .map(id => allChats.find(chat => chat.id === id));
  
      setChats(uniqueChats);
  
      const chatDetails = uniqueChats.find(chat => chat.id.toString() === chatId);
      if (chatDetails) {
        setChatName(chatDetails.creator?.name || 'Unknown Chat');
        setSelectedChat(chatDetails);
      } else {
        console.error("Chat not found in fetched details");
        setError("Chat not found");
      }
    } catch (error) {
      console.error("Error fetching chat details:", error);
      setError(error.message || "Failed to fetch chat details");
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  useEffect(() => {
    fetchMessages();
    fetchChatDetails();
  }, [fetchMessages, fetchChatDetails, filter]);

  const handlePinMessage = (messageId) => {
    setPinnedMessages((prevPinnedMessages) => {
      const alreadyPinned = prevPinnedMessages.find(msg => msg.id === messageId);
      if (alreadyPinned) {
        return prevPinnedMessages.filter(msg => msg.id !== messageId);
      }
      const messageToPin = messages.find(msg => msg.id === messageId);
      return [...prevPinnedMessages, messageToPin];
    });
  };
  const handleSelectChat = (id) => {
    navigate(`/chat/${id}`);
  };
  const isBeyondChat = (name) => {
    return name === "BeyondChat";
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* <NavigationBar onThemeToggle={() => {}} /> */}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Box sx={{ borderRight: '1px solid #ddd', display: { xs: 'none', md: 'block' } }}>
          {/* <List>
            {chats.map((chat) => (
              <ListItem button key={chat.id} onClick={() => handleSelectChat(chat.id)}>
                <ListItemText primary={chat.creator?.name || 'Unknown User'} />
              </ListItem>
            ))}
          </List> */}
        </Box>
        <Box sx={{ flex: 1, padding: '10px', overflowY: 'auto'}}>
          <Typography variant="h5" sx={{ marginBottom: '20px', backgroundColor: darkMode ? '#333' : '#004764', textAlign: 'center', color: 'white' }}>
            {chatName}
          </Typography>
          {pinnedMessages.map(message => (
            <Box key={message.id} sx={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
              <Typography variant="body1" sx={{ backgroundColor: darkMode ? '#444' : '#0072A0', padding: '10px', textAlign: 'center', borderRadius: '5px', maxWidth: '100%', wordWrap: 'break-word' }}>
                {message.message}
                <IconButton size="small" onClick={() => handlePinMessage(message.id)} sx={{ marginTop: '10px', transform: 'translateY(-50%)' }}>
                  <PushPinIcon />
                </IconButton>
              </Typography>
            </Box>
          ))}
          {messages.map(message => (
            <Box key={message.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: isBeyondChat(message.sender.name) ? 'flex-start' : 'flex-end', marginBottom: '10px', position: 'relative' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: isBeyondChat(message.sender.name) ? (darkMode ? '#666' : '#d3e0ea') : (darkMode ? '#666' : '#f0f0f0'), padding: '10px', borderRadius: '5px', maxWidth: '75%', wordWrap: 'break-word', position: 'relative' }}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {message.message}
                </Typography>
                <IconButton size="small" onClick={() => handlePinMessage(message.id)} sx={{ marginTop: '10px', transform: 'translateY(-50%)' }}>
                  <PushPinIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessages;