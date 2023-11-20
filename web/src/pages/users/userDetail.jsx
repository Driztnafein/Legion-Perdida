import React, { useEffect } from 'react';
import { useAuthContext } from '../../contexts/auth';

function UserDetail() {
    const { user: authenticatedUser } = useAuthContext();

    useEffect(() => {
        if (authenticatedUser) {
            console.log('Usuario autenticado:', authenticatedUser);
            console.log('Avatar del usuario autenticado:', authenticatedUser.avatar);
        }
    }, [authenticatedUser]);

    if (!authenticatedUser) {
        return <div>El usuario no está autenticado</div>;
    }

    // Construye la URL del avatar dependiendo de si es una URL de Cloudinary o una ruta local.
    const avatarSrc = authenticatedUser.avatar.startsWith('http')
        ? authenticatedUser.avatar
        : `${window.location.origin}/images/${authenticatedUser.avatar.replace('public/images/', '')}`;

    return (
        <div>
            <h1>Detalle de Usuario</h1>
            <p>Nombre: {authenticatedUser.name}</p>
            <p>Email: {authenticatedUser.email}</p>
            <p>Rol: {authenticatedUser.role}</p>
            <img src={avatarSrc} alt="Avatar del usuario" width="200" height="200" />
        </div>
    );
}

export default UserDetail;
