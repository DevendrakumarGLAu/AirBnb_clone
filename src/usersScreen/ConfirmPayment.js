import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
// import AllRooms from './allRooms';
import { Modal, Button } from 'react-bootstrap';
import Creditcard from '../common/Creditcard';
// import Logo from '../common/airbnb.svg';
import FooterScreen from '../common/FooterScreen';


function ConfirmPayment() {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [isRoomBooked, setIsRoomBooked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rooms/getRoomDetails/${roomId}`);
                setRoom(response.data);
                console.log("room data ::", response.data)
            } catch (error) {
                console.log('Error fetching room details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomId]);
    const handleBackButton = () => {
        navigate('/home');
    };

    const handleConfirmPayment = async () => {
        setShowModal(true);
        // try {
        //     const userId = localStorage.getItem('userId');
        //     const userName = localStorage.getItem('name');

        //     if (room && room.status === 'not booked') {
        //         const response = await axios.post(
        //             `${process.env.REACT_APP_API_URL}/api/bookings/bookRoom/${roomId}`,
        //             {
        //                 userId,
        //                 userName,
        //                 roomDetails: room,
        //             }
        //         );

        //         if (response.status === 200) {
        //             const confirmed = window.confirm('Do you want to book the room?');
        //             if (confirmed) {
        //                 alert('Your room has been booked successfully!');
        //                 setIsRoomBooked(true);
        //                 navigate('/home');
        //             }
        //         } else {
        //             console.error('Failed to book room. Server response:', response.status);
        //         }
        //     } else {
        //         console.error('Room already booked');
        //     }
        // } catch (error) {
        //     console.error('Error booking room:', error);
        // }
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handlePaymentModal = async () =>{
        try {
            const userId = localStorage.getItem('userId');
            const userName = localStorage.getItem('name');

            if (room && room.status === 'not booked') {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/bookings/bookRoom/${roomId}`,
                    {
                        userId,
                        userName,
                        roomDetails: room,
                    }
                );

                if (response.status === 200) {
                    const confirmed = window.confirm('Do you want to book the room?');
                    if (confirmed) {
                        alert('Your room has been booked successfully!');
                        setIsRoomBooked(true);
                        navigate('/home');
                    }
                } else {
                    console.error('Failed to book room. Server response:', response.status);
                }
            } else {
                console.error('Room already booked');
            }
        } catch (error) {
            console.error('Error booking room:', error);
        }
    }
    const calculateDaysDifference = () => {
        if (room && room.availability && room.availability.startDate && room.availability.endDate) {
            const startDate = new Date(room.availability.startDate);
            const endDate = new Date(room.availability.endDate);
            const timeDifference = endDate.getTime() - startDate.getTime();
            return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        }
        return null;
    };
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };
    const daysDifference = calculateDaysDifference();

    return (
        <div className="container" style={{ marginTop: "80px" }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                room && (
                    <div>
                        {/* <img src={Logo} alt="Airbnb Logo" style={{ height: '30px', width: 'auto' }} /> */}
                        <div className='card p-4'>
                            <h4><i className="fa-solid fa-arrow-left-long" onClick={handleBackButton}></i> &nbsp; Confirm Payment</h4>
                            <h6>Your trip</h6>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-9"><h4>Dates</h4></div>
                                            <div className="col-4">
                                                <p>{formatDateString(room.availability.startDate)} - {formatDateString(room.availability.endDate)}</p>
                                            </div>
                                            <div className="col-6"> <Link to='editdate' className='text-danger'><h5>Edit</h5></Link> </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-9"><h4>Guests</h4></div>
                                            <div className="col-4">
                                                <p>{room.guests} guest</p>
                                            </div>
                                            <div className="col-6"> <Link to='editdate' className='text-danger'><h5>Edit</h5></Link> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                        <div className='card' >
                                            <div className='card-body' style={{boxShadow:'10px 5px 5px red;'}}>
                                                <h5>{room.name}</h5>
                                                <p>{room.LocationName} </p>
                                                <p><i class="fa-solid fa-star"></i> &nbsp;{room.reviews} ratings</p>
                                                <hr className='mb-2'></hr>
                                                <h4>Price Details</h4>
                                                <div className="d-flex justify-content-between">
                                                            <div class="" >
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
                                                            <div class="p-1"><i>&#x20B9;</i>{parseInt(room.rentperday * daysDifference * .15)}</div>
                                                        </div>
                                                        <hr></hr>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="p-1"><h5>Total before taxes</h5></div>
                                                            <div class="p-1"><h5><i>&#x20B9;</i>{parseInt(room.rentperday * daysDifference * 1.15)}</h5></div>
                                                        </div>
                                            </div>
                                        </div>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleConfirmPayment}>
                            Confirm Payment
                        </button>
                            </div>
                        </div>

                        

                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Payment Options</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Creditcard/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                                <Button variant="secondary" className='btn btn-success' onClick={handlePaymentModal}>
                                    Payment
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                    
                )
            )} 
            <FooterScreen/>
        </div>
    );
}
export default ConfirmPayment;