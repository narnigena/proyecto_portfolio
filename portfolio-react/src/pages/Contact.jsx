import "./Contact.css";

function Contact() {

    return (

        <main className="contact-page">

            <section className="contact-section">

                <div className="contact-intro">

                    <span className="eyebrow">
                        CONTACTO
                    </span>

                    <h1>
                        Hablemos de tu
                        <br />
                        próximo proyecto
                    </h1>

                    <p>
                        ¿Cuál es tu próximo proyecto?
                        <br />
                        Créemoslo.
                    </p>


                    <div className="contact-info">

                        <span className="contact-label">
                            MAIL
                        </span>

                        <a
                            href="mailto:narnigena@gmail.com"
                            className="contact-email"
                        >
                            narnigena@gmail.com
                            <span>
                                ↗
                            </span>
                        </a>

                    </div>


                    <div className="contact-info">

                        <span className="contact-label">
                            REDES
                        </span>

                        <div className="contact-social">

                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Instagram
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Behance
                            </a>

                        </div>

                    </div>

                </div>


                <form
                    className="contact-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                >

                    <div className="form-group">

                        <label htmlFor="nombre">
                            TU NOMBRE
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            placeholder="Tu nombre"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="email">
                            EMAIL
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            TIPO DE PROYECTO
                        </label>

                        <div className="project-type">

                            <button
                                type="button"
                            >
                                Branding
                            </button>

                            <button
                                type="button"
                            >
                                Web
                            </button>

                            <button
                                type="button"
                            >
                                Diseño gráfico
                            </button>

                            <button
                                type="button"
                            >
                                Fotografía
                            </button>

                        </div>

                    </div>


                    <div className="form-group">

                        <label htmlFor="mensaje">
                            CUÉNTAME TU IDEA
                        </label>

                        <textarea
                            id="mensaje"
                            placeholder="Cuéntame un poco sobre tu proyecto..."
                            rows="6"
                        />

                    </div>


                    <button
                        type="submit"
                        className="primary-button"
                    >
                        ENVIAR MENSAJE
                        <span className="material-symbols-outlined">
                            arrow_forward
                        </span>
                    </button>

                </form>

            </section>

        </main>
    );
}

export default Contact;