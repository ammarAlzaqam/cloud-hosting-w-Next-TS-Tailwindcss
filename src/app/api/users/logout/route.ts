import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/users/logout
 * @desc Logout User
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    // const cookie = clearAuthCookie();
    (await cookies()).delete("token");
    return NextResponse.json(
      { message: "Logout successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error((e as Error).message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
