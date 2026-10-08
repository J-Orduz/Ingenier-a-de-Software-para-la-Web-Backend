const producto = require("../models/producto");

//obtener todos los productos
const getAll = async (req, res) => {
    try {
        const productos = await producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "error obteniendo los productos", detalle: error.message });
    }
}

// Obtener un producto por su código
const getOne = async (req, res) => {
    try {
        const salida = await producto.findByPk(req.params.id);
        if (!salida) {
            res.status(404).json({ error: "Error, no se encontró ningún producto con ese código" });
        }
        res.json(salida);
    } catch (error) {
        res.status(500).json({ error: "error obteniendo el producto", detalle: error.message });
    }
}

// Guardar un producto
const saveOne = async (req, res) => {
    try {
        const { codigo, nombre, precio, stock } = req.body;
        const nombre_producto = nombre;
        if (!codigo) {
            res.status(400).json({ error: "Es obligatorio el campo codigo" });
        }
        if (!nombre_producto || !precio || !stock) {
            res.status(400).json({ error: "Son obligatorios los campos nombre_producto, precio y stock" });

        }
        const nuevo = await producto.create({ codigo, nombre_producto, precio, stock });
        res.status(201).json({ mensaje: "Producto agregado a la base de datos", agregado: nuevo });

    } catch (error) {
        if (error === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: `Ya existe un producto con ese código (${req.body.codigo}) en la BD`
            });
        }
        return res.status(500).json({
            error: "Error al momento de agregar el producto a la BD",
            detalle: error.message
        });
    }

}

// Modificar Producto
const modifyOne = async (req, res) => {
    try {
        const resultado = await producto.findByPk(req.params.id);
        if (!resultado) {
            res.status(404).json({
                error: "No se encuentró el producto con código " + req.params.id + " en la BD"
            })
        }
        const {nombre, precio, stock } = req.body;
        const nombre_producto = nombre;
        if (!nombre_producto || !precio || !stock) {
            res.status(400).json({ error: "Son obligatorios los campos nombre_producto, precio y stock" });
        }
        await resultado.update({nombre_producto, precio, stock});
        res.json(resultado);
    } catch (error) {
        return res.status(500).json({
            error:"Error modificando el producto",
            detalle:error.message
        });
    }

}

// Eliminar Producto
const deleteOne=async (req,res) => {
    try {
        const resultado = await producto.findByPk(req.params.id);
        if (!resultado) {
            return res.status(404).json({
                 error: `No existe un producto con el código (${req.params.id}) en la BD`
            });
        }
      
        await resultado.destroy();
        res.json({
            Mensaje:"Producto eliminado",
            eliminado: resultado
        })
    } catch (error) {
        res.status(500).json({
            error:"Error eliminando el producto",
            descripcion: error.message
        });
    }
    
}

module.exports={getAll,getOne,saveOne,modifyOne,deleteOne};