import { setAuthCookie } from "@/libs/cookies";
import connectDB from "@/libs/mongoose";
import User, { UserDocument } from "@/models/user";
import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/users/login
 * @desc login user
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const validation = loginSchema.safeParse(body);

    //! validation for (email, password)
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    await connectDB();

    //TODO>> Find user with email
    const user = (await User.findOne({ email: body.email })) as UserDocument;
    if (!user)
      return NextResponse.json(
        { message: "Email or password is not correct" },
        { status: 400 }
      );

    //! Check password
    const isPasswordCorrect = await user?.checkPassword(body.password);
    if (!user || !isPasswordCorrect)
      return NextResponse.json(
        { message: "Email or password is not correct" },
        { status: 400 }
      );

    //* Generate token
    const token = await user.generateJwtToken();

    //* Delete password before send user
    const userObject = user.toObject();
    delete userObject.password;

    //* Build response & set cookie
    const cookie = setAuthCookie(token);
    return NextResponse.json(
      { message: "Login & authenticated", userObject },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (e) {
    console.error((e as Error).message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
