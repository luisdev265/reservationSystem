import { getCourtsIdModel } from "../../models/courtsModels/getCourtsIdModel.js";
import { handleResponse } from "../../utils/handleResponse.js";

export const getCourtIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const court = await getCourtsIdModel(id);

    handleResponse(res, 200, "court", "Cancha obtenida con exito", court);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
