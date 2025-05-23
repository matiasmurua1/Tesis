const usuarioClienteModelo = require('../modelos/usuarioClienteModelo');

const getUsuarioClientePorID = async (req, res) => {
    const { id } = req.params;
    try {
        const usuariosClientes = await usuarioClienteModelo.mostrarUsuarioClientePorID(id);
        res.status(200).json(usuariosClientes);
    } catch (error) {
        console.error('Error al obtener los datos del cliente buscado:', error);
        res.status(500).json({ mensaje: 'Error al obtener los datos del cliente buscado' });
    }
};

// Controlador para obtener todos los usuarios clientes
const getUsuariosClientes = async (req, res) => {
    try {
        const usuariosClientes = await usuarioClienteModelo.mostrarUsuariosClientes();
        res.status(200).json(usuariosClientes);
    } catch (error) {
        console.error('Error al obtener los usuarios clientes:', error);
        res.status(500).json({ mensaje: 'Error al obtener los usuarios clientes' });
    }
};

// Controlador para crear un nuevo usuario cliente
const postUsuarioCliente = async (req, res) => {
    const { nombre, contrasena, dni_cuit, telefono, direccion, id_mascota, email, id_rol, id_servicio } = req.body;
    if (!nombre || !contrasena || !dni_cuit || !telefono || !direccion || !id_mascota || !email || !id_rol || !id_servicio) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const nuevoUsuarioClienteId = await usuarioClienteModelo.crearUsuarioCliente({ nombre, contrasena, dni_cuit, telefono, direccion, id_mascota, email, id_rol, id_servicio });
        res.status(201).json({ mensaje: 'Usuario cliente creado exitosamente', id: nuevoUsuarioClienteId });
    } catch (error) {
        console.error('Error al crear el usuario cliente:', error);
        res.status(500).json({ mensaje: 'Error al crear el usuario cliente' });
    }
};

// Controlador para actualizar un usuario cliente por ID
const putUsuarioCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, contrasena, dni_cuit, telefono, direccion, id_mascota, email, id_rol, id_servicio } = req.body;
    // if (!nombre || !contrasena || !dni_cuit || !telefono || !direccion || !id_mascota || !email || !id_rol || !id_servicio) {
    //     return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    // }
    console.log("body ", req.body.usuario)
    try {
        const filasActualizadas = await usuarioClienteModelo.actualizarUsuarioCliente(id, req.body.usuario);
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Usuario cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario cliente actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario cliente:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el usuario cliente' });
    }
};

// Controlador para eliminar un usuario cliente por ID
const deleteUsuarioCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await usuarioClienteModelo.eliminarUsuarioCliente(id);
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Usuario cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario cliente eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario cliente:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el usuario cliente' });
    }
};

module.exports = {
    getUsuariosClientes,
    postUsuarioCliente,
    putUsuarioCliente,
    deleteUsuarioCliente,
    getUsuarioClientePorID
};
