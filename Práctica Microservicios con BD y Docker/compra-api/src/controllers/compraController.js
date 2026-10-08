const compra = require("../models/compra");
const { Op } = require("sequelize");
const { obtenerCliente } = require("../services/clienteService");
const { obtenerProducto } = require("../services/productoService");

// Obtener todas las compras
const getAll = async (req,res) =>{
    try{
        const compras = await compra.findAll();
        res.json(compras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtener una compra
const getOne = async(req, res) =>{
    try{
        // La fecha a pasar debe tener estos cambios con respecto a la BD:
        // Cambiar espacios por T, cambiar los : por %3A,dejar solo 3 decimales al final y agregar Z al final para que sea ISO 8601
        // EJ: 2026-09-23 13:31:45.588492 => 2026-09-23T13%3A31%3A45.588Z
        const { cliente_id, producto_id, fecha_compra } = req.query;

        if (!cliente_id || !producto_id || !fecha_compra) {
            return res.status(400).json({ message: "Faltan parámetros requeridos en la consulta" });
        }

        const fecha = new Date(fecha_compra); // acepta ISO: 2026-09-23T13:31:45.588Z
        if (isNaN(fecha.getTime())) {
            return res.status(400).json({ message: "fecha_compra inválida, usa formato ISO" });
        }

        // ventana de +-1 seg para absorber ms/microsegundos + timezone
        const inicio = new Date(fecha.getTime() - 1000);
        const fin = new Date(fecha.getTime() + 1000);

        const compraEncontrada = await compra.findOne({ 
            where: {
                cliente_id, 
                producto_id, 
                fecha_compra: { [Op.between]: [inicio, fin] }
            }
        });

        if(!compraEncontrada){
            return res.status(404).json({ message: "Compra no encontrada" });
        }
        res.json(compraEncontrada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear una compra
const crear = async(req,res) =>{
    try{
        const { cliente_id, producto_id, cantidad } = req.body;
        const clienteExistente = await obtenerCliente(cliente_id);

        if (!clienteExistente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const productoExistente = await obtenerProducto(producto_id);

        if (!productoExistente) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const totalCalculado = productoExistente.precio * cantidad;

        const nuevaCompra = await compra.create({
            cliente_id,
            producto_id,
            cantidad,
            total: totalCalculado
        });
        res.status(201).json(nuevaCompra);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Actualizar la cantidad de una compra
const actualizar = async(req,res) =>{
    try{
        const { cliente_id, producto_id, fecha_compra } = req.query;
        const {cantidad} = req.body;

        if (!cliente_id || !producto_id || !fecha_compra) {
            return res.status(400).json({ message: "Faltan parámetros requeridos en la consulta" });
        }

        const fecha = new Date(fecha_compra); // acepta ISO: 2026-09-23T13:31:45.588Z
        if (isNaN(fecha.getTime())) {
            return res.status(400).json({ message: "fecha_compra inválida, usa formato ISO" });
        }

        // ventana de +-1 seg para absorber ms/microsegundos + timezone
        const inicio = new Date(fecha.getTime() - 1000);
        const fin = new Date(fecha.getTime() + 1000);

        const compraEncontrada = await compra.findOne({ 
            where: {
                cliente_id, 
                producto_id, 
                fecha_compra: { [Op.between]: [inicio, fin] }
            }
        });

        if(!compraEncontrada){
            return res.status(404).json({ message: "Compra no encontrada" });
        }

        const productoExistente = await obtenerProducto(producto_id);

        const totalCalculado = productoExistente.precio * cantidad;

        await compraEncontrada.update({ cantidad, total: totalCalculado });
        res.status(200).json(compraEncontrada);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

// Eliminar compra
const eliminar = async(req,res) =>{
    try{
        const { cliente_id, producto_id, fecha_compra } = req.query;

        if (!cliente_id || !producto_id || !fecha_compra) {
            return res.status(400).json({ message: "Faltan parámetros requeridos en la consulta" });
        }

        const fecha = new Date(fecha_compra); // acepta ISO: 2026-09-23T13:31:45.588Z
        if (isNaN(fecha.getTime())) {
            return res.status(400).json({ message: "fecha_compra inválida, usa formato ISO" });
        }

        // ventana de +-1 seg para absorber ms/microsegundos + timezone
        const inicio = new Date(fecha.getTime() - 1000);
        const fin = new Date(fecha.getTime() + 1000);

        const compraEncontrada = await compra.findOne({ 
            where: {
                cliente_id, 
                producto_id, 
                fecha_compra: { [Op.between]: [inicio, fin] }
            }
        });

        if(!compraEncontrada){
            return res.status(404).json({ message: "Compra no encontrada" });
        }

        const filas = await compra.destroy({
            where: {
                cliente_id,
                producto_id,
                fecha_compra: { [Op.between]: [inicio, fin] }
            }
        });
        if (filas === 0) return res.status(404).json({ message: "No se eliminó nada" });

        res.json({
            Mensaje:"Producto eliminado",
            eliminado: compraEncontrada
        })
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getAll, getOne, crear, actualizar, eliminar}