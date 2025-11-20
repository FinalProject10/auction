const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Pickup = sequelize.define("pickup", {
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
  scheduledDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Scheduled pickup date',
  },
  pickupDeadline: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Deadline for pickup (typically 5 days after payment)',
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'pending', 'confirmed', 'late', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  releaseDocument: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL or path to release document',
  },
  confirmedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When pickup was confirmed',
  },
  lateFeeAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
    comment: 'Late storage fee amount',
  },
  transportationCompany: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Transportation company name if applicable',
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tableName: 'pickups',
});

module.exports = Pickup;

