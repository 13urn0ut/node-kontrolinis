const { sql } = require("../dbConnection");

exports.createBook = async (book) => {
  const [newBook] = await sql`
    INSERT INTO books
    ${sql(book)}

    RETURNING * 
    `;

  return newBook;
};

exports.getAllBooks = async () => {
  const books = await sql`
    SELECT books.*, authors.* 
    FROM books
    JOIN authors
    ON books.author_id = authors.id
    `;

  return books;
};

exports.getBookById = async (id) => {
  const [book] = await sql`
    SELECT books.*, authors.*
    FROM books
    JOIN authors
    ON books.author_id = authors.id
    WHERE books.id = ${id}
    `;

  return book;
};

exports.getBooksByAuthorId = async (id) => {
  const books = await sql`
      SELECT books.*
      FROM books
      WHERE books.author_id = ${id}
      `;

  return books;
};

exports.updateBook = async (id, book) => {
  const [updatedBook] = await sql`
    UPDATE books
    SET ${sql(book)}
    WHERE books.id = ${id}

    RETURNING *
  `;

  return updatedBook;
};

exports.deleteBook = async (id) => {
  const [deletedBook] = await sql`
      DELETE FROM books
      WHERE books.id = ${id}
  
      RETURNING *
      `;

  return deletedBook;
};
