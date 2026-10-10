import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject, updateProject } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

function EditProject() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { estaLogueado } = useAuth();

        if (!estaLogueado) {
        return <Navigate to="/login" replace />;
        }

    const [project, setProject] = useState({
        titulo: "",
        slug: "",
        categoria: "",
        descripcion: "",
        imagenes: [],
        herramientas: [],
        destacado: false,
        fecha: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProject() {

            try {

                const data = await getProject(id);

                setProject(data);

            } catch (error) {

                console.error(error);

                setError("No se ha podido cargar el proyecto.");

            } finally {

                setLoading(false);

            }

        }

        loadProject();

    }, [id]);


    function handleChange(event) {

        const { name, value, type, checked } = event.target;

        setProject({
            ...project,
            [name]: type === "checkbox" ? checked : value
        });

    }


    async function handleSubmit(event) {

        event.preventDefault();

        try {

            await updateProject(id, project);

            navigate("/projects");

        } catch (error) {

            console.error(error);

            setError("No se ha podido actualizar el proyecto.");

        }

    }


    if (loading) {

        return (
            <main>
                <p>Cargando proyecto...</p>
            </main>
        );

    }


    if (error) {

        return (
            <main>
                <p>{error}</p>
            </main>
        );

    }


    return (

        <main>

            <h1>Editar proyecto</h1>

            <form onSubmit={handleSubmit}>

                <div>

                    <label htmlFor="titulo">
                        Título
                    </label>

                    <input
                        id="titulo"
                        name="titulo"
                        value={project.titulo}
                        onChange={handleChange}
                    />

                </div>


                <div>

                    <label htmlFor="slug">
                        Slug
                    </label>

                    <input
                        id="slug"
                        name="slug"
                        value={project.slug}
                        onChange={handleChange}
                    />

                </div>


                <div>

                    <label htmlFor="categoria">
                        Categoría
                    </label>

                    <input
                        id="categoria"
                        name="categoria"
                        value={project.categoria}
                        onChange={handleChange}
                    />

                </div>


                <div>

                    <label htmlFor="descripcion">
                        Descripción
                    </label>

                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={project.descripcion}
                        onChange={handleChange}
                    />

                </div>


                <div>

                    <label htmlFor="fecha">
                        Año
                    </label>

                    <input
                        id="fecha"
                        name="fecha"
                        value={project.fecha}
                        onChange={handleChange}
                    />

                </div>


                <div>

                    <label htmlFor="destacado">
                        Proyecto destacado
                    </label>

                    <input
                        id="destacado"
                        name="destacado"
                        type="checkbox"
                        checked={project.destacado}
                        onChange={handleChange}
                    />

                </div>


                <button type="submit">
                    Guardar cambios
                </button>

            </form>

        </main>

    );

}

export default EditProject;