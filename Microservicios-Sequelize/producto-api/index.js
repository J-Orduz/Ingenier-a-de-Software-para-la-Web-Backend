require("dotenv").config();


const app = require("./src/app");
const db = require("./src/config/connection")
const PORT = process.env.PORT || 3002;

async function iniciar() {
  try {
    //Valida primero que la conexión a pg esté ok
    await db.authenticate();
    console.log("Conexión a la BD exitosa");
    // sincroniza modelos con datos; Además, si no hay tabla la crea, si hay cambios en la tabla (columnas)
    //las agrega y no borra datos ya que estén en persistencia
    await db.sync({
      alter: true
    });
    console.log("Sincronización exitosa entre modelos y BD");
    //arrancar sv http


    console.log("Antes del listen");
    app.listen(PORT, () => {
      console.log(`API corriendo en http://localhost:${PORT}`);

    })

    //en entornos de desarrollo es sin js ya que node lo hace, se ve más bonito (?)

const producto = require("../model/producto");
    
//obtener todos los productos
const getAll = async (req, res) => {
    
    try {
        const productos = await producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "error obteniendo los productos", detalle: error.message });
    }
}

//obtener uno
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
const saveOne = async (req, res) => {
    try {
        const { codigo, nombre_producto, precio, stock } = req.body;
        if (!codigo) {
            res.status(400).json({ error: "Es obligatorio el campo codigo" });
        }
        if (!nombre_producto || !precio || !stock) {
            res.status(400).json({ error: "Son obligatorios los campos nombre_producto, precio y stock" });

        }
        //Sequelize maneja error cuando la pk ya está en la bd, por lo que lo mandará al catch
        const nuevo = await producto.create({ codigo, nombre_producto, precio, stock });
        res.status(201).json({ mensaje: "Producto agregado a la base de datos", agregado: nuevo });

    } catch (error) {
        if (error === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: `Ya existe un producto con ese código (${req.body.codigo}) en la BD`
            });
        }
        return res.status(500).json({
            error: "Error al momento de agregar el libro a la BD",
            detalle: error.message
        });
    }

}
/*

const compra = require("../model/compra");

//get todas las compras
const getTodasCompra = async (req, res) => {
    try {
        const compras = compra.findAll();
        res.json(compras);
    } catch (error) {
        res.status(500).json({
            error: "Error obteniendo todas las compras",
            detalle: error.message
        });
    }

}
//obtener una compra
const getUnaCompra = async (req, res) => {
    try {
        const resultado = compra.findByPK(req.params.id)
        if (!resultado) {
            res.status(404).json({
                error: "No se encontró ninguna compra con ese id"
            });

        }
        res.json(resultado);
    } catch (error) {
        res.status(500).json({
            error: "Error al realizar la consulta",
            detalle: error.message
        });
    }
}
//post- agregar compra
const saveCompra = async (req, res) => {
    const { clienteId, productoId, cantidad } = req.body;

    if (!clienteId || !productoId || !cantidad) {
        return res.status(400).json({
            mensaje: "Los campos 'clienteId', 'productoId' y 'cantidad' son obligatorios"
        });
    }
    let clienteBusqueda;
    let productoBusqueda;
    try {
        clienteBusqueda = await cliente.findByPK(clienteId);
        productoBusqueda = await producto.findByPK(productoId);
        producto = productoBusqueda?.[0];
        console.log(producto);
    } catch (error) {
        return res.status(503).json({
            mensaje: "no se pudo validar la compra debido al fallo de comunicaciones no respondió",
            detalle: error.message
        });
    }
    if (!clienteBusqueda) {
        return res.status(404).json({
            mensaje: `El cliente ${clienteId} no existe`
        });
    }
    if (!productoBusqueda) {
        return res.status(404).json({
            mensaje: `El producto ${productoId} no existe`
        });
    }
    if (producto.get('stock') < cantidad) {
        return res.status(400).json({
            mensaje: `Stock insuficiente. Disponible: ${producto.get('stock')}, solicitado: ${cantidad}`
        });
    }

    try {
        const total = parseInt(producto.get('stock'), 10) * parseInt(cantidad, 10);
        const nuevo = await compra.create({ clienteId, productoId, cantidad, total });
        res.status(201).json({ mensaje: "compra agregada a la base de datos", agregado: nuevo });

    } catch (error) {
        // 
       // if (error==='SequelizeUniqueConstraintError') {
        //    return res.status(409).json({
         //       mensaje:"Ya existe una compra con ese código"
          //  });
        //}
        //es una pk compuesta, se adiciona una fecha en la bd
        //
        return res.status(500).json({
            mensaje: "error al guardar la compra",
            detalle: error.message
        });
    }
}
//PUT compra
const modificarCompra = async (req, res) => {
    const { cantidad } = req.body;
    if (!cantidad) {
        res.status(400).json({
            error: "El campo cantidad es obligatorio"
        })
    }
    try {
        const busqueda = await compra.finbyPk(req.params.id)
        if (!busqueda) {
            return res.status(404).json({
                mensaje: `La compra con id ${busqueda.get('id')} no existe`
            });
        }
        const total = parseInt(producto.get('stock'), 10) * parseInt(cantidad, 10);
        await resultado.update({cantidad, total});
    } catch (error) {

    }

}

*/


//modificar
const modifyOne = async (req, res) => {
    try {
        const resultado = await producto.findByPk(req.params.id);
        if (!resultado) {
            res.status(404), json({
                //es válido esta forma, lo distinto es que se utiliza template  literals ${} para varias variables
                //o hacer operaciones dentro del texto, siendo mucho más fácil de entender
                error: "No se encuentra el producto con código " + req.params.id + " en la BD"
            })
        }
        const {nombre_producto, precio, stock } = req.body;
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
//eliminar
const deleteOne=async (req,res) => {
    try {
        const resultado=await producto.findByPk(req.params.id);
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


  } catch (error) {
    console.error("Error iniciando la App:", error.message);
    process.exit(1);//esto es para que salga con error y docker lo pueda reiniciar
  }
}
iniciar();
