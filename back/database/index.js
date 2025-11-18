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
