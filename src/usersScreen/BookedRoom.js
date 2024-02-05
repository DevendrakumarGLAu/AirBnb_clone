// BookedRoom.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookedRoom() {
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/bookings/bookedRooms/${userId}`
        );
        setBookedRooms(response.data);
      } catch (error) {
        console.error('Error fetching booked rooms:', error);
      }
    };

    fetchBookedRooms();
  }, []);

  const handleCancelBooking = async (roomId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/bookings/cancelBooking/${roomId}`
      );

      if (response.status === 200) {
        console.warn('Booking cancelled successfully:', response.data);
        setBookedRooms(response.data);
      } else {
        console.error('Failed to cancel booking. Server response:', response.status);
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const calculateTotalCost = (room) => {
    const startDate = new Date(room.availability.startDate);
    const endDate = new Date(room.availability.endDate);
    const rentPerDay = room.rentperday;

    const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const totalCost = numberOfDays * rentPerDay;

    return totalCost;
  };

  const renderBookedRooms = () => {
    if (!Array.isArray(bookedRooms) || bookedRooms.length === 0) {
      return <p>No rooms booked by the user.</p>;
    }
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };

    return (
      <div>
        <div className='card' style={{width:"98%", marginLeft:"1%"}}>      
          <table className="table p-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Room Name</th>
            <th scope="col">Room Type</th>
            <th scope="col">Rent Per day</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
            <th scope="col">Total Cost</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedRooms.map((room, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{room.name}</td>
              <td>{room.type}</td>
              <td>{room.rentperday}</td>
              <td>{room.phonenumber}</td>
              <td>{formatDate(room.availability.startDate)}</td>
            <td>{formatDate(room.availability.endDate)}</td>
            <td>{calculateTotalCost(room)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleCancelBooking(room._id)}
                >
                  Cancel booking
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>

    );
  };

  return (
    <div>
      <h2>Booked Rooms</h2>
      {renderBookedRooms()}
    </div>
  );
}

export default BookedRoom;
