import cloudinary from "@/libs/cloudinary/cloudinary";
import uploadUserAvatar from "@/libs/cloudinary/upload";
import connectDB from "@/libs/mongoose";
import User, { UserDocument } from "@/models/user";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    
    if (!mongoose.Types.ObjectId.isValid(userId as string)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    
    await connectDB();
    const existingUser = await User.findById(userId);

    if (!existingUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    //* امسح الصورة القديمة من Cloudinary لو ليها public_id
    if (existingUser.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(existingUser.avatarPublicId);
    }

     //* ارفع الصورة الجديدة
    const uploadResult = await uploadUserAvatar(request); // ← ده بيرجع { url, public_id }

    //? حدّث بيانات المستخدم
    const user = (await User.findByIdAndUpdate(
      userId,
      {
        avatar: uploadResult.secure_url,
        avatarPublicId: uploadResult.public_id,
      },
      { new: true }
    ).select("-password")) as UserDocument;
    
    //! check user
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Image uploaded successfully", user },
      { status: 200 }
    );
  } catch (e) {
    console.error((e as Error).message)
    return NextResponse.json(
      { message: "Something went Error" },
      { status: 500 }
    );
  }
}
