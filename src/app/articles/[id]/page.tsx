import AddCommentForm from "../components/comments/AddCommentForm";
import CommentItem from "../components/comments/CommentItem";
import { getPost } from "../requests";
import { Article } from "../types";
import BackButton from "./BackButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
};

export default async function SingleArticlePage({ params }: Props) {
  const { id } = await params;
  // Fetch the article data using the id
  const Article: Article = await getPost(id);

  return (
    <div className="mt-10 w-fit mx-auto">
      <div className="flex gap-2 bg-gray-50 p-4 rounded-lg shadow-md ">
        <BackButton />
        <div className="mt-5">
          <h1 className="text-2xl font-bold">{Article.title}</h1>
          <p className="text-gray-500 mt-2">5/5/2025</p>
          <h2 className="mt-4">{Article.body}</h2>
        </div>
      </div>
      <AddCommentForm />
      <h4 className="text-xl text-gray-800 font-bold mt-10 mb-4 p-1">Comments</h4>
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
}
