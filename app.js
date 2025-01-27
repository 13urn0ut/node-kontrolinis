const express = require("express");
const Router = require("./routers/Router");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/appError");
const app = express();

app.use(express.json());

app.use("/api/v1", Router);

app.all("*", (req, res, next) => {
  next(new AppError("Not found", 404));
});

app.use(errorHandler);

module.exports = app;
