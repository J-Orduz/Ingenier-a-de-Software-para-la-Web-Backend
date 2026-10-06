const express = require("express");
const router = express.Router();
const productos = require("../../database/connection");

productos.connect();


// GET /productos
router.get("/", async (req, res)=>{
  try{
    const result = await productos.query("SELECT * FROM PRODUCTOS");
    res.status(200).json(result.rows);
  }catch(error){
    console.error("Error al consultar productos:", error);
    res.status(500).json({ mensaje: "Error al obtener productos"});
  }
});
  
// GET /productos/:id
router.get("/:id", async (req, res) => {
  try {
    const result = await productos.query("SELECT * FROM PRODUCTOS WHERE codigo=$1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al consultar productos:", error);
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
});

// POST /productos
router.post("/", async (req, res) => {
  try {
    const { codigo, nombre, precio, stock } = req.body;

    if (!codigo ||!nombre || precio === undefined || stock === undefined) {
      return res.status(400).json({ mensaje: "Los campos 'código', 'nombre', 'precio' y 'stock' son obligatorios" });
    }

    const result = await productos.query("INSERT INTO PRODUCTOS (codigo, nombre_producto, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *", [codigo, nombre, precio, stock]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ mensaje: "Error al crear producto" });
  }
});


//PUT 
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, stock, precio } = req.body;

    const result = await productos.query("UPDATE PRODUCTOS SET nombre_producto=$1, stock=$2, precio=$3 WHERE codigo=$4 RETURNING *", [nombre, stock, precio, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ mensaje: "Error al actualizar producto" });
  }
});

//  DELETE /productos/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await productos.query("DELETE FROM PRODUCTOS WHERE codigo=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ mensaje: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ mensaje: "Error al eliminar producto" });
  }
});

module.exports = router;    