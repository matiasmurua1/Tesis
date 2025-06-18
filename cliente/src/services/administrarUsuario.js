const API_URL = "http://localhost:4000/usuariosClientes"; 


export const obtenerUsuariosClientes = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios clientes");
    }
    const data = await response.json();
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al obtener los usuarios clientes", error);
    throw error;
  }
};

export const obtenerUsuariosEmpleadores = async () => {
  try {
    const response = await fetch(`${API_URL}/empleadores`);
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios clientes");
    }
    const data = await response.json();
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al obtener los usuarios empleadores", error);
    throw error;
  }
};

export const obtenerUsuarioClientePorID = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios clientes");
    }
    const data = await response.json();
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al obtener los usuarios clientes", error);
    throw error;
  }
};

export const crearUsuarioCliente = async (usuarioCliente) => {
  console.log("servicio usuarioCliente: ", usuarioCliente)

  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST", // La solicitud debe ser tipo POST para crear recursos.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuarioCliente) // Convierte los datos del usuario en un formato JSON.
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "Error en el registro"); // Maneja el caso en el que el backend devuelve un error.
    }

    console.log("Usuario creado:", data); // Muestra los datos del usuario creado en la consola.
    return data; 
    // Devuelve los datos del usuario creado.
  } catch (error) {
    throw new Error(error.message); 
  }
};


export const modificarUsuarioClientePorID = async (id, usuario) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario }),
    });
    if (!response.ok) {
      throw new Error("Error al modificar usuario");
    }
    const data = await response.json();
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al modificar usuario", error);
    throw error;
  }
};


export const borrarUsuarioClientePorID = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error al borrar usuario");
    }
    const data = await response.json();
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al borrar usuario", error);
    throw error;
  }
};