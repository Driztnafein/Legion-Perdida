import React, { useState, useEffect } from 'react';
import { listUsers } from '../../web/src/services/api-service';
import "../src/css/userSelector.css"

const UserSelector = ({ isOpen, onClose, onUsersSelected }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      listUsers().then(response => {
        setUsers(response.data);
      });
    }
  }, [isOpen]); // Dependencia para recargar usuarios cuando el modal se abre

  const handleUserCheck = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, isSelected: !user.isSelected };
      }
      return user;
    }));
  };

  const handleSend = () => {
    const selectedUserIds = users.filter(user => user.isSelected).map(user => user.id);
    onUsersSelected(selectedUserIds);
    onClose(); // Cerrar el modal
  };

  return (
    <div className={`modal ${isOpen ? 'd-block' : 'd-none'}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {users.map(user => (
              <div key={user.id} className="user-item">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={user.isSelected || false}
                  onChange={() => handleUserCheck(user.id)}
                />
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <label className="form-check-label">
                  {user.name}
                </label>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button onClick={handleSend} className="btn btn-primary">Enviar Invitaciones</button>
          </div>
        </div>
      </div>
    </div>
  );
};
  
  export default UserSelector;