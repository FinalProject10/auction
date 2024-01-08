const {DataTypes}=require('sequelize')
const sequelize=require('../database/index')
const Items=sequelize.define('item',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    images:{
        type:DataTypes.JSON,
        allowNull:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    timeStart:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: sequelize.NOW
    },
    timeEnd:{
        type:DataTypes.DATE,
        allowNull:true
    }

},{timestamps: false,
    tableName:'membership'})
module.exports=Items