import React, { useEffect, useState } from 'react';
import { list } from '../../services/api-service';
import { Link } from 'react-router-dom';
import "../../css/homePage.css";

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
        <div className="home-page container-fluid p-4">
            <h1 className="text-center  mb-4">
                Bienvenido a La Legión Perdida
            </h1>
            <p className="text-center  mb-4">
                Entra en el mundo de La Legión Perdida, donde miles de batallas y aventuras te esperan.
                Descubre juegos que desafiarán tu mente y te llevarán a viajes inolvidables.
            </p>

            <div className="who-we-are-section">
                <h2 className="text-center ">
                    ¿Quiénes somos?
                </h2>
                <p className="">
                    "La Legión Perdida" es una comunidad vibrante y acogedora de aficionados a los juegos de mesa y rol.
                    Unimos a personas de todas las edades y habilidades en torno a nuestra pasión compartida por la estrategia, la aventura y la diversión.
                    En nuestro local exclusivo, no solo jugamos, sino que también organizamos torneos emocionantes y talleres de pintura de figuras,
                    creando un espacio para que la creatividad y la amistad florezcan.
                    Ya sea que seas un veterano en el mundo de los juegos o recién estés explorando este fascinante universo,
                    "La Legión Perdida" te invita a ser parte de nuestra historia y a compartir innumerables aventuras con nosotros."
                </p>
            </div>

            {/* Sección de Juegos */}
            {games.length > 0 ? (
                <div className="row">
                    {games.map(game => (
                        <div className="col-md-4 col-sm-6 mb-4" key={game._id}>
                            <Link to={`/game/${game._id}`} className="text-decoration-none">
                                <div className="card">
                                    <img
                                        className="card-img-top"
                                        src={game.imageUrl}
                                        alt={`Imagen de ${game.title}`}
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
