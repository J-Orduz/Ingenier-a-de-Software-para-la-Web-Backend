const express = require ("express");
const app = express();

app.use(express.json());

const compraRoutes = require("./routes/compraRoutes");
app.use("/compras", compraRoutes);

module.exports = app;