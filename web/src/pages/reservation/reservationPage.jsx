import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { createReservation, getGameAvailability, getUserReservationDates } from '../../services/api-service';
import "../../css/ReservationPage.css"
import { useEffect } from 'react';
import { useAuthContext } from '../../contexts/auth';






function ReservationPage() {
    const navigate = useNavigate();
    const { gameId } = useParams(); // Obtiene el ID del juego desde la URL    
    const [date, setDate] = useState(null);
    const [startHour, setStartHour] = useState(10);
    const [endHour, setEndHour] = useState(11);
    const [table, setTable] = useState(1);
    const [players, setPlayers] = useState(1);
    const [isReservationSuccess, setIsReservationSuccess] = useState(false);
    const [reservationId, setReservationId] = useState(null);
    const [availability, setAvailability] = useState([]);
    const [reservedDates, setReservedDates] = useState([]);
    const { user } = useAuthContext();
    const userId = user?.id;
    const [userReservationDates, setUserReservationDates] = useState([]);
    const [gameAvailabilityDates, setGameAvailabilityDates] = useState([]);


    useEffect(() => {
        getGameAvailability(gameId)
            .then(response => {
                const dates = response.data.map(d => {
                    const date = new Date(d);
                    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                });
                setGameAvailabilityDates(dates); // Aquí cambiamos a setGameAvailabilityDates
            })
            .catch(error => {
                console.error("Error al obtener la disponibilidad del juego:", error);
            });

        getUserReservationDates(userId)
            .then(response => {
                const dates = response.data.map(d => {
                    const date = new Date(d);
                    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                });
                setUserReservationDates(dates); // Aquí cambiamos a setUserReservationDates
            })
            .catch(error => {
                console.error("Error al obtener las fechas de reserva del usuario:", error);
            });
    }, [gameId, userId]);


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

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const isReserved = reservedDates.some(
                reservedDate =>
                    reservedDate.getFullYear() === date.getFullYear() &&
                    reservedDate.getMonth() === date.getMonth() &&
                    reservedDate.getDate() === date.getDate()
            );
            return isReserved ? 'reserved-day' : null;
        }
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = formatDate(date);
            return userReservationDates.map(formatDate).includes(formattedDate) ||
                gameAvailabilityDates.map(formatDate).includes(formattedDate);
        }
    };

    function ReservationPage() {
        // ...

        const getDayClassName = (date) => {
            if (userReservationDates.includes(date)) {
                return 'user-reserved-day';
            } else if (gameAvailabilityDates.includes(date)) {
                return 'other-reserved-day';
            } else {
                return '';
            }
        }

        // ...
    }

    const handleSubmit = async () => {
        if (!date) {
            alert('Por favor, selecciona una fecha.');
            return;
        }

        const reservationStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour);
        const reservationEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHour);
        const duration = (reservationEnd - reservationStart) / (1000 * 60 * 60);

        const reservationDetails = {
            game: gameId,
            reservationDate: date.toISOString(), // Usa la fecha seleccionada para establecer reservationDate
            startTime: reservationStart.toISOString(),
            duration,
            table,
            players
        };

        try {
            const response = await createReservation(reservationDetails);
            // Continúa con tu lógica después de una reserva exitosa
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


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Asegura que el mes siempre tenga dos dígitos
        const day = ('0' + date.getDate()).slice(-2); // Asegura que el día siempre tenga dos dígitos
        return `${year}-${month}-${day}`;
    }

    const getDayClassName = (date) => {
        const formattedDate = formatDate(date);
        const isUserReserved = userReservationDates.map(formatDate).includes(formattedDate);
        const isGameReserved = gameAvailabilityDates.map(formatDate).includes(formattedDate);

        if (isUserReserved) {
            return 'user-reserved-day disabled-day'; // Combina las clases para días reservados por el usuario y deshabilitados
        } else if (isGameReserved) {
            return 'other-reserved-day disabled-day'; // Combina las clases para días reservados por otros y deshabilitados
        } else {
            return '';
        }
    };








    return (
        <div className="reservation-page">
            <h1>Bienvenido a la página de reservas</h1>
            <div className="calendar-container">
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    tileClassName={({ date, view }) => view === 'month' ? getDayClassName(date) : null}
                    tileDisabled={tileDisabled}
                />

            </div>

            <div className="reservation-details">
                <div className="reservation-field">
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

                <div className="reservation-field">
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
                </div>
                <div className="reservation-field">
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
                <div className="reservation-field">
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
            <div className="button-container">
                <button onClick={handleSubmit} className="create-reservation-button">Crear reserva</button>
            </div>
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
