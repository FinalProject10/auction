// Production configuration
module.exports = {
  // Database
  database: {
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Disable SQL logging in production
  },

  // Security
  security: {
    jwtExpiration: "24h",
    bcryptRounds: 12,
    rateLimitWindow: 15 * 60 * 1000, // 15 minutes
    rateLimitMax: 100,
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGINS?.split(",") || [],
    credentials: true,
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
    format: "json", // Use JSON format for log aggregation
  },

  // Performance
  performance: {
    compression: true,
    cacheControl: "public, max-age=31536000", // 1 year for static assets
  },
};

