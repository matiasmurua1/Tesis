const API_URL = "http://localhost:4000/imagenes"; 

export const enviarImagenes = async (formData) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al enviar imágenes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar imágenes", error);
    throw error;
  }
};
