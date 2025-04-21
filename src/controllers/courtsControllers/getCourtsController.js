import { getCourtsModel } from "../../models/courtsModels/getCourtsModel.js";
import { handleResponse } from "../../utils/handleResponse.js";

export const getCourtsController = async (req, res) => {
  try {
    const courts = await getCourtsModel();
    handleResponse(res, 200, "courts", "Canchas obtenidas con exito", courts );
    
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};