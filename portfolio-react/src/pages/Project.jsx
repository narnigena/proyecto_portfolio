import { useEffect, useState } from "react";

import {Link, useParams} from "react-router-dom";

import {getProject} from "../services/api";


function Project() {

    const { id } = useParams();

    const [project, setProject] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        async function loadProject() {

            try {

                const data = await getProject(id);

                console.log("PROYECTO:", data);

                setProject(data);

            } catch (error) {

                console.error("ERROR:", error);

                setError(
                    "Could not load this project."
                );

            } finally {

                setLoading(false);

            }

        }

        loadProject();

    }, [id]);


    if (loading) {

        return (

            <main className="px-6 py-16">

                <p>
                    Loading project...
                </p>

            </main>

        );

    }


    if (error) {

        return (

            <main className="px-6 py-16">

                <p className="text-red-500">
                    {error}
                </p>

            </main>

        );

    }


    if (!project) {

        return (

            <main className="px-6 py-16">

                <p>
                    Project not found.
                </p>

                <Link
                    to="/projects"
                    className="underline"
                >
                    Back to projects
                </Link>

            </main>

        );

    }


    const imagenes =
        Array.isArray(project.imagenes)
            ? project.imagenes
            : [];


    return (

        <main
            className="
                px-6
                md:px-10
                lg:px-16
                py-16
            "
        >

            <Link
                to="/projects"
                className="
                    inline-block
                    mb-10
                    text-sm
                    uppercase
                    tracking-wide
                "
            >
                ← Back to projects
            </Link>


            {project.categoria && (

                <p
                    className="
                        mb-3
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        text-gray-500
                    "
                >
                    {project.categoria}
                </p>

            )}


            <h1
                className="
                    text-4xl
                    md:text-6xl
                    font-bold
                    tracking-tight
                    mb-6
                "
            >
                {project.titulo}
            </h1>


            {project.descripcion && (

                <p
                    className="
                        max-w-3xl
                        text-lg
                        leading-8
                        text-gray-600
                        mb-12
                    "
                >
                    {project.descripcion}
                </p>

            )}


            {imagenes.length > 0 && (

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-6
                    "
                >

                    {imagenes.map(
                        (imagen, index) => (

                            <img
                                key={index}
                                src={imagen}
                                alt={`${project.titulo} - ${index + 1}`}
                                className="
                                    w-full
                                    object-cover
                                "
                            />

                        )
                    )}

                </div>

            )}


        </main>

    );



}


export default Project;