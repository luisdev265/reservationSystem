import pool from "../../database.js";

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