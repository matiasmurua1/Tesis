//Lógica para manejar las peticiones deservicios
// const modelos
const mascotasModelo = require('../modelos/mascotasModelo');

// Controlador para obtener todos las mascotas
const getMascotas = async (req, res) => {
  try {
    const mascotas = await mascotasModelo.getMascotas(); // Llama a la función getMascotas del modelo
    res.json(mascotas);  
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mascotas' });
  }
};

// Controlador para crear un nuevo servicio
const createMascotas = async (req, res) => {
  try {
      const result = await mascotasModelo.postMascota(req.body); // Llama a la función postMascota del modelo
      res.status(201).json({ message: 'Mascota creada con éxito', insertId: result });
  } catch (error) {
      res.status(500).json({ message: 'Error al crear Mascota' });
  }
};

// Controlador para actualizar un servicio por ID
const updateMascota = async (req, res) => {
  const { id } = req.params;
  try {
      const result = await mascotasModelo.putMascota(id, req.body); // Llama a la función putServicio del modelo
      if (result > 0) {
        res.json({ message: 'Mascota actualizada con éxito' });
      } else {
        res.status(404).json({ message: 'Mascota no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar Mascota' });
  }
};

// Controlador para eliminar un servicio por ID
const deleteMascota = async (req, res) => {
  const { id } = req.params;
  try {
      const result = await mascotasModelo.deleteMascota(id); // Llama a la función deleteServicio del modelo
      if (result > 0) {
        res.json({ message: 'Mascota eliminado con éxito' });
      } else {
        res.status(404).json({ message: 'Mascota no encontrada' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar Mascota' });
  }
};

// Exporta los controladores para su uso en las rutas
module.exports = {
    getMascotas,
    createMascotas,
    updateMascota,
    deleteMascota
};