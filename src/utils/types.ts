import { ArticleDocument } from "@/models/article";

export type Props = {
  params: Promise<{ id: string }>;
};

export type JwtPayloadType = {
  id: string;
  isAdmin: Boolean;
};