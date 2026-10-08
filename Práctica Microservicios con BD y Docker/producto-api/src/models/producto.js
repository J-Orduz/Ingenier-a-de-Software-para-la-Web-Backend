const { DataTypes } = require('sequelize');
const sequelize=require('../config/database');

const Producto = sequelize.define('producto',{
    codigo:{
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    nombre_producto:{
        type:DataTypes.STRING(100),
        allowNull: false
    },
    precio:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
},{ 
    tableName: 'productos', 
    timestamps: false 
});

module.exports = Producto;