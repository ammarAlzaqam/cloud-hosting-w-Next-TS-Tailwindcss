import { ArticleDocument } from "@/models/article";
import { CommentDocument } from "@/models/comment";
import { UserDocument } from "@/models/user";

export type Props = {
  params: Promise<{ id: string }>;
};

export type JwtPayloadType = {
  id: string;
  isAdmin: Boolean;
};

export type CommentWithUser = CommentDocument & { userId: UserDocument };

export type SingleArticle = {article: ArticleDocument} & {comments: CommentWithUser[]};
