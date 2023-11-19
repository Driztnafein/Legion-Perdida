import React from 'react';

function EditReservation({ reservation, setEditingReservation }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar los datos actualizados al servidor
    alert('Reserva actualizada!');
    setEditingReservation(null); // Cerrar el formulario de edición
  };

  return (
    <div>
      <h2>Editar Reserva</h2>
      <form onSubmit={handleSubmit}>
        {/* Aquí podrías añadir campos de formulario para editar la reserva */}
        <div>
          <label>Fecha:</label>
          <input type="date" defaultValue={reservation.reservationDate} />
        </div>
        <div>
          <label>Hora:</label>
          <input type="time" defaultValue={reservation.startTime} />
        </div>
        <div>
          <label>Mesa:</label>
          <input type="number" defaultValue={reservation.table} />
        </div>
        <button type="submit" className="btn btn-success">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditReservation;
