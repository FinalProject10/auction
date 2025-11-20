// Input validation middleware
const { body, param, query, validationResult } = require("express-validator");

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

// Deposit validation
const validateDeposit = [
  body("clientId")
    .isInt({ min: 1 })
    .withMessage("Client ID must be a positive integer"),
  body("amount")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than 0"),
  handleValidationErrors,
];

// Proxy bid validation
const validateProxyBid = [
  body("clientId")
    .isInt({ min: 1 })
    .withMessage("Client ID must be a positive integer"),
  body("itemId")
    .isInt({ min: 1 })
    .withMessage("Item ID must be a positive integer"),
  body("maxAmount")
    .isFloat({ min: 0.01 })
    .withMessage("Maximum amount must be greater than 0"),
  handleValidationErrors,
];

// Bid validation
const validateBid = [
  body("userId")
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
  body("itemId")
    .isInt({ min: 1 })
    .withMessage("Item ID must be a positive integer"),
  body("bidAmount")
    .isFloat({ min: 0.01 })
    .withMessage("Bid amount must be greater than 0"),
  handleValidationErrors,
];

// Seller approval validation
const validateSellerApproval = [
  body("status")
    .isIn(["approved", "rejected", "counteroffer"])
    .withMessage("Status must be approved, rejected, or counteroffer"),
  body("counterofferAmount")
    .if(body("status").equals("counteroffer"))
    .isFloat({ min: 0.01 })
    .withMessage("Counteroffer amount is required and must be greater than 0"),
  handleValidationErrors,
];

// Payment validation
const validatePayment = [
  body("paymentId")
    .isInt({ min: 1 })
    .withMessage("Payment ID must be a positive integer"),
  handleValidationErrors,
];

// Pickup validation
const validatePickup = [
  body("itemId")
    .isInt({ min: 1 })
    .withMessage("Item ID must be a positive integer"),
  body("clientId")
    .isInt({ min: 1 })
    .withMessage("Client ID must be a positive integer"),
  body("scheduledDate")
    .optional()
    .isISO8601()
    .withMessage("Scheduled date must be a valid date"),
  handleValidationErrors,
];

// ID parameter validation
const validateId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("ID must be a positive integer"),
  handleValidationErrors,
];

module.exports = {
  validateDeposit,
  validateProxyBid,
  validateBid,
  validateSellerApproval,
  validatePayment,
  validatePickup,
  validateId,
  handleValidationErrors,
};

