const { param } = require("express-validator");

exports.checkParamsId = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("Id is required!")
    .isNumeric()
    .withMessage("Id must be a number!"),
];
