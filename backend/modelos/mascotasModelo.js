const { getConnection } = require('../src/configuracion/conexionBaseDatos'); // Importamos la configuración de la base de datos

// Obtener todas las mascotas
const getMascotas = async () => {
    const connection = await getConnection();
    try {
        const mascotas = await connection.query('SELECT * FROM mascota');
        return mascotas;
    } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        throw error;
    }
};

// Obtener una mascota por su ID
const getMascotaById = async (id) => {
    const connection = await getConnection();
    try {
        const [mascota] = await connection.query('SELECT * FROM mascota WHERE id = ?', [id]);
        return mascota; // Retorna la mascota encontrada o null si no existe
    } catch (error) {
        console.error('Error al obtener la mascota:', error);
        throw error;
    }
};

// Obtener una mascota por su ID
const getMascotaByUserId = async (id) => {
    const connection = await getConnection();
    try {
        const mascota = await connection.query('SELECT * FROM mascota WHERE id_usuario = ?', [id]);

        return mascota; // Retorna la mascota encontrada o null si no existe
    } catch (error) {
        console.error('Error al obtener la mascota:', error);
        throw error;
    }
};

// Crear una nueva mascota
const postMascota = async (mascota) => {
    const connection = await getConnection();
    const { nombre, descripcion, id_usuario, edad, imagen } = mascota; // Extraemos los valores del objeto `mascota`
    try {
        const result = await connection.query(
            'INSERT INTO mascota (nombre, descripcion, id_usuario, edad, imagen) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, id_usuario, edad, imagen] 
        );
        return result.insertId; // Devuelve el ID de la nueva mascota insertada
    } catch (error) {
        console.error('Error al insertar la mascota:', error);
        throw error;
    }
};

// Actualizar una mascota por ID
const putMascota = async (id, mascota) => {
  const connection = await getConnection();
  const { nombre, descripcion, edad, imagen, id_usuario } = mascota;

  try {
    const result = await connection.query(
      'UPDATE mascota SET nombre = ?, descripcion = ?, edad = ?, imagen = ?, id_usuario = ? WHERE id = ?',
      [nombre, descripcion, edad, imagen, id_usuario, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error al actualizar la mascota:', error);
    throw error;
  }
};


// Eliminar una mascota por ID
const deleteMascota = async (id) => {
    const connection = await getConnection();
    try {
        const result = await connection.query(
            'DELETE FROM Mascota WHERE id = ?',
            [id]
        );
        return result.affectedRows; // Devuelve el número de filas eliminadas
    } catch (error) {
        console.error('Error al eliminar la mascota:', error);
        throw error;
    }
};

module.exports = {
    getMascotas, getMascotaById, postMascota, putMascota, deleteMascota, getMascotaByUserId
};