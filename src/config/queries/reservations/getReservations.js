import pool from "../../database.js";

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