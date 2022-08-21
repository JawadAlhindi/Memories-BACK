import { memoryModel } from "../../models/index.js";
import { cookiesConfig } from "../../configs/index.js";
import { cloudinary } from "../../services/index.js";

export default async function _delete(req, res) {
  const { _id, public_id } = req.body;

  const localsAccessToken = res.locals.accessToken;
  const backupResponse = {
    statusCode: 200,
    isAuth: true,
    from: "controllers/memory/delete",
    message: "all good.",
    data: {
      accessToken: cookiesConfig.access.name,
    },
  };
  const response = localsAccessToken ? localsAccessToken : backupResponse;

  try {
    await cloudinary.destory(public_id);
    await memoryModel.findByIdAndRemove(_id);

    return res.status(200).json({
      accessToken: response,
      memory: {
        statusCode: 200,
        from: "controllers/memory/delete 1",
        message: "Your memory has been successfully deleted.",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      accessToken: response,
      memory: {
        statusCode: 503,
        from: "controllers/memory/delete 2",
        message: "Something went wrong. Please try again.",
      },
    });
  }
}
