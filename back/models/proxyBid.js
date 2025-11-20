const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const ProxyBid = sequelize.define(
  "proxyBid",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "Maximum proxy bid amount",
    },
    currentBid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: "Current bid placed by proxy system",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    incrementAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: "Minimum increment to use when auto-bidding",
    },
  },
  {
    timestamps: false, // Disable timestamps until table is created with these columns
    tableName: "proxy_bids",
  }
);

module.exports = ProxyBid;
