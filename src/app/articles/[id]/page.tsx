import { Props } from "@/utils/types";
import AddCommentForm from "../components/comments/AddCommentForm";
import CommentItem from "../components/comments/CommentItem";
import { getSingleArticle } from "@/data/callArticleApi";
import BackButton from "./BackButton";
import { Metadata } from "next";
import dayjs from "dayjs";

export default async function SingleArticlePage({ params }: Props) {
  const { id: articleId } = await params;
  // Fetch the article data using the id    
  
  const { article, comments } = await getSingleArticle(articleId);
  return (
    <div className="mt-10 w-fit mx-auto">
      <div className="flex gap-2 items-start bg-gray-50 p-4 rounded-lg shadow-md ">
        <BackButton />
        <div className="mt-5">
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <p className="text-gray-500 mt-2">{dayjs(article.createdAt).format("DD/MM/YYYY")}</p>
          <h2 className="mt-4">{article.description}</h2>
        </div>
      </div>
      <AddCommentForm articleId={articleId} />
      <h4 className="text-xl text-gray-800 font-bold mt-10 mb-4 p-1">
        {comments.length > 0 ? "Comments" : "no comments"}
      </h4>
      {comments.map((comment: any) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Article & its Comments Page",
  description:
    "in this page can see an article with its comments, you also can to add new comment there",
};
