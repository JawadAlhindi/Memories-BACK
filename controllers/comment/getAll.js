import { commentModel } from "../../models/index.js";
import { helpers } from "../../utils/index.js";

export default async function getAll(req, res) {
  const { _id } = req.params;

  try {
    const comments = await commentModel
      .find({ memoryId: _id })
      .populate("author", "username avatar")
      .sort({ _id: -1 })
      .lean();

    res.status(200).json({
      statusCode: 200,
      from: "controllers/comment/getAll 1",
      data: {
        comments,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      statusCode: 503,
      from: "controllers/comment/getAll 2",
      message: "Something went wrong. Please try again.",
    });
  }
}
