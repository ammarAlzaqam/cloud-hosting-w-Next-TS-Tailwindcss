import { Props } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import Comment, { CommentDocument } from "@/models/comment";
import connectDB from "@/libs/mongoose";
import { UpdateCommentDto } from "@/utils/dtos";
import { updateCommentSchema } from "@/utils/validationSchema";
import mongoose from "mongoose";
import { registerModels } from "@/libs/registerModels";
import User, { UserDocument } from "@/models/user";

/**
 * @method PATCH
 * @route ~/api/comments/[id]
 * @desc update comment
 * @access private
 */
export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const body = (await request.json()) as UpdateCommentDto;

    const validation = updateCommentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { id: commentId } = await params;
    const userId = request.headers.get("x-user-id");

    if (!mongoose.Types.ObjectId.isValid(commentId))
      return NextResponse.json(
        { message: "Invalid comment id" },
        { status: 400 }
      );

    //* Ensure models are registered
    registerModels();

    //* Find comment by id
    await connectDB();
    const comment = (await Comment.findById(commentId)
      .populate("userId", "username")
      .populate("articleId", "title")) as CommentDocument;
    if (!comment)
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );

    //! Check > is user has this comment
    if (comment.userId.id.toString() !== userId)
      return NextResponse.json(
        { message: "Forbidden", userId, userIdC: comment.userId },
        { status: 403 }
      );

    //TODO>> Update comment
    comment.text = body.text;
    await comment.save();

    return NextResponse.json(
      { message: "Comment created successfully", ...comment.toObject() },
      { status: 200 }
    );
  } catch (e) {
    const errorMsg = (e as Error).message;
    console.error(errorMsg);
    return NextResponse.json(
      { message: "Something went error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/[id]
 * @desc delete comment
 * @access private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const userId = request.headers.get("x-user-id");
    const { id: commentId } = await params;

    //! Check if commentId is valid
    if (!mongoose.Types.ObjectId.isValid(commentId))
      return NextResponse.json(
        { message: "Invalid comment id" },
        { status: 400 }
      );

    await connectDB();
    const comment = await Comment.findById(commentId);
    //! Check if comment not found
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    const user = (await User.findById(userId)) as UserDocument;
    //! Check if user can delete this comment
    if (!user.isAdmin && comment.userId.toString() !== userId)
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    //TODO>> Delete comment
    await comment.deleteOne();

    return NextResponse.json(
      { message: "Comment deleted successfully", comment },
      { status: 200 }
    );
  } catch (e) {
    const errorMsg = (e as Error).message;
    console.error(errorMsg);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
