import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/style.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
        email,
        password
    };

    try {
      const response = await axios.post('http://localhost:5001/api/login', loginData);

      console.log(response.data); // Log the data received from the backend

      if (response.data.message === 'Login Successfully') {
        toast.success('Login successful!');
        // If login successful, fetch user data based on username
        const userResponse = await axios.get(`http://localhost:5001/api/user/${email}`);
        const userData = (userResponse.data.user);

    // Save user data to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));

        console.log('User Data:', userData);

        navigate('/user');
      } else {
        toast.error('Check your Username and Password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="input-field">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <div class="Create-account">
          <Link to="/signup" className="link-one">
            I don't have any account
          </Link>
          </div>
          <div class="Create-account">
          <Link to="/" className="link-one">
            Let's Continue Url Shortening
          </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;