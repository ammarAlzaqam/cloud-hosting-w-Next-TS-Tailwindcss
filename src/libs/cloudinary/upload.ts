import { NextRequest, NextResponse } from "next/server";
import cloudinary from "./cloudinary";

/**
 * Upload user avatar to Cloudinary
 * @param request
 * @returns uploadApiResponse or Error Response
 */
export default async function uploadUserAvatar(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("avatar") as File | null;

    if (!file)
      throw new Error("No file uploaded");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<cloudinary.UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "user_avatars" }, (error, result) => {
            if (error) reject(error);
            else resolve(result!);
          })
          .end(buffer);
      }
    );

    return {
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (e) {
    throw new Error("Failed to upload image");
  }
}
