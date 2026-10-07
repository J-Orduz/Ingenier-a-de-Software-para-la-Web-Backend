const {Client} = require('pg');
require("dotenv").config();

const connectionData = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_DB,
}

const conexion = new Client(connectionData);

module.exports = conexion;