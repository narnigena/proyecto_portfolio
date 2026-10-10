import { Link } from "react-router-dom";

function ProjectGrid({ projects }) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project) => (

                <Link
                    key={project._id}
                    to={`/projects/${project._id}`}
                    className="group block"
                >

                    <article className="bg-[#1d2023] border border-[#554338] overflow-hidden">

                        {/* Imagen del proyecto */}

                        {project.imagen && (

                            <div className="aspect-[4/3] overflow-hidden">

                                <img
                                    src={project.imagen}
                                    alt={project.titulo || "Proyecto"}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                            </div>

                        )}

                        {/* Información */}

                        <div className="p-6">

                            <p className="text-xs uppercase tracking-widest text-[#ffb782] mb-3">
                                {project.categoria || "Diseño"}
                            </p>

                            <h2 className="text-2xl font-bold uppercase group-hover:text-[#ffb782] transition-colors">
                                {project.titulo || project.nombre}
                            </h2>

                            {project.descripcion && (

                                <p className="mt-4 text-sm text-[#a28c7e] line-clamp-3">
                                    {project.descripcion}
                                </p>

                            )}

                            <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-[#dbc2b2]">

                                Ver proyecto

                                <span className="material-symbols-outlined text-[#ffb782]">
                                    arrow_forward
                                </span>

                            </div>

                        </div>

                    </article>

                </Link>

            ))}

        </div>
    );
}

export default ProjectGrid;