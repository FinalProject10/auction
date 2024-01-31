const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Seller = sequelize.define(
  "seller",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telNumb: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cinNum: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    batinda: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false, tableName: "seller" }
);

module.exports = Seller;
