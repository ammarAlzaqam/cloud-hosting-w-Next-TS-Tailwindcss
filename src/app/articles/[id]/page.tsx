import { getPost } from "../requests";
import { Article } from "../types";
import BackButton from "./BackButton";

interface ArticlePagePropsType {
  params: {
    id: string;
  };
}

const SingleArticlePage = async ({ params }: ArticlePagePropsType) => {
  const { id } = await params;
  // Fetch the article data using the id
  const Article: Article = await getPost(id);

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-10 w-fit mx-auto">
      <div className="flex gap-2">
        <BackButton />
        <div className="mt-5">
          <h1 className="text-2xl font-bold">{Article.title}</h1>
          <p className="text-gray-500 mt-2">5/5/2025</p>
          <h2 className="mt-4">{Article.body}</h2>
        </div>
      </div>
    </div>
  );
};

export default SingleArticlePage;
