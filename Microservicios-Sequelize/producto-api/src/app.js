const express = require("express");
const app = express();

app.use(express.json);

//rutas
const rutasProductos = require("../src/routes/productos.routes");
app.use("/productos", rutasProductos);

module.exports = app;
