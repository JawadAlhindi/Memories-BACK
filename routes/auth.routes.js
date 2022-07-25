import express from "express";
import { authMW } from "../middlewares/index.js";
import { authCons } from "../controllers/index.js";

const router = express.Router();

router.post(
  "/register",
  [authMW.isUsernameExists, authMW.isEmailExists],
  authCons.register
);

router.post(
  "/login",
  [
    authMW.isEmailExists,
    authMW.isPasswordCorrect,
    authMW.isUserActive,
    //authMW.clearCookies, //TODO: check later why it doesn't work. (note: is add 2 empty cookies insted of clearing)
  ],
  authCons.login
);

router.get("/logout", authCons.logout);

router.get(
  "/verifyToken",
  [authMW.verifyRefreshToken, authMW.verifyAccessToken],
  authCons.verifyToken
);

router.get("/verifyCode", authCons.verifyCode);

export default router;
