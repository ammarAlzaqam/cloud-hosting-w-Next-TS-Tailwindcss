import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "../jwt/verifyJwtToken";
import { JwtPayloadType } from "@/utils/types";

/**
 * check if token is valid!
 * @param request
 * @returns UserIdHeaderResponse or Error Response
 */
export async function protectRoute(request: NextRequest) {
  try {
    //! check token exist
    const token = request.cookies.get("token")?.value;
    if (!token) throw new Error("No token");

    //* store token in new Header
    const { id: userId } = (await verifyJwtToken(token)) as JwtPayloadType;
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - No user ID in headers" },
        { status: 401 }
      );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userId as string);

    //* add new Header to request
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (e) {
    console.error((e as Error).message);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export function protectLogin_registerPage(request: NextRequest) {
  //! check token exist
  const token = request.cookies.get("token")?.value;

  //* redirect to home page if user is register
  if (token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export async function protectAdminPage(request: NextRequest) {
  //! check token exist
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  const { id: userId, isAdmin } = (await verifyJwtToken(
    token as string
  )) as JwtPayloadType;

  if (!userId || !isAdmin) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
