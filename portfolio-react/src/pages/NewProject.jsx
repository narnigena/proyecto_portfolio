import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createProject } from "../services/api";
import { useAuth } from "../context/AuthContext";


function NewProject() {

    const navigate = useNavigate();

    const { token, estaLogueado } = useAuth();


    const [formulario, setFormulario] = useState({

        titulo: "",
        slug: "",
        categoria: "",
        descripcion: "",
        imagenes: "",
        herramientas: "",
        destacado: false,
        usuarioId: "1",
        fecha: new Date().getFullYear().toString()

    });


    const [error, setError] = useState("");



    function cambiarCampo(event) {

        const { name, value, type, checked } =
            event.target;


        setFormulario({

            ...formulario,

            [name]: type === "checkbox"
                ? checked
                : value

        });
    }


    async function enviar(event) {

        event.preventDefault();

        setError("");


        const proyecto = {

            ...formulario,

            imagenes: formulario.imagenes
                .split(",")
                .map(item => item.trim())
                .filter(Boolean),

            herramientas: formulario.herramientas
                .split(",")
                .map(item => item.trim())
                .filter(Boolean)

        };


        try {

            await createProject(proyecto);


            navigate("/projects");

        } catch (error) {

            console.error(error);

            setError(
                "No se ha podido crear el proyecto."
            );
        }
    }


    return (

        <>

            <Header />

            <AdminBar />


            <main className="main-container">

                <section className="form-page">

                    <span className="eyebrow">
                        NUEVO PROYECTO
                    </span>


                    <h1>
                        Crear proyecto
                    </h1>


                    <form
                        className="project-form"
                        onSubmit={enviar}
                    >

                        <label>
                            Título

                            <input
                                name="titulo"
                                value={formulario.titulo}
                                onChange={cambiarCampo}
                                required
                            />

                        </label>


                        <label>
                            Slug

                            <input
                                name="slug"
                                value={formulario.slug}
                                onChange={cambiarCampo}
                                required
                            />

                        </label>


                        <label>
                            Categoría

                            <input
                                name="categoria"
                                value={formulario.categoria}
                                onChange={cambiarCampo}
                                placeholder="Branding | Web Design"
                                required
                            />

                        </label>


                        <label>
                            Descripción

                            <textarea
                                name="descripcion"
                                value={formulario.descripcion}
                                onChange={cambiarCampo}
                                required
                            />

                        </label>


                        <label>
                            Imágenes

                            <input
                                name="imagenes"
                                value={formulario.imagenes}
                                onChange={cambiarCampo}
                                placeholder="https://imagen1.jpg, https://imagen2.jpg"
                            />

                        </label>


                        <label>
                            Herramientas

                            <input
                                name="herramientas"
                                value={formulario.herramientas}
                                onChange={cambiarCampo}
                                placeholder="Illustrator, Photoshop, Figma"
                            />

                        </label>


                        <label>
                            Usuario ID

                            <input
                                name="usuarioId"
                                value={formulario.usuarioId}
                                onChange={cambiarCampo}
                                required
                            />

                        </label>


                        <label>
                            Año

                            <input
                                name="fecha"
                                value={formulario.fecha}
                                onChange={cambiarCampo}
                                maxLength="4"
                                required
                            />

                        </label>


                        <label className="checkbox-label">

                            <input
                                type="checkbox"
                                name="destacado"
                                checked={formulario.destacado}
                                onChange={cambiarCampo}
                            />

                            Proyecto destacado

                        </label>


                        {error && (
                            <p className="form-error">
                                {error}
                            </p>
                        )}


                        <button
                            type="submit"
                            className="primary-button"
                        >
                            CREAR PROYECTO
                        </button>

                    </form>

                </section>

            </main>


            <Footer />

        </>
    );
}

export default NewProject;