import jwt from "jsonwebtoken";
import { cookiesConfig } from "../../configs/index.js";

export default async function verifyToken(req, res) {
  return res.status(200).json({
    statusCode: 200,
    from: "controllers/auth/verifyToken 1",
    message: "all good.",
    data: {
      accessToken: cookiesConfig.access.name,
    },
  });
}
