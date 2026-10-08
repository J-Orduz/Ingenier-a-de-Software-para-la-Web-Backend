const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  saveOne,
  modifyOne,
  deleteOne
} = require("../controllers/productoController")

router.get("/", getAll );
router.get("/:id",getOne);
router.post("/",saveOne );
router.put("/:id", modifyOne);
router.delete("/:id",deleteOne );

module.exports = router;    