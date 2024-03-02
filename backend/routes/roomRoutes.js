// routes/roomRoutes.js

const express = require('express');
const router = express.Router();
// const Room = require('../models/roomModel');
const Room = require('../Models/roomModel')

router.post('/addRoom', async (req, res) => {
  try {
    const {
      roomName,
      LocationName,
      roomType,
      phoneNumber,
      description,
      rentperday,
      imageurls,
      availability,
      userId,
      guests,
      bedrooms,
      beds,
      bathrooms,
      reviews,
      amenities,
    } = req.body;

    const newRoom = new Room({
      name: roomName,
      LocationName,
      type: roomType,
      phonenumber: phoneNumber,
      description:description,
      rentperday: rentperday,
      imageurls: imageurls,
      availability: availability,
      addedBy: userId,
      guests: guests,
      bedrooms: bedrooms,
      beds: beds,
      bathrooms: bathrooms,
      reviews: reviews,
      amenities: amenities,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getAllRooms', async (req, res) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//update or edit room details
// router.put('/editRoom/:roomId', async (req, res) => {
//   try {
//     const {
//       roomName,
//       LocationName,
//       roomType,
//       phoneNumber,
//       description,
//       rentperday,
//       imageurls,
//       availability,
//       kitchen,
//       guests,
//       bedrooms,
//       beds,
//       bathrooms,
//       reviews,
//       amenities, // Assuming amenities are sent as an object in the request body
//     } = req.body;

//     const updatedRoom = await Room.findByIdAndUpdate(
//       req.params.roomId,
//       {
//         name: roomName,
//         LocationName,
//         type: roomType,
//         phonenumber: phoneNumber,
//         description: description,
//         rentperday: rentperday,
//         imageurls: imageurls,
//         availability: availability,
//         guests: guests,
//         bedrooms: bedrooms,
        
//         beds: beds,
//         bathrooms: bathrooms,
//         reviews: reviews,
//         amenities: {
//           kitchen: amenities.kitchen || false,
//           wifi: amenities.wifi || false,
//           freeParking: amenities.freeParking || false,
//           washingMachine: amenities.washingMachine || false,
//           firepit: amenities.firepit || false,
//           carbonMonoxideAlarm: amenities.carbonMonoxideAlarm || false,
//           smokeAlarm: amenities.smokeAlarm || false,
//           Security_cameras: amenities.Security_cameras || false,
//           TV: amenities.TV || false,
//           Dryer: amenities.Dryer || false,
//           AirConditioning: amenities.AirConditioning || false,
//           Heating: amenities.Heating || false,
//           Hot_water: amenities.Hot_water || false,
//         },
//       },
//       { new: true }
//     );

//     if (!updatedRoom) {
//       return res.status(404).json({ error: 'Room not found' });
//     }

//     res.status(200).json(updatedRoom);
//   } catch (error) {
//     console.error('Error updating room:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
router.put('/editRoom/:roomId', async (req, res) => {
  try {
    const {
      roomName,
      LocationName,
      roomType,
      phoneNumber,
      description,
      rentperday,
      imageurls,
      availability,
      guests,
      bedrooms,
      beds,
      bathrooms,
      reviews,
      amenities = {}, // Set default value as an empty object
    } = req.body;
    console.log('Request Body:', req.body);


    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      {
        name: roomName,
        LocationName,
        type: roomType,
        phonenumber: phoneNumber,
        description: description,
        rentperday: rentperday,
        imageurls: imageurls,
        availability: availability,
        guests: guests,
        bedrooms: bedrooms,
        beds: beds,
        bathrooms: bathrooms,
        reviews: reviews,
        amenities: {
          kitchen: amenities.kitchen || false,
          wifi: amenities.wifi || false,
          freeParking: amenities.freeParking || false,
          washingMachine: amenities.washingMachine || false,
          firepit: amenities.firepit || false,
          carbonMonoxideAlarm: amenities.carbonMonoxideAlarm || false,
          smokeAlarm: amenities.smokeAlarm || false,
          Security_cameras: amenities.Security_cameras || false,
          TV: amenities.TV || false,
          Dryer: amenities.Dryer || false,
          AirConditioning: amenities.AirConditioning || false,
          Heating: amenities.Heating || false,
          Hot_water: amenities.Hot_water || false,
        },
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Delete Room
router.delete('/deleteRoom/:roomId', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.roomId);

    if (!deletedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/getRoomDetails/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId; 
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching room details by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Update Status - Mark room as not booked
router.put('/unbookRoom/:roomId', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { status: 'not booked' },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
