const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Memberships = sequelize.define('memberships', {
  id:{
    primaryKey:true,
    autoIncrement:true,
    typr:DataTypes.INTEGER
  },
  type:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  price:{
    type:DataTypes.INTEGER,
    allowNull:true    
},
clients_id:{
    type:DataTypes.INTEGER,
    allowNull:true
}
},{timestamps: false,
tableName:'membership'});

module.exports = Memberships;