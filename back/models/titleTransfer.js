const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const TitleTransfer = sequelize.define("titleTransfer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'items_id',
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'clients_id',
  },
  titleType: {
    type: DataTypes.ENUM('Clean', 'Salvage', 'Non-repairable', 'Rebuilt', 'Export-only'),
    allowNull: false,
    comment: 'Type of title being transferred',
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-transit', 'completed', 'delayed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  documentUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL or path to title document',
  },
  transferDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Date when title was transferred',
  },
  exportDocument: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Export documentation if applicable',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional notes about the transfer',
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tableName: 'title_transfers',
});

module.exports = TitleTransfer;

