import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = () => {
    return localStorage.getItem('user');
  };
  const logout = () => {
    localStorage.removeItem('user');
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
