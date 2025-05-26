import mongoose, { Document, InferSchemaType, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { JwtPayloadType } from "@/utils/types";

// Define the schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      // ammar@example.com
      match: /^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    avatar: {
      type: String,
      default: "/images/default-avatar.png",
    },

    avatarPublicId: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// JWT secret key (ensure it's available)
const JWT_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "this_is_my_JWT_secret_key"
);

// Method to generate JWT token
userSchema.methods.generateJwtToken = async function (): Promise<string> {
  const user = this as UserDocument; // Explicit cast
  const payload: JwtPayloadType = {
    id: user._id.toString(),
    isAdmin: user.isAdmin,
  };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime("3d")
    .sign(JWT_SECRET_KEY);

  return token;
};

userSchema.methods.checkPassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const user = this as UserDocument;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (e) {
    console.error("Error checking password: ", (e as Error).message);
    return false;
  }
};

// Password hashing middleware (pre save)
userSchema.pre<UserDocument>("save", async function (next) {
  const user = this;

  // Check if password is modified before saving
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (e) {
    // Handle bcrypt hashing error
    next(
      e instanceof Error
        ? e
        : new Error("An error occurred while hashing password")
    );
  }
});

// Type definitions
export type UserSchemaType = InferSchemaType<typeof userSchema>;

// Define the UserDocument type with generateJwtToken, checkPassword methods
export interface UserDocument extends UserSchemaType, Document {
  generateJwtToken(): Promise<string>;
  checkPassword(candidatePassword: string): Promise<Boolean>;
  _id: mongoose.Types.ObjectId;
}

// Define the UserModel type with the verifyJwtToken static method
interface UserModel extends Model<UserDocument> {}

// Export the model
export default (mongoose.models.User as UserModel) ||
  mongoose.model<UserDocument, UserModel>("User", userSchema);
