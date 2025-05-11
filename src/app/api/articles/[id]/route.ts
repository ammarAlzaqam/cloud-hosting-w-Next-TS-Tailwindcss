import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/utils/data";
import { UpdateArticleDto } from "@/utils/dtos";

/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc Get Article by ID
 * @description This API route handles GET requests to fetch a specific article by its ID. It returns a JSON response with the article data and a status code of 200 if the article is found, or a 404 status code if not found.
 * @access public
 */

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const article = articles.find((article) => article.id === parseInt(id));

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @desc Update Article by ID
 * @description This API route handles PUT requests to fetch and update a specific article by its ID. It returns a JSON response with updated data for the article and a status code of 200 if the article is found, or a 404 status code if not found.
 * @access public
 */
export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const body = (await request.json()) as UpdateArticleDto;
    const article = articles.find((a) => a.id === parseInt(id));
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
 * @access public
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const article = articles.find((a) => a.id === parseInt(id));
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
