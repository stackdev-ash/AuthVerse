import cloudinary from "@/lib/cloudinary";

export async function deleteImage(publicId: string) {
  await cloudinary.uploader.destroy(publicId);
}