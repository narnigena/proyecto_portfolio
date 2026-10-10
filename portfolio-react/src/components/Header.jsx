
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const { estaLogueado, logout } = useAuth();
    const navigate = useNavigate();

    

    function cerrarMenu() {
        setMenuAbierto(false);
    }

    function cerrarSesion() {
        logout();
        cerrarMenu();
        navigate("/projects", { replace: true });
    }

    return (
        <>
            <header className="header">
                <div className="header-inner">
                    <Link
                        to="/"
                        className="logo"
                        onClick={cerrarMenu}
                    >
                        Narnígena
                    </Link>

                    <nav className="desktop-nav">
                        <Link to="/">Home</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/photography">Photography</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>

                        {!estaLogueado ? (
                            <Link
                                to="/login"
                                className="login-link"
                            >
                                Login
                            </Link>
                        ) : (
                            <div className="auth-status">
                                <span>Administrador autenticado</span>

                                <button
                                    type="button"
                                    className="logout-button"
                                    onClick={cerrarSesion}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </nav>

                    <button
                        type="button"
                        className="mobile-menu-button"
                        onClick={() => setMenuAbierto(true)}
                        aria-label="Abrir menú"
                        aria-expanded={menuAbierto}
                    >
                        <span className="material-symbols-outlined">
                            menu
                        </span>
                    </button>
                </div>
            </header>

            {menuAbierto && (
                <div className="mobile-menu">
                    <button
                        type="button"
                        className="mobile-close"
                        onClick={cerrarMenu}
                        aria-label="Cerrar menú"
                    >
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>

                    <div className="mobile-menu-links">
                        <Link to="/" onClick={cerrarMenu}>
                            Home
                        </Link>

                        <Link to="/projects" onClick={cerrarMenu}>
                            Projects
                        </Link>

                        <Link to="/photography" onClick={cerrarMenu}>
                            Photography
                        </Link>

                        <Link to="/about" onClick={cerrarMenu}>
                            About
                        </Link>

                        <Link to="/contact" onClick={cerrarMenu}>
                            Contact
                        </Link>

                        {!estaLogueado ? (
                            <Link
                                to="/login"
                                onClick={cerrarMenu}
                            >
                                Login
                            </Link>
                        ) : (
                            <>
                                <span>
                                    Administrador autenticado
                                </span>

                                <button
                                    type="button"
                                    className="logout-button"
                                    onClick={cerrarSesion}
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
