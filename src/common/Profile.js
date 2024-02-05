import React from 'react';

function Profile() {
  // Assuming you have the user details in local storage
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const username = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  return (
    <div>
      <div className={`card ${isAdmin ? 'text-success' : 'text-danger'}`} style={{ width: '20rem', marginLeft: '20px', marginTop:"5%" }}>
        <div className="card-body" >
          <h5 className="card-title">{username}</h5>
          <p className="card-text">Email: {email}</p>
          <p className="card-text">Status: {isAdmin ? 'Admin' : 'User'}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
