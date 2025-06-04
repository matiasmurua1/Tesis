import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intenta recuperar el usuario del localStorage al iniciar la app
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username, rol: decoded.rol, id: decoded.id, id_servicio: decoded.id_servicio, direccion: decoded.direccion });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    console.log('decodee ',decoded);
    setUser({ username: decoded.username, rol: decoded.rol, id: decoded.id, id_servicio: decoded.id_servicio });
    
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const modificarServicioUsuario = (data) => {
    setUser({...user, id_servicio: data.id_servicio });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, modificarServicioUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
