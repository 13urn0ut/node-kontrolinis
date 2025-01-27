const {
  getAllauthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const { protect, allowAccessTo } = require("../controllers/authController");
const {
  checkCreateAuthorBody,
  checkUpdateAuthorBody,
} = require("../validators/checkBody");
const { checkParamsId } = require("../validators/checkParams");
const validate = require("../validators/validate");

const authorRouter = require("express").Router();

authorRouter
  .route("/")
  .get(getAllauthors)
  .post(
    protect,
    allowAccessTo("admin"),
    checkCreateAuthorBody,
    validate,
    createAuthor
  );

authorRouter
  .route("/:id")
  .all(checkParamsId, validate)
  .get(getAuthorById)
  .patch(
    protect,
    allowAccessTo("admin"),
    checkUpdateAuthorBody,
    validate,
    updateAuthor
  )
  .delete(protect, allowAccessTo("admin"), deleteAuthor);

module.exports = authorRouter;
