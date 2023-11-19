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
        <div className="container-fluid p-4" style={{ backgroundColor: '#212529', minHeight: '100vh' }}>
            <h1 className="text-center text-white mb-4">Bienvenido a La Legión Perdida</h1>
            <p className="text-center text-white mb-4">
                Entra en el mundo de La Legión Perdida, donde miles de batallas y aventuras te esperan.
                Descubre juegos que desafiarán tu mente y te llevarán a viajes inolvidables.
            </p>

            {games.length > 0 ? (
                <div className="row">
                    {games.map(game => (
                        <div className="col-md-4 col-sm-6 mb-4" key={game._id}>
                            <Link to={`/game/${game._id}`} className="text-decoration-none">
                                <div className="card bg-secondary text-white">
                                    <img 
                                        className="card-img-top" 
                                        src={game.imageUrl} 
                                        alt={`Imagen de ${game.title}`} 
                                        style={{ height: '200px', objectFit: 'contain' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{game.title}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-white">Cargando juegos...</p>
            )}
        </div>
    );
}

export default HomePage;
