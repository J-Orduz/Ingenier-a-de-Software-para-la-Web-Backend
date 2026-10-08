const express = require("express");
const router = express.Router();

const{
    getAll,
    getOne,
    crear,
    actualizar,
    eliminar
} = require("../controllers/compraController");

router.get("/", (req, res) => {
  if (req.query.cliente_id && req.query.producto_id && req.query.fecha_compra) {
    return getOne(req, res);
  }
  return getAll(req, res);
});

router.post("/", crear);
router.put("/", actualizar);
router.delete("/", eliminar);

module.exports = router;