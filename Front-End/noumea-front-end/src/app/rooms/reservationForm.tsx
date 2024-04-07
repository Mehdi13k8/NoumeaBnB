"use client"; // This is a client component
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isWithinInterval } from 'date-fns';

const RoomReservationForm = ({ existingReservations }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Function to check if a date should be disabled
  const isDateDisabled = (date) => {
    return existingReservations.some(reservation => {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      // Check if the date falls within any of the reservation intervals
      return !isWithinInterval(date, { start, end });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission goes here
    alert(`Booking from ${startDate.toDateString()} to ${endDate.toDateString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={date => {
            setStartDate(date);
            // Automatically adjust the end date if it's before the new start date
            if (date > endDate) {
              setEndDate(addDays(date, 1));
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          filterDate={isDateDisabled} // Use filterDate to disable dates
          minDate={new Date()}
        />
      </div>
      <div>
        <label>End Date: </label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          filterDate={isDateDisabled} // Disable dates for the end date picker as well
          minDate={startDate}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Confirm Reservation
      </button>
    </form>
  );
};

export default RoomReservationForm;
