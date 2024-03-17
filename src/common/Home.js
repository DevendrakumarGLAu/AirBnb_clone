import React, { useEffect, useState } from 'react'
import AllRooms from '../usersScreen/allRooms'
import AdminroomsPhoto from '../screens/Adminscreens/AdminroomsPhoto';


function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // Check if the user is an admin
    const isAdminUser = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminUser);
  }, []);
  return (
    <div>
        <div className='mt-4' >
      {isAdmin ? <AdminroomsPhoto /> : <AllRooms />}
    </div>
        
    </div>
  )
}

export default Home