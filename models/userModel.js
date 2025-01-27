const { sql } = require("../dbConnection");

exports.register = async (user) => {
  const [newUser] = await sql`
  INSERT INTO users
  ${sql(user)}

  RETURNING users.*
  `;

  return newUser;
};

exports.getUserByUsername = async (username) => {
  const [user] = await sql`
  SELECT users.*
  FROM users
  WHERE username = ${username}
  `;

  return user;
};
