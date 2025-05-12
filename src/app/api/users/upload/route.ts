import uploadUserAvatar from "@/libs/cloudinary/upload";
import connectDB from "@/libs/mongoose";
import User, { UserDocument } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
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
    return NextResponse.json(
      { message: "Something went Error" },
      { status: 500 }
    );
  }
}
