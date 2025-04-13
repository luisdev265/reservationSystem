import pool from "../../database.js";

export const createReservation = async (
  userId,
  courtId,
  startTime,
  endTime
) => {
  try {
    // Correcta sintaxis del INSERT INTO
    const query =
      "INSERT INTO reservations (user_id, court_id, start_time, end_time) VALUES (?, ?, ?, ?)";
    const values = [userId, courtId, startTime, endTime];

    // Ejecutar la consulta
    const [result] = await pool.query(query, values);

    // Verificar si se insertó alguna fila (result.affectedRows > 0)
    if (result.affectedRows === 0) {
      throw new Error("Error al crear la reservación");
    }

    // Obtener el ID de la nueva reserva
    const idNewReservation = result.insertId;

    // Retornar el resultado de la inserción junto con el id de la nueva reserva
    return { id: idNewReservation, userId, courtId, startTime, endTime };
  } catch (error) {
    console.error({ error: error.message });
    throw error;
  }
};