import { serialize } from "cookie";

/**
 * Set Auth Token in Cookies
 * @param response NextResponse instance
 * @param token JWT Token
 */
export function setAuthCookie(token: string) {
  return serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 3,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Clear Auth Token Cookie (to logout)
 * @param response 
 */
// export function clearAuthCookie() {
//   return serialize("token", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 0,
//     sameSite: "lax",
//     path: "/",
//   });
// }
