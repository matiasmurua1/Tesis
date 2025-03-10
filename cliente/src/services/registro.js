export async function postRegistrarse(usuario, email, contrasena) {
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, email, contrasena }),
    });
  
    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }
  
    return response.json();
  }
  