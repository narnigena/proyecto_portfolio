
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/api";
import "./Photography.css";


// Cada posición corresponde a una composición de tu CSS.
// No cambies el orden de estas clases: el número de posición
// de MongoDB determina cuál de ellas recibe cada fotografía.
const galleryClasses = [
    "photo-item--portrait",    // Posición 1: imagen principal
    "photo-item--detail",      // Posición 2: detalle pequeño a la izquierda
    "photo-item--architecture",// Posición 3: imagen vertical a la derecha
    "photo-item--wide",        // Posición 4: imagen panorámica
    "photo-item--macro",       // Posición 5: imagen estrecha a la izquierda
    "photo-item--flower",      // Posición 6: imagen desplazada al centro
    "photo-item--landscape"    // Posición 7: imagen inferior
];

const specialtyDefinitions = [
    {
        number: "01",
        title: "Fotografía de Moda",
        key: "moda"
    },
    {
        number: "02",
        title: "Fotografía de Producto",
        key: "producto"
    },
    {
        number: "03",
        title: "Fotografía Documental",
        key: "documental"
    }
];

// Convierte "public/images/foto.jpg" en "/images/foto.jpg".
// También admite rutas absolutas, si alguna vez las necesitas.
function getImageUrl(value) {
    if (!value) return "";

    const raw =
        typeof value === "string"
            ? value
            : value.url || value.src || value.ruta || "";

    if (typeof raw !== "string" || !raw.trim()) return "";

    const url = raw.trim();

    if (/^(https?:\/\/|data:|blob:)/i.test(url)) {
        return url;
    }

    const cleanPath = url
        .replace(/^\.?\//, "")
        .replace(/^public\//, "");

    return `/${cleanPath}`;
}

function Photography() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const heroRef = useRef(null);

    // 1. Carga los proyectos desde tu API de Express/MongoDB.
    useEffect(() => {
        let active = true;

        async function loadProjects() {
            try {
                setLoading(true);
                setError("");

                const data = await getProjects();

                            console.log("[Photography] Respuesta de la API:", data);

            const list = Array.isArray(data)
                ? data
                : data?.proyectos || data?.projects || [];

            console.log("[Photography] Número de proyectos:", list.length);

            console.table(
                list.map((project) => ({
                    titulo: project.titulo,
                    id: project._id,
                    tieneImagenes: Array.isArray(project.imagenes),
                    numeroImagenes: project.imagenes?.length ?? 0,
                    tienePhotographyLayout: Array.isArray(
                        project.photographyLayout
                    ),
                    numeroFotografias: project.photographyLayout?.length ?? 0,
                }))
            );


              

                if (active) {
                    setProjects(list);
                }
            } catch (err) {
                console.error(
                    "No se pudieron cargar los proyectos de Photography:",
                    err
                );

                if (active) {
                    setError(
                        "No se han podido cargar las fotografías."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadProjects();

        return () => {
            active = false;
        };
    }, []);

    // 2. Extrae SOLO las imágenes que has configurado en photographyLayout. Cada entrada incluye la imagen, su posición, su especialidad y el ID del proyecto al que pertenece.
   
    const configuredPhotos = useMemo(() => {
        const photos = [];

        projects.forEach((project) => {
            const layout = Array.isArray(project.photographyLayout)
                ? project.photographyLayout
                : [];

            layout.forEach((item, itemIndex) => {
                if (item.mostrar === false) return;

                const src = getImageUrl(
                item.imagen ?? item.url ?? item.src ?? item.ruta
            );

                // No mostramos entradas sin ruta de imagen.
                if (!src) return;

                const position =
                    item.posicion == null || item.posicion === ""
                        ? null
                        : Number(item.posicion);

                if (
                    position !== null &&
                    (!Number.isInteger(position) || position < 1)
                ) {
                    return;
                }

                photos.push({
                    id: `${project._id || project.titulo}-${itemIndex}-${position ?? "especialidad"}`,
                    src,
                    alt: item.alt || project.titulo || "Fotografía",
                    title: project.titulo || "Fotografía",
                    position,
                    specialty: (item.especialidad || "").toLowerCase(),
                    projectId: project._id || null
                });
            });
        });

        // El orden final depende de MongoDB, no del orden de la respuesta de la API. Si dos fotos comparten posición, ambas se mantienen juntas; recomendamos asignar posiciones únicas.
        return photos.sort(
            (a, b) => a.position - b.position
        );
    }, [projects]);

    
        const galleryImages = configuredPhotos
            .filter((photo) => photo.position !== null)
            .sort((a, b) => a.position - b.position)
            .slice(0, 7);

    // 4. Cada tarjeta de especialidad utiliza la fotografía que tenga ese valor en photographyLayout.especialidad.

    const specialties = useMemo(() => {
        return specialtyDefinitions.map((definition) => ({
            ...definition,
            image:
                configuredPhotos.find(
                    (photo) => photo.specialty === definition.key
                ) || null
        }));
    }, [configuredPhotos]);

    // 5. Animación de entrada al hacer scroll.
    useEffect(() => {
        if (loading || error) return;

        const elements = document.querySelectorAll(
            ".photography-page .photography-reveal"
        );

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) =>
                element.classList.add("is-visible")
            );
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [loading, error, galleryImages.length]);

    // 6. Efecto de desplazamiento del título.
    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;

            const scrollPosition = window.scrollY;

            heroRef.current.style.opacity = Math.max(
                0,
                1 - scrollPosition / 300
            );

            heroRef.current.style.transform =
                `translateY(${scrollPosition * 0.15}px)`;
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="photography-page">

            
            <section className="photography-hero" ref={heroRef}>
                <h1>Narnígena</h1>
                <p>Photography Portfolio</p>
                <span
                    className="photography-hero-line"
                    aria-hidden="true"
                />
            </section>

            {/* GALERÍA PRINCIPAL: posición 1 a 7. */}
            <main className="photography-gallery-section">

                {loading && (
                    <p className="photography-status" role="status">
                        Cargando fotografías...
                    </p>
                )}

                {!loading && error && (
                    <div className="photography-status photography-status--error">
                        <p>{error}</p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                        >
                            Volver a cargar
                        </button>
                    </div>
                )}

                {!loading && !error && configuredPhotos.length === 0 && (
                    <div className="photography-status">
                        
                    </div>
                )}

                {!loading && !error && configuredPhotos.length > 0 && (
                    <div className="photography-gallery">
                        {galleryImages.map((photo, index) => (
                            <figure
                                key={photo.id}
                                className={[
                                    "photography-reveal",
                                    "irregular-grid-item",
                                    galleryClasses[index]
                                ].join(" ")}
                            >


                            {/* esto hace que al pasar por las imágenes, si se intenta hacer click no vaya a ninguna ruta*/}
                            
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                            />
                            </figure>
                        ))}
                    </div>
                )}
            </main>

            {/* ESPECIALIDADES: cada tarjeta tiene una selección independiente. */}
            <section className="photography-specialties">
                <div className="photography-specialties-heading">
                    <span className="photography-eyebrow">
                        IMAGEN · LUZ · NARRATIVA
                    </span>

                    <h2>Especialidad</h2>

                    <p>
                        Busco contar algo a través de la imagen.
                        Cada fotografía construye una atmósfera,
                        revela detalles y propone otra forma de mirar.

                        
                    </p>
                </div>

                <div className="photography-specialties-track">
                    {specialties.map((specialty) => (
                        <article
                            key={specialty.number}
                            className="photography-specialty-card"
                        >
                            
                            <div className="photography-specialty-image">

                                {specialty.image ? (
                                    <img
                                        src={specialty.image.src}
                                        alt={specialty.image.alt}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <div className="photography-specialty-placeholder">
                        
                                    </div>
                                )}

                                <div className="photography-specialty-overlay">
                                    <span>
                                        {specialty.number}. SERIES
                                    </span>
                                    <h3>{specialty.title}</h3>
                                
                                </div>
                                
                            </div>
                            
                        </article>
                      

                        
                    ))}
                </div>
            </section>

            {/* CTA: navegación interna con React Router. */}
            <section className="photography-contact photography-reveal">
                <span className="photography-eyebrow">
                    ¿TRABAJAMOS JUNTOS?
                </span>

                <h2>
                    Una idea.
                    <br />
                    Una imagen.
                    <br />
                    Una historia.
                </h2>

                <Link
                    to="/contact"
                    className="photography-contact-link"
                >
                    Hablemos de tu proyecto
                    <span aria-hidden="true">↗</span>
                </Link>
            </section>
        </div>
    );
}

export default Photography;
