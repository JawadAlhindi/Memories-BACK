import { memoryModel } from "../../models/index.js";
import { helpers } from "../../utils/index.js";

export default async function getSingle(req, res) {
  const { _id } = req.params;
  let memory = {};

  try {
    memory = await memoryModel
      .findById(_id)
      .populate("author", "username avatar")
      .lean();

    memory.coverURL = helpers.genImageURL(
      memory.cover,
      "c_scale,h_1024/q_auto:best/dpr_auto"
    );

    memory.author.avatarURL = helpers.genImageURL(
      memory.author.avatar,
      "c_scale,w_256/q_auto:best/dpr_auto"
    );

    return res.status(200).json({
      statusCode: 200,
      from: "controllers/memory/genSingle 1",
      data: {
        memory,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      statusCode: 503,
      from: "controllers/memory/genSingle 2",
      message: "Something went wrong. Please try again.",
    });
  }
}
