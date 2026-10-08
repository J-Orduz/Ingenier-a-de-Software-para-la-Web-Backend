const { DataTypes } = require('sequelize');
const sequelize=require('../config/database');

const Compra = sequelize.define('compra',{
    cliente_id:{
        type: DataTypes.STRING(12),
        primaryKey: true,
        allowNull: false
    },
    producto_id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    fecha_compra:{
        type: DataTypes.DATE,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    tableName: 'compras',
    timestamps: false
});

module.exports = Compra;