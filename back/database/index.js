require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "final",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "0000",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,              // Maximum number of connections in pool (default: 5)
      min: 0,              // Minimum number of connections in pool (default: 0)
      acquire: 30000,      // Maximum time (ms) to wait for connection (default: 60000)
      idle: 10000,         // Maximum time (ms) a connection can be idle (default: 10000)
      evict: 1000          // Interval (ms) to check for idle connections (default: 1000)
    },
    define: {
      freezeTableName: true,  // Prevent Sequelize from pluralizing table names
      timestamps: false       // Disable timestamps if not needed (saves memory)
    }
  }
);
sequelize
  .authenticate()
  .then((r) => console.log("✓ MySQL connected successfully"))
  .catch((err) => {
    console.error("✗ MySQL connection error:", err.message);
    console.error("⚠️  Please make sure MySQL server is running!");
    console.error("   Install MySQL: brew install mysql");
    console.error("   Start MySQL: brew services start mysql");
    // Don't exit - let the server start but database operations will fail
  });

//  Sync the models with the database
// execute one time and then comment this code (after Database and tables created!)
// sequelize
//  sequelize.sync({ force: true })
//  .then(() => {
//    console.log("Database and tables created!");
//  })
//  .catch((err) => {
//    console.error("Error syncing database:", err);
//  });
module.exports = sequelize;
