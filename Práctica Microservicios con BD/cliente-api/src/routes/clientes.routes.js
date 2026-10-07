const express = require("express");
const router = express.Router();
const clientes = require("../../database/connection");

clientes.connect();

// GET /clientes
router.get("/", async (req, res) => {
  try {
    const result = await clientes.query("SELECT * FROM clientes");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al consultar clientes:", error);
    res.status(500).json({ mensaje: "Error al obtener clientes" });
  }
});

// GET /clientes/:id
router.get("/:id", async (req, res) => {
  try {
    const result = await clientes.query("SELECT * FROM clientes WHERE cedula=$1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al consultar clientes:", error);
    res.status(500).json({ mensaje: "Error al obtener clientes" });
  }
});


// POST /clientes
router.post("/", async (req, res) => {
  try {
    const { cedula, nombre, email } = req.body;

    if (!cedula || !nombre || !email) {
      return res.status(400).json({ mensaje: "Los campos 'nombre', 'email' y 'cedula' son obligatorios" });
    }

    const result = await clientes.query("INSERT INTO clientes (cedula, nombre_cliente, email) VALUES ($1, $2, $3) RETURNING *", [cedula, nombre, email]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ mensaje: "Error al crear cliente" });
  }
});

//PUT 
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, email } = req.body;

    const result = await clientes.query("UPDATE clientes SET nombre_cliente=$1, email=$2 WHERE cedula=$3 RETURNING *", [nombre, email, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ mensaje: "Error al actualizar cliente" });
  }
});


//  DELETE /clientes/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await clientes.query("DELETE FROM clientes WHERE cedula=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.status(200).json({ mensaje: "Cliente eliminado" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ mensaje: "Error al eliminar cliente" });
  }
});

module.exports = router;