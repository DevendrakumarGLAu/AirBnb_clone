import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './common/login';
import Navbar from './common/Navbar';
import Signup from './common/Signup';
import Home from './common/Home';
import Profile from './common/Profile';
import Addroom from './screens/Adminscreens/Addroom'
import Adminrooms from './screens/Adminscreens/Adminrooms'
import AdminroomsPhoto from './screens/Adminscreens/AdminroomsPhoto'
import RoomDetails from './usersScreen/RoomDetails';
import BookedRoom from './usersScreen/BookedRoom'
import Adminroomsdetails from './screens/Adminscreens/Adminroomsdetails';
import Loader from './common/Loader';



function App() {
  const isLoggedIn = localStorage.getItem('token') !== null;
  const [loading, setLoading] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    // Add logic to set loading state based on your application's needs
    // For example, before and after making API requests
  }, []);

  return (
    <div className="App">
      <Router>
      {loading && <Loader />}
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn && (
            <React.Fragment>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/addRoom" element={<Addroom />} />
              <Route path="/AdminRoomDetails" element={<Adminrooms/>} />
              <Route path="/AdminroomsPhoto" element={<AdminroomsPhoto/>} />
              {/* <Route path="/roomDetails/:roomId" element={<RoomDetails />} /> */}
              <Route path="/editroom/:roomId" element={<Addroom />} />
              <Route path="/Mybookedroom" element={<BookedRoom/>} />
              <Route
    path="/getRoomDetails/:roomId"
    element={
        isAdmin ? (
            <Adminroomsdetails />
        ) : (
            <RoomDetails/>
        )
    }
/>
              {/* <Route path="/getRoomDetails/:roomId" element={<Adminroomsdetails/>} /> */}
            </React.Fragment>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
