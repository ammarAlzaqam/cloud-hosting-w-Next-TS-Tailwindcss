import mongoose from "mongoose";
import "@/models/user";
import "@/models/article";
import "@/models/comment";

// Register all models before usage
export function registerModels() {
  if (!mongoose.models.User) {
    require("@/models/user");
  }
  if (!mongoose.models.Article) {
    require("@/models/article");
  }
  if (!mongoose.models.Comment) {
    require("@/models/comment");
  }
}
