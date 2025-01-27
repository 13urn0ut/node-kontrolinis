const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const {
  register,
  getUserByUsername,
  getUserById,
} = require("../models/userModel");
const AppError = require("../utils/appError");

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

    const newUser = await register({
      username,
      password: hashedPassword,
      role: "user",
    });

    newUser.password = undefined;

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

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return next(new AppError("You are not logged in! Please log in", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await getUserById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist",
          401
        )
      );
    }

    req.user = currentUser;

    next();
  } catch (err) {
    next(err);
  }
};

exports.allowAccessTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
