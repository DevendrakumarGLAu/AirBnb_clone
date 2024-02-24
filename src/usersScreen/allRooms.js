import React, { useEffect, useState } from "react";
import axios from "axios";
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
import { useNavigate } from "react-router-dom";

function AllRooms() {
  const [response, setResponse] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/rooms/getAllRooms`
        );
        console.log();
        setResponse(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateSelect = (ranges) => {
    setSelectedDateRange([ranges.selection]);
  };

  const navigateToRoomDetails = (roomId) => {
    navigate(`/roomDetails/${roomId}`);
  };

  return (
    <div className="container" style={{marginTop:"4%",marginBottom:"4%"}}>
      {/* <DateRangePicker ranges={selectedDateRange} onChange={handleDateSelect} /> */}
      <div className="d-flex justify-content-around">
        <div className="row">
          {response.map((room, roomIndex) => (
            <div
              className="col-md-4"
              key={roomIndex}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card  mt-4"
                style={{ width: '100%'}}
              >
                <div className="card-body p-2">
                  <h3>{room.name}</h3>
                  <div
                    id={`carouselExampleIndicators${roomIndex}`}
                    className="carousel slide"
                    data-ride="carousel"
                    style={{ maxHeight: "150px", overflow: "hidden" }}
                  >
                    <ol className="carousel-indicators">
                      {room.imageurls.map((url, index) => (
                        <li
                          key={index}
                          data-target={`#carouselExampleIndicators${roomIndex}`}
                          data-slide-to={index}
                          className={index === 0 ? "active" : ""}
                        ></li>
                      ))}
                    </ol>
                    <div className="carousel-inner">
                      {room.imageurls.map((url, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${index === 0 ? "active" : ""
                            }`}
                        >
                          <img
                            className="d-block w-100"
                            src={url}
                            alt={`Slide ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <a
                      className="carousel-control-prev"
                      href={`#carouselExampleIndicators${roomIndex}`}
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href={`#carouselExampleIndicators${roomIndex}`}
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                  <div className="mt-2">
                    {room.status === "not booked" && room.availability ? (
                       <p>
                       {new Date(room.availability.startDate).toLocaleDateString('en-Uk', {
                         day: 'numeric',
                        
                       })}{" "}
                       -{" "}
                       {new Date(room.availability.endDate).toLocaleDateString('en-Uk', {
                         day: 'numeric',
                         month: 'short',
                       })}
                     </p>
                    ) : (
                      <h6>Booked</h6>
                    )}
                    <h6> Rs. {room.rentperday} /night</h6>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() => navigateToRoomDetails(room._id)}
                      className="btn btn-light mt-2"
                    >
                      <h6>View Details</h6>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllRooms;
