import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays, differenceInDays, isMonday, format, eachDayOfInterval, isSaturday, isSunday } from 'date-fns';

const RoomReservationForm = ({ existingReservations, room }) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, implement the submission logic, such as sending the data to your backend API
    // console.log({ startDate, endDate, includeChildren, includeChildrenBed, totalPrice });
  };

  // Function to update state and recalculate price when form inputs change
  const handleFormChange = () => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  };

  // Block all Mondays
  const isDayBlocked = (date) => {
    // Block the day if it is a Monday
    if (isMonday(date)) return false;
    // Also block the day if it falls within any of the existing reservations
    return existingReservations.some(reservation => {
      const reservationStartDate = new Date(reservation.startDate);
      const reservationEndDate = new Date(reservation.endDate);
      return date >= reservationStartDate && date <= reservationEndDate;
    });
  };

  useEffect(() => {
    handleFormChange();
  }, [startDate, endDate, includeChildren, includeChildrenBed]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="date-picker">
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            // setStartDate(date);
            // save date as yyyy-mm-dd
            setStartDate(date);
            handleFormChange();
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          filterDate={isDayBlocked}
          placeholderText="Select start date"
          className="border p-2 rounded mb-2"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="date-picker">
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            if (startDate && date > startDate) {
              setEndDate(date);
              handleFormChange();
            } else if (startDate && date < startDate) {
              // show alert
              alert("End date should be greater than start date");
            }
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          filterDate={isDayBlocked}
          placeholderText="Select end date"
          className="border p-2 rounded mb-2"
          // show date in yyyy-mm-dd format
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={includeChildren} onChange={() => setIncludeChildren(!includeChildren)} />
          Include children
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={includeChildrenBed} onChange={() => setIncludeChildrenBed(!includeChildrenBed)} />
          Include children's bed
        </label>
      </div>
      <div>Total Price: ${totalPrice.toFixed(2)}</div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Confirm Reservation</button>
    </form>
  );
};

export default RoomReservationForm;
