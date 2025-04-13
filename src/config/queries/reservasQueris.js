import pool from "../database.js";

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

export const validateReservation = async (courtId, startTime, endTime) => {
  try {
    //Validate if court is busy in this date and time
    const query = `
    SELECT * FROM reservations 
    WHERE court_id = ? 
      AND (
        (start_time < ? AND end_time > ?)
        OR
        (start_time < ? AND end_time > ?)
        OR
        (start_time >= ? AND end_time <= ?)
      )
  `;
    const values = [
      courtId,
      endTime,
      startTime,
      startTime,
      endTime,
      startTime,
      endTime,
    ];
    const [rows] = await pool.query(query, values);

    if (rows.length > 0) {
      throw new Error("Ya hay una reservacion en este horario.");
    }
  } catch (error) {
    console.error({ error: error.message });
    throw error;
  }
};

export const getReservations = async () => {
  try {
    const query = `
      SELECT
        r.id AS reservation_id,
        r.user_id,
        r.court_id,
        r.start_time AS startTime,
        r.end_time AS endTime,
        r.created_at AS reservation_created,
        c.name AS court_name,
        c.location
      FROM
        reservations r
      LEFT JOIN
        courts c ON r.court_id = c.id
    `;

    const [rows] = await pool.query(query);

    if (rows.length === 0) {
      throw new Error("No hay reservas registradas");
    }

    return rows;
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    throw error;
  }
};

export const getReservationsId = async (idReservation) => {
  try {
    const query = `
      SELECT
        r.id AS reservation_id,
        r.user_id,
        r.court_id,
        r.start_time AS startTime,
        r.end_time AS endTime,
        r.created_at AS reservation_created,
        c.name AS court_name,
        c.location
      FROM
        reservations r
      LEFT JOIN
        courts c ON r.court_id = c.id
      WHERE 
        r.id = ?
    `;

    const [rows] = await pool.query(query, [idReservation]);

    if (rows.length === 0) {
      throw new Error("No existe la reserva");
    }

    return rows;
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    throw error;
  }
};

const validateReservationToUpdate = async (
  idReservation,
  startTime,
  endTime
) => {
  try {
    const [rows] = await pool.query(
      "SELECT court_id AS courtId FROM reservations WHERE id = ?",
      [idReservation]
    );

    if (rows.length === 0) {
      throw new Error("No se encontro la reserva para validar");
    }

    const { courtId } = rows[0];

    const query = `
    SELECT * FROM reservations 
WHERE court_id = ? 
  AND id != ?
  AND (
    (start_time < ? AND end_time > ?)
    OR
    (start_time < ? AND end_time > ?)
    OR
    (start_time >= ? AND end_time <= ?)
  )

  `;

  const values = [
    courtId,
    idReservation,
    endTime,
    startTime,
    startTime,
    endTime,
    startTime,
    endTime
  ];
  

    const [conflicts] = await pool.query(query, values);

    if (conflicts.length > 0) {
      throw new Error("Este horario ya se encuentra ocupado para esta cancha");
    }
  } catch (error) {
    console.error({ message: error.message });
    throw error;
  }
};

export const updateReservation = async (idReservation, startTime, endTime) => {
  try {
    await validateReservationToUpdate(idReservation, startTime, endTime);

    const query = `UPDATE reservations SET start_time = ?, end_time = ? WHERE id = ?`;
    const values = [startTime, endTime, idReservation];
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      throw new Error("Error al actualizar la reserva");
    }

    return {message: "Reserva actualizada con exito", data: { idReservation, startTime, endTime }};
  } catch (error) {
    console.error({ message: error.message });
    throw error;
  }
};
