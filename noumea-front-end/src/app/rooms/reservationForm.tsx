import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays, differenceInDays, isMonday, format, eachDayOfInterval, isSaturday, isSunday } from 'date-fns';
import axios from 'axios';
import Swal from 'sweetalert2'

const RoomReservationForm = ({ existingReservations, room }: any) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeChildren, setIncludeChildren] = useState(false);
  const [includeChildrenBed, setIncludeChildrenBed] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to calculate total price
  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    // let totalDays = addDays(endDate, 1) - startDate; // Add one to include the end date
    // get number of nights
    let totalDays = differenceInDays(endDate, startDate);
    let price = 0;
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // console.log("days", days, totalDays);
    days.forEach(day => {
      const isWeekend = isSaturday(day) || isSunday(day);
      // Base room price if not a weekend
      if (!isWeekend)
        price += room.price;
      else
        price += room.weekendPrice;
      // Adjust for children price, but not on weekends
      if (includeChildren && !isWeekend) {
        price += room.childrenPrice;
      } else if (includeChildren && isWeekend) {
        price += room.childrenWeekendPrice;
      }
    });
    // Children bed price is a one-time fee, not dependent on the number of days
    if (includeChildrenBed) {
      price += room.childrenBedPrice;
    }
    return price;
  };


  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    };
    console.log("header", startDate, endDate, room, includeChildren, includeChildrenBed);
    const reservationData = {
      roomId: room._id,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      totalPrice: calculateTotalPrice(),
      numberOfAdults: 1,
      includeChildren,
      includeChildrenBed
    };

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/reservations', reservationData, { headers: header });
      // sweet alert
      Swal.fire({
        title: 'Reservation Created!',
        text: 'Your reservation has been successfully created.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      });
    } catch (error: any) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation. Error: ' + error.response.data.error);
    }
  };

  // Function to update state and recalculate price when form inputs change
  const handleFormChange = () => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  };

  // Block all Mondays
  const isDayBlocked = (date: any) => {
    // Block the day if it is a Monday
    if (isMonday(date)) return false;
    // Also block the day if it falls within any of the existing reservations
    return existingReservations.some((reservation: any) => {
      const reservationStartDate = new Date(reservation.startDate);
      const reservationEndDate = new Date(reservation.endDate);
      const isBlocked = date <= reservationStartDate || date >= reservationEndDate;
      return isBlocked;
      console.log("-->", date >= reservationStartDate && date <= reservationEndDate);
      // if date is in between start and end date of any reservation, block it
      return date >= reservationStartDate && date <= reservationEndDate;
    });
  };

  useEffect(() => {
    handleFormChange();
  }, [startDate, endDate, includeChildren, includeChildrenBed, handleFormChange]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="date-picker">
        <label>Start Date:</label>
        <DatePicker
          selected={startDate ? new Date(startDate) : null}
          onChange={(date: any) => {
            // setStartDate(date);
            // save date as yyyy-mm-dd
            setStartDate(date);
            handleFormChange();
          }}
          selectsStart
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
          filterDate={isDayBlocked}
          placeholderText="Select start date"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="date-picker">
        <label>End Date:</label>
        <DatePicker
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          selected={endDate ? new Date(endDate) : null}
          onChange={(date: any) => {
            if (startDate && date > startDate) {
              setEndDate(date);
              handleFormChange();
            } else if (startDate && date < startDate) {
              // show alert
              alert("End date should be greater than start date");
            }
          }}
          selectsEnd
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
          minDate={startDate ? new Date(startDate) : null}
          filterDate={isDayBlocked}
          placeholderText="Select end date"
          // show date in yyyy-mm-dd format
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label>
          <input className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            type="checkbox" checked={includeChildren} onChange={() => setIncludeChildren(!includeChildren)} />
          Include children
        </label>
      </div>
      <div className="flex items-center">
        <label className="ml-2 block text-sm text-gray-900">
          <input className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            type="checkbox" checked={includeChildrenBed} onChange={() => setIncludeChildrenBed(!includeChildrenBed)} />
          Include children bed
        </label>
      </div>
      <div className="text-lg font-medium">
        Total Price: ${totalPrice.toFixed(2)}</div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Confirm Reservation</button>
    </form>
  );
};

export default RoomReservationForm;
