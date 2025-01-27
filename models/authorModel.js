const { sql } = require("../dbConnection");

exports.getAllAuthors = async () => {
  const authors = await sql`
    SELECT authors.*
    FROM authors
    `;

  return authors;
};

exports.getAuthorById = async (id) => {
  const [author] = await sql`
    SELECT *
    FROM authors
    WHERE authors.id = ${id}
    `;

  return author;
};

exports.createAuthor = async (author) => {
  const [newAuthor] = await sql`
    INSERT INTO authors
    ${sql(author)}
    RETURNING *
    `;

  return newAuthor;
};

exports.updateAuthor = async (id, author) => {
  const [updatedAuthor] = await sql`
    UPDATE authors
    SET ${sql(author)}
    WHERE authors.id = ${id}
    RETURNING *
    `;

  return updatedAuthor;
};

exports.deleteAuthor = async (id) => {
  await sql`
    DELETE FROM authors
    WHERE authors.id = ${id}
    `;
};
