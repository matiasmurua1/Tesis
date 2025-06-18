const API_URL = "http://localhost:4000/resenas"; 

export const enviarCalificacion = async (body) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Error al enviar reseña");
    }
    const data = await response.json();
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al enviar reseña", error);
    throw error;
  }
};
