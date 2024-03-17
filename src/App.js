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
import ConfirmPayment from '../src/usersScreen/ConfirmPayment';


function App() {
  const isLoggedIn = localStorage.getItem('token') !== null;
  const [loading, setLoading] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const tokenKey = 'token';
    const token = localStorage.getItem(tokenKey);
    const resetTokenTimeout = () => {
      setTimeout(() => {
        localStorage.removeItem(tokenKey);
        // Redirect to the login page after removing the token
        window.location.href = '/';
      }, 3600000);
    };

    if (token) {
      // Perform token validation logic
      resetTokenTimeout();

    }
    else {
      localStorage.clear();
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>

        {localStorage.getItem('token') && <Navbar />}
        {/* {loading && <Loader />} */}
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn && (
            <React.Fragment>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/addRoom" element={<Addroom />} />
              <Route path="/AdminRoomDetails" element={<Adminrooms />} />
              <Route path="/AdminroomsPhoto" element={<AdminroomsPhoto />} />
              <Route path="/editroom/:roomId" element={<Addroom />} />
              <Route path="/Mybookedroom" element={<BookedRoom />} />
              <Route
                path="/getRoomDetails/:roomId"
                element={
                  isAdmin ? (
                    <Adminroomsdetails />
                  ) : (
                    <RoomDetails />
                  )
                }
              />
              <Route path="/confirmPayment/:roomId" element= {<ConfirmPayment/>} />
              {/* <Route path="/getRoomDetails/:roomId" element={<Adminroomsdetails/>} /> */}
            </React.Fragment>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
