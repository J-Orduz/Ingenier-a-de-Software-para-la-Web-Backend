const express = require("express");
const app = express();


app.use(express.json());

const productoRoutes = require("./routes/productoRoutes");
app.use("/productos", productoRoutes);

module.exports = app;