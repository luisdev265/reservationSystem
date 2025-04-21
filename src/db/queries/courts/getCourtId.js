import pool from "../../database.js";

export const getCourtId = async (idCourt) => {
  const query = "SELECT * FROM courts WHERE id = ?";
  const values = [idCourt];


  try {
    const [rows] = await pool.query(query, values);

    if (rows.length === 0) {
      throw new Error("Cancha no existente");
    }

    const { created_at, ...court } = rows[0];

    return court;
  } catch (error) {
    console.error({ error });
    throw error;
  }
};
