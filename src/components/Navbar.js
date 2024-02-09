import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  // Function to check if user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem('user');
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('user');
    // Redirect or refresh the page to reflect the logout state
    window.location.href = '/login';
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      {isLoggedIn() ? (
        <>
          <Link to="/dashboard">Dashboard</Link> |{" "}
          <button onClick={logout} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0', color: 'blue', textDecoration: 'underline' }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
