import pool from "../../database.js";

export const createReservation = async (
  userId,
  courtId,
  startTime,
  endTime
) => {
  try {
    //Validar datos de entrada para usuarios o canchas ya registradas.
    await validateFields( userId, courtId );
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

const validateFields = async ( userId, courtId ) => {
  try {
    const [ userRows ] = await pool.query("SELECT id FROM users  WHERE id = ?", [userId]);
    const [ courtRows ] = await pool.query("SELECT id FROM courts  WHERE id = ?", [courtId]);

    if ( userRows.length === 0 || courtRows.length === 0 ) {
      throw new Error("No existe cancha o usuario con dicho id")
    }
  } catch (error) {
    console.error({error: error.message});
    throw error
  }
}