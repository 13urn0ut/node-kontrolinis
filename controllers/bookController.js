const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../models/bookModel");
const AppError = require("../utils/appError");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await getAllBooks();

    if (!books || books.length === 0) throw new AppError("No books found", 404);

    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await getBookById(id);

    if (!book) throw new AppError("No book found", 404);

    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const book = req.body;

    const newBook = await createBook(book);

    if (!newBook) throw new AppError("Error creating book", 500);

    res.status(201).json({
      status: "success",
      data: newBook,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = req.body;

    const updatedBook = await updateBook(id, book);

    if (!updatedBook) throw new AppError("No book found", 404);

    res.status(200).json({
      status: "success",
      data: updatedBook,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedBook = await deleteBook(id);

    if (!deletedBook) throw new AppError("No book found", 404);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
