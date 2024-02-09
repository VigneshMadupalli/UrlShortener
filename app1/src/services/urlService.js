import axios from 'axios';

const API_BASE_URL = '/api/urls/';

const createShortUrl = async (urlData, token) => {
  const response = await axios.post(`${API_BASE_URL}shorten`, urlData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const getUrls = async (token) => {
  const response = await axios.get(API_BASE_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  createShortUrl,
  getUrls,
};
