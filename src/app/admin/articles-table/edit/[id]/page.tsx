import { Props } from "@/utils/types";
import EditArticleForm from "./EditArticleForm";
import { getSingleArticle } from "@/data/callArticleApi";
import { ArticleDocument } from "@/models/article";

export default async function EditArticle({ params }: Props) {
  const { id: articleId } = await params;
  // git single article by article id and send to EditArticleForm
  const { article }: { article: ArticleDocument} = await getSingleArticle(articleId);
  return (
    <div className="h-[100%] border px-5 lg:px-20 flex justify-center items-center">
      <div className="p-4 rounded shadow w-full max-w-3xl bg-purple-200">
        <h2 className="text-xl lg:text-2xl font-semibold mb-4">Edit Article</h2>
        <EditArticleForm article={article} />
      </div>
    </div>
  );
}
