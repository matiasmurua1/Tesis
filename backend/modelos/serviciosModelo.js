const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Obtener todos los servicios
const getServicios = async () => {
    const connection = await getConnection();
    try {
      const servicios = await connection.query('SELECT * FROM servicio');
      return servicios;
    } catch (error) {
      console.error('Error al obtener servicios:', error);
      throw error;
    } 
};  

// Crear un nuevo servicio
const postServicio = async (servicio) => {
  
  const connection = await getConnection();
  const { nombre, descripcion, duracion, costo } = servicio; // Extrae los valores del objeto `servicio`
  try {
      const result = await connection.query(
          'INSERT INTO Servicio (nombre, descripcion, duracion, costo) VALUES (?, ?, ?, ?)',
          [nombre, descripcion, duracion, costo]
          
      );
      return result.insertId; // Devuelve el ID del servicio insertado
  } catch (error) {
      console.error('Error al insertar el servicio:', error);
      throw error;
  }
  
};

// Actualizar un servicio por ID
const putServicio = async ( id,servicio) => {
  const connection = await getConnection();
  const { nombre, descripcion, duracion, costo } = servicio; // Extrae los valores del objeto `servicio`
  try {
    const result = await connection.query(
      'UPDATE Servicio SET nombre = ?, descripcion = ?, duracion = ?, costo = ? WHERE id = ?',
      [nombre, descripcion, duracion, costo, id]
    );
    return result.affectedRows; // Devuelve el número de filas actualizadas
  } catch (error) {
    console.error('Error al actualizar el servicio:', error);
    throw error;
  }
};


// Eliminar un servicio por ID
const deleteServicio = async (idServicio) => {
  const connection = await getConnection();
  try {
    const result = await connection.query(
      'DELETE FROM Servicio WHERE id = ?',
      [idServicio]
    );
    return result.affectedRows; // Devuelve el número de filas eliminadas
  } catch (error) {
    console.error('Error al eliminar el servicio:', error);
    throw error;
  }
};


module.exports = {
    getServicios, postServicio, putServicio, deleteServicio
};