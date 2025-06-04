const { getConnection } = require('../src/configuracion/conexionBaseDatos');


const mostrarUsuarioClientePorID = async (id) => {
    const connection = await getConnection();
    try {
        const query = `
            SELECT
                uc.id             AS usuario_id,
                uc.nombre         AS usuario_nombre,
                uc.contrasena,
                uc.dni_cuit,
                uc.telefono,
                uc.direccion,
                uc.id_mascota,
                uc.email,
                uc.id_rol,
                uc.id_servicio,
                m.id              AS mascota_id,
                m.nombre          AS mascota_nombre,
                m.edad,
                m.descripcion
            FROM usuario_cliente uc
            LEFT JOIN mascota m
                ON uc.id_mascota = m.id
            WHERE uc.id = ?
        `;
        const rows = await connection.query(query, [id]);
        const usuariosClientes = rows[0];
        const usuario = {
            id: usuariosClientes.usuario_id,
            nombre: usuariosClientes.usuario_nombre,
            contrasena: usuariosClientes.contrasena,
            dni_cuit: usuariosClientes.dni_cuit,
            telefono: usuariosClientes.telefono,
            direccion: usuariosClientes.direccion,
            id_mascota: usuariosClientes.id_mascota,
            email: usuariosClientes.email,
            id_rol: usuariosClientes.id_rol,
            id_servicio: usuariosClientes.id_servicio,
            mascota: usuariosClientes.mascota_id ? {
            id: usuariosClientes.mascota_id,
            nombre: usuariosClientes.mascota_nombre,
            tipo_mascota: usuariosClientes.tipo_mascota,
            edad: usuariosClientes.edad,
            descripcion: usuariosClientes.descripcion,
            } : null,
        };
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuarios clientes:', error);
        throw error;
    }
};
const mostrarUsuarioClientePorEmail = async (email) => {
    const connection = await getConnection();
    try {
        const usuariosCliente = await connection.query('SELECT * FROM usuario_cliente where email = ?', [email]);
        return usuariosCliente;
    } catch (error) {
        console.error('Error al obtener usuarios clientes:', error);
        throw error;
    }
}
const mostrarUsuarioClientePorDNI = async (dni_cuit) => {
    const connection = await getConnection();
    try {
        const usuariosClientes = await connection.query('SELECT * FROM usuario_cliente where dni_cuit = ?', [dni_cuit]);
        return usuariosClientes;
    } catch (error) {
        console.error('Error al obtener usuarios clientes:', error);
        throw error;
    }
}
// Obtener todos los usuarios clientes
const mostrarUsuariosClientes = async () => {
    const connection = await getConnection();
    try {
        const usuariosClientes = await connection.query('SELECT * FROM usuario_cliente');
        return usuariosClientes;
    } catch (error) {
        console.error('Error al obtener usuarios clientes:', error);
        throw error;
    }
};

const mostrarUsuariosEmpleadores = async () => {
    const connection = await getConnection();
    try {
        const usuariosClientes = await connection.query('SELECT * FROM usuario_cliente WHERE id_rol = 1');
        return usuariosClientes;
    } catch (error) {
        console.error('Error al obtener usuarios clientes:', error);
        throw error;
    }
};

// Crear un nuevo usuario cliente
const crearUsuarioCliente = async (usuarioCliente) => {
    const connection = await getConnection();
    const { nombre, contrasena, dni_cuit, telefono, direccion, id_mascota, email, id_rol, id_servicio, calificacion } = usuarioCliente; // Extrae los valores del objeto `usuarioCliente`
    try {
        const result = await connection.query(
            'INSERT INTO usuario_cliente (nombre, contrasena, dni_cuit, telefono, direccion, id_mascota, email, id_rol, id_servicio, calificacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        );
        return result.insertId; // Devuelve el ID del usuario cliente insertado
    } catch (error) {
        console.error('Error al insertar el usuario cliente:', error);
        throw error;
    }
};

// Actualizar un usuario cliente por ID
const actualizarUsuarioCliente = async (id, usuarioCliente) => {
    const connection = await getConnection();
    const { nombre, contrasena, dni_cuit, telefono, direccion, id_mascota, email, id_servicio, calificacion } = usuarioCliente; // Extrae los valores del objeto `usuarioCliente`
    try {
        const result = await connection.query(
            'UPDATE usuario_cliente SET nombre = ?, contrasena = ?, dni_cuit = ?, telefono = ?, direccion = ?, id_mascota = ?, email = ?, id_servicio = ?, calificacion = ? WHERE id = ?',
            [nombre, contrasena, dni_cuit, telefono, direccion, id_mascota, email, id_servicio,calificacion,id]);
        return result.affectedRows; 
    } catch (error) {
        console.error('Error al actualizar el usuario cliente:', error);
        throw error;
    }
};

// Eliminar un usuario cliente por ID
const eliminarUsuarioCliente = async (idUsuarioCliente) => {
    const connection = await getConnection();
    try {
        const result = await connection.query(
            'DELETE FROM usuario_cliente WHERE id = ?',
            [idUsuarioCliente]
        );
        return result.affectedRows; // Devuelve el número de filas eliminadas
    } catch (error) {
        console.error('Error al eliminar el usuario cliente:', error);
        throw error;
    }
};

module.exports = {
    mostrarUsuariosClientes, crearUsuarioCliente, actualizarUsuarioCliente, mostrarUsuariosEmpleadores, eliminarUsuarioCliente, mostrarUsuarioClientePorID, mostrarUsuarioClientePorEmail, mostrarUsuarioClientePorDNI
};
