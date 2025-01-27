const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const authorRouter = require("./routers/authorRouter");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/appError");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Not found", 404));
});

app.use(errorHandler);

module.exports = app;
