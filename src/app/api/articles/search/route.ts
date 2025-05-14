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
    if (!searchText) {
      const defaultArticles = await Article.find()
        .limit(6)
        .sort({ createdAt: -1 });
      return NextResponse.json(
        { message: "Search text not found" },
        { status: 400 }
      );
    }

    const articles = await Article.find({
      title: { $regex: searchText, $options: "i" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
