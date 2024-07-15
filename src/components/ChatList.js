import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        let allChats = [];

        // Loop through pages 1 to 10
        for (let page = 1; page <= 10; page++) {
          const response = await axios.get(`https://devapi.beyondchats.com/api/get_all_chats?page=${page}`);
          console.log(`Fetched chats data for page ${page}:`, response.data);

          if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
            allChats = [...allChats, ...response.data.data.data];
          } else {
            console.error(`Failed to fetch chats for page ${page}`);
          }
        }

        setChats(allChats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {chats.map((chat) => (
            <ListItem button key={chat.id} onClick={() => onSelectChat(chat.id)}>
              <ListItemText primary={chat.creator?.name || 'Unknown User'} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ChatList;
