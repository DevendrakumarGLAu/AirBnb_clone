// RoomDetails.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../usersScreen/RoomDetails.css";
import { useNavigate } from "react-router-dom";
import FooterScreen from "../common/FooterScreen";


function RoomDetails() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isRoomBooked, setIsRoomBooked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/rooms/getRoomById/${roomId}`
        );
        // console.log("rooms details",response.data)
        setRoomDetails(response.data);
        setIsRoomBooked(response.data.status === "booked");
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleBookRoom = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('name');
  
      if (roomDetails.status === 'not booked') {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/bookings/bookRoom/${roomId}`,
          {
            userId,
            userName,
            roomDetails
          } 
        );
        
  
        if (response.status === 200) {
          let answer = window.confirm("Do you want to book room");
          if(answer){
            alert("Your room booked succesfully")
            console.log("Room booked successfully:", response.data);

            setIsRoomBooked(true);
            navigate("/home");
          }
         
        } else {
          console.error("Failed to Book room. Server response:", response.status);
        }
      } else {
        console.error("Room already booked");
      }
    } catch (error) {
      console.error("Error booking room:", error);
    }
  }; 
  
  const renderImageCarousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className="card m-2">
      <div className="card-body d-flex justify-content-center flex-wrap">
        {roomDetails.imageurls.map((url, index) => (
          <div key={index} className="m-2">
            <img
              src={url}
              alt={`Image ${index + 1}`}
              style={{ height: "200px", width: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
    );
  };

  return (
    <div>
      
      {roomDetails ? (
        <div>
          <h2>Room Details</h2>

          <table className="table p-2">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Room Name</th>
                <th scope="col">Room Type</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Rent Per Day</th>
                <th scope="col">Available On</th>
                <th scope="col">Available upto</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{roomDetails.name}</td>
                <td>{roomDetails.type}</td>
                <td>{roomDetails.phonenumber}</td>
                <td>{roomDetails.rentperday}</td>
                <td>{new Date(roomDetails.availability?.startDate).toLocaleDateString()}</td>
                <td>{new Date(roomDetails.availability?.endDate).toLocaleDateString()}</td>
                <td>
                  {isRoomBooked ? (
                    <p>Room already booked</p>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={handleBookRoom}
                    >
                      Book Now
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {renderImageCarousel()}
        </div>
      ) : (
        <div>No room details found.</div>
      )}
<FooterScreen/>

    </div>
    
  );
}

export default RoomDetails;
