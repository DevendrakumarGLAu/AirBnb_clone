import React from 'react'
import AllRooms from '../usersScreen/allRooms'
import AdminroomsPhoto from '../screens/Adminscreens/AdminroomsPhoto';


function Home() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return (
    <div>
        <div>
      {isAdmin ? <AdminroomsPhoto /> : <AllRooms />}
    </div>
        
    </div>
  )
}

export default Home