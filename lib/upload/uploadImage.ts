import cloudinary from "@/lib/cloudinary";

export async function uploadImage(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: "authverse/blogs",
    resource_type: "image",
  overwrite: false,

  });

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
}