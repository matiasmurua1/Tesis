const mysql = require("promise-mysql");
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

const getConnection = async () => {
    try {
        return await connection;
    } catch (error) {
        console.error("Error al conectar a la base de datos: ", error);
        throw error; 
    }
};

module.exports = {
    getConnection
};
