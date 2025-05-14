import {
  Document,
  InferSchemaType,
  Model,
  Schema,
  model,
  models,
} from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//* Type definitions
type commentSchemaType = InferSchemaType<typeof commentSchema>;

//* Defined the comment document
export interface CommentDocument extends Document, commentSchemaType {}
interface CommentModel extends Model<CommentDocument> {}

export default (models.Comment as CommentModel) ||
  model<CommentDocument, CommentModel>("Comment", commentSchema);
