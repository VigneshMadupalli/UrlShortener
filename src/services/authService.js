import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}register`, userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
};

const login = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}login`, userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
