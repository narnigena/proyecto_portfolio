import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProject } from "../services/api";

import "./ProjectDetail.css";


function ProjectDetail() {

    const { id } = useParams();

    const [project, setProject] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        async function loadProject() {

            try {

                setLoading(true);

                setError("");

                console.log("Cargando proyecto con ID:", id);

                const data = await getProject(id);

                console.log("Proyecto recibido:", data.imagenes);

                setProject(data);

            } catch (err) {

                console.error("Error cargando proyecto:");

                setError(
                    "No se ha podido cargar el proyecto."
                );

            } finally {

                setLoading(false);

            }

        }


        if (id){
            loadProject();
        }

    }, [id]);


    /* ================================
       CARGANDO
    ================================= */

    if (loading) {

        return (

            <div className="project-detail-loading">

                <p>
                    Cargando proyecto...
                </p>

            </div>

        );

    }


    /* ================================
       ERROR
    ================================= */

    if (error || !project) {

        return (

            <div className="project-detail-error">

                <h1>
                    Proyecto no encontrado
                </h1>

                <p>
                    El proyecto que buscas no existe
                    o no está disponible.
                </p>

                <Link
                    to="/projects"
                    className="project-detail-back"
                >
                    ← Volver a proyectos
                </Link>

            </div>

        );

    }


    /* ================================
       DATOS DEL PROYECTO
    ================================= */

    const titulo =
        project.titulo || "Proyecto sin título";


    const categoria =
        project.categoria || "Proyecto";


    const descripcion =
        project.descripcion || "";


    const imagenes =
        Array.isArray(project.imagenes)
            ? project.imagenes
            : [];


    const imagenPrincipal =
        imagenes.length > 0
            ? imagenes[0]
            : null;


    const imagenesGaleria =
        imagenes.slice(1);


    return (

        <div className="project-detail-page">

            


            <main>


                {/* =================================
                    HERO
                ================================= */}

                <section className="project-detail-hero">


                    {imagenPrincipal ? (

                        <img
                            src={imagenPrincipal}
                            alt={titulo}
                            className="project-detail-hero-image"
                        />

                    ) : (

                        <div className="project-detail-no-image">
                            Sin imagen
                        </div>

                    )}


                    <div className="project-detail-hero-overlay" />


                    <div className="project-detail-hero-content">

                        <span className="project-detail-kicker">
                            {categoria}
                        </span>


                        <h1>
                            {titulo}
                        </h1>

                    </div>

                </section>


                {/* =================================
                    INFORMACIÓN
                ================================= */}

                <section className="project-detail-meta">


                    <div>

                        <span>
                            Categoría
                        </span>

                        <p>
                            {categoria}
                        </p>

                    </div>


                    <div>

                        <span>
                            Año
                        </span>

                        <p>
                            {project.fecha || "—"}
                        </p>

                    </div>


                    <div>

                        <span>
                            Cliente
                        </span>

                        <p>
                            {project.cliente || "Proyecto personal"}
                        </p>

                    </div>


                    <div>

                        <span>
                            Servicios
                        </span>

                        <p>
                            {project.servicios || "Diseño"}
                        </p>

                    </div>


                </section>


                {/* =================================
                    DESCRIPCIÓN
                ================================= */}

                <section className="project-detail-story">


                    <div className="project-detail-story-title">

                        <h2>
                            {titulo}
                        </h2>

                        <span>
                            NARNÍGENA
                        </span>

                    </div>


                    <div className="project-detail-story-content">


                        {descripcion && (

                            <p className="project-detail-intro">
                                {descripcion}
                            </p>

                        )}


                        <p>
                            Proyecto desarrollado dentro del
                            portfolio de Narnígena.
                        </p>


                    </div>

                </section>


                {/* =================================
                    GALERÍA
                ================================= */}

                {imagenesGaleria.length > 0 && (

                    <section className="project-detail-gallery">


                        {imagenesGaleria.map(
                            (imagen, index) => (

                                <figure
                                    key={index}
                                    className={`
                                        project-gallery-item
                                        project-gallery-item-${index + 1}
                                    `}
                                >

                                    <img
                                        src={imagen}
                                        alt={`${titulo} - imagen ${index + 2}`}
                                    />

                                </figure>

                            )
                        )}


                    </section>

                )}


                {/* =================================
                    CTA
                ================================= */}

                <section className="project-detail-cta">


                    <h2>
                        ¿PREPARADO PARA DEFINIR EL FUTURO?
                    </h2>


                    <Link
                        to="/contact"
                        className="project-detail-cta-button"
                    >

                        <span>
                            Start a Project
                        </span>

                        <span className="project-detail-arrow">
                            →
                        </span>

                    </Link>


                </section>


            </main>


           

        </div>

    );

}


export default ProjectDetail;