import React, { useEffect, useState } from 'react';
import { list } from '../../services/api-service';
import { Link } from 'react-router-dom';

function HomePage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        list()
            .then(response => {
                setGames(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los juegos', error);
            });
    }, []);

    return (
        <div>
            <h1>Bienvenido a La Legión Perdida</h1>
            <p>Probando, probando ! 1,2 ...si Hey! Hola!.</p>

            {games.length > 0 ? (
                <div className="row">
                    {games.map(game => (
                        <div className="col-md-4 mb-4" key={game._id}>
                        <Link to={`/game/${game._id}`} className="card-link">
                            <div className="card h-100">
                                <img className="card-img-top" src={game.imageUrl} alt={`Imagen de ${game.title}`} />
                                <div className="card-body">
                                    <h5 className="card-title">{game.title}</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                    ))}
                </div>
            ) : (
                <p>Cargando juegos...</p>
            )}
        </div>
    );
}

export default HomePage;
