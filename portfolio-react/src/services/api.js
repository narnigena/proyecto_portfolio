const API_URL = import.meta.env.VITE_API_URL;


async function request(endpoint, options = {}) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {

        ...options,

        headers: {
            "Content-Type": "application/json",
            ...(token
                ? {
                    Authorization: `Bearer ${token}`
                }
                : {}),
            ...(options.headers || {})
        }

    });


    if (!response.ok) {

        throw new Error(`Error ${response.status}`);

    }


    // DELETE/PATCH pueden devolver 204 sin contenido
    if (response.status === 204) {
        return null;
    }


    return response.json();

}


// LOGIN

export async function login(usuario, password) {

    return request("/login", {

        method: "POST",

        body: JSON.stringify({
            usuario,
            password
        })

    });

}


// PROYECTOS

export async function getProjects() {

    return request("/api/proyectos");

}


export async function getProject(id) {

   const response = await fetch(`${API_URL}/api/proyectos/${id}`);

  if (!response.ok) {
    throw new Error("No se ha podido cargar el proyecto");
  }

  return response.json();
}




export async function createProject(project) {

    return request("/api/proyectos/nuevo", {

        method: "POST",

        body: JSON.stringify(project)

    });

}


export async function updateProject(id, project) {

    return request(`/api/proyectos/actualizar/${id}`, {

        method: "PATCH",

        body: JSON.stringify(project)

    });

}


export async function deleteProject(id) {

    return request(`/api/proyectos/borrar/${id}`, {

        method: "DELETE"

    });

}