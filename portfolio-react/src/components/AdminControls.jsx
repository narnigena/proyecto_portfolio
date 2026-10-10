import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteProject } from "../services/api";
import "./AdminControls.css";

function AdminControls({ proyecto, onDelete }) {

    const { token } = useAuth();

    const navigate = useNavigate();

    const [borrando, setBorrando] = useState(false);


    // Si no hay usuario autenticado,
    // no mostramos los controles de administración

    if (!token) {
        return null;
    }


    // EDITAR PROYECTO

    const editarProyecto = () => {

        navigate(`/projects/edit/${proyecto._id}`);

    };


    // BORRAR PROYECTO

    const eliminarProyecto = async () => {

        const confirmar = window.confirm(
            `¿Seguro que quieres borrar "${proyecto.titulo}"?`
        );

        if (!confirmar) {
            return;
        }


        try {

            setBorrando(true);


            // Tu api.js ya se encarga
            // de coger el token de localStorage

            await deleteProject(proyecto._id);


            // Avisamos a Projects.jsx
            // para quitarlo de la pantalla

            if (onDelete) {

                onDelete(proyecto._id);

            }


        } catch (error) {

            console.error(
                "Error al borrar el proyecto:",
                error
            );

            alert(
                "No se ha podido borrar el proyecto."
            );


        } finally {

            setBorrando(false);

        }

    };


    return (

        <div className="admin-controls">

            <span className="admin-label">
                ADMIN
            </span>


            <button
                type="button"
                className="admin-edit"
                onClick={editarProyecto}
            >
                Editar
            </button>


            <button
                type="button"
                className="admin-delete"
                onClick={eliminarProyecto}
                disabled={borrando}
            >

                {borrando
                    ? "Borrando..."
                    : "Borrar"
                }

            </button>

        </div>

    );
}

export default AdminControls;