import { memoryModel } from "../../models/index.js";
import { helpers } from "../../utils/index.js";
import { cookiesConfig } from "../../configs/index.js";

export default async function like(req, res) {
  const { _id, userId, type } = req.body;
  const isCard = type === "card";
  let memory = {};

  const localsAccessToken = res.locals.accessToken;
  const backupResponse = {
    statusCode: 200,
    isAuth: true,
    from: "controllers/memory/like",
    message: "all good.",
    data: {
      accessToken: cookiesConfig.access.name,
    },
  };
  const response = localsAccessToken ? localsAccessToken : backupResponse;

  try {
    memory = await memoryModel.findById(_id).lean();

    const index = await memory.likes.findIndex(
      (id) => id.toString() === userId
    );
    if (index === -1) {
      memory.likes.push(userId);
    } else {
      memory.likes = memory.likes.filter((id) => id.toString() !== userId);
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      accessToken: response,
      memory: {
        statusCode: 503,
        from: "controllers/memory/like 1",
        message: "Something went wrong! Please try again.",
      },
    });
  }

  try {
    const updatedMemory = await memoryModel
      .findByIdAndUpdate(_id, memory, { new: true })
      .populate("author", "username avatar")
      .lean();

    updatedMemory.coverURL = helpers.genImageURL(
      updatedMemory.cover,
      `c_scale,${isCard ? "h_420" : "h_1024"}/q_auto:best/dpr_auto`
    );

    updatedMemory.author.avatarURL = helpers.genImageURL(
      updatedMemory.author.avatar,
      "c_scale,w_256/q_auto:best/dpr_auto"
    );

    return res.status(200).json({
      accessToken: response,
      memory: {
        statusCode: 200,
        from: "controllers/memory/likeMemory",
        data: {
          memory: updatedMemory,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      accessToken: response,
      memory: {
        statusCode: 503,
        from: "controllers/memory/like 3",
        message: "Something went wrong! Please try again.",
      },
    });
  }
}
