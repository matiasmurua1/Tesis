import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/usuarioContexto";

const ProteccionRuta = ({rolesAceptados}) => {
    const { user } = useAuth();
    if(!user){
        return <Navigate to="/login" replace/>;
    }
    return rolesAceptados.includes(user.rol) ? <Outlet /> : <Navigate to="/desautorizado" replace />;

//   return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProteccionRuta;

    
