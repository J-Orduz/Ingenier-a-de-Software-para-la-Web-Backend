const express = require("express");
const router = express.Router();
const { obtenerCliente } = require("../services/clienteService");
const { obtenerProducto } = require("../services/productoService");
const productos = require("../../database/connection");


let siguienteId = 1;
productos.connect();

// GET /compras
router.get("/", async (req, res) => {
  try {
    const result = await productos.query("SELECT * FROM COMPRAS");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al consultar compras:", error);
    res.status(500).json({ mensaje: "Error al obtener compras" });
  }
});

//GET /compras/:cliente_id/:producto_id/:fecha_compra
router.get('/:cliente_id/:producto_id/:fecha_compra', async (req, res) => {
  try {
    const { cliente_id, producto_id, fecha_compra } = req.params;

    const queryText = "SELECT * FROM COMPRAS WHERE cliente_id = $1 AND producto_id = $2 AND fecha_compra = $3";
    const result = await productos.query(queryText, [cliente_id, producto_id, fecha_compra]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al consultar compras:', error);
    res.status(500).json({ mensaje: 'Error al obtener compras' });
  }
});


// POST /compras
router.post("/", async (req, res) => {
  const { clienteId, productoId, cantidad } = req.body;

  if (!clienteId || !productoId || !cantidad) {
    return res.status(400).json({
      mensaje: "Los campos 'clienteId', 'productoId' y 'cantidad' son obligatorios"
    });
  }

  let cliente;
  let producto;

  try {
    cliente = await obtenerCliente(clienteId);
    const resultadoProducto = await obtenerProducto(productoId);
    producto = resultadoProducto && resultadoProducto[0];
    console.log(producto);
  } catch (error) {
    return res.status(503).json({
      mensaje: "No se pudo validar la compra porque uno de los servicios no respondió",
      detalle: error.message
    });
  }

  if (!cliente) {
    return res.status(404).json({ mensaje: `El cliente ${clienteId} no existe` });
  }

  if (!producto) {
    return res.status(404).json({ mensaje: `El producto ${productoId} no existe` });
  }

  if (producto.stock < cantidad) {
    return res.status(400).json({
      mensaje: `Stock insuficiente. Disponible: ${producto.stock}, solicitado: ${cantidad}`
    });
  }

  try {
    const total = parseInt(producto.precio, 10) * parseInt(cantidad, 10);
    const queryText = `INSERT INTO COMPRAS (cliente_id, producto_id, cantidad, total) VALUES ($1, $2, $3, $4)
      RETURNING *`;
    
    const result = await productos.query(queryText, [
      clienteId, 
      productoId, 
      cantidad, 
      parseInt(total,10)
    ]);

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("Error al registrar la compra en la BD:", error);
    res.status(500).json({ mensaje: "Error interno al procesar la compra" });
  }
});



//PUT /compras/:cliente_id/:producto_id/:fecha_compra
router.put('/:cliente_id/:producto_id/:fecha_compra', async (req, res) => {
  const { cliente_id, producto_id, fecha_compra } = req.params;
  const { cantidad } = req.body;

  if (!cantidad) {
    return res.status(400).json({ mensaje: "El campo 'cantidad' es obligatorio" });
  }

  try {
    const queryText = "UPDATE COMPRAS SET cantidad = $1 WHERE cliente_id = $2 AND producto_id = $3 AND fecha_compra = $4 RETURNING *";
    const result = await productos.query(queryText, [cantidad, cliente_id, producto_id, fecha_compra]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar la compra en la BD:", error);
    res.status(500).json({ mensaje: "Error interno al procesar la actualización" });
  }
});

//DELETE /compras/:cliente_id/:producto_id/:fecha_compra
router.delete('/:cliente_id/:producto_id/:fecha_compra', async (req, res) => {
  const { cliente_id, producto_id, fecha_compra } = req.params;

  try {
    const queryText = "DELETE FROM COMPRAS WHERE cliente_id = $1 AND producto_id = $2 AND fecha_compra = $3 RETURNING *";
    const result = await productos.query(queryText, [cliente_id, producto_id, fecha_compra]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error al eliminar la compra en la BD:", error);
    res.status(500).json({ mensaje: "Error interno al procesar la eliminación" });
  }
});

module.exports = router;