const API_URL = "http://localhost:4000/mascotas"; 

export const obtenerMascotaPorIdUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/user/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener las mascotas del clientes");
    }
    const data = await response.json();
    return data; // Devuelve los datos del backend
  } catch (error) {
    console.error("Error al obtener las mascotas del clientes", error);
    throw error;
  }
};


export const crearMascotaPorIdUsuario = async (mascota) => {
      console.log("Mascota enviada fetch:", mascota);

  try {
     const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mascota) 
    });
    if (!response.ok) {
      throw new Error("Error al obtener las mascotas del clientes");
    }
    const data = await response.json();
    console.log("data", data)
    return data; 
  } catch (error) {
    console.error("Error al obtener las mascotas del clientes", error);
    throw error;
  }
};

export const editarMascotaPorId = async (mascota) => {
  const res = await fetch(`${API_URL}/${mascota.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mascota),
  });
  return await res.json();
};
