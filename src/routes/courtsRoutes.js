import express from "express";
import { getCourtsController } from "../controllers/courtsControllers/getCourtsController.js";
import { getCourtIdController } from "../controllers/courtsControllers/getCourtIdController.js";

const router = express.Router();

router.get('/', getCourtsController);
router.get('/:id', getCourtIdController);

export default router;