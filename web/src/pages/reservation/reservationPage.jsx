import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createReservation } from '../../services/api-service';


function ReservationPage() {
    const navigate = useNavigate();
    const { gameId } = useParams(); // Obtiene el ID del juego desde la URL    
    const [date, setDate] = useState(new Date());
    const [startHour, setStartHour] = useState(10);
    const [endHour, setEndHour] = useState(11);
    const [table, setTable] = useState(1);
    const [players, setPlayers] = useState(1);
    const [isReservationSuccess, setIsReservationSuccess] = useState(false);
    const [reservationId, setReservationId] = useState(null);
    

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleStartHourChange = (event) => {
        setStartHour(event.target.value);
    };

    const handleEndHourChange = (event) => {
        setEndHour(event.target.value);
    };

    const handleTableChange = (event) => {
        setTable(event.target.value);
    };

    const handlePlayersChange = (event) => {
        setPlayers(event.target.value);
    };

    const handleSubmit = async () => {
        const reservationStart = combineDateTime(startHour);
        const reservationEnd = combineDateTime(endHour);
        const duration = (reservationEnd - reservationStart) / (1000 * 60 * 60); // Duración en horas
     
        const reservationDetails = {
         
            game: gameId,
            startTime: reservationStart,
            duration: duration,
            table: table,
            players: players,

        };
        try {
            const response = await createReservation(reservationDetails);
            const reservationId = response.data.id; // Asume que la respuesta incluye el ID
            setIsReservationSuccess(true);
            setReservationId(reservationId); // Guarda el ID en el estado
            console.log("Reserva creada:", reservationDetails);
        } catch (error) {
            console.error("Error al crear la reserva:", error);
        }
    };
    const handleViewReservation = () => {
        if (reservationId) {
            navigate(`/reservation/${reservationId}`);
        }
    };

    const combineDateTime = (hour) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour);
    };

    return (
        <div>
            <h1>Bienvenido a la página de reservas</h1>
            <div>
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                />
            </div>
            <div>
                <label>
                    Hora de inicio:
                    <select value={startHour} onChange={handleStartHourChange}>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}:00
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Hora de finalización:
                    <select value={endHour} onChange={handleEndHourChange}>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}:00
                            </option>
                        ))}
                    </select>
                </label>
                <div>
                    <label>
                        Mesa:
                        <select value={table} onChange={handleTableChange}>
                            {Array.from({ length: 6 }, (_, i) => i + 1).map((tableNumber) => (
                                <option key={tableNumber} value={tableNumber}>
                                    Mesa {tableNumber}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Número de jugadores:
                        <select value={players} onChange={handlePlayersChange}>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((playerNumber) => (
                                <option key={playerNumber} value={playerNumber}>
                                    {playerNumber}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
            <button onClick={handleSubmit}>Crear reserva</button>
            {isReservationSuccess && (
                <div style={{ marginTop: '20px', backgroundColor: 'lightgreen', padding: '10px', textAlign: 'center' }}>
                    <p>¡Reserva creada con éxito!</p>
                    <button onClick={handleViewReservation}>Ver Reserva</button>
                </div>
            )}

        </div>
    );
}

export default ReservationPage;
