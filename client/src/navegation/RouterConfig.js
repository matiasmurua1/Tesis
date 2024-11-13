import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//https://reactrouter.com/en/main/router-components/browser-router

import Home from "../pages/Home";
import Login from "../pages/Login";
import Services from "../pages/Services";

export default function RouterConfig() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/servicios" element={<Services/>} />
            </Routes>
        </BrowserRouter>
    );
}
