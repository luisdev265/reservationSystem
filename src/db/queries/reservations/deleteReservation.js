import pool from "../../database.js";

export const deleteReservation = async (idReservation) => {
 try {
    const query = 'DELETE FROM reservations WHERE id = ?';
    const values = [idReservation];

    const [ result ] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        throw new Error("No se encontro la reserva para eliminar");
    }

    return { message: "Reserva eliminada con exito", deletedId: idReservation };

 } catch (error) {
    console.error({error: error.message});
    throw error;
 }
}