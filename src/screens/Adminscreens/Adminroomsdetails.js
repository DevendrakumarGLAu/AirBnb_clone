import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Adminroomsdetails() {
    const [room, setRoom] = useState(null);
    const { roomId } = useParams();
    const [loading, setLoading] = useState(true);
    // const amenities = room.amenities;

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                setLoading(true);
                // const roomId = match.params.roomId;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rooms/getRoomDetails/${roomId}`)
                // console.log("response for adminroomDetails", response)
                setRoom(response.data);
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
                                    <h5>{room.name}</h5>
                                    <p>Type: {room.type}</p>
                                    <h3>Amenities:</h3>
                                    <ul>
                                        {Object.entries(amenities).map(([amenity, value]) => (
                                            <li key={amenity}>
                                                {value ? (
                                                    <span role="img" aria-label="check-mark">
                                                        ✅
                                                    </span>
                                                ) : (
                                                    <span role="img" aria-label="cross-mark">
                                                        ❌
                                                    </span>
                                                )}
                                                {amenity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>


        </div>
    )
}

export default Adminroomsdetails;