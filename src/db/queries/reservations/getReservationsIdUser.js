import pool from "../../database.js";

export const getReservationsIdUser = async (idUser) => {
    try {
        const query = `
        SELECT
            r.id AS idReservation,
            r.user_id,
            r.court_id,
            c.name AS courtName,
            c.location,
            r.start_time,
            r.end_time,
            r.status
        FROM
            reservations r
        LEFT JOIN
            courts c ON r.court_id = c.id
        WHERE 
            user_id = ?
        `;
        const values = [ idUser ];

        const [ rows ] = await pool.query(query, values);

        if ( rows.length === 0 ) {
            throw new Error("Usuario no encontrado en la base de datos");
        }

        return rows;
    } catch (error) {
        console.error({error: error.message});
        throw error;
    }
}