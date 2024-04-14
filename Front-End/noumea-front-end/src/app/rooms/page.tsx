"use client"; // This is a client component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomReservationForm from './reservationForm';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Correct import for Next.js new navigation system


const RoomDetails = () => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState([]);

  const router = useRouter();
  // get the room ID from the URL
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/reservations/room/${id}`);
        setReservation(response.data);
      } catch (error) {
        console.error('Error fetching reservation details:', error);
      }
    };

    fetchRoomDetails();
    fetchReservation();
  }, [id, router.isReady]); // Ensure dependencies are correctly listed

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Link legacyBehavior href="/rooms"><a className="text-blue-500 hover:text-blue-700">Back to Rooms</a></Link>
        <Link legacyBehavior href="/dashboard"><a className="text-green-500 hover:text-green-700">Go to Dashboard</a></Link>
        <button onClick={() => { localStorage.removeItem('token'); router.push('/login'); }} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Disconnect</button>
      </div>
      <br />
      <h1 className="text-3xl font-bold text-center">{room?.name}</h1>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <img src={room?.photo} alt={room?.name} className="rounded shadow-lg mb-4" />
          <div className="flex mt-2">
            {room?.photos?.map((photo, index) => (
              <img key={index} src={photo} alt={`Room view ${index + 1}`} className="w-1/3 p-1" />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <p><strong>Type:</strong> {room?.type}</p>
          <p><strong>Price:</strong> ${room?.price} per night</p>
          <p><strong>Description:</strong> {room?.description}</p>
          <p><strong>Status:</strong> {room?.isAvailable ? "Available" : "Not Available"}</p>
          <h2 className="text-xl font-bold mt-4 mb-2">Reviews</h2>
          {room?.reviews?.map((review, index) => (
            <p key={index}><strong>{review.user}:</strong> {review.review}</p>
          ))}
          <h2 className="text-xl font-bold mt-4">Book This Room</h2>
          <RoomReservationForm existingReservations={reservation} room={room} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
