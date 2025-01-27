const { query } = require("express-validator");

exports.checkQuery = [
  query("page")
    .trim()
    .optional()
    .isNumeric()
    .withMessage("Page must be a number!"),

  query("limit")
    .trim()
    .optional()
    .isNumeric()
    .withMessage("Limit must be a number!"),

  query("title").trim().optional(),

  query("authorId").trim().optional().isNumeric(),
];
