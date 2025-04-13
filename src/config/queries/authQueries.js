import pool from "../database.js";

export const existingUser = async (email) => {
  //Request para conseguir un usuario existente
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  //Si el usuario no existe mandar un error
  if ( rows.length === 0) {
    throw new Error("User not found");
  }

  //Devolver las filas encontradas
  return rows[0];
};

export const registerUser = async (username, email, hashedPassword) => {
  const rol = "client";
  const query =
    "INSERT INTO users (name, email, password, rol) VALUES (?, ?, ?, ?)";
  const values = [username, email, hashedPassword, rol];

  // Ejecuta la consulta para registrar el usuario
  const [result] = await pool.query(query, values);
  if (result.affectedRows === 0) {
    throw new Error("Error try to register new user");
  }
  const InserId = result.insertId;

  // Consulta el usuario recién insertado por su ID
  const queryUser = "SELECT * FROM users WHERE id = ? LIMIT 1";
  const [rows] = await pool.query(queryUser, [InserId]);

  if (rows.length === 0) {
    throw new Error("User not found");
  }

  const { password, ...newUser } = rows[0]; // Excluye la contraseña

  return { InserId, newUser };
};