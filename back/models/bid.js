const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Bid = sequelize.define("bid", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bidAmount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ClientId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true, // Enable timestamps, using createdAt column
  updatedAt: false, // Only use createdAt, not updatedAt
  tableName: 'bid',
  underscored: false,
});

module.exports = Bid;
