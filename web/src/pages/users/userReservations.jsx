import React, { useEffect, useState } from "react";
import { listReservations } from "../../services/api-service";
import EditReservation from "../reservation/editReservation"; // Importar el nuevo componente
import UserSelector from "../../../components/user.selector"; // Importar el nuevo componente
import { sendUserInvitations } from "../../services/api-service";

function UserReservations() {
  const [currentReservation, setCurrentReservation] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [showUserSelector, setShowUserSelector] = useState(false); // Estado para controlar la visibilidad del UserSelector

  useEffect(() => {
    listReservations()
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }, []);

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
  };

  const handleSendInvitations = (reservation) => {
    setCurrentReservation(reservation); // Guarda la reserva actual
    setShowUserSelector(true); // Abre el UserSelector
  };

  const handleUserSelection = (selectedUsers) => {
    if (currentReservation) {
      sendUserInvitations(currentReservation.id, selectedUsers) // Envía solo el ID de la reserva
        .then(response => {
          console.log('Invitaciones enviadas', response.data);
          // Mostrar mensaje de éxito
        })
        .catch(error => {
          console.error('Error al enviar invitaciones', error);
          // Mostrar mensaje de error
          if (error.message.includes("Cannot read properties of undefined")) {
            console.error('La reserva actual no tiene un juego asociado');
            // Mostrar un mensaje de error en la UI indicando que la reserva actual no tiene un juego asociado
          }
        });
      setShowUserSelector(false); // Cierra el UserSelector
    } else {
      console.error('No hay una reserva seleccionada');
      // Manejar este error en la UI si es necesario
    }
  };

  return (
    <div>
      <h1>Mis reservas</h1>
      {editingReservation ? (
        <EditReservation reservation={editingReservation} setEditingReservation={setEditingReservation} />
      ) : (
        reservations.map((reservation) => (
          <div className="card mb-3" key={reservation.id}>
            <img src={reservation.game.imageUrl} className="card-img-top" alt={`Imagen de ${reservation.game.title}`} style={{ width: '100px', height: 'auto' }} />
            <div className="card-body">
              <h5 className="card-title">{reservation.game.title}</h5>
              <p className="card-text">Fecha: {reservation.reservationDate}</p>
              <p className="card-text">Hora: {reservation.startTime}</p>
              <p className="card-text">Mesa: {reservation.table}</p>
              <button className="btn btn-primary me-2" onClick={() => handleEdit(reservation)}>Editar</button>
              <button className="btn btn-secondary" onClick={() => handleSendInvitations(reservation)}>Enviar Invitaciones</button>
            </div>
          </div>
        ))
      )}
      {showUserSelector && <UserSelector isOpen={showUserSelector} onClose={() => setShowUserSelector(false)} onUsersSelected={handleUserSelection} />}
    </div>
  );
}

export default UserReservations;
