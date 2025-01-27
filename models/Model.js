const { sql } = require("./../dbConnection");

exports.getAll = async () => {
  const results = await sql`
  SELECT *
  FROM users
  `;

  return results;
};
