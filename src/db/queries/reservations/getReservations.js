import pool from "../../database.js";

export const getReservations = async () => {
    try {
      const query = `
        SELECT
          r.id AS reservation_id,
          r.user_id,
          u.name,
          u.email,
          r.court_id,
          c.name AS court_name,
          c.location
          r.start_time AS startTime,
          r.end_time AS endTime,
          r.created_at AS reservation_created,
        FROM
          reservations r
        LEFT JOIN
          courts c ON r.court_id = c.id
        LEFT JOIN
          users u ON r.user_id = u.id
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