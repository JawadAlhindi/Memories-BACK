import { memoryModel } from "../../models/index.js";
import { cloudinary } from "../../services/index.js";
import { cookiesConfig } from "../../configs/index.js";

export default async function (req, res) {
  const memory = req.body;
  const localsAccessToken = res.locals.accessToken;
  const backupResponse = {
    statusCode: 200,
    isAuth: true,
    from: "controllers/memory/create",
    message: "all good.",
    data: {
      accessToken: cookiesConfig.access.name,
    },
  };
  const response = localsAccessToken ? localsAccessToken : backupResponse;

  try {
    memory.cover = await cloudinary.upload(memory.cover);
  } catch (error) {
    return res.status(503).json({
      accessToken: response,
      memory: {
        statusCode: 503,
        from: "controllers/memory/create 1",
        message: "Something went wrong! Please try again.",
      },
    });
  }

  try {
    const newMemory = await memoryModel.create(memory);
    await newMemory.save();

    return res.status(201).json({
      accessToken: response,
      memory: {
        statusCode: 201,
        from: "controllers/memory/create 2",
        message: "Done! Thanks for sharing your memory.",
      },
    });
  } catch (error) {
    return res.status(503).json({
      accessToken: response,
      memory: {
        statusCode: 503,
        from: "controllers/memory/create 3",
        message: error.message,
      },
    });
  }
}
