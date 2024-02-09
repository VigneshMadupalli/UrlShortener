import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/style.css';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
        }
    }, []);

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('userData');

        alert("Logouting....");

        // Redirect to the login page
        navigate('/');
    };

    return (
        <div className="container">
            <h2>Ah!.. Our Best User Welcome to Your Dashboard, {userData ? userData.username : 'User'}!</h2>
            <div className="card">
                <h3>My Email</h3>
                <p>My email is <span>{userData ? userData.email : 'User'}</span></p>
            </div>
            <div className="card">
                <h3>Phone Number</h3>
                <p>Your Phone number is <span>{userData ? userData.phone : 'User'}</span></p>
            </div>
            <button className='logout-btn' onClick={handleLogout}>
                Logout
            </button>
            
        </div>
    );
};

export default UserDashboard;