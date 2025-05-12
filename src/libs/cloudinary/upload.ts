import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

/**
 * Upload user avatar to Cloudinary
 * @param request
 * @returns uploadApiResponse or Error Response
 */
export default async function uploadUserAvatar(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("avatar") as File | null;

    //! Check if file is uploaded
    if (!file)
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    //* Upload to Cloudinary
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

    //TODO>> Return the result from Cloudinary (like url, public_id, etc)
    return uploadResult
  } catch {
    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 }
    );
  }
}
