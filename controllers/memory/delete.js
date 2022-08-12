import { memoryModel } from "../../models/index.js";

export default async function _delete(req, res) {
  const { _id } = req.body;

  try {
    await memoryModel.findByIdAndRemove(_id);

    return res.status(204).json({
      accessToken: res.locals.accessToken,
      memory: {
        statusCode: 204,
        from: "controllers/memory/delete 1",
        message: "Your memory has been successfully deleted.",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      accessToken: res.locals.accessToken,
      memory: {
        statusCode: 503,
        from: "controllers/memory/delete 2",
        message: "Something went wrong. Please try again.",
      },
    });
  }
}
