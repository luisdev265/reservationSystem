import { getCourts } from "../../db/queries/courts/getCourts.js";

export const getCourtsModel = async () => {
    try {
        const courts = await getCourts();
        return courts;

    } catch (error) {
        console.error;
        throw error;
    }
}