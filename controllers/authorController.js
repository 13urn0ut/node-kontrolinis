const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../models/authorModel");
const { getBooksByAuthorId } = require("../models/bookModel");
const AppError = require("../utils/appError");

exports.getAllauthors = async (req, res, next) => {
  try {
    let authors = await getAllAuthors();

    if (!authors || authors.length === 0)
      throw new AppError("No authors found", 404);

    for (const author of authors) {
      author.books = await getBooksByAuthorId(author.id);
    }

    res.status(200).json({
      status: "success",
      data: authors,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await getAuthorById(id);

    if (!author) throw new AppError("No author found", 404);

    author.books = await getBooksByAuthorId(author.id);

    res.status(200).json({
      status: "success",
      data: author,
    });
  } catch (err) {
    next(err);
  }
};

exports.createAuthor = async (req, res, next) => {
  try {
    const { name, birthDate, biography } = req.body;

    const newAuthor = await createAuthor({
      name,
      birthDate,
      biography: biography || null,
    });

    res.status(201).json({
      status: "success",
      data: newAuthor,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = req.body;

    const updatedAuthor = await updateAuthor(id, author);

    if (!updatedAuthor) throw new AppError("No author found", 404);

    res.status(200).json({
      status: "success",
      data: updatedAuthor,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteAuthor(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
