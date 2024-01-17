const { DataTypes } = require('sequelize');
const sequelize = require('../database/index'); // Replace with your actual Sequelize instance

const Items = sequelize.define('item', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  timeStart: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  timeEnd: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  reviews: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  watching: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  longitude: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  latitude: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  sold: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  sellers_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  climatisation: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  cubicCapacity: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  emissionClass: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  mileage: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  parkingSensors: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  airbags: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  color: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  doorCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gearBox: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  numberOfSeats: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  power: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'items',
  timestamps: false 
});

module.exports = Items;
