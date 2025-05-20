import uploadUserAvatar from "@/libs/cloudinary/upload";
import connectDB from "@/libs/mongoose";
import User, { UserDocument } from "@/models/user";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    
    if (!mongoose.Types.ObjectId.isValid(userId as string)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const uploadResult = await uploadUserAvatar(request);

    await connectDB();
    const user = (await User.findByIdAndUpdate(
      userId,
      { avatar: uploadResult.url },
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
