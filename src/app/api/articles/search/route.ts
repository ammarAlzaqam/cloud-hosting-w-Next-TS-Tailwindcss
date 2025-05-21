import connectDB from "@/libs/mongoose";
import Article from "@/models/article";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles/search?searchText=value
 * @desc Get Article by searchText
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    //! Check searchText content
    await connectDB();
    if (!searchText) {
      const defaultArticles = await Article.find()
        .limit(6)
        .sort({ createdAt: -1 });
      return NextResponse.json(defaultArticles, { status: 400 });
    }

    const articles = await Article.find({
      title: { $regex: searchText, $options: "i" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (e) {
    console.error((e as Error).message)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
