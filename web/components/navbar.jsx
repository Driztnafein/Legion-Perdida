import { useAuthContext } from '../src/contexts/auth';
import { Link } from 'react-router-dom';
import { logout } from '../src/services/api-service';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Importar iconos de React Icons
import "../src/css/navbar.css";

function Navbar() {
    const { user, onLogout } = useAuthContext();

    const handleLogout = async () => {
        try {
            await logout();
            onLogout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">La Legión Perdida</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        {user ? (
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={user.avatar} alt="avatar" className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                                    {user.name}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                    <li><Link className="dropdown-item" to="/users/profile">Perfil</Link></li>
                                    <li><Link className="dropdown-item" to={`/users/${user.id}/edit`}>Editar Perfil</Link></li>
                                    <li><Link className="dropdown-item" to="/user/reservations">Mis Reservas</Link></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}><FaSignOutAlt /> Cerrar sesión</button></li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <Link className="nav-link" to="/signup">Registro</Link>
                                <Link className="nav-link" to="/users/login"><FaSignInAlt /> Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
