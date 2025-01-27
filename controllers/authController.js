const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { register, getUserByUsername } = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendCookie = (res, token) => {
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
};

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await argon2.hash(password);

    const newUser = await register({ username, password: hashedPassword });

    newUser.password = undefined;
    newUser.id = undefined;

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await getUserByUsername(username);

    const token = signToken(user.id);

    sendCookie(res, token);

    user.password = undefined;
    user.id = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
