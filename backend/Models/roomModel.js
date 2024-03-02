// models/roomModel.js
const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    LocationName: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    phonenumber: { type: String, required: true },
    rentperday: { type: Number, required: true },
    imageurls: [{ type: String }], 
    description: { type: String, required: true },
    availability: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['not booked', 'booked'], default: 'not booked' },
    bookedBy: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      userName: { type: String },
    },
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    reviews: { type: Number, default: 0 },
    googleLocation: { type: String },
    amenities: {
      kitchen: { type: Boolean, default: false },
      wifi: { type: Boolean, default: false },
      freeParking: { type: Boolean, default: false },
      washingMachine: { type: Boolean, default: false },
      firepit: { type: Boolean, default: false },
      carbonMonoxideAlarm: { type: Boolean, default: false },
      smokeAlarm: { type: Boolean, default: false },
      Security_cameras: { type: Boolean, default: false },
      TV: { type: Boolean, default: false },
      Dryer: { type: Boolean, default: false },
      AirConditioning: { type: Boolean, default: false },
      Heating: { type: Boolean, default: false },
      Hot_water: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

// const Room = mongoose.model('Room', roomSchema);
const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);
module.exports = Room;
