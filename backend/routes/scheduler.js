// scheduler.js

const cron = require('node-cron');
const Room = require('./models/roomModel');

const scheduleExpiredRoomsTask = () => {
  // Schedule a task to run every day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      // Get all booked rooms where the end date has passed
      const expiredRooms = await Room.find({
        status: 'booked',
        'availability.endDate': { $lt: new Date() }
      });

      // Update the status of expired rooms
      await Promise.all(expiredRooms.map(async (room) => {
        room.status = 'not booked';
        room.bookedBy = null;
        await room.save();
      }));

      console.log('Expired rooms processed:', expiredRooms.length);
    } catch (error) {
      console.error('Error processing expired rooms:', error);
    }
  });
};

module.exports = scheduleExpiredRoomsTask;
