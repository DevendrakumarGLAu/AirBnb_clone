import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./Adminrooms.css"
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
      <h2 className='mt-4'>Admin Rooms</h2>
      <div className='card' style={{ width: "97%", marginLeft: "1%" }}>
        <div className='card-body'>
          {rooms.length === 0 ? (
            <p>You haven't added any rooms yet.</p>
          ) : (
            <div className="table-container" style={{ overflowY: "auto", maxHeight: "500px" }}>
              <table className="table table-sticky-header table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Room Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Rent Per Day</th>
                    <th scope="col">Status</th>
                    {isAddedByCurrentUser && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr key={room._id}>
                      <td scope="row">{index + 1}</td>
                      <td scope="row">{room.name}</td>
                      <td scope="row">{room.phonenumber}</td>
                      <td scope="row">{room.rentperday}</td>
                      <td scope="row" style={{ fontWeight: "bolder", color: room.status === 'booked' ? 'green' : 'red' }}>{room.status === 'booked' ? 'Booked' : 'Not Booked'}</td>
                      {isAddedByCurrentUser(room.addedBy) && (
                        <td scope="row">
                          <div className="d-flex justify-content-start">
                            <button className="btn btn-secondary mx-2" onClick={() => handleDelete(room._id)}>Delete</button>
                            <button className="btn btn-primary">
                              <Link to={`/editroom/${room._id}`} style={{ color: "white" }}>Edit</Link>
                            </button>

                            <button className="btn btn-primary mx-2">
                              <Link to={`/getRoomDetails/${room._id}`} style={{ color: "white" }}>View Details</Link>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Adminrooms;
