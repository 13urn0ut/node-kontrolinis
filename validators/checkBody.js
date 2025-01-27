const { body } = require("express-validator");

const checkBody = [body("name").notEmpty().withMessage("Name is required")];

module.exports = checkBody;
