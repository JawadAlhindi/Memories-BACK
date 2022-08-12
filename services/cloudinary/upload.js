import { v2 as cloudinary } from "cloudinary";
import configs from "../../configs/cloudinary.js";

cloudinary.config(configs);

export default async function upload(payload) {
  const { public_id } = await cloudinary.uploader.upload(payload, {
    format: "webp",
  });

  return public_id;
}
