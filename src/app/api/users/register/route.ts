/**
 * @method POST
 * @route ~/api/users/register
 * @desc Create New User
 * @access public
 */
import { setAuthCookie } from "@/libs/cookies";
import connectDB from "@/libs/mongoose";
import User, { UserDocument } from "@/models/user";
import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;

    //! validation for {username, email, password}
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      let errorMessage = validation.error.issues[0].message;
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    await connectDB();

    //! check unique email
    const user = await User.findOne({ email: body.email });
    if (user) {
      return NextResponse.json(
        { message: "this user already registered" },
        { status: 400 }
      );
    }

    //TODO>> add new usr in DB
    const newUser = (await User.create(body)) as UserDocument;
    //* generate token
    const token = await newUser.generateJwtToken();

    //* delete password before send user
    const userObject = newUser.toObject();
    delete userObject.password;

    //* set cookies with token
    const cookie = setAuthCookie(token);
    return NextResponse.json(
      { message: "Registered & authenticated", userObject },
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (e) {
    console.error(e instanceof Error ? e : "Something went wrong");
    return NextResponse.json(
      { message: "Something went error" },
      { status: 500 }
    );
  }
}
