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
    const token = request.cookies.get("token")?.value as string;
    if (!token) throw new Error("No token");

    //* store token in new Header
    const payload = await verifyJwtToken(token);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.id as string);

    //* add new Header to request
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (e) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}