import Header from "../components/Header";
import AdminBar from "../components/AdminBar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

function About() {

    return (

        <>

            <CustomCursor />

            <main className="main-container">

                <section className="page-header">

                    <span className="eyebrow">
                        SOBRE NARNÍGENA
                    </span>

                    <h1>
                        Diseño con intención.
                    </h1>

                    <p>
                        Diseño gráfico, fotografía y
                        experiencias digitales para marcas
                        con algo que contar.
                    </p>

                </section>


                <section className="about-page">

                    <div>

                        <img
                            src="/images/about.jpg"
                            alt="Narnígena"
                        />

                    </div>


                    <div>

                        <h2>
                            Diseño estratégico
                            y experiencia web.
                        </h2>

                        <p>
                            Narnígena nace de la unión
                            entre fotografía, diseño gráfico
                            y comunicación visual.
                        </p>

                        <p>
                            El objetivo es crear identidades
                            y experiencias digitales que
                            tengan personalidad y coherencia.
                        </p>

                    </div>

                </section>

            </main>


            

        </>
    );
}

export default About;