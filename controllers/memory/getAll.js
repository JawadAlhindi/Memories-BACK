import { memoryModel } from "../../models/index.js";
import { helpers } from "../../utils/index.js";

export default async function (req, res) {
  const { page } = req.query;
  const LIMIT = 8;
  const startIndex = (parseInt(page) - 1) * LIMIT;
  let totalNumberOfPages = 0;
  let memories = [];

  try {
    totalNumberOfPages = await memoryModel.countDocuments();
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      statusCode: 503,
      from: "controllers/memory/getAll 1",
      message: "Something went wrong. Please try again.",
    });
  }

  try {
    memories = await memoryModel
      .find()
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(LIMIT)
      .populate("author", "username avatar")
      .lean();

    memories.map(
      (memory) =>
        (memory.coverURL = helpers.genImageURL(
          memory.cover,
          "c_scale,h_420/q_auto:best/dpr_auto"
        ))
    );

    return res.status(200).json({
      statusCode: 200,
      from: "controllers/memory/getAll 2",
      data: {
        memories,
        totalNumberOfPages,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      statusCode: 503,
      from: "controllers/memory/getAll 3",
      message: "Something went wrong. Please try again.",
    });
  }
}
