import { getCourtId } from "../../db/queries/courts/getCourtId.js"

export const getCourtsIdModel = async (id) => {
    try {
        const court = await getCourtId(id);
        return court;
    } catch (error) {
        console.error;
        throw error;
    }
}