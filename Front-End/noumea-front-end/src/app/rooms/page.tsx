"use client"; // This is a client component

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import RoomReservationForm from './reservationForm';

const RoomDetails = () => {
  // Assuming "id" is passed correctly through query parameters or another method
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const SearchParamsContext = useSearchParams();
  const id = SearchParamsContext.get('id');
  const [reservation, setReservation] = useState([]);

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

    // get reservation on this room /reservations/room/:id
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/reservations/room/${id}`);
        console.log(response.data);
        setReservation(response.data);
      } catch (error) {
        console.error('Error fetching reservation details:', error);
      }
    }

    fetchReservation();
    fetchRoomDetails();
  }, [id]); // Adjust dependencies based on how you retrieve the room's ID

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">{room?.name}</h1>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <img src={room?.photo} alt={room?.name} className="rounded shadow" />
          <div className="flex mt-2">
            {room?.photos.map((photo, index) => (
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
          {room?.reviews.map((review, index) => (
            <p key={index}><strong>{review.user}:</strong> {review?.review}</p>
          ))}
          <h2 className="text-xl font-bold mt-4">Book This Room</h2>
          {/* Simple reservation form */}
          {/* <form> */}
            {/* <input type="date" className="border p-2 rounded mb-2" /> */}
            {/* <button type="submit" className="bg-blue-500 text-white p-2 rounded">Reserve</button> */}
            <RoomReservationForm existingReservations={reservation} dailyRate={room.price} />
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
