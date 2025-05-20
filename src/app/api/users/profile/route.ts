import connectDB from "@/libs/mongoose";
import mongoose from "mongoose";
import User, { UserDocument } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { UpdateUserDto } from "@/utils/dtos";
import { updateUserSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
import Comment from "@/models/comment";

/**
 * @method GET
 * @route ~/api/users/profile
 * @desc Delete user
 * @access private
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - No user ID in headers" },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    await connectDB();
    const user = (await User.findById(userId)) as UserDocument;
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    //* delete password before send user
    const userObject = user.toObject();
    delete userObject.password;

    return NextResponse.json(userObject, { status: 200 });
  } catch (e) {
    console.error((e as Error).message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/users/profile
 * @desc Delete user
 * @access private
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!mongoose.Types.ObjectId.isValid(userId as string)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - No user ID in headers" },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found or already deleted" },
        { status: 404 }
      );
    }

    await Comment.deleteMany({ userId: user._id });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error in DELETE user:", (e as Error).message);
    return NextResponse.json(
      { message: "Something went error" },
      { status: 500 }
    );
  }
}

/**
 * @method PATCH
 * @route ~/api/users/profile
 * @desc Delete user
 * @access private
 */
export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = (await request.json()) as UpdateUserDto;

    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - No user ID in headers" },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    //* hashed password before update
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    await connectDB();
    const user = (await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    })) as UserDocument;
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    //* delete password before send user
    const userObject = user.toObject();
    delete userObject.password;

    //* another way to select all properties without password in other
    // const { password, ...other } = userObject;

    return NextResponse.json(
      { message: "User Update Successfully", user: userObject },
      { status: 200 }
    );
  } catch (e) {
    const errorMes = (e as Error).message;
    console.error(errorMes);
    return NextResponse.json({ message: errorMes }, { status: 500 });
  }
}
