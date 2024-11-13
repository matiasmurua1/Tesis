const usuarioClienteModelo = require('../modelos/usuarioClienteModelo');

// Controlador para obtener todos los usuarios clientes
const getUsuariosClientes = async (req, res) => {
    try {
        const usuariosClientes = await usuarioClienteModelo.getUsuariosClientes();
        res.status(200).json(usuariosClientes);
    } catch (error) {
        console.error('Error al obtener los usuarios clientes:', error);
        res.status(500).json({ mensaje: 'Error al obtener los usuarios clientes' });
    }
};

// Controlador para crear un nuevo usuario cliente
const createUsuarioCliente = async (req, res) => {
    const { nombre, contrasena, dni, telefono, direccion, id_mascota } = req.body;
    if (!nombre || !contrasena || !dni || !telefono || !direccion || !id_mascota) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const nuevoUsuarioClienteId = await usuarioClienteModelo.postUsuarioCliente({ nombre, contrasena, dni, telefono, direccion, id_mascota });
        res.status(201).json({ mensaje: 'Usuario cliente creado exitosamente', id: nuevoUsuarioClienteId });
    } catch (error) {
        console.error('Error al crear el usuario cliente:', error);
        res.status(500).json({ mensaje: 'Error al crear el usuario cliente' });
    }
};

// Controlador para actualizar un usuario cliente por ID
const updateUsuarioCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, contrasena, dni, telefono, direccion, id_mascota } = req.body;
    if (!nombre || !contrasena || !dni || !telefono || !direccion || !id_mascota) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const filasActualizadas = await usuarioClienteModelo.putUsuarioCliente(id, { nombre, contrasena, dni, telefono, direccion, id_mascota });
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
        const filasEliminadas = await usuarioClienteModelo.deleteUsuarioCliente(id);
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
    createUsuarioCliente,
    updateUsuarioCliente,
    deleteUsuarioCliente
};
