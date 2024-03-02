import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./airbnb.svg";
import '../common/Navbar.css';

function Navbar() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userName = localStorage.getItem("name");
  const isLoggedIn = localStorage.getItem("token") !== null;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    navigate("/");
  };

  return (
    <div>
      <div className="mb-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top  ">
        <a className="navbar-brand" href="#">
          <img
            src={Logo}
            alt="Airbnb Logo"
            style={{ height: "30px", width: "auto" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/home" style={{color:"white"}}>
                Home <span className="sr-only">(current)</span>
              </Link>
              {/* <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a> */}
            </li>

            {isAdmin && (
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/addRoom" style={{color:"white"}}>
                    Add Room
                  </Link>
                </li>
                <li className="nav-item">
              <Link className="nav-link active" to="/AdminRoomDetails" style={{color:"white"}}>
                All Rooms Tables
              </Link>
            </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/AdminroomsPhoto" style={{color:"white"}}>
                   Room's Photo
                  </Link>
                </li>
              </ul>
            )}
            {!isAdmin && (
              <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/" style={{color:"white"}}>
                 
                </Link>
              </li>
              <li className="nav-item">
            <Link className="nav-link active" to="/Mybookedroom" style={{color:"white"}}>
              My bookedRoom
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link className="nav-link active" to="/Mybookedroom" style={{color:"white"}}>
              
            </Link>
          </li> */}
          </ul>
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false" style={{color:"white"}}
              >
                {userName}
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                {isLoggedIn && (
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                )}
                
              </div>
            </li>
          </ul>
        </div>
      </nav>
      </div>
    </div>
  );
}

export default Navbar;
