
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [estaLogueado, setEstaLogueado] = useState(
        () => Boolean(localStorage.getItem("token"))
    );

    // Se llama después de que el login sea correcto.
    function login(datos) {
        // Adapta estas propiedades si tu API devuelve el token
        // con otro nombre.
        const token = datos?.token;

        if (!token) {
            throw new Error("La respuesta del login no contiene un token.");
        }

        localStorage.setItem("token", token);
        setEstaLogueado(true);
    }

    // Cierra la sesión y elimina el token.
    function logout() {
        localStorage.removeItem("token");
        setEstaLogueado(false);
    }

    return (
        <AuthContext.Provider
            value={{ estaLogueado, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider."
        );
    }

    return context;
}
