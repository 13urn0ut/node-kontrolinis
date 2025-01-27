const authRouter = require("express").Router();

const { register, login } = require("../controllers/authController");

const {
  checkRegisterBody,
  checkLoginBody,
} = require("../validators/checkBody");
const validate = require("../validators/validate");

authRouter.route("/register").post(checkRegisterBody, validate, register);
authRouter.route("/login").post(checkLoginBody, validate, login);

module.exports = authRouter;
