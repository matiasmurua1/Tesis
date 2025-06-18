const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Guardar la imagen en la base de datos
const saveImage = async (imageData) => {
  const connection = await getConnection();
  const { path } = imageData;

  try{
    const query = 'INSERT INTO imagen (path) VALUES (?)';
    const result = await connection.query(query, [path]);
    return result;
  } catch (error) {
        console.error('Error al insertar la imagen:', error);
        throw error;
    }
  
};



module.exports = {
  saveImage,
};