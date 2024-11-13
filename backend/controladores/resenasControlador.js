const resenasModelo = require('../modelos/resenasModelo');

// Controlador para obtener todas las resenas
const getResenas = async (req, res) => {
    try {
        const resenas = await resenasModelo.getResenas();
        res.status(200).json(resenas);
    } catch (error) {
        console.error('Error al obtener las resenas:', error);
        res.status(500).json({ mensaje: 'Error al obtener las resenas' });
    }
};

// Controlador para crear una nueva resena
const createResena = async (req, res) => {
    const { nombre_usuario_cliente, comentario, id_solicitud_servicio } = req.body;
    if (!nombre_usuario_cliente || !comentario || !id_solicitud_servicio) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const nuevaResenaId = await resenasModelo.postResena({ nombre_usuario_cliente, comentario, id_solicitud_servicio });
        res.status(201).json({ mensaje: 'Resena creada exitosamente', id: nuevaResenaId });
    } catch (error) {
        console.error('Error al crear la resena:', error);
        res.status(500).json({ mensaje: 'Error al crear la resena' });
    }
};

// Controlador para actualizar una resena por ID
const updateResena = async (req, res) => {
    const { id } = req.params;
    const { nombre_usuario_cliente, comentario, id_solicitud_servicio } = req.body;
    if (!nombre_usuario_cliente || !comentario || !id_solicitud_servicio) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const filasActualizadas = await resenasModelo.putResena(id, { nombre_usuario_cliente, comentario, id_solicitud_servicio });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Resena no encontrada' });
        }
        res.status(200).json({ mensaje: 'Resena actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la resena:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la resena' });
    }
};

// Controlador para eliminar una resena por ID
const deleteResena = async (req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await resenasModelo.deleteResena(id);
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Resena no encontrada' });
        }
        res.status(200).json({ mensaje: 'Resena eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la resena:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la resena' });
    }
};

module.exports = {
   getResenas,
    createResena,
    updateResena,
  deleteResena
};
