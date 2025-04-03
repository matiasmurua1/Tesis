import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//https://reactrouter.com/en/main/router-components/browser-router

import Home from "../pages/Home";
import Login from "../pages/Login";
import Services from "../pages/Services";
import TableServices from "../pages/TableService";
import MiPerfil from "../pages/MiPerfil"; 
import ProteccionRuta from "./proteccionRuta";


export default function ConfiguracionRuta() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route element={<ProteccionRuta rolesAceptados={["CLIENTE", "ADMIN"]}/>}>
                        <Route path="/servicios" element={<Services/>} />
                        <Route path="/servicios/:service" element={<TableServices/>} />
                    </Route>
                        
                    <Route element={<ProteccionRuta rolesAceptados={["EMPLEADOR", "ADMIN"]}/>}>
                        <Route path="/mi-perfil" element={<MiPerfil />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        
    );
}
