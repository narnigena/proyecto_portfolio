import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="footer">

            <div className="footer-grid">

                <div>

                    <Link
                        to="/"
                        className="footer-logo"
                    >
                        Narnígena
                    </Link>

                    <p className="footer-copy">
                        Branding y diseño web
                    </p>

                </div>


                <div>

                    <span className="eyebrow">
                        NAVEGACIÓN
                    </span>

                    <nav className="footer-nav">

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/projects">
                            Projects
                        </Link>

                        <Link to="/about">
                            About
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                    </nav>

                </div>


                <div>

                    <span className="eyebrow">
                        CONTACTO
                    </span>

                    <div className="footer-social">

                        <a href="mailto:hola@narnigena.com">
                            Email
                        </a>

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

                    </div>

                </div>

            </div>


            

        </footer>
    );
}

export default Footer;