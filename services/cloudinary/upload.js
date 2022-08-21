import base from "./options.js";

export default async function upload(payload) {
  const { public_id } = await base.upload(payload, { format: "webp" });

  return public_id;
}
