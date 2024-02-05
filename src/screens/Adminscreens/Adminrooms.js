import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function Adminrooms() {
  const [rooms, setRooms] = useState([]);
  const loggedInUserId = localStorage.getItem('userId');
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [editedRoomDetails, setEditedRoomDetails] = useState({
    roomName: '',
    roomType: '',
    phoneNumber: '',
    rentperday: 0,
    imageurls: [],
    availability: { startDate: null, endDate: null },
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rooms/getAllRooms`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const isAddedByCurrentUser = (addedByUserId) => {
    return loggedInUserId === addedByUserId;
  };

  const handleEditRoom = async (roomId) => {
    try {
      const existingRoom = rooms.find(room => room._id === roomId);
      setEditedRoomDetails(existingRoom);
      navigate(`/editroom/${roomId}`);
    } catch (error) {
      console.error('Error fetching room details for edit:', error);
    }
  };

  const handleUpdateRoom = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/rooms/editRoom/${roomId}`,
        editedRoomDetails
      );
      console.log('Room updated successfully:', response.data);
      // Add logic to handle the updated room details if needed
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleDelete = async (roomId) => {
    try {
        console.warn('Warning: Deleting a room. This action is irreversible.');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/rooms/deleteRoom/${roomId}`);
      setRooms(prevRooms => prevRooms.filter(room => room._id !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error);

    }
  };

  return (
<div>
      <h2>Admin Rooms</h2>
      {rooms.length === 0 ? (
        <p>You haven't added any rooms yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Room Name</th>
              <th>Phone Number</th>
              <th>Rent Per Day</th>
              <th>Status</th>
              {isAddedByCurrentUser && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room._id}>
                <td>{index + 1}</td>
                <td>{room.name}</td>
                <td>{room.phonenumber}</td>
                <td>{room.rentperday}</td>
                <td>{room.status === 'true' ? 'Booked' : 'Not Booked'}</td>
                {isAddedByCurrentUser(room.addedBy) && (
                  <td>
                    <div className="d-flex justify-content-start">
                      <button className="btn btn-secondary mx-2" onClick={() => handleDelete(room._id)}>Delete</button>
                      <button className="btn btn-primary">
                        <Link to={`/editroom/${room._id}`} style={{ color: "white" }}>Edit</Link>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Adminrooms;
