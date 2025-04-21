import pool from "../../database.js";

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