const API_URL = "http://localhost:4000/servicios"; 

export const obtenerServicios = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error("Error al obtener los servicios");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los servicios", error);
      throw error;
    }
};