import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detail } from '../../services/api-service';
import { Link } from 'react-router-dom';



function GameDetail() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        detail(id)
            .then(response => {
                setGame(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error al cargar los detalles del juego', err);
                setError('Error al cargar los detalles del juego');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Cargando detalles del juego...</p>;
    if (error) return <p>{error}</p>;
    if (!game) return <p>No se encontró el juego</p>;

    return (
        <div className="container mt-4">
            <div className="row">
          
                <div className="col-md-6">
                    <img src={game.imageUrl} alt={`Imagen de ${game.title}`} className="img-fluid" />
                </div>
           
                <div className="col-md-6 d-flex align-items-center">
                <Link to={`/reservations/${game._id}`} className="btn btn-primary">Reserva ahora</Link>

                </div>

                <div className="col-md-6 mt-4">
                    <p>{game.description}</p>
                </div>
              
                <div className="col-md-6 mt-4">
                    <p><strong>Género:</strong> {game.genre}</p>
                    <p><strong>Mecánicas:</strong> {game.mechanics.join(", ")}</p>
                    <p><strong>Jugadores:</strong> {game.minPlayers} - {game.maxPlayers}</p>
                    <p><strong>Tiempo de juego:</strong> {game.playTime} minutos</p>
                    <p><strong>Rango de edad:</strong> {game.ageRange}</p>
                    <p><strong>Año de publicación:</strong> {game.publicationYear}</p>
                    <p><strong>Estado:</strong> {game.status}</p>
                    <p><strong>Condición:</strong> {game.condition}</p>
                </div>
            </div>
        </div>
    );
}

export default GameDetail;

