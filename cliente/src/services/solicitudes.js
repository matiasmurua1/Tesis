const API_URL = "http://localhost:4000/solicitudServicios"; 

export const obtenerSolicitudesPorCliente = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cliente/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios clientes");
    }
    const data = await response.json();

    return data; 
  } catch (error) {
    console.error("Error al obtener los usuarios clientes", error);
    throw error;
  }
};

export const obtenerSolicitudesPorEmpleador = async (id) => {
  try {
    const response = await fetch(`${API_URL}/empleador/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener las solicitudes", error);
    throw error;
  }
};


export const enviarSolicitudes = async (body) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Error al enviar solicitud");
    }
    const data = await response.json();
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al enviar solicitud", error);
    throw error;
  }
};

export const editarSolicitudes = async (body, id) => {
        console.log("soli: ", id)
        console.log("bodysoli: ", body)
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Error al editar solicitud");
    }
    const data = await response.json();
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al editar solicitud", error);
    throw error;
  }
};



export const borrarSolicitudPorID = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
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