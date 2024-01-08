const {DataTypes}=require('sequelize')
const sequelize=require('../database/index')

const Reclamation=sequelize.define('reclamation',{
    id:{
        primaryKey:true,

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