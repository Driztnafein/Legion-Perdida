import React, { useEffect, useState } from 'react';
import { getUserDetail, updateUser } from '../../services/api-service';
import { useAuthContext } from '../../contexts/auth';




function EditUser() {
    const { user: authenticatedUser, updateUser: updateAuthenticatedUser } = useAuthContext();



    if (!authenticatedUser) {
        return <div>El usuario no está autenticado</div>;
    }

    const userId = authenticatedUser.id;
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [updateCount, setUpdateCount] = useState(0);

    const incrementUpdateCount = () => {
        setUpdateCount(updateCount + 1);
    };

    useEffect(() => {
        getUserDetail(userId)
            .then(response => {
                setUser(response.data);
                console.log('Detalles del usuario:', response.data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [userId, updateCount]);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        updateUser(userId, formData)
            .then(response => {
                console.log('Respuesta del servidor:', response);  // Imprime toda la respuesta del servidor
                console.log('Usuario actualizado:', response.data);  // Imprime solo los datos del usuario actualizado
                updateAuthenticatedUser(response.data);  // Actualiza el estado del usuario en el contexto de autenticación
                incrementUpdateCount();  // Incrementa el contador de actualizaciones
            })
            .catch(err => {
                console.error('Error al actualizar el usuario:', err);
            });
    };

    const handleFileChange = (event) => {
        setAvatar(event.target.files[0]);
    };

    if (error) {
        return <div>Error cargando detalles del usuario: {error}</div>;
    }

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Editar Usuario</h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Avatar:
                    <input type="file" onChange={handleFileChange} />
                </label>
                <button type="submit">Actualizar usuario</button>
            </form>
        </div>
    );
}

export default EditUser;