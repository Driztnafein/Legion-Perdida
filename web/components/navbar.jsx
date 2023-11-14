
import { useAuthContext } from '../src/contexts/auth';
import { Link } from 'react-router-dom';
import { logout } from '../src/services/api-service';

function Navbar() {
    const { onLogout } = useAuthContext();

    const handleLogout = async () => {
        try {
            await logout();
            onLogout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">La Legión Perdida</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">                        
                        <Link className="nav-link" to="/signup">Registro</Link>
                        <Link className="nav-link" to="/users/login">Login</Link>
                        <button className="nav-link btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;