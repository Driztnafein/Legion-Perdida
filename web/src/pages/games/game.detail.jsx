import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detail } from '../../services/api-service';
import { Link } from 'react-router-dom';
import "../../css/game.detail.css";



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
        <div className="container-dark mt-4">
            <div className="row game-detail-row">


            <div className="col-md-6 game-image-div">
                    <img src={game.imageUrl} alt={`Imagen de ${game.title}`} className="img-fluid game-detail-image" />
                </div>
                <div className="col-md-6 game-info-div">
                    <h1 className="game-title">{game.title}</h1>
                               
                    <div className="game-metadata">
                    <h2>Detalles del Juego</h2>
                    <p style={{ color: '#b0b0b0' }}><strong>Género:</strong> <span style={{ color: 'white' }}>{game.genre}</span></p>
                    <p style={{ color: '#b0b0b0' }}><strong>Mecánicas:</strong> <span style={{ color: 'white' }}>{game.mechanics.join(", ")}</span></p>
                    <p style={{ color: '#b0b0b0' }}><strong>Jugadores:</strong> <span style={{ color: 'white' }}>{game.minPlayers} - {game.maxPlayers}</span></p>
                    <p style={{ color: '#b0b0b0' }}><strong>Tiempo de juego:</strong> <span style={{ color: 'white' }}>{game.playTime} minutos</span></p>
                    <p style={{ color: '#b0b0b0' }}><strong>Rango de edad:</strong> <span style={{ color: 'white' }}>{game.ageRange}</span></p>
                    <p style={{ color: '#b0b0b0' }}><strong>Año de publicación:</strong> <span style={{ color: 'white' }}>{game.publicationYear}</span></p>
                    <p style={{ color: '#b0b0b0' }}><strong>Estado:</strong> <span style={{ color: 'white' }}>{game.status}</span></p>
                    <p style={{ color: '#b0b0b0' }}><strong>Condición:</strong> <span style={{ color: 'white' }}>{game.condition}</span></p>
                </div>

                <div className="game-description">
                <h2 className="centered-text">Sobre el Juego</h2>
                <p className="centered-text">{game.description}</p>
                </div>

                <div className="game-action">
                    <Link to={`/reservations/${game._id}`} className="btn btn-primary">Reserva ahora</Link>

                </div>
            </div>
        </div>
        </div>
    );
}

export default GameDetail;

