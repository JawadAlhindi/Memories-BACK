import { memoryModel } from "../../models/index.js";
import { helpers } from "../../utils/index.js";
import { cookiesConfig } from "../../configs/index.js";

export default async function update(req, res) {
  const memory = req.body;

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

  memory.tags = memory.tags.map((tag) =>
    tag.trim().toLowerCase().split(" ").join("_")
  );

  try {
    const updatedMemory = await memoryModel
      .findByIdAndUpdate(memory._id, memory, { new: true })
      .populate("author", "username avatar")
      .lean();

    updatedMemory.cover = helpers.genImageURL(
      updatedMemory.cover,
      "c_scale,w_400/q_auto:best/dpr_auto"
    );

    res.status(200).json({
      accessToken: response,
      memory: {
        statusCode: 200,
        from: "controllers/memory/update 1",
        message: "memory updated successfully.",
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
        from: "controllers/memory/update 2",
        message: "Something went wrong. Please try again.",
      },
    });
  }
}
