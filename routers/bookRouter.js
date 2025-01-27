const bookRouter = require("express").Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { protect, allowAccessTo } = require("../controllers/authController");
const {
  checkCreateBookBody,
  checkUpdateBookBody,
} = require("../validators/checkBody");
const { checkParamsId } = require("../validators/checkParams");
const { checkQuery } = require("../validators/checkQuery");
const validate = require("../validators/validate");

bookRouter
  .route("/")
  .get(checkQuery, validate, getAllBooks)
  .post(
    protect,
    allowAccessTo("admin"),
    checkCreateBookBody,
    validate,
    createBook
  );

bookRouter
  .route("/:id")
  .all(checkParamsId, validate)
  .get(getBookById)
  .patch(
    protect,
    allowAccessTo("admin"),
    checkUpdateBookBody,
    validate,
    updateBook
  )
  .delete(protect, allowAccessTo("admin"), deleteBook);

module.exports = bookRouter;
