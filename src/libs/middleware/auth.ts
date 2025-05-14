import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "../jwt/verifyJwtToken";
import { JwtPayloadType } from "@/utils/types";
import mongoose from "mongoose";

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
    const { id: userId } = (await verifyJwtToken(token)) as JwtPayloadType;
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - No user ID in headers" },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userId as string);

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
