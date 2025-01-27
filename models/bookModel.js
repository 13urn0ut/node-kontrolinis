const { sql } = require("../dbConnection");

exports.createBook = async (book) => {
  const [newBook] = await sql`
    INSERT INTO books
    ${sql(book)}

    RETURNING * 
    `;

  return newBook;
};

exports.getAllBooks = async (filter) => {
  const limit = filter?.limit;
  const page = filter?.page;
  const offset = (page - 1) * limit;

  const books = await sql`
    SELECT books.id as book_id, books.title, books.summary, books.isbn, authors.*
    FROM books
    JOIN authors
    ON books.author_id = authors.id
    ${
      filter?.title
        ? sql`WHERE books.title LIKE '%${sql.unsafe(filter.title)}%'`
        : sql``
    }
    ${
      filter?.authorId
        ? filter?.title
          ? sql`AND books.author_id = ${filter.authorId}`
          : sql`WHERE books.author_id = ${filter.authorId}`
        : sql``
    }  
    ${limit && offset >= 0 ? sql`LIMIT ${limit} OFFSET ${offset}` : sql``}
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
