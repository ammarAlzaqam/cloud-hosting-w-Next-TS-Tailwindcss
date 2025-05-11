import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/utils/data";
import { Article } from "@/app/articles/types";
import { createArticleSchema } from "@/utils/validationSchema";
import { CreateArticleDto } from "@/utils/dtos";

/**
 * @method GET
 * @route ~/api/articles
 * @desc Get All Articles
 * @description This API route handles GET requests to fetch a list of articles. It returns a JSON response with the articles data and a status code of 200.
 * @access public
 */

export function GET(request: NextRequest) {
  return NextResponse.json(articles, { status: 200 });
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc Crate a New Article
 * @description This API route handles POST requests to create a new article. It expects a JSON payload in the request body containing the article data. The new article is added to the articles array, and a JSON response with the created article and a status code of 201 is returned.
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateArticleDto;

    const validation = createArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const newArticle: Article = {
      id: articles.length + 1,
      title: body.title,
      body: body.body,
      userId: articles.length + 101,
    };

    return NextResponse.json(newArticle, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went error" },
      { status: 500 }
    );
  }
}