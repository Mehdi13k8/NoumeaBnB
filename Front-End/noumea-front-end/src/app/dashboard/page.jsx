"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    // bookings
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found, please login');
                return;
            }

            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get('http://localhost:5000/api/users/getLoggedUser', config);
                setUser(response.data);
            } catch (err) {
                setError('Failed to fetch user data');
                console.error(err);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found, please login');
                return;
            }

            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get('http://localhost:5000/api/users/' + user?.id + '/bookings', config);
                console.log(user, response.data);
                setBookings(response.data);
            } catch (err) {
                setError('Failed to fetch bookings');
                console.error(err);
            }
        }

        if (user) {
            fetchBookings();
        }
    }, [user]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>; v
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {user.name}!</p>
            <p>Your email: {user.email}</p>
            <p>Your role: {user.role}</p>
        </div>
    );
};

export default Dashboard;
