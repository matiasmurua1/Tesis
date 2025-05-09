export const postLogin = async (email,contrasena) => {
    try {
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, contrasena }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error en el login");
        }

        localStorage.setItem("token", data.token);
        return {data, status: response.status}; // Devuelve los datos del backend
         // Guardar token JWT
        //alert("Login exitoso!");

    } catch (error) {
        throw new Error(error.message);
    }
}