const {DataTypes}=require('sequelize')
const sequelize=require('../database/index')

const Reclamation=sequelize.define('reclamation',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    message:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    items_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
    }
},{timestamps: false,
    tableName:'reclamation'})
module.exports=Reclamation