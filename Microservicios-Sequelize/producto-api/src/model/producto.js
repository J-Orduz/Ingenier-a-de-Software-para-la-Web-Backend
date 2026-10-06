const {DataTypes}=require("sequelize");
const sequelize=require("../config/connection.js");

const producto= sequelize.define('producto',
    {
        codigo:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        nombre_producto:{
            type:DataTypes.STRING,
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
         

    }, { sequelize, modelName: 'productos' }
);
module.exports=producto;