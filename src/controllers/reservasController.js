import { createNewReservation, getReservationsModel, getReservationsIdModel, updateReservationModel } from "../models/reservasModel.js"; 


// controlador para registrar reservas
export const registerReservation = async (req, res) => {
    try {
        const newReservation = await createNewReservation(req.body);
        res.status(201).json({message: "reserva creada con exitp", nuevaReserva: newReservation});
    } catch (error) {
        console.error({message: error.message});
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// controlador para obtener reservas
export const getReservationController = async (req, res) => {
    try {
        const reservations = await getReservationsModel();
        res.status(200).json({message: "Reservas Obtenidad Con Exito", reservations: reservations});
    } catch (error) {
        console.error({message: error.message});
        res.status(500).json({message: "Error al obtener las reservas", error: error.message});
    }
}

// controlador para obtener reserva por Id
export const getReservationIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await getReservationsIdModel(id);
        res.status(200).json({message: "Reserva Obtenida Con Exito", reservations: reservation[0]});
    } catch (error) {
        console.error({message: error.message});
        res.status(500).json({message: "Error al obtener la reserva", error: error.message});
    }
}

export const updateReservationController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const updatedReservation = await updateReservationModel(id, req.body );

        res.status(200).json({message: "Reserva actualziada con exito", updatedReservation: updatedReservation});
    } catch (error) {
        console.error({message: error.message});
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}