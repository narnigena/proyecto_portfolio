import { Link } from "react-router-dom";


function ProjectCard({
    project,
    index
}) {

    const imagen =
        Array.isArray(project.imagenes) &&
        project.imagenes.length > 0
            ? project.imagenes[0]
            : null;
   

    return (

        <article
            className="
                group
                w-full
            "
        >

            <Link
                to={`/projects/${project._id}`}
                className="block"
            >


                {/* IMAGEN */}

                <div
                    className="
                        relative
                        overflow-hidden
                        bg-gray-100
                        aspect-[4/3]
                    "
                >

                    {imagen ? (

                        <img
                            src={imagen}
                            alt={project.titulo}
                            className="
                                w-full
                                h-full
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                        />

                    ) : (

                        <div
                            className="
                                w-full
                                h-full
                                flex
                                items-center
                                justify-center
                                bg-gray-100
                            "
                        >

                            <span className="text-gray-400">
                                No image
                            </span>

                        </div>

                    )}

                </div>


                {/* INFORMACIÓN */}

                <div className="mt-5">

                    <p
                        className="
                            mb-2
                            text-xs
                            uppercase
                            tracking-[0.18em]
                            text-gray-500
                        "
                    >
                        {project.categoria}
                    </p>


                    <h3
                        className="
                            text-2xl
                            font-bold
                            tracking-tight
                        "
                    >
                        {project.titulo}
                    </h3>


                    {project.descripcion && (

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-gray-600
                                max-w-xl
                            "
                        >
                            {project.descripcion}
                        </p>

                    )}

                </div>

            </Link>

        </article>

    );

}


export default ProjectCard;