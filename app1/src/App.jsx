
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import Login from './components/Login';
import UserDashboard from './components/dashboard';
import Signup from './components/Signup';

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Main;