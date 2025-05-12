import { NextRequest, NextResponse } from "next/server";
import protectRoute from "./libs/middleware/auth";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname.startsWith("/api/users/upload")) {
    return await protectRoute(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/upload"],
};
