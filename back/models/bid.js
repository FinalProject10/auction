const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Bid = sequelize.define(
  "bid",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bidAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = Bid;
