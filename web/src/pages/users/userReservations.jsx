import React, { useEffect, useState } from "react";
import { listReservations } from "../../services/api-service";
import UserSelector from "../../../components/user.selector"; 
import { sendUserInvitations } from "../../services/api-service";
import "../../css/userReservations.css";

function UserReservations() {
  const [currentReservation, setCurrentReservation] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [showUserSelector, setShowUserSelector] = useState(false); // Estado para controlar la visibilidad del UserSelector
  const [isInvitationSent, setIsInvitationSent] = useState(false);


  useEffect(() => {
    listReservations()
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }, []);

  const handleSendInvitations = (reservation) => {
    setCurrentReservation(reservation); // Guarda la reserva actual
    setShowUserSelector(true); // Abre el UserSelector
  };

const handleUserSelection = (selectedUsers) => {
  if (currentReservation) {
    sendUserInvitations(currentReservation.id, selectedUsers)
      .then(response => {
        console.log('Invitaciones enviadas', response.data);
        setIsInvitationSent(true); 
       
        setTimeout(() => setIsInvitationSent(false), 3000);
      })
      .catch(error => {
        console.error('Error al enviar invitaciones', error);
       
      });
    setShowUserSelector(false);
  } else {
    console.error('No hay una reserva seleccionada');
    
  }
};

  return (
  <div className="container mt-4 user-reservations">
    {isInvitationSent && (
        <div className="alert alert-success" role="alert">
          Invitaciones enviadas con éxito.
        </div>
      )}
      <h1 className="text-center mb-4">Mis reservas</h1>
      <div className="row">
        {reservations.map((reservation) => (
          <div className="col-md-4 mb-3" key={reservation.id}>
            <div className="card h-100">
              <img src={reservation.game.imageUrl} className="card-img-top" alt={`Imagen de ${reservation.game.title}`} />
              <div className="card-body">
                <h5 className="card-title">{reservation.game.title}</h5>
                <p className="card-text">Fecha de convocatoria: {new Date(reservation.reservationDate).toLocaleDateString()}</p>
                <p className="card-text">Hora: {new Date(reservation.startTime).toLocaleTimeString()}</p>
                <p className="card-text">Mesa: {reservation.table}</p>
                <p className="card-text">Jugadores: {reservation.players}</p>
                <p className="card-text">Estado: {reservation.status}</p>
                <button className="btn btn-primary" onClick={() => handleSendInvitations(reservation)}>Seleccionar compañeros</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showUserSelector && <UserSelector isOpen={showUserSelector} onClose={() => setShowUserSelector(false)} onUsersSelected={handleUserSelection} />}
    </div>
  );
}

export default UserReservations;
