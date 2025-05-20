import { Metadata } from "next";
import { ArticleDocument } from "@/models/article";
import ArticleItem from "./components/ArticleItem";
import { getArticles } from "@/data/callArticleApi";
import SearchArticleInput from "./components/SearchArticleInput";
import Pagination from "./components/Pagination";

interface ArticlesPageProps {
  searchParams?: Promise<{ pageNumber: string | undefined }>;
}

interface ArticlesData {
  articles: ArticleDocument[];
  noOfPages: number;
}

const ArticlePage = async ({ searchParams }: ArticlesPageProps) => {
  const pageNumber = parseInt((await searchParams)?.pageNumber || "1", 10);
  const { articles, noOfPages }: ArticlesData = await getArticles(pageNumber);

  return (
    <>
      <SearchArticleInput />
      <div className="flex flex-wrap gap-7 justify-center items-stretch my-5">
        {articles.map((article) => (
          <ArticleItem key={article._id as string} article={article} />
        ))}
      </div>
      <Pagination
        noOfPages={noOfPages}
        pageNumber={pageNumber}
        route="/articles"
      />
    </>
  );
};

export default ArticlePage;

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles about programming, technology, and more",
};
