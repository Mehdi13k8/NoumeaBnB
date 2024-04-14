"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [roomDetails, setRoomDetails] = useState(null);

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError('');
        console.log('User logged out.');
    };

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user || !user._id) return;

            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found, please login');
                return;
            }

            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get(`http://localhost:5000/api/users/${user._id}/bookings`, config);
                setBookings(response.data);
            } catch (err) {
                setError('Failed to fetch bookings');
                console.error(err);
            }
        };

        fetchBookings();
    }, [user]);

    useEffect(() => {
        const fetchRoomDetails = async (roomId) => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/rooms/${roomId}`);
                setRoomDetails(response.data);
            } catch (err) {
                console.error('Failed to fetch room details', err);
                setError('Failed to fetch room details');
            }
        };

        if (selectedBooking) {
            fetchRoomDetails(selectedBooking.room);
        }
    }, [selectedBooking]);

    const closeModal = () => {
        setSelectedBooking(null);
        setRoomDetails(null);
    };

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!user) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <nav className="bg-white shadow py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="text-2xl text-blue-600 font-bold">NouméaBnB</div>
                    {/* home page */}
                    <button onClick={() => window.location.href = '/'} className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded">Home</button>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-800 px-3 py-2 rounded">Logout</button>
                </div>
            </nav>

            <h1 className="text-4xl font-bold text-center my-4">Dashboard</h1>
            {/* button home page  */}
            <div className="text-lg text-center mb-6">
                <p>Welcome back, <span className="font-semibold">{user.name}</span>!</p>
                <p>Your email: {user.email}</p>
                <p>Your role: {user.role}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Your Bookings</h2>
                {bookings.length > 0 ? (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bookings.map(booking => (
                            <div key={booking._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer" onClick={() => setSelectedBooking(booking)}>
                                <h3 className="text-lg font-semibold">Booking for Room: {booking.room}</h3>
                                <p>Start: {new Date(booking.startDate).toLocaleDateString()}</p>
                                <p>End: {new Date(booking.endDate).toLocaleDateString()}</p>
                                <p>Adults: {booking.numberOfAdults} | Children: {booking.numberOfChildren}</p>
                                <p>Total Price: ${booking.totalPrice.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No bookings found.</p>
                )}
            </div>
            {selectedBooking && roomDetails && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
                        <h3 className="text-xl font-bold mb-4">Booking Details</h3>
                        <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}
                            showThumbs={false} showStatus={false} showIndicators={false}>
                            {roomDetails.photos.map(photo => (
                                <img key={photo} src={photo} alt="Room" />
                            ))}
                        </Carousel>
                        <p><strong>Room:</strong> {selectedBooking.room}</p>
                        <p><strong>Start Date:</strong> {new Date(selectedBooking.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(selectedBooking.endDate).toLocaleDateString()}</p>
                        <p><strong>Adults:</strong> {selectedBooking.numberOfAdults}</p>
                        <p><strong>Children:</strong> {selectedBooking.numberOfChildren}</p>
                        <p><strong>Total Price:</strong> ${selectedBooking.totalPrice.toFixed(2)}</p>
                        <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
