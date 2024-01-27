const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Chat = sequelize.define("chat", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

},{
    tableName: "chat"  })
module.exports=Chat