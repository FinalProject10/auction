// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry",
      error: err.errors[0]?.message || "Record already exists",
    });
  }

  // Sequelize foreign key constraint errors
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      success: false,
      message: "Invalid reference",
      error: "Referenced record does not exist",
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: "Authentication failed",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
      error: "Please login again",
    });
  }

  // Custom application errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.error || err.message,
    });
  }

  // Default 500 server error
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message,
    error: process.env.NODE_ENV === "production"
      ? "An unexpected error occurred"
      : err.stack,
  });
};

module.exports = errorHandler;

