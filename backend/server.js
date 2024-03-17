//backend/server.js
require('dotenv').config();
const express= require('express');
const cors = require("cors");
const app= express();
const connectDB= require('./DatabaseConnection/Db');
// const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/userRoute");
const roomRoutes = require("./routes/roomRoutes");
const bookingsRouter = require('./routes/bookingRoutes'); 
const scheduleExpiredRoomsTask = require('./routes/scheduler');
connectDB();
app.use(cors());
app.use(express.json());
scheduleExpiredRoomsTask();

app.use("/api/users", usersRoute);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingsRouter);



const port = process.env.PORT || 5002;
app.listen(port, ()=> console.log(`server is running at ${port} port!` ))