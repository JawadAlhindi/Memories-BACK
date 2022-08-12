import { cookiesConfig } from "../../configs/index.js";

export default async function verifyToken(req, res) {
  const locals = res.locals.accessToken;
  const backupResponse = {
    statusCode: 200,
    isAuth: true,
    from: "controllers/auth/verifyToken 1",
    message: "all good.",
    data: {
      accessToken: cookiesConfig.access.name,
    },
  };
  const response = locals ? locals : backupResponse;

  return res.status(200).json({
    ...response,
  });
}
