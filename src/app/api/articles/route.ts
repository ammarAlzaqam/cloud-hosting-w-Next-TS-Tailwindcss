import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "@/utils/validationSchema";
import { CreateArticleDto } from "@/utils/dtos";
import Article, { ArticleDocument } from "@/models/article";
import connectDB from "@/libs/mongoose";
import User from "@/models/user";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import mongoose from "mongoose";
/**
 * @method GET
 * @route ~/api/articles?pageNumber=value1&sort=value2
 * @desc Get Articles by pageNumber
 * @description This API route handles GET requests to fetch a list of articles. It returns a JSON response with the articles data and a status code of 200.
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    //* get pageNumber & sort from query
    const pageNumber = parseInt(
      request.nextUrl.searchParams.get("pageNumber") || "1",
      10
    );
    const sort = parseInt(request.nextUrl.searchParams.get("sort") || "-1", 10);

    await connectDB();
    const { articles, noOfPages } = await Article.pagination(
      pageNumber,
      sort,
      ARTICLE_PER_PAGE
    );
    return NextResponse.json({ articles, noOfPages }, { status: 200 });
  } catch (e) {
    console.error((e as Error).message);
    return NextResponse.json("Something Went Error!", { status: 500 });
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc Crate a New Article
 * @description This API route handles POST requests to create a new article. It expects a JSON payload in the request body containing the article data. The new article is added to the articles array, and a JSON response with the created article and a status code of 201 is returned.
 * @access private (Only Admin can create Article)
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const userId = request.headers.get("x-user-id");

    if (!mongoose.Types.ObjectId.isValid(userId as string)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

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
        { message: "Only admins can create articles" },
        { status: 401 }
      );

    const body = (await request.json()) as CreateArticleDto;

    const validation = createArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const newArticle = (await Article.create(body)) as ArticleDocument;

    return NextResponse.json(
      { message: "Article created successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.error((e as Error).message);
    return NextResponse.json(
      { message: "Something went error" },
      { status: 500 }
    );
  }
}
