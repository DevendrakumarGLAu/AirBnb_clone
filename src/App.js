import React from 'react';
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


function App() {
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <div className="App">
      <Router>
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
              <Route path="/roomDetails/:roomId" element={<RoomDetails />} />
              <Route path="/editroom/:roomId" element={<Addroom />} />
              <Route path="/Mybookedroom" element={<BookedRoom/>} />
            </React.Fragment>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
