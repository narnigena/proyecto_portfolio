import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginAPI } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";

import "./login.css";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [usuario, setUsuario] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [cargando, setCargando] = useState(false);


    async function enviarFormulario(event) {

        event.preventDefault();

        setError("");

        setCargando(true);


        try {

            const datos = await loginAPI(
                usuario,
                password
            );


            console.log(
                "LOGIN CORRECTO:",
                datos
            );


            login(datos);


            navigate(
                "/projects",
                {
                    replace: true
                }
            );


        } catch (error) {

            console.error(
                "ERROR LOGIN:",
                error
            );


            setError(
                "Usuario o contraseña incorrectos."
            );

        } finally {

            setCargando(false);

        }

    }


    return (

        <main className="login-page">

            <section className="login-section">


                <div className="login-intro">

                    <span className="eyebrow">
                        ÁREA PRIVADA
                    </span>

                    <h1>
                        Bienvenid@
                        <br />
                        de nuevo
                    </h1>

                    <p>
                        Inicie sesión para gestionar y ver el estado de sus proyectos con Narnígena
                
                    </p>

                </div>


                <form
                    className="login-form"
                    onSubmit={enviarFormulario}
                >

                    <div className="form-group">

                        <label htmlFor="usuario">
                            USUARIO
                        </label>

                        <input
                            id="usuario"
                            type="text"
                            value={usuario}
                            onChange={(event) =>
                                setUsuario(
                                    event.target.value
                                )
                            }
                            placeholder="Tu usuario"
                            autoComplete="username"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="password">
                            CONTRASEÑA
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Tu contraseña"
                            autoComplete="current-password"
                            required
                        />

                    </div>


                    {error && (

                        <p className="login-error">
                            {error}
                        </p>

                    )}


                    <button
                        type="submit"
                        className="primary-button login-button"
                        disabled={cargando}
                    >

                        {cargando
                            ? "COMPROBANDO..."
                            : "INICIAR SESIÓN"
                        }

                        <span className="material-symbols-outlined">
                            arrow_forward
                        </span>

                    </button>

                </form>

            </section>

        </main>

    );
}

export default Login;