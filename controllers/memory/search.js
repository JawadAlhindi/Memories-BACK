import { memoryModel } from "../../models/index.js";
import { helpers } from "../../utils/index.js";
import { imgConfig } from "../../configs/index.js";

export default async function search(req, res) {
  const { query, tags } = req.query;
  const title = new RegExp(query, "i");
  const updatedTags = tags.toLowerCase().split(",");

  try {
    const memories = await memoryModel
      .find({ $or: [{ title }, { tags: { $in: updatedTags } }] })
      .populate("author", "username avatar")
      .lean();

    memories.map(
      (memory) =>
        (memory.cover = helpers.genImageURL(
          memory.cover,
          imgConfig.cover.small
        ))
    );

    return res.status(200).json({
      statusCode: 200,
      from: "controllers/memory/search 1",
      data: {
        results: memories,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      statusCode: 503,
      from: "controllers/memory/search 2",
      message: "Something went wrong. Please try again.",
    });
  }
}
