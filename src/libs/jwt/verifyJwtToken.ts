import { JwtPayloadType } from "@/utils/types";
import { jwtVerify } from "jose";

export async function verifyJwtToken(token: string): Promise<JwtPayloadType> {
  try {
    const JWT_SECRET_KEY = new TextEncoder().encode(
      process.env.JWT_SECRET_KEY || "this_is_my_JWT_secret_key"
    );

    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    return payload as JwtPayloadType;
  } catch (e) {
    throw new Error("Invalid or expired token");
  }
}
