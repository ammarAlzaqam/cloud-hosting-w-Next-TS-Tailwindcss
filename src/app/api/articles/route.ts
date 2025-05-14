import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "@/utils/validationSchema";
import { CreateArticleDto } from "@/utils/dtos";
import Article, { ArticleType } from "@/models/article";
import connectDB from "@/libs/mongoose";
import User from "@/models/user";

/**
 * @method GET
 * @route ~/api/articles
 * @desc Get All Articles
 * @description This API route handles GET requests to fetch a list of articles. It returns a JSON response with the articles data and a status code of 200.
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const allArticles = (await Article.find()) as ArticleType[];
    return NextResponse.json(allArticles, { status: 200 });
  } catch (e) {
    return NextResponse.json("Something Went Error!", { status: 500 });
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc Crate a New Article
 * @description This API route handles POST requests to create a new article. It expects a JSON payload in the request body containing the article data. The new article is added to the articles array, and a JSON response with the created article and a status code of 201 is returned.
 * @access private
 */
export async function POST(request: NextRequest) {
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
    const newArticle = (await Article.create(body)) as ArticleType;

    return NextResponse.json(newArticle, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went error" },
      { status: 500 }
    );
  }
}
