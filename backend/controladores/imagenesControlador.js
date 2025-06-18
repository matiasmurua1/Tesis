const path = require('path');
const imageModel = require('../modelos/imagenesModelo'); // Modelo para interactuar con la base de datos

// Subir la imagen y guardar su ruta en MySQL
const uploadImage = async (req, res) => {

  try {
    // Verificar si la imagen está disponible en req.file
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ninguna imagen.' });
    }

    // Ruta de la imagen subida
    const imagePath = `/uploads/${req.file.filename}`;
    // Guardar en la base de datos
    const result = await imageModel.saveImage({ path: imagePath });
    return res.status(201).json({ message: 'Imagen subida con éxito.', path: imagePath, id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al subir la imagen.' });
  }
};

module.exports = {
  uploadImage,
};