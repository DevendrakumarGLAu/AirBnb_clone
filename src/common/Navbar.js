import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./airbnblogo.png";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
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
              <Link className="nav-link" to="/home">
                Home <span className="sr-only">(current)</span>
              </Link>
              {/* <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a> */}
            </li>

            {isAdmin && (
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/addRoom">
                    Add Room
                  </Link>
                </li>
                <li className="nav-item">
              <Link className="nav-link active" to="/AdminRoomDetails">
                My Rooms Details
              </Link>
            </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/AdminroomsPhoto">
                   Room's Photo
                  </Link>
                </li>
              </ul>
            )}
            {!isAdmin && (
              <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                 
                </Link>
              </li>
              <li className="nav-item">
            <Link className="nav-link active" to="/Mybookedroom">
              My bookedRoom
            </Link>
          </li>
          </ul>
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
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
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
