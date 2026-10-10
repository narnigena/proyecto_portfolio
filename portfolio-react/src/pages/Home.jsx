import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProjects } from "../services/api";

function Home() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("Todos");


    useEffect(() => {

        async function loadProjects() {

            try {

                const data = await getProjects();

                console.log(
                    "PROYECTOS DEL HOME:",
                    data
                );

                setProjects(data);

            } catch (error) {

                console.error(
                    "ERROR CARGANDO PROYECTOS:",
                    error
                );

                setError(
                    "No se pudieron cargar los proyectos."
                );

            } finally {

                setLoading(false);

            }

        }

        loadProjects();

    }, []);


    const categorias = [
        "Todos",
        "DISEÑO GRÁFICO",
        "FOTOGRAFÍA",
        "WEB",
        "UX/UI"
    ];


    const proyectosFiltrados = projects.filter(
        (project) => {

            //para filtrar las secciones
            const textoBusqueda =
                search.toLowerCase().trim();


            const coincideBusqueda =
                project.titulo
                    ?.toLowerCase()
                    .includes(textoBusqueda) ||
                project.descripcion
                    ?.toLowerCase()
                    .includes(textoBusqueda) ||
                project.categoria
                    ?.toLowerCase()
                    .includes(textoBusqueda);


            if (filter === "Todos") {

                return coincideBusqueda;

            }


            return (
                coincideBusqueda &&
                project.categoria
                    ?.toLowerCase()
                    .includes(filter.toLowerCase())
            );

        }
    );


    return (

        <main className="main-container">

            {/* =========================
                HERO
            ========================= */}

            <section className="hero">

                <div className="hero-text">

                    <span className="eyebrow">
                        BRANDING | WEB DESIGN
                    </span>


                    <h1>

                        Diseño
                        <br />

                        <em>
                            experiencias
                        </em>

                        <br />

                        <em>
                            digitales
                        </em>

                        <br />

                        para marcas
                        <br />

                        con algo que contar

                    </h1>


                    <p>
                        Creo diseño con identidad,
                        desde la primera idea hasta
                        la experiencia digital.
                    </p>


                    <a
                        href="#proyectos"
                        className="primary-button"
                    >
                        ¿TIENES UNA IDEA?
                    </a>

                </div>


                <div className="hero-image">

                    <div className="hero-blob">

                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfysC1X1VA92pzWsmt6kfGak6GMzcuvIh-wZyj1vzj2WcKdXjjzY6HH7i0tKxgtm9mp0YmxAfQw7fdDoLSZ2tsZMN_mur2na8HhvcF1zeC-S4FGw2eUqGxEODaIqIL64WQaxHubmO-5cCedCIqWNoclupNlLAByBWtGEpMTvkkNeiGd639IEaZtWGOmeMpz8RZ2fSjszjuTUoAm6Y3XbZ7qUDALWNU0gAp_GU2rC4krHjgo4Iq1A4hpjPlBEkY02escEUHCb3ngSqUCHA"
                            alt="Narnígena"
                        />

                    </div>

                </div>

            </section>


            {/* =========================
                PORTFOLIO
            ========================= */}

            <section className="portfolio-section">

                <div className="section-heading">

                    <span className="eyebrow">
                        PORTAFOLIO
                    </span>

                    <h2>
                        Proyectos
                    </h2>

                </div>


                <div className="project-tools">

                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Buscar proyectos..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    <div className="filters">

                        {categorias.map(
                            (categoria) => (

                                <button
                                    key={categoria}
                                    type="button"
                                    onClick={() =>
                                        setFilter(categoria)
                                    }
                                    style={
                                        filter === categoria
                                            ? {
                                                color:
                                                    "var(--primary)"
                                            }
                                            : {}
                                    }
                                >
                                    {categoria}
                                </button>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* =========================
                PROJECT GRID
            ========================= */}

            <section
                id="proyectos"
                className="project-grid"
            >

                {loading && (

                    <div className="loading">

                        Cargando proyectos...

                    </div>

                )}


                {error && (

                    <div className="error-message">

                        {error}

                    </div>

                )}


                {!loading &&
                    !error &&
                    proyectosFiltrados.length === 0 && (

                        <div className="empty-projects">

                            No se encontraron proyectos.

                        </div>

                    )}


                {!loading &&
                    !error &&
                    proyectosFiltrados.map(
                        (project) => {

                            const imagen =
                                Array.isArray(
                                    project.imagenes
                                ) &&
                                project.imagenes.length > 0
                                    ? project.imagenes[0]
                                    : null;


                            return (

                                <article
                                    key={project._id}
                                    className="project-card"
                                >

                                    <Link
                                        to={`/projects/${project._id}`}
                                    >

                                        <div className="project-image-container">

                                            {imagen ? (

                                                <img
                                                    src={imagen}
                                                    alt={
                                                        project.titulo ||
                                                        "Project"
                                                    }
                                                    className="project-image"
                                                />

                                            ) : (

                                                <div
                                                    style={{
                                                        width:
                                                            "100%",
                                                        height:
                                                            "100%",
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        color:
                                                            "var(--text-secondary)"
                                                    }}
                                                >
                                                    Sin imagen
                                                </div>

                                            )}

                                        </div>


                                        <div className="project-content">

                                            <div className="project-top">

                                                <span className="project-category">

                                                    {project.categoria ||
                                                        "PROJECT"}

                                                </span>

                                            </div>


                                            <h3>
                                                {project.titulo}
                                            </h3>


                                            <p>
                                                {project.descripcion}
                                            </p>


                                            <div className="project-actions">

                                                <span className="view-project">

                                                    VER PROYECTO

                                                    <span className="material-symbols-outlined">
                                                        arrow_forward
                                                    </span>

                                                </span>

                                            </div>

                                        </div>

                                    </Link>

                                </article>

                            );

                        }
                    )}

            </section>


            {/* =========================
                SERVICES
            ========================= */}

            <section className="services">

                <span className="eyebrow">
                    NUESTROS SERVICIOS
                </span>


                <div className="services-grid">

                    <div className="service">

                        <div className="editorial-line"></div>

                        <span className="service-number">
                            01
                        </span>

                        <h3>
                            Desarrollo Web
                        </h3>

                        <p>
                            Interfaces limpias y funcionales
                            construidas con las últimas
                            tecnologías. Priorizo la relación
                            entre diseño y experiencia de usuario.
                        </p>

                    </div>


                    <div className="service">

                        <div className="editorial-line"></div>

                        <span className="service-number">
                            02
                        </span>

                        <h3>
                            Diseño Gráfico
                        </h3>

                        <p>
                            Desde sistemas de identidad visual
                            hasta diseño editorial. Creo
                            lenguajes visuales que perduran
                            en el tiempo.
                        </p>

                    </div>


                    <div className="service">

                        <div className="editorial-line"></div>

                        <span className="service-number">
                            03
                        </span>

                        <h3>
                            Audiovisual
                        </h3>

                        <p>
                            Coherencia visual y estrategia
                            para contenidos audiovisuales
                            y redes sociales.
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================
                ABOUT
            ========================= */}

            <section className="about-preview">

                <div className="about-image">

                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn9YwwibJbbVmVnwA9CHxKJpwW0oZGBAIwiI91O8zSZDNNxRlvCzmGWCiRf4WdaCZnha3BO3i6jQvryM--O4PldWRBFPoAarHMxYuAGtzIlpGFtZHwzdtR_9bc_CN8wKCeq4Qcfn9c-YznjaCfg6KH4DACyKydF6w3V64j31nHMNqy5lzloiwNiJbla8wJv_e5IsAKjyKsL9low6kOigA66VkVHa3YnrCAhFqJK7z0PWlH1NXhJUW2AV3y5-n0-SY9JjpFMEmXTkVG"
                        alt="Narnígena"
                    />

                </div>


                <div className="about-text">

                    <span className="eyebrow">
                        SOBRE NARNÍGENA
                    </span>


                    <h2>
                        "Creo en la simplicidad no
                        como una meta, sino como una
                        consecuencia de la intención
                        clara."
                    </h2>


                    <p>
                        Por una apasionada de la fotografía
                        y el diseño, Narnígena nació de la
                        necesidad de crear lo que las marcas
                        necesitan en el mundo digital.
                        Diseño estratégico y experiencia web
                        que cuente lo que tu marca ofrece
                        al mundo.
                    </p>


                    <Link
                        to="/about"
                        className="text-link"
                    >
                        SOBRE MÍ →
                    </Link>

                </div>

            </section>


            {/* =========================
                CONTACT
            ========================= */}

            <section className="contact-cta">

                <h2>
                    ¿Tienes una idea en mente?
                </h2>


                <p>
                    Creemos tu proyecto juntos
                </p>


                <a
                    href="mailto:hola@narnigena.com"
                    className="primary-button"
                >

                    <span className="material-symbols-outlined">
                        mail
                    </span>

                    HÁBLEMOS

                </a>

            </section>

        </main>

    );
}

export default Home;