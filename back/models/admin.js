const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Admin = sequelize.define('admin', {
  name: {
    type:DataTypes.STRING,
    allowNull: true},
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {type:DataTypes.STRING,
        allowNull:true        
},
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telNumb: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cinNum: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
 
},{timestamps: false,
    tableName:'admin'});

module.exports = Admin;