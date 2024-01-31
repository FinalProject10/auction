const {DataTypes}=require('sequelize')
const sequelize=require('../database/index')

const GetInTouch=sequelize.define('GetInTouch',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    fullName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true
    },
    phoneNumber:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    subject:{
        type:DataTypes.STRING,
        allowNull:true
    },
    message:{
        type:DataTypes.TEXT,
        allowNull:true,
    },

},{
    tableName:'getInTouch'})
module.exports=GetInTouch