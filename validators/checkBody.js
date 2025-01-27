const argon2 = require("argon2");
const { body, checkExact } = require("express-validator");
const { getUserByUsername } = require("../models/userModel");

exports.checkRegisterBody = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required!")
    .custom(async (value) => {
      const user = await getUserByUsername(value);
      if (user) {
        throw new Error("Username already exists!");
      }
      return true;
    }),

  body("password").trim().notEmpty().withMessage("Password is required!"),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match!");
      }
      return true;
    }),

  checkExact([], { message: "Invalid data" }),
];

exports.checkLoginBody = [
  body("username").trim().notEmpty().withMessage("Username is required!"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .custom(async (password, { req }) => {
      const user = await getUserByUsername(req.body.username);

      if (!user) {
        throw new Error("Wrong username or password!");
      }

      const match = await argon2.verify(user.password, password);

      if (!match) {
        throw new Error("Wrong username or password!");
      }

      return true;
    }),

  checkExact([], { message: "Invalid data" }),
];

exports.checkCreateAuthorBody = [
  body("name").trim().notEmpty().withMessage("Name is required!"),

  body("birthDate")
    .trim()
    .isISO8601("yyyy-mm-dd")
    .withMessage("Invalid date format!"),

  body("biography").trim().optional(),

  checkExact([], { message: "Invalid data" }),
];

exports.checkUpdateAuthorBody = [
  body("name").trim().optional(),

  body("birthDate")
    .trim()
    .optional()
    .isISO8601("yyyy-mm-dd")
    .withMessage("Invalid date format!"),

  body("biography").trim().optional(),

  checkExact([], { message: "Invalid data" }),

  body().custom((value, { req }) => {
    const { name, birthDate, biography } = req.body;

    if (!name && !birthDate && !biography) {
      throw new Error("No data to update!");
    }

    return true;
  }),
];
