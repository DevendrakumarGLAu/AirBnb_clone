import React, { useState, useEffect } from "react";
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
  const { roomId } = useParams();
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
        // console.log("roomId", roomId);
        if (roomId) {
          const response = await axios.get(`${apiUrl}/api/rooms/getRoomDetails/${roomId}`);
          const room = response.data;
          console.log("room update data", room);

          setValue('roomName', room.name);
          setValue('rentPerDay', room.rentperday);
          setValue('googleLocation',room.googleLocation);
          // setValue('roomType', room.type);
          // console.log('Before setValue - roomType:', room.type);
          setValue('roomType', room.type.toLowerCase());
          // console.log('After setValue - roomType:', getValues('roomType'));
          // setValue('roomType', room.type.toLowerCase());
          setValue('phoneNumber', room.phonenumber);
          setValue('image1', room.imageurls[0]);
          setValue('image2', room.imageurls[1]);
          setValue('image3', room.imageurls[2]);
          setValue('guests', room.guests);
          setValue('bedrooms', room.bedrooms);
          setValue('beds', room.beds);
          setValue('bathrooms', room.bathrooms);
          setValue('reviews', room.reviews);
          setValue('description', room.description);
          setValue('LocationName', room.LocationName);

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

          // Set checkbox values for amenities
          Object.keys(room.amenities).forEach((amenity) => {
            setValue(`amenities.${amenity}`, room.amenities[amenity] || false);
          });
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
        description: data.description,
        LocationName: data.LocationName,
        roomType: data.roomType,
        rentperday: data.rentPerDay,
        googleLocation:data.googleLocation,
        phoneNumber: data.phoneNumber,
        imageurls: [data.image1, data.image2, data.image3],
        userId: getUserIdFromLocalStorage(),
        availability: {
          startDate: availability[0].startDate,
          endDate: availability[0].endDate,
        },
        guests: parseInt(data.guests), // Convert to integer
        bedrooms: parseInt(data.bedrooms), // Convert to integer
        beds: parseInt(data.beds), // Convert to integer
        bathrooms: parseInt(data.bathrooms), // Convert to integer
        reviews: parseInt(data.reviews), // Convert to integer
        amenities: {
          kitchen: !!data.amenities?.kitchen,
          wifi: !!data.amenities?.wifi,
          freeParking: !!data.amenities?.freeParking,
          washingMachine: !!data.amenities?.washingMachine,
          firepit: !!data.amenities?.firepit,
          carbonMonoxideAlarm: !!data.amenities?.carbonMonoxideAlarm,
          smokeAlarm: !!data.amenities?.smokeAlarm,
          Security_cameras: !!data.amenities?.Security_cameras,
          TV: !!data.amenities?.TV,
          Dryer: !!data.amenities?.Dryer,
          AirConditioning: !!data.amenities?.AirConditioning,
          Heating: !!data.amenities?.Heating,
          Hot_water: !!data.amenities?.Hot_water,
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
      <div className="card p-2 mb-3" style={{ width: "48rem", marginLeft: "20%" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-2">
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <h6>
                  <label htmlFor="roomName " className="form-label">
                    Room Location
                  </label>
                </h6>
                <input
                  type="text"
                  className="form-control"
                  id="roomName"
                  {...register("roomName", { required: true })}
                />
              </div>

            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="LocationName" className="form-label">
                  <h6>Country Location Name</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="LocationName"
                  {...register("LocationName", { required: true })}
                />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label htmlFor="roomName" className="form-label">
                  <h6>Phone Number</h6>
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
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="image1" className="form-label">
                  <h6>First Image Address</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image1" placeholder="enter image url"
                  {...register("image1", { required: true })}
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="image2" className="form-label">
                  <h6>Second Image Address</h6>
                </label>
                <input
                  type="text"
                  className="form-control" placeholder="enter image url"
                  id="image2"
                  {...register("image2", { required: true })}
                />
              </div>
            </div>
            <div className="mb-3 mr-2">
              <label htmlFor="image3" className="form-label">
                <h6>Third Image Address</h6>
              </label>
              <input
                type="text"
                className="form-control" placeholder="enter image url"
                id="image3"
                {...register("image3", { required: true })}
              />
            </div>
          </div>
          {/* value={getValues("roomType") || ""}
                  onChange={(e) => setValue("roomType", e.target.value)} */}
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  <h6>Room Type</h6>
                </label>
                <select
                  {...register("roomType", {required:true})}
                  className="form-control"
                >
                  <option value="">Please select type of room</option>
                  <option value="delux">Delux</option>
                  <option value="non-delux">Non-Delux</option>
                </select>
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label htmlFor="rentPerDay" className="form-label">
                  <h6>Rent Per Day</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="rentPerDay"
                  {...register("rentPerDay", { required: true })}
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="rentPerDay" className="form-label">
                  <h6>Google Location</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="googleLocation"
                  placeholder="enter google location here"
                  {...register("googleLocation", { required: true })}
                />
              </div>
            </div>
            
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <h6>Description</h6>
            </label>
            <textarea
              className="form-control"
              id="description"
              {...register("description", { required: true })}
            />
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="guests" className="form-label">
                  <h6>Guests </h6>
                </label>
                <select
                  className="form-select mx-2"
                  id="guests"
                  {...register("guests", { required: true })}
                >
                  <option value="">Select Guests</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label htmlFor="bedrooms" className="form-label">
                  <h6>Bedrooms </h6>
                </label>
                <select
                  className="form-select mx-2"
                  id="bedrooms"
                  {...register("bedrooms", { required: true })}
                >
                  <option value="">Select Bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="beds" className="form-label">
                  <h6>Beds </h6>
                </label>
                <select
                  className="form-select mx-2"
                  id="beds"
                  {...register("beds", { required: true })}
                >
                  <option value="">Select Beds</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>

            <div className="col">
              <div className="mb-3 ">
                <label htmlFor="bathrooms" className="form-label">
                  <h6>Bathrooms </h6>
                </label>
                <select
                  className="form-select mx-2"
                  id="bathrooms"
                  {...register("bathrooms", { required: true })}
                >
                  <option value="">Select Bathrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="reviews" className="form-label">
              <h6>Reviews </h6>
            </label>
            <select
              className="form-select mx-2"
              id="reviews"
              {...register("reviews", { required: true })}
            >
              <option value="">Select Star Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label"><h6>Amenities</h6></label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="kitchen"
                    {...register("amenities.kitchen")}
                  />
                  <label className="form-check-label" htmlFor="kitchen">
                    Kitchen
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wifi"
                    {...register("amenities.wifi")}
                  />
                  <label className="form-check-label" htmlFor="wifi">
                    Wifi
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="freeParking"

                    {...register("amenities.freeParking")}
                  />
                  <label className="form-check-label" htmlFor="freeParking">
                    Free Parking
                  </label>
                </div>
                {/* Add more amenities as needed */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="washingMachine"
                    {...register("amenities.washingMachine")}
                  />
                  <label className="form-check-label" htmlFor="washingMachine">
                    Washing Machine
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="firepit"
                    {...register("amenities.firepit")}
                  />
                  <label className="form-check-label" htmlFor="firepit">
                    Firepit
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="carbonMonoxideAlarm"
                    {...register("amenities.carbonMonoxideAlarm")}
                  />
                  <label className="form-check-label" htmlFor="carbonMonoxideAlarm">
                    Carbon Monoxide Alarm
                  </label>
                </div>


                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="smokeAlarm"
                    {...register("amenities.smokeAlarm")}
                  />
                  <label className="form-check-label" htmlFor="smokeAlarm">
                    Smoke Alarm
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Security_cameras"
                    {...register("amenities.Security_cameras")}
                  />
                  <label className="form-check-label" htmlFor="Security_cameras">
                    Security Cameras
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="TV"
                    {...register("amenities.TV")}
                  />
                  <label className="form-check-label" htmlFor="TV">
                    TV
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Dryer"
                    {...register("amenities.Dryer")}
                  />
                  <label className="form-check-label" htmlFor="Dryer">
                    Dryer
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="AirConditioning"
                    {...register("amenities.AirConditioning")}
                  />
                  <label className="form-check-label" htmlFor="AirConditioning">
                    Air Conditioning
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Heating"
                    {...register("amenities.Heating")}
                  />
                  <label className="form-check-label" htmlFor="Heating">
                    Heating
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Hot_water"
                    {...register("amenities.Hot_water")}
                  />
                  <label className="form-check-label" htmlFor="Hot_water">
                    Hot water
                  </label>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="availability" className="form-label">
                  <h6>Availability</h6>
                </label>
                <DateRange
                  ranges={[availability[0]]} // DateRange component expects an array of ranges
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>



          <hr></hr>

          <div className="d-flex justify-content-end ">
            <div className="p-2">
              <button type="button" className="btn btn-danger">
                Reset
              </button>
            </div>
            <div className="p-2">
              <button type="submit" className="btn btn-primary">
                {roomId ? 'Update Room' : 'Add Room'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
