import { NextRequest, NextResponse } from "next/server";
import { protectRoute } from "./libs/middleware/auth";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // protect upload & article path, get userId from tokenCookie and send in req.header
  const isUploadPath = url.pathname.startsWith("/api/users/upload");
  const isArticlePath =
    url.pathname.startsWith("/api/articles") && request.method !== "GET";

  const isProfilePath = url.pathname.startsWith("/api/users/profile");

  const isCommentPath = url.pathname.startsWith("/api/comments")

  if (isUploadPath || isArticlePath || isProfilePath || isCommentPath) {
    return await protectRoute(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/users/upload",
    "/api/users/profile",
    "/api/articles/:path*",
    "/api/comments",
  ],
};
