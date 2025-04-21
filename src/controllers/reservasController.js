import { createNewReservation, getReservationsModel, getReservationIdModel, updateReservationModel, deleteReservationModel, getReservationsIdUserModel } from "../models/reservasModel.js"; 
import { handleResponse } from "../utils/handleResponse.js";

// controlador para registrar reservas
export const registerReservation = async (req, res) => {
    try {
        const newReservation = await createNewReservation(req.body);
        res.status(201).json({message: "reserva creada con exitp", nuevaReserva: newReservation});
    } catch (error) {
        if (error.message.includes( "No existe cancha o usuario" )) {
            return res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// controlador para obtener reservas
export const getReservationsController = async (req, res) => {
    try {
        const reservations = await getReservationsModel();
        res.status(200).json({message: "Reservas Obtenidad Con Exito", reservations: reservations});
    } catch (error) {
        res.status(500).json({message: "Error al obtener las reservas", error: error.message});
    }
}

// controlador para obtener reserva por Id
export const getReservationIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await getReservationIdModel(id);
        handleResponse(res, 200, "reservation", "Reserva Obtenida Con Exito", reservation);
        // res.status(200).json({message: "Reserva Obtenida Con Exito", reservations: reservation});
    } catch (error) {
        res.status(500).json({message: "Error al obtener la reserva", error: error.message});
    }
}

export const updateReservationController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const updatedReservation = await updateReservationModel(id, req.body );

        res.status(200).json({message: "Reserva actualziada con exito", updatedReservation: updatedReservation});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}

export const deleteReservationController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReservation = await deleteReservationModel(id);

        res.status(200).json({message: "Reserva eliminada con exito", deletedReservation: deletedReservation});
    } catch (error) {
        if (error.message.includes("No se encontro la reserva")) {
            return res.status(400).json({error: error.message});
        }

        res.status(500).json({message: "Internal Server Error", error: error.message});

    }
}

//Controller to het the response of the Reservations By user ID
export const getReservationIdUserController = async (req, res) => {
    try {
        //desestrucure id since the params of the request
        const { id } = req.params;

        //save de response inside a const and do the request
        const reservationsByIdUser = await getReservationsIdUserModel(id);

        //we make a response with status 200 OK and a json with a message and the data that the server give us
        res.status(200).json({message: "Reservaas Obtenidas Con Exito", reservationsByIdUser: reservationsByIdUser})
    } catch (error) {
        //Validate if the error message is related to the user ID
        if (error.message.includes("Usuario no encontrado")) {
            //Return the response with status 400 badRequest and a json with message, anda error message
            return res.status(400).json({message: "id de usurio no encontrado", error: error.message});
        }

        //Response with status 500 InternalServerError and json with message an error message
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}