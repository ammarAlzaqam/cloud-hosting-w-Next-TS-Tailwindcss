import mongoose, { Document, InferSchemaType, Model } from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * articles paginating
 * @param pageNumber
 * @param sort
 * @param limit
 * @returns { articles , numberOfPages }
 */
articleSchema.statics.pagination = async function (
  pageNumber: number = 1,
  sort: number = -1,
  limit: number = 6
) {
  const skip = (pageNumber - 1) * limit;
  const articles = await this.find()
    .sort({ createdAt: sort })
    .skip(skip)
    .limit(limit);
  const noOfArticles = await this.countDocuments();

  return { articles, noOfArticles };
};

export type ArticleType = InferSchemaType<typeof articleSchema>;

export interface ArticleDocument extends ArticleType, Document {}
interface ArticleModel extends Model<ArticleDocument> {
  pagination(
    pageNumber: number,
    sort: number,
    limit: number
  ): Promise<{ articles: ArticleDocument[]; noOfArticles: any }>;
}

export default (mongoose.models.Article as ArticleModel) ||
  mongoose.model<ArticleDocument, ArticleModel>("Article", articleSchema);
