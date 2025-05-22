const API_URL = "http://localhost:4000/mascotas/user"; 

export const obtenerMascotaPorIdUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener las mascotas del clientes");
    }
    const data = await response.json();
    console.log("data: ", data)
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al obtener las mascotas del clientes", error);
    throw error;
  }
};