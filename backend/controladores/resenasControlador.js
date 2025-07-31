const resenasModelo = require('../modelos/resenasModelo');
const usuarioClienteModelo = require('../modelos/usuarioClienteModelo');
const solicitudServiciosModelo = require('../modelos/solicitudServiciosModelo');

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
    const { id_usuario_empleador, comentario, id_solicitud_servicio, puntaje } = req.body;
    if (!id_usuario_empleador || !comentario || !id_solicitud_servicio || !puntaje) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const nuevaResenaId = await resenasModelo.postResena({ id_usuario_empleador, comentario, id_solicitud_servicio, puntaje });
        res.status(201).json({ mensaje: 'Resena creada exitosamente', id: nuevaResenaId });
        if(res.status(201)){
            await usuarioClienteModelo.calificarEmpleador(id_usuario_empleador);
            await solicitudServiciosModelo.patchSolicitudServicio(id_solicitud_servicio, { nombre: "id_resena", valor: nuevaResenaId});
        }
    } catch (error) {
        console.error('Error al crear la resena:', error);
        res.status(500).json({ mensaje: 'Error al crear la resena' });
    }
};

// Controlador para actualizar una resena por ID
const updateResena = async (req, res) => {
    const { id } = req.params;
    const { id_usuario_cliente, comentario, id_solicitud_servicio } = req.body;
    if (!id_usuario_cliente || !comentario || !id_solicitud_servicio) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const filasActualizadas = await resenasModelo.putResena(id, { id_usuario_cliente, comentario, id_solicitud_servicio });
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
