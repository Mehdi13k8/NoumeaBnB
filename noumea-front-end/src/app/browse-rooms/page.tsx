"use client"; // This is a client component

// src/app/pages/browse-rooms.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

const BrowseRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    const url = "http://127.0.0.1:5000/api/rooms";

    // Fetch rooms from your API
    axios.get(url).then((response) => {
      setRooms(response.data);
    }).catch((error) => {
      console.error('Error fetching rooms', error);
    });
  }, []);

  useEffect(() => {
  }, [rooms]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError('');
    console.log('User logged out.');
  };

  return (
    <>
      <nav className="bg-white shadow py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl text-blue-600 font-bold">NouméaBnB</div>
          {/* home page */}
          <button onClick={() => window.location.href = '/'} className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded">Home</button>
          <button onClick={handleLogout} className="text-red-600 hover:text-red-800 px-3 py-2 rounded">Logout</button>
        </div>
      </nav>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Rooms Available</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {rooms.map((room) => (
            <div key={room._id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <img src={room.photo} alt={room.name} className="mt-2 rounded" width={100} height={100} />
              <p>Type: {room.type}</p>
              <Link href={`/rooms?id=${room._id}`} legacyBehavior>
                <a className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">View Details</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrowseRooms;
