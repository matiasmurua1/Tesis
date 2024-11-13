const usuarioEmpleadorModelo = require('../modelos/usuarioEmpleadorModelo');

// Controlador para obtener todos los usuarios empleadores
const getUsuariosEmpleadores = async (req, res) => {
    try {
        const usuariosEmpleadores = await usuarioEmpleadorModelo.getUsuariosEmpleadores();
        res.status(200).json(usuariosEmpleadores);
    } catch (error) {
        console.error('Error al obtener los usuarios empleadores:', error);
        res.status(500).json({ mensaje: 'Error al obtener los usuarios empleadores' });
    }
};

// Controlador para crear un nuevo usuario empleador
const createUsuarioEmpleador = async (req, res) => {
    const { nombre, contrasena, dni, tipo_servicio, telefono, experiencia, tarifa_hora } = req.body;
    if (!nombre || !contrasena || !dni || !tipo_servicio || !telefono || !experiencia || !tarifa_hora) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const nuevoUsuarioEmpleadorId = await usuarioEmpleadorModelo.postUsuarioEmpleador({ nombre, contrasena, dni, tipo_servicio, telefono, experiencia, tarifa_hora });
        res.status(201).json({ mensaje: 'Usuario empleador creado exitosamente', id: nuevoUsuarioEmpleadorId });
    } catch (error) {
        console.error('Error al crear el usuario empleador:', error);
        res.status(500).json({ mensaje: 'Error al crear el usuario empleador' });
    }
};

// Controlador para actualizar un usuario empleador por ID
const updateUsuarioEmpleador = async (req, res) => {
    const { id } = req.params;
    const { nombre, contrasena, dni, tipo_servicio, telefono, experiencia, tarifa_hora } = req.body;
    if (!nombre || !contrasena || !dni || !tipo_servicio || !telefono || !experiencia || !tarifa_hora) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const filasActualizadas = await usuarioEmpleadorModelo.putUsuarioEmpleador(id, { nombre, contrasena, dni, tipo_servicio, telefono, experiencia, tarifa_hora });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Usuario empleador no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario empleador actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario empleador:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el usuario empleador' });
    }
};

// Controlador para eliminar un usuario empleador por ID
const deleteUsuarioEmpleador = async (req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await usuarioEmpleadorModelo.deleteUsuarioEmpleador(id);
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Usuario empleador no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario empleador eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario empleador:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el usuario empleador' });
    }
};

module.exports = {
    getUsuariosEmpleadores,
    createUsuarioEmpleador,
    updateUsuarioEmpleador,
    deleteUsuarioEmpleador
};
