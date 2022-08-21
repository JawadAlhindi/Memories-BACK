import express from "express";
import { authMW, dbMW } from "../middlewares/index.js";
import { memoryCons as memory } from "../controllers/index.js";

const router = express.Router();

//GET
router.get("/:_id", dbMW.isValid, memory.getRecommendations);

export default router;
