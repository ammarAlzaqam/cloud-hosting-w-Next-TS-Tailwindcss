import { CreateCommentDto } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Comment from "@/models/comment";
import connectDB from "@/libs/mongoose";
import User, { UserDocument } from "@/models/user";

/**
 * @method POST
 * @route ~/api/comments
 * @desc create a new comment
 * @access private
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateCommentDto;
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - No user ID in headers" },
        { status: 401 }
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(body.articleId)
    ) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await connectDB();
    const comment = await Comment.create({
      text: body.text,
      userId,
      articleId: body.articleId,
    });
    return NextResponse.json(
      { message: "comment created successfully", comment },
      { status: 201 }
    );
  } catch (e) {
    const errorMes = (e as Error).message;
    console.error(errorMes);
    return NextResponse.json({ message: errorMes }, { status: 500 });
  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @desc get comments
 * @access public
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
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    await connectDB();
    const user = (await User.findById(userId)) as UserDocument;

    if (!user || !user?.isAdmin) {
      return NextResponse.json({message: "only admin, access denied"}, {status: 403})
    }

    const comments = await Comment.find();
    return NextResponse.json(comments, { status: 200 });
  } catch (e) {
    console.error((e as Error).message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
