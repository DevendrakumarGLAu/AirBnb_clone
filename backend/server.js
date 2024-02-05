//backend/server.js

const express= require('express');
const cors = require("cors");
const app= express();
const connectDB= require('./DatabaseConnection/Db');
// const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/userRoute");
const roomRoutes = require("./routes/roomRoutes");
// const bookingRoute = require("./routes/bookingRoute");
const bookingsRouter = require('./routes/bookingRoutes'); // Adjust the path as needed


connectDB();
app.use(cors());
app.use(express.json());
// app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingsRouter);

// app.use("/api/bookings", bookingRoute);


const port= process.env.PORT || 5000;
app.listen(port, ()=> console.log(`server is running at ${port} port!` ))