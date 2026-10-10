import { Routes, Route } from "react-router-dom";
import Projects from "../pages/Projects";
import Project from "../pages/Project";

function ProjectedRouted() {

    return (

        <Routes>

            <Route
                path="/projects"
                element={<Projects />}
            />

            <Route
                path="/projects/:id"
                element={<Project />}
            />

        </Routes>
    );
}

export default ProjectedRouted;