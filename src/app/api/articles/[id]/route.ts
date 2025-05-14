import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/utils/dtos";
import Article, { ArticleDocument } from "@/models/article";
import { Props } from "@/utils/types";
import connectDB from "@/libs/mongoose";
import User from "@/models/user";
import { updateArticleSchema } from "@/utils/validationSchema";
import Comment, { CommentDocument } from "@/models/comment";

/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc Get Article by ID
 * @description This API route handles GET requests to fetch a specific article by its ID. It returns a JSON response with the article data and a status code of 200 if the article is found, or a 404 status code if not found.
 * @access public
 */
export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    await connectDB();
    const article = (await Article.findById(id)) as ArticleDocument;

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    const comments = (await Comment.find({
      articleId: article._id,
    }).populate("userId", "username").sort({ createdAt: -1 })) as CommentDocument[];

    return NextResponse.json({ article, comments }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

/**
 * @method PATCH
 * @route ~/api/articles/:id
 * @desc Update Article by ID
 * @description This API route handles PATCH requests to fetch and update a specific article by its ID. It returns a JSON response with updated data for the article and a status code of 200 if the article is found, or a 404 status code if not found.
 * @access private (Only Admin can update Article)
 */
export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    await connectDB();
    const userId = request.headers.get("x-user-id");
    const user = await User.findById(userId);

    //! check user
    if (!user)
      return NextResponse.json(
        { message: "You don't have an account!" },
        { status: 401 }
      );

    //! check isAdmin property
    if (!user.isAdmin)
      return NextResponse.json(
        { message: "Only admins can update articles" },
        { status: 401 }
      );

    const body = (await request.json()) as UpdateArticleDto;
    const validation = updateArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message });
    }

    const article = (await Article.findByIdAndUpdate(id, body, {
      new: true,
    })) as ArticleDocument;

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "The article has been successfully updated", article },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @desc Delete Article by ID
 * @description This API route handles PUT requests to fetch and delete a specific article by its ID. It returns a JSON response with the deleted article and a status code of 200 if the article is found, or a 404 status code if not found.
 * @access private (Only Admin can delete Article)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    await connectDB();
    const userId = request.headers.get("x-user-id");
    const user = await User.findById(userId);

    //! check user
    if (!user)
      return NextResponse.json(
        { message: "You don't have an account!" },
        { status: 401 }
      );

    //! check isAdmin property
    if (!user.isAdmin)
      return NextResponse.json(
        { message: "Only admins can delete articles" },
        { status: 401 }
      );

    const article = (await Article.findByIdAndDelete(id)) as ArticleDocument;
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "The article has been successfully deleted", article },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went error" },
      { status: 500 }
    );
  }
}
