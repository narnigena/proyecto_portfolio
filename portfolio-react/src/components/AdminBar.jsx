import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminBar() {

    const {
        estaLogado,
        cerrarSesion
    } = useAuth();


    if (!estaLogado) {
        return null;
    }


    return (

        <div className="admin-bar">

            <div className="admin-bar-inner">

                <div className="admin-info">

                    <div className="editing-badge">

                        <span className="status-dot"></span>

                        MODO EDICIÓN ACTIVO

                    </div>

                    <span className="separator">
                        |
                    </span>

                    <div className="user-info">

                        <span className="material-symbols-outlined">
                            admin_panel_settings
                        </span>

                        Usuario autorizado

                    </div>

                </div>


                <div className="admin-actions">

                    <Link
                        to="/proyectos/nuevo"
                        className="admin-create"
                    >

                        <span className="material-symbols-outlined">
                            add
                        </span>

                        CREAR NUEVO PROYECTO

                    </Link>


                    <button
                        className="logout-button"
                        onClick={cerrarSesion}
                    >

                        <span className="material-symbols-outlined">
                            logout
                        </span>

                        CERRAR SESIÓN

                    </button>

                </div>

            </div>

        </div>
    );
}

export default AdminBar;