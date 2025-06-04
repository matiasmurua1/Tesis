import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//https://reactrouter.com/en/main/router-components/browser-router

import Home from "../pages/Home";
import Login from "../pages/Login";
import Services from "../pages/Services";
import TableServices from "../pages/TableService";
import MiPerfil from "../pages/MiPerfil"; 
import ProteccionRuta from "./proteccionRuta";
import Registro from "../pages/Registro";
import Solicitudes from "../pages/Solicitudes";


export default function ConfiguracionRuta() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/registro" element={<Registro/>} />
                    <Route element={<ProteccionRuta rolesAceptados={["CLIENTE", "ADMIN"]}/>}>
                        <Route path="/servicios" element={<Services/>} />
                        <Route path="/servicios/:service" element={<TableServices/>} />
                    </Route>
                        
                    <Route element={<ProteccionRuta rolesAceptados={["EMPLEADOR", "ADMIN","CLIENTE"]}/>}>
                        <Route path="/mi-perfil" element={<MiPerfil />} />
                    </Route>
                    <Route element={<ProteccionRuta rolesAceptados={["EMPLEADOR", "ADMIN"]}/>}>
                        <Route path="/solicitudes" element={<Solicitudes />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        
    );
}
