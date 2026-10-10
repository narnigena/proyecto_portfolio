
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getProjects,
  updateProject,
  deleteProject,
} from "../services/api";
import "./Projects.css";

const FORM_INICIAL = {
  titulo: "",
  slug: "",
  categoria: "",
  descripcion: "",
  imagenes: "",
  herramientas: "",
  fecha: new Date().getFullYear().toString(),
  destacado: false,
};

function prepararFormulario(project) {
  return {
    titulo: project.titulo || "",
    slug: project.slug || "",
    categoria: project.categoria || "",
    descripcion: project.descripcion || "",
    imagenes: Array.isArray(project.imagenes)
      ? project.imagenes.join("\n")
      : project.imagenes || "",
    herramientas: Array.isArray(project.herramientas)
      ? project.herramientas.join(", ")
      : project.herramientas || "",
    fecha: project.fecha
      ? String(project.fecha).slice(0, 10)
      : "",
    destacado: Boolean(project.destacado),
  };
}

function ModalEditar({ project, onClose, onSave, saving, error }) {
  const [form, setForm] = useState(() =>
    prepararFormulario(project)
  );

  function cambiar(campo, valor) {
    setForm((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  function enviar(event) {
    event.preventDefault();

    const datos = {
      ...form,
      imagenes: form.imagenes
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean),
      herramientas: form.herramientas
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      destacado: Boolean(form.destacado),
    };

    onSave(project._id, datos);
  }

  return (
    <div
      className="project-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-editar-titulo"
      >
        <div className="project-modal-heading">
          <div>
            <span className="project-modal-eyebrow">
              ADMINISTRACIÓN / PROYECTOS
            </span>
            <h2 id="modal-editar-titulo">Editar proyecto</h2>
            <p>Modifica los datos de tu proyecto.</p>
          </div>

          <button
            type="button"
            className="project-modal-close"
            onClick={onClose}
            disabled={saving}
            aria-label="Cerrar ventana"
          >
            ×
          </button>
        </div>

        <form className="project-modal-form" onSubmit={enviar}>
          <label>
            Título
            <input
              required
              value={form.titulo}
              onChange={(e) => cambiar("titulo", e.target.value)}
            />
          </label>

          <label>
            Slug
            <input
              required
              value={form.slug}
              onChange={(e) => cambiar("slug", e.target.value)}
              placeholder="nombre-del-proyecto"
            />
          </label>

          <label>
            Categoría
            <input
              required
              value={form.categoria}
              onChange={(e) => cambiar("categoria", e.target.value)}
            />
          </label>

          <label>
            Fecha
            <input
              value={form.fecha}
              onChange={(e) => cambiar("fecha", e.target.value)}
              placeholder="2026"
            />
          </label>

          <label className="project-modal-full">
            Descripción
            <textarea
              required
              rows="4"
              value={form.descripcion}
              onChange={(e) =>
                cambiar("descripcion", e.target.value)
              }
            />
          </label>

          <label className="project-modal-full">
            Imágenes
            <span className="project-modal-help">
              Una URL por línea. La primera será la imagen principal.
            </span>
            <textarea
              rows="3"
              value={form.imagenes}
              onChange={(e) => cambiar("imagenes", e.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className="project-modal-full">
            Herramientas
            <span className="project-modal-help">
              Separa las herramientas mediante comas.
            </span>
            <input
              value={form.herramientas}
              onChange={(e) =>
                cambiar("herramientas", e.target.value)
              }
              placeholder="Figma, Photoshop, React"
            />
          </label>

          <label className="project-modal-featured">
            <input
              type="checkbox"
              checked={form.destacado}
              onChange={(e) =>
                cambiar("destacado", e.target.checked)
              }
            />
            Mostrar como proyecto destacado
          </label>

          {error && (
            <p className="project-modal-error" role="alert">
              {error}
            </p>
          )}

          <div className="project-modal-actions">
            <button
              type="button"
              className="project-modal-cancel"
              onClick={onClose}
              disabled={saving}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="project-modal-save"
              disabled={saving}
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

const FILTROS = [
  { label: "TODOS", value: "all" },
  { label: "DISEÑO GRÁFICO", value: "diseno-grafico" },
  { label: "FOTOGRAFÍA", value: "fotografia" },
  { label: "WEB", value: "web" },
  { label: "UX/UI", value: "ux-ui" },
];

function normalizarTexto(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function categoriasDe(project) {
  const original = [
    project.categoria,
    ...(Array.isArray(project.categorias) ? project.categorias : []),
  ]
    .filter(Boolean)
    .join(" ");

  const texto = normalizarTexto(original);
  const resultado = [];

  if (
    /diseno-grafico|branding|identidad|editorial|packaging|cartel|grafico/.test(texto)
  ) {
    resultado.push("diseno-grafico");
  }

  if (/fotografia|fotografico|foto|audiovisual/.test(texto)) {
    resultado.push("fotografia");
  }

  if (/web|desarrollo-web|e-commerce|ecommerce|sitio-web/.test(texto)) {
    resultado.push("web");
  }

  if (/ux-ui|ux|ui|interfaz|experiencia-de-usuario|aplicacion/.test(texto)) {
    resultado.push("ux-ui");
  }

  return resultado;
}

function imagenPrincipal(project) {
  if (Array.isArray(project.imagenes)) {
    return project.imagenes[0] || "";
  }

  return project.imagenes || project.imagen || project.image || "";
}

export default function Projects() {
  const { estaLogueado } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [modalError, setModalError] = useState("");

  async function cargarProyectos() {
    setPageError("");

    try {
      const data = await getProjects();
      const lista = Array.isArray(data)
        ? data
        : Array.isArray(data?.proyectos)
          ? data.proyectos
          : [];

      setProjects(lista);
    } catch (error) {
      console.error("Error cargando proyectos:", error);
      setPageError("No se han podido cargar los proyectos. Comprueba la conexión con la API.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarProyectos();
  }, []);

  const proyectosFiltrados = useMemo(() => {
    const termino = normalizarTexto(search);

    return projects.filter((project) => {
      const textoProyecto = normalizarTexto([
        project.titulo,
        project.nombre,
        project.title,
        project.descripcion,
        project.categoria,
        project.fecha,
        ...(Array.isArray(project.herramientas)
          ? project.herramientas
          : [project.herramientas || ""]),
      ].filter(Boolean).join(" "));

      const coincideBusqueda =
        !termino || textoProyecto.includes(termino);

      const coincideCategoria =
        activeFilter === "all" ||
        categoriasDe(project).includes(activeFilter);

      return coincideBusqueda && coincideCategoria;
    });
  }, [projects, search, activeFilter]);

  const conteos = useMemo(() => {
    const resultado = { all: projects.length };

    FILTROS.filter((filtro) => filtro.value !== "all").forEach((filtro) => {
      resultado[filtro.value] = projects.filter((project) =>
        categoriasDe(project).includes(filtro.value)
      ).length;
    });

    return resultado;
  }, [projects]);

  async function guardarEdicion(id, datos) {
    setSaving(true);
    setModalError("");

    try {
      await updateProject(id, datos);
      await cargarProyectos();
      setEditingProject(null);
    } catch (error) {
      console.error("Error actualizando proyecto:", error);

      setModalError(
        error.message === "Error 404"
          ? "No se encuentra la ruta de actualización de la API. Revisa el endpoint PATCH del backend."
          : `No se han podido guardar los cambios: ${error.message}`
      );
    } finally {
      setSaving(false);
    }
  }

  async function borrarProyecto(project) {
    const titulo =
      project.titulo || project.nombre || project.title || "este proyecto";

    if (!window.confirm(`¿Quieres eliminar «${titulo}»? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      await deleteProject(project._id);
      await cargarProyectos();
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
      setPageError(`No se ha podido eliminar el proyecto: ${error.message}`);
    }
  }

  return (
    <main className="st-projects">
      {/* Cabecera editorial */}
      <section className="st-archive-intro-section">
        <div className="st-ambient st-ambient-one" />
        <div className="st-ambient st-ambient-two" />

        <div className="st-container st-archive-inner">
          <div className="st-archive-topline">
            <div className="st-kicker">
              <span className="st-diamond" />
              <span>ARCHIVO DE TRABAJOS / 2019 — 2026</span>
            </div>

            
          </div>

          <div className="st-hero-grid">
            <div className="st-hero-copy">
                {/* Título principal del archivo de proyectos */}
                <h1>PROYECTS<span className="st-orange">.</span>
                </h1>
                <p>
                  Estudio y desarrollo integral donde se aborda la dirección de arte, diseño editorial, identidad de marca y experiencias digitales desarrolladas para cada proyecto
                </p>

                {/* Esta caja SOLO se renderiza cuando estaLogueado es true.
                    Si no hay una sesión iniciada, React no muestra ningún elemento aquí. */}
                {estaLogueado && (
                  <div className="st-system-status">
                    
                    <span className="st-status-pulse" />USUARIO EN MODO EDICIÓN
                  </div>
                )}
              </div>
 
          </div>

          {/* Filtros y buscador */}
          <div className="st-toolbar">
            <div className="st-toolbar-categories">
              <div className="st-count-label">
                PORTAFOLIO (
                <span>{proyectosFiltrados.length}</span>
                {" / "}
                {projects.length} ACTIVOS)
              </div>

              <div className="st-filter-list">
                {FILTROS.map((filtro) => (
                  <button
                    type="button"
                    key={filtro.value}
                    className={
                      activeFilter === filtro.value
                        ? "st-filter-btn is-active"
                        : "st-filter-btn"
                    }
                    onClick={() => setActiveFilter(filtro.value)}
                  >
                    {filtro.label} ({conteos[filtro.value]})
                  </button>
                ))}
              </div>
            </div>

            <label className="st-search">
              <span className="material-symbols-outlined" aria-hidden="true">
                search
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar en el archivo..."
                aria-label="Buscar proyectos"
              />
            </label>
          </div>

          {estaLogueado && (
            <div className="st-admin-banner">
              <span className="st-diamond" />
              MODO ADMINISTRACIÓN ACTIVO — Puedes crear, editar y eliminar proyectos.
            </div>
            
          )}
        </div>
      </section>

      {/* Cuadrícula editorial */}
      <section className="st-projects-section">
        <div className="st-container">
          {loading && (
            <p className="st-feedback">Cargando archivo de proyectos...</p>
          )}

          {pageError && (
            <p className="st-feedback st-feedback-error" role="alert">
              {pageError}
              <button type="button" onClick={cargarProyectos}>
                Reintentar
              </button>
            </p>
          )}

          {!loading && !pageError && proyectosFiltrados.length > 0 && (
            <div className="st-project-grid">
              {proyectosFiltrados.map((project, index) => {
                const titulo =
                  project.titulo || project.nombre || project.title || "Proyecto sin título";

                const imagen = imagenPrincipal(project);

                return (
                  <article className="st-project-card" key={project._id}>
                    <Link
                      className="st-project-card-image"
                      to={`/projects/${project._id}`}
                      aria-label={`Ver proyecto ${titulo}`}
                    >
                      {imagen ? (
                        <img
                          src={imagen}
                          alt={titulo}
                          loading="lazy"
                        />
                      ) : (
                        <div className="st-project-placeholder">
                          <span>NARNÍGENA</span>
                          <span className="material-symbols-outlined">
                            image
                          </span>
                        </div>
                      )}

                      <span className="st-project-index">
                        {String(index + 1).padStart(2, "0")} //{" "}
                        {project.categoria || "PROYECTO"}
                      </span>

                      {project.destacado && (
                        <span className="st-project-featured">
                          DESTACADO
                        </span>
                      )}

                      <span className="st-image-arrow material-symbols-outlined">
                        north_east
                      </span>
                    </Link>

                    <div className="st-project-card-body">
                      <div className="st-project-card-copy">
                        <h2>
                          <Link to={`/projects/${project._id}`}>
                            {titulo}
                          </Link>
                        </h2>

                        <p>
                          {project.descripcion ||
                            "Proyecto de diseño y exploración visual."}
                        </p>
                      </div>

                      <div className="st-project-card-footer">
                        <span className="st-project-meta">
                          {project.fecha || "PORTFOLIO"}
                          {" / "}
                          {(project.categoria || "CREATIVE").toUpperCase()}
                        </span>

                        <Link
                          className="st-view-project"
                          to={`/projects/${project._id}`}
                        >
                          VER PROYECTO
                          <span className="material-symbols-outlined">
                            arrow_forward
                          </span>
                        </Link>
                      </div>

                      {estaLogueado && (
                        <div className="st-project-admin">
                          <button
                            type="button"
                            onClick={() => {
                              setModalError("");
                              setEditingProject(project);
                            }}
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                            EDITAR
                          </button>

                          <button
                            type="button"
                            onClick={() => borrarProyecto(project)}
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                            ELIMINAR
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!loading && !pageError && proyectosFiltrados.length === 0 && (
            <div className="st-no-results">
              <span className="material-symbols-outlined">
                search_off
              </span>
              <h2>NO SE HALLARON REGISTROS</h2>
              <p>
                Intenta ajustar los criterios de búsqueda o categoría.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("all");
                }}
              >
                RESTABLECER FILTROS
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Declaración de metodología de Stitch */}
      <section className="st-methodology-section">
        <div className="st-container">
          <div className="st-methodology">
            <span className="st-coordinate">
              VISUAL SYSTEM / NARNÍGENA
            </span>

            <div className="st-methodology-copy">
              <div className="st-section-kicker">
                <span className="st-diamond" />
                METODOLOGÍA RIGUROSA
              </div>

              <h2>
                DISEÑAMOS SISTEMAS QUE RESISTEN EL DESGASTE DEL TIEMPO.
              </h2>

              <p>
                Cada proyecto se aborda desde su concepto y estructura
                tipográfica hasta su ejecución visual y técnica, construyendo
                una identidad coherente, funcional y reconocible.
              </p>
            </div>

            <div className="st-methodology-data">
              <div>
                <span>ESTATUS DE DISPONIBILIDAD</span>
                <strong>CONSULTAR</strong>
              </div>
              <div>
                <span>LOCALIZACIÓN</span>
                <strong>ESPAÑA / REMOTO</strong>
              </div>
              <div>
                <span>ÁREAS DE TRABAJO</span>
                <strong>DISEÑO / WEB / FOTO</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="st-contact-section">
        <div className="st-container">
          <div className="st-contact-cta">
            <div className="st-contact-glow" />

            <div className="st-contact-copy">
              <div className="st-section-kicker">
                <span className="st-diamond" />
                TRANSMISIÓN DIRECTA
              </div>

              <h2>
                ¿TIENES UNA IDEA EN MENTE?
                <br />
                <span>CREEMOS TU PROYECTO JUNTOS.</span>
              </h2>

              <p>
                Abriendo diálogos con marcas, equipos creativos y proyectos
                que buscan una identidad visual propia.
              </p>
            </div>

            <Link className="st-contact-button" to="/contact">
              HABLEMOS
              <span className="material-symbols-outlined">
                north_east
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal existente: conserva la lógica de guardado */}
      {editingProject && (
        <ModalEditar
          key={editingProject._id}
          project={editingProject}
          onClose={() => {
            if (!saving) {
              setEditingProject(null);
              setModalError("");
            }
          }}
          onSave={guardarEdicion}
          saving={saving}
          error={modalError}
        />
      )}
    </main>
  );
}
