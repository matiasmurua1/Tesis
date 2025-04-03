const API_URL = "http://localhost:4000/solicitudServicios"; 

export const obtenerSolicitudesPorCliente = async (id) => {
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