import { NextRequest, NextResponse } from "next/server";
import {
  protectAdminPage,
  protectLogin_registerPage,
  protectRoute,
} from "./libs/middleware/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // protect upload & article path, get userId from tokenCookie and send in req.header

  const isUploadPath = path.startsWith("/api/users/upload");
  const isArticlePath =
    path.startsWith("/api/articles") && request.method !== "GET";
  const isProfilePath = path.startsWith("/api/users/profile");
  const isCommentPath = path.startsWith("/api/comments");
  //! protect api routes and profile route
  if (isUploadPath || isArticlePath || isProfilePath || isCommentPath)
    return await protectRoute(request);

  const isRegisterOrLoginPath =
    path.startsWith("/login") || path.startsWith("/register");
  //! protect register and login pages
  if (isRegisterOrLoginPath) return protectLogin_registerPage(request);

  //! redirect to "/home" if user request was "/"
  if (path === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  const isAdminPath = path.startsWith("/admin");
  //! protect Admin page => redirect to "/home" if not user or not admin
  if (isAdminPath) {
    return await protectAdminPage(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/users/upload",
    "/api/users/profile",
    "/api/articles/:path*",
    "/api/comments/:path*",
    "/",
    "/login",
    "/register",
    "/admin/:path*",
  ],
};
