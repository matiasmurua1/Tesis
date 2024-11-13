const turnosModelo = require('../modelos/turnosModelo'); // Cambia 'usuarioClienteModelo' a 'turnosModelo'

// Controlador para obtener todos los turnos
const getTurnos = async (req, res) => {
    try {
        const turnos = await turnosModelo.getTurnos();
        res.status(200).json(turnos);
    } catch (error) {
        console.error('Error al obtener los turnos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los turnos' });
    }
};

// Controlador para crear un nuevo turno
const createTurno = async (req, res) => {
    const { fecha_hora, proveedor, ubicacion, estado, id_solicitud_servicio } = req.body;
    if (!fecha_hora || !proveedor || !ubicacion || !estado || !id_solicitud_servicio) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const nuevoTurnoId = await turnosModelo.postTurno({ fecha_hora, proveedor, ubicacion, estado, id_solicitud_servicio });
        res.status(201).json({ mensaje: 'Turno creado exitosamente', id: nuevoTurnoId });
    } catch (error) {
        console.error('Error al crear el turno:', error);
        res.status(500).json({ mensaje: 'Error al crear el turno' });
    }
};

// Controlador para actualizar un turno por ID
const updateTurno = async (req, res) => {
    const { id } = req.params;
    const { fecha_hora, proveedor, ubicacion, estado, id_solicitud_servicio } = req.body;
    if (!fecha_hora || !proveedor || !ubicacion || !estado || !id_solicitud_servicio) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const filasActualizadas = await turnosModelo.putTurno(id, { fecha_hora, proveedor, ubicacion, estado, id_solicitud_servicio });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Turno no encontrado' });
        }
        res.status(200).json({ mensaje: 'Turno actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el turno:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el turno' });
    }
};

// Controlador para eliminar un turno por ID
const deleteTurno = async (req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await turnosModelo.deleteTurno(id);
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Turno no encontrado' });
        }
        res.status(200).json({ mensaje: 'Turno eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el turno:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el turno' });
    }
};

module.exports = {
    getTurnos,
    createTurno,
    updateTurno,
    deleteTurno
};
