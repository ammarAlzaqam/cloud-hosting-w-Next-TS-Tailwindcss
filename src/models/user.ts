import mongoose from "mongoose";

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
      // ammar@example.com
      match: /^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
