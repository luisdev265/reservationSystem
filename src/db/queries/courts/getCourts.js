import pool from "../../database.js";

export const getCourts = async () => {
  const query = "SELECT * FROM courts";

  try {
    const [rows] = await pool.query(query);

    if (rows.length === 0) {
      throw new Error("No hay canchas para mostrar");
    }

    //Mapeamos el array rows y sacamos en cada iteracion el paratado created_at y solo almacenamos en el nuevo array el resto
    const courts = rows.map(({created_at, ...court}) => court);

    //Retronamos el nuevo array son la fila created_at
    return courts;
  } catch (error) {
    console.error({ error });
    throw error;
  }
};
