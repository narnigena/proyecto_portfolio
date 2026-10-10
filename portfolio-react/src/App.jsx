import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Loading from "@/components/Loading";

import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";

import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import NewProject from "./pages/NewProject.jsx";
import EditProject from "./pages/EditProject.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Photography from "./pages/Photography.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


function App() {

    return (

        <>

            <CustomCursor />

            <Header />


            <Routes>

                {/* =========================
                    HOME
                ========================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* =========================
                    PROYECTOS
                ========================= */}

                <Route
                    path="/projects"
                    element={<Projects />}
                />


                {/* =========================
                    DETALLE DEL PROYECTO
                ========================= */}

                <Route
                    path="/projects/:id"
                    element={<ProjectDetail />}
                />

                {/* =========================
                    fOTOGRAFÍA
                ========================= */}
                <Route
                    path="/photography"
                    element={<Photography />}
                />


                {/* =========================
                    ABOUT
                ========================= */}

                <Route
                    path="/about"
                    element={<About />}
                />


                {/* =========================
                    CONTACT
                ========================= */}

                <Route
                    path="/contact"
                    element={<Contact />}
                />


                {/* =========================
                    LOGIN
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =========================
                    ADMINISTRACIÓN
                ========================= */}

                <Route
                    path="/projects/new"
                    element={
                        <ProtectedRoute>
                        <NewProject />
                        </ProtectedRoute>
                    }
                    />

                <Route
                    path="/projects/edit/:id"
                    element={
                        <ProtectedRoute>
                        <EditProject />
                        </ProtectedRoute>
                    }
                    />

            </Routes>


            <Footer />

        </>

    );

}


export default App;