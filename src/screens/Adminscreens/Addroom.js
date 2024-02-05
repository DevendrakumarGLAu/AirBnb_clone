import React, { useState ,useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { useParams } from 'react-router-dom';


function AddRoom() {
  const { register, handleSubmit, setValue } = useForm();
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { roomId } = useParams(); // Assuming you're using react-router
  const [availability, setAvailability] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        if (roomId) {
          const response = await axios.get(`${apiUrl}/api/rooms/getRoomById/${roomId}`);
          const room = response.data;
  
          setValue('roomName', room.name);
          setValue('rentPerDay', room.rentperday);
          setValue('roomType', room.type);
          setValue('phoneNumber', room.phonenumber);
          setValue('image1', room.imageurls[0]);
          setValue('image2', room.imageurls[1]);
          setValue('image3', room.imageurls[2]);
  
          // Check if availability exists and has valid startDate and endDate
          if (room.availability && room.availability.startDate && room.availability.endDate) {
            setAvailability([
              {
                startDate: new Date(room.availability.startDate),
                endDate: new Date(room.availability.endDate),
                key: 'selection',
              },
            ]);
          } else {
            console.error('Invalid availability details:', room.availability);
            setAvailability([
              {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
              },
            ]);
          }
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };
  
    fetchRoomDetails();
  }, [roomId, setValue]);
  
  

  const handleDateChange = (ranges) => {
    setAvailability([ranges.selection]);
  };

  const getUserIdFromLocalStorage = () => {
    const userId = localStorage.getItem('userId');
    return userId;
  };

  const onSubmit = async (data) => {
    try {
      const roomData = {
        roomName: data.roomName,
        roomType: data.roomType,
        rentperday: data.rentPerDay,
        phoneNumber: data.phoneNumber,
        imageurls: [data.image1, data.image2, data.image3],
        userId: getUserIdFromLocalStorage(),
         availability: {
          startDate: availability[0].startDate,
          endDate: availability[0].endDate,
        },
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      if (roomId) {
        const response = await axios.put(
          `${apiUrl}/api/rooms/editRoom/${roomId}`,
          roomData,
          { headers }
        );

        if (response.status >= 200 && response.status < 300) {
          console.log('Room updated successfully:', response.data);
          navigate('/home');
        } else {
          console.error('Failed to update room. Server response:', response.status);
        }
      } else {
        const response = await axios.post(
          `${apiUrl}/api/rooms/addRoom`,
          roomData,
          { headers }
        );

        if (response.status >= 200 && response.status < 300) {
          console.log('Room added successfully:', response.data);
          navigate('/home');
        } else {
          console.error('Failed to add room. Server response:', response.status);
        }
      }
    } catch (error) {
      console.error('Error adding/updating room:', error);
    }
  };


  return (
    <div>
      <h2 className="text-center">Add Room</h2>
      <div className="card p-2" style={{ width: "48rem", marginLeft: "20%" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-2">
          <div class="row">
            <div class="col">
              <div className="mb-3">
                <label htmlFor="roomName" className="form-label">
                  Room Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomName"
                  {...register("roomName", { required: true })}
                />
              </div>

            </div>

            <div class="col">
              <div className="mb-3">
                <label htmlFor="rentPerDay" className="form-label">
                  Rent Per Day
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="rentPerDay"
                  {...register("rentPerDay", { required: true })}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <select
                  onChange={(e) => setValue("roomType", e.target.value)}
                  className="form-control"
                >
                  <option value="">Please select type of room</option>
                  <option value="delux">Delux</option>
                  <option value="non-delux">Non-Delux</option>
                </select>
              </div>
            </div>

            <div class="col">
              <div className="mb-3">
                <label htmlFor="roomName" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomName"
                  {...register("phoneNumber", { required: true })}
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div className="mb-3">
                <label htmlFor="image1" className="form-label">
                  Image 1 URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image1"
                  {...register("image1", { required: true })}
                />
              </div>
            </div>
            <div class="col">
              <div className="mb-3">
                <label htmlFor="image2" className="form-label">
                  Image 2 URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image2"
                  {...register("image2", { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="image3" className="form-label">
              Image 3 URL
            </label>
            <input
              type="text"
              className="form-control"
              id="image3"
              {...register("image3", { required: true })}
            />
          </div>
          <div className="mb-3">
    <label htmlFor="availability" className="form-label">
      Availability
    </label>
    <DateRange
          ranges={[availability[0]]} // DateRange component expects an array of ranges
          onChange={handleDateChange}
        />
  </div>
          <div class="d-flex justify-content-end">
            <div class="p-2">
              <button type="button" class="btn btn-danger">
                Reset
              </button>
            </div>
            <div class="p-2">
              <button type="submit" className="btn btn-primary">
                Add Room
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
