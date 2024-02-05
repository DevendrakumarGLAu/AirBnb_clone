// Signup.js

import React, { useState } from 'react';
import Logo from './airbnb.svg';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Default to false for regular users
  const Navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await fetch(`${apiUrl}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, isAdmin }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        Navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
        setRegistrationError(errorData.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegistrationError('An error occurred during registration.');
    }
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary" style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={Logo} alt="Airbnb Logo" style={{ height: '30px', width: 'auto' }} />
          </a>
          <h4><Link to='/'>Login</Link></h4>
        </div>
      </nav>
      <div className="custom-width" style={{ width: '50%', marginLeft: '25%', marginTop: '8%' }}>
        <div className="card">
          <div className="card-body">
            <div className='card-title text-center'>Signup</div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="isAdmin">
                  Register as Admin
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  placeholder='Enter your name'
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder='Enter your email address'
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  placeholder='Enter your password'
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {registrationError && (
                <div className="alert alert-danger" role="alert">
                  {registrationError}
                </div>
              )}

              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </form>
            <p className="mt-1">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
