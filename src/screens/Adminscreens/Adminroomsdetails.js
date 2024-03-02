import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Adminscreens/Adminroomdetails.css';
import { Link } from 'react-router-dom';
import FooterScreen from '../../common/FooterScreen';
import { DateRangePicker } from 'react-date-range';
function Adminroomsdetails() {
    const [room, setRoom] = useState(null);
    const { roomId } = useParams();
    const [loading, setLoading] = useState(true);
    const startDate = room ? new Date(room.availability.startDate).toLocaleDateString() : null;
    const endDate = room ? new Date(room.availability.endDate).toLocaleDateString() : null;
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                setLoading(true);
                // const roomId = match.params.roomId;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rooms/getRoomDetails/${roomId}`)
                // console.log("response for adminroomDetails", response)
                setRoom(response.data);
                if (response.data && response.data.availability) {
                    const { startDate, endDate } = response.data.availability;
                    setDateRange({
                        startDate: new Date(startDate),
                        endDate: new Date(endDate),
                        key: 'selection',
                    });
                }
            } catch (error) {
                console.log('error fetching room details:', error);
            } finally {
                setLoading(false);
            }
        };
        if (roomId) {
            fetchRoomDetails();
        }
    }, [roomId]);

    const amenities = room ? room.amenities : {};
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    // let startDate, endDate;
    const calculateDaysDifference = () => {
        if (room && room.availability && room.availability.startDate && room.availability.endDate) {
            const startDate = new Date(room.availability.startDate);
            const endDate = new Date(room.availability.endDate);
            const timeDifference = endDate.getTime() - startDate.getTime();
            return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        }
        return null;
    };

    const daysDifference = calculateDaysDifference();
    const handleSelect = (ranges) => {
        setDateRange(ranges.selection);
    };

    return (
        <div className='mt-4'>
            <div className='mt-4'>
                <p className='mt-4'>Adminroomsdetails</p>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    room && (
                        <div>
                            <div className="card m-2 p-0">
                                <div className="card-body p-2" >
                                    <h5>{room.name}</h5>
                                </div>
                            </div>
                            <div className="text-center" style={{ display: 'flex', width: "100%" }}>
                                {room.imageurls.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        className="rounded img-fluid"
                                        alt={`Room ${index + 1}`}
                                        style={{ width: '95%', maxWidth: '95%', maxHeight: '40vh', minHeight: '40vh', margin: '10px' }}
                                    />
                                ))}
                            </div>

                            <div className='card m-2'>
                                <div className="card-body p-3" >
                                    <h5>{room.LocationName}</h5>
                                    <div class="d-flex flex-row mb-3">
                                        <div class="p-2">{room.type} -</div>
                                        <div class="p-2">{room.guests} guests -</div>
                                        <div class="p-2">{room.bedrooms} bedroom -</div>
                                        <div class="p-2">{room.beds} beds -</div>
                                        <div class="p-2">{room.bathrooms} bathrooms </div>

                                        {/* <div class="p-2">{room.guests} guests |</div> */}
                                    </div>
                                    <i class="fa-solid fa-star"></i>
                                    <span class="text-decoration-underline mx-2 text-danger">{room.reviews} reviews</span>
                                    {/* <link typeof='/totalReviews'>{room.reviews}</link> */}
                                    {/* <i class="fa fa-star" aria-hidden="true"></i> */}
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <hr></hr>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-lg-6'>

                                            <div class="overflow-y-scroll overflow-x-auto">
                                                {room.description}......
                                            </div>
                                            <hr></hr>
                                        </div>
                                    </div>

                                    <div className='row mx-2'>
                                        <ol className='col-lg-3 list-group list-group-numbered'>
                                            <h5 className='text-danger'>What this place offers</h5>
                                            {Object.entries(amenities).map(([amenity, value]) => (
                                                value && (
                                                    <li key={amenity} className='list-group-item'>
                                                        <span role="img" aria-label="check-mark" className='mr-2'>
                                                            ✅
                                                        </span>
                                                        {amenity}
                                                    </li>
                                                )
                                            ))}
                                        </ol>

                                        <ol className='col-lg-3 list-group list-group-numbered'>
                                            <h5 className='text-danger'>What you miss at this place</h5>
                                            {Object.entries(amenities).map(([amenity, value]) => (
                                                !value && (
                                                    <li key={amenity} className='list-group-item'>
                                                        <span role="img" aria-label="cross-mark" className='mr-2'>
                                                            ❌
                                                        </span>
                                                        {amenity}
                                                    </li>
                                                )
                                            ))}
                                        </ol>
                                        <div className='col-lg-5 mx-2'>
                                            <div className='card z-2 position-static' style={{ bottom: '20px' }}>
                                                <div className='card-body'>
                                                    <h5><i>&#x20B9;</i> {room.rentperday} <span className='text-body-secondary'>night</span></h5>
                                                    <div className="container text-center">
                                                        <div className="row align-items-center">
                                                            <div className="col border border-rounded p-2">
                                                                {startDate && <p><span className='text-danger'>Check In-</span> {startDate}</p>}
                                                            </div>
                                                            <div className="col border border-rounded p-2">
                                                                {endDate && <p><span className='text-danger'>Check out-</span> {endDate}</p>}
                                                            </div>

                                                        </div>
                                                        <div className="col border border-rounded p-2 " style={{ width: '100%' }}>
                                                            <label >Guest</label>
                                                            <select>
                                                                <option value=''>1</option>
                                                                <option value=''>2</option>
                                                                <option value=''>3</option>
                                                            </select>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div class="">
                                                                <div class="d-flex flex-row">
                                                                    <div class="p-1"><i>&#x20B9;</i> </div>
                                                                    <div class="p-1">{room.rentperday} X</div>
                                                                    <div class="p-1">{daysDifference !== null && <p><span className='text-danger'></span> {daysDifference} nights</p>}</div>
                                                                </div>
                                                            </div>
                                                            <div class="p-1"><i>&#x20B9;</i>{room.rentperday * daysDifference}</div>
                                                        </div>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="p-1">AirBnB service charge</div>
                                                            <div class="p-1"><i>&#x20B9;</i>{room.rentperday * daysDifference * .15}</div>
                                                        </div>
                                                        <hr></hr>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="p-1"><h5>Total before taxes</h5></div>
                                                            <div class="p-1"><h5><i>&#x20B9;</i>{room.rentperday * daysDifference * 1.15}</h5></div>
                                                        </div>

                                                        <div class="d-flex justify-content-center mt-2">
                                                            {isAdmin && <button className="btn btn-danger">
                                                                <Link to={`/editroom/${room._id}`} style={{ color: "white" }}>Edit</Link>
                                                            </button>}
                                                            {!isAdmin && <button type="button" className="btn btn-danger mt-2">Reserve</button>}
                                                            {!isAdmin && <span className='text-danger text-center'>You won't be charged yet</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mt-4'>

                                            <DateRangePicker

                                                ranges={[dateRange]}
                                                onChange={handleSelect}
                                                months={2}
                                                direction='horizontal'
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='card  m-4'>
                                <div className='card-body'>
                                    <div className=' p-4'>
                                        <iframe src={room.googleLocation} width="100%" height="450" style={{ border: "0;" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                                    </div>
                                </div>
                            </div>
                            {<FooterScreen></FooterScreen>}
                        </div>
                    )
                )}
            </div>


        </div>
    )
}

export default Adminroomsdetails;