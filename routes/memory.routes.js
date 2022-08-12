import express from "express";
import { authMW } from "../middlewares/index.js";
import { memoryCons as memory } from "../controllers/index.js";

const router = express.Router();

//GET
router.get("/getALl", memory.getAll);
router.get("/getSingle/:_id", memory.getSingle);
router.get("/getTags", memory.getTags);
router.get("/search", memory.search);
router.get("/recommendations/:_id", memory.getRecommendations);

//POST
router.post(
  "/create",
  [authMW.verifyRefreshToken, authMW.verifyAccessToken],
  memory.create
);

//PATCH
router.patch(
  "/like",
  [
    authMW.verifyRefreshToken,
    authMW.verifyAccessToken,
    // memoryMW.isValid
  ],
  memory.like
);
router.patch(
  "/update",
  [
    authMW.verifyRefreshToken,
    authMW.verifyAccessToken,
    // memoryMW.isValid
  ],
  memory.update
);

//DELETE
router.delete(
  "/delete",
  [
    authMW.verifyRefreshToken,
    authMW.verifyAccessToken,
    // memoryMW.isValid
  ],
  memory._delete
);

export default router;
