
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReservationDetail } from '../../services/api-service';


function ReservationDetail() {
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        getReservationDetail(id)
            .then(response => {
                console.log('Reservation data:', response.data); // Agrega esta línea
                setReservation(response.data);
            })
            .catch(error => console.error('Error fetching reservation details:', error));
    }, [id]);

    if (!reservation) return <div>Loading...</div>;
    

    return (
        <div>
            <h2>Reservation Details</h2>
            <p>User: {reservation.user.name}</p>
            <p>Game: {reservation.game.title}</p>
            <p>Reservation Date: {new Date(reservation.reservationDate).toLocaleDateString()}</p>
            <p>Start Time: {new Date(reservation.startTime).toLocaleTimeString()}</p>
            <p>Duration: {reservation.duration} hours</p>
            <p>Table: {reservation.table}</p>
            <p>Status: {reservation.status}</p>
            <p>Players: {reservation.players}</p>
        </div>
    );
}

export default ReservationDetail;
