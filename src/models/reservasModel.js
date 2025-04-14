import { createReservation, getReservations, getReservationsId, updateReservation, validateReservation, deleteReservation } from '../config/queries/reservations/index.js';

export const createNewReservation = async (reservation) => {
    try {
        const { userId, courtId, startTime, endTime } = reservation;

        // Validar que todos los campos hayan sido llenados
        if (!userId || !courtId || !startTime || !endTime) {
            throw new Error("All fields are required");
        }

        // Validar que la reserva no colisione con una ya existente
        await validateReservation(courtId, startTime, endTime);  // Pasa los parámetros correctos

        // Si no lanza ningún error, insertar la nueva reserva
        const newReservation = await createReservation(userId, courtId, startTime, endTime);

        return newReservation;
    } catch (error) {
        console.error({ error: error.message });
        throw error;
    }
};

export const getReservationsModel = async () => {
    try {
        const reservations = await getReservations();

        return reservations;
    } catch (error) {
        console.error({message: "Error al obtener reservas:", error: error.message});
        throw error;
    }
};

export const getReservationsIdModel = async (id) => {
    try {
        const reservation = await getReservationsId(id);

        return reservation;
    } catch (error) {
        console.error({message: "Error al obtener la reserva:", error: error.message});
        throw error;
    }
};

export const updateReservationModel = async ( idReservation, updateData ) => {
    try {
        const { startTime, endTime } = updateData;

        //Valdiar que todos los campos hayan sido llenados

        if (!idReservation || !startTime || !endTime) {
            throw new Error("All fields are required");
        } 

        //Lnazar la consulta ocn los datos
        const updatedReservation = await updateReservation( idReservation, startTime, endTime );

        return updatedReservation;
    } catch (error) {
        console.error({message: error.message});
        throw error;
    }

}

export const deleteReservationModel = async (idReservation) => {
    try {
        //validate if a field is empty
        if (!idReservation) {
            throw new Error("All fields are required");
        }

        const deletedReservation = await deleteReservation(idReservation);
        
        return deletedReservation;
    } catch (error) {
        console.error({error: error.message});
        throw error;
    }
}