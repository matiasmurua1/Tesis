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
