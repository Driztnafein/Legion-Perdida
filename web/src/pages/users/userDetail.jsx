import React, { useEffect, useState } from 'react';
import { getUserDetail } from '../../services/api-service'
import { useAuthContext } from '../../contexts/auth'; 

function UserDetail() {
    const { user: authenticatedUser } = useAuthContext();
    
    if (!authenticatedUser) {
        return <div>El usuario no está autenticado</div>;
    }

    const userId = authenticatedUser.id; // Asegúrate de que 'userId' es el nombre correcto del campo
    console.log('userId:', userId);

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUserDetail(userId)
            .then(response => {
                setUser(response.data);
                console.log('Detalles del usuario:', response.data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [userId]);

    if (error) {
        return <div>Error cargando detalles del usuario: {error}</div>;
    }

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Detalle de Usuario</h1>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Rol: {user.role}</p>
            <img src={user.avatar} alt="Avatar" />
        </div>
    );
}

export default UserDetail;