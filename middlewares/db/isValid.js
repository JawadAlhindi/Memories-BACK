import mongoose from "mongoose";

export default async function isValid(req, res, next) {
  const { _id: bodyID } = req.body;
  const { _id: paramsID } = req.params;
  const _id = bodyID ? bodyID : paramsID;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      statusCode: 404,
      from: "middlewares/mongoDB/isValid 1",
      message: "Nothing with that ID was found. Please check and try again.",
    });
  }

  next();
}
