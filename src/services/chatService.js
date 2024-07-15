import axios from 'axios';

const API_URL = 'https://devapi.beyondchats.com/api';

export const getAllChats = (page) => {
  return axios.get(`${API_URL}/get_all_chats?page=${page}`);
};

export const getChatMessages = (chatId) => {
  return axios.get(`${API_URL}/get_chat_messages?chat_id=${chatId}`);
};
