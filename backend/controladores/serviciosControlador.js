//Lógica para manejar las peticiones deservicios
// const modelos
const serviciosModelo = require('../modelos/serviciosModelo');

// Controlador para obtener todos los servicios
const getServicios = async (req, res) => {
  try {
    const servicios = await serviciosModelo.getServicios(); // Llama a la función getServicios del modelo
    res.json(servicios);  
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicios' });
  }
};

// Controlador para crear un nuevo servicio
const createServicio = async (req, res) => {
  try {
      const result = await serviciosModelo.postServicio(req.body); // Llama a la función postServicio del modelo
      res.status(201).json({ message: 'Servicio creado con éxito', insertId: result });
  } catch (error) {
      res.status(500).json({ message: 'Error al crear servicio' });
  }
};

// Controlador para actualizar un servicio por ID
const updateServicio = async (req, res) => {
  const { id } = req.params;
  try {
      const result = await serviciosModelo.putServicio(id, req.body); // Llama a la función putServicio del modelo
      if (result > 0) {
        res.json({ message: 'Servicio actualizado con éxito' });
      } else {
        res.status(404).json({ message: 'Servicio no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar servicio' });
  }
};

// Controlador para eliminar un servicio por ID
const deleteServicio = async (req, res) => {
  const { id } = req.params;
  try {
      const result = await serviciosModelo.deleteServicio(id); // Llama a la función deleteServicio del modelo
      if (result > 0) {
        res.json({ message: 'Servicio eliminado con éxito' });
      } else {
        res.status(404).json({ message: 'Servicio no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar servicio' });
  }
};

// Exporta los controladores para su uso en las rutas
module.exports = {
    getServicios,
    createServicio,
    updateServicio,
    deleteServicio
};