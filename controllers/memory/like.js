import { memoryModel } from "../../models/index.js";
import { helpers } from "../../utils/index.js";

export default async function like(req, res) {
  const { _id, userId } = req.body;
  const memory = {};
  const index = 0;
  const updatedMemory = {};

  try {
    memory = await memoryModel.findById(_id).lean();
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      accessToken: res.locals.accessToken,
      memory: {
        statusCode: 503,
        from: "controllers/memory/like 1",
        message: "Something went wrong! Please try again.",
      },
    });
  }

  try {
    index = await memory.likes.findIndex((id) => id.toString() === userId);
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      accessToken: res.locals.accessToken,
      memory: {
        statusCode: 503,
        from: "controllers/memory/like 2",
        message: "Something went wrong! Please try again.",
      },
    });
  }

  if (index === -1) {
    memory.likes.push(userId);
  } else {
    memory.likes = memory.likes.filter((id) => id.toString() !== userId);
  }

  try {
    updatedMemory = await memoryModel
      .findByIdAndUpdate(_id, memory, { new: true })
      .populate("author", "username avatar")
      .lean();

    updatedMemory.cover = helpers.genImageURL(
      updatedMemory.cover,
      "c_scale,h_420/q_auto:best/dpr_auto"
    );

    return res.status(200).json({
      accessToken: res.locals.accessToken,
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
      accessToken: res.locals.accessToken,
      memory: {
        statusCode: 503,
        from: "controllers/memory/like 3",
        message: "Something went wrong! Please try again.",
      },
    });
  }
}
