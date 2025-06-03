import { Metadata } from "next";
import { ArticleDocument } from "@/models/article";
import ArticleItem from "./components/ArticleItem";
import { getArticles } from "@/data/callArticleApi";
import SearchArticleInput from "./components/SearchArticleInput";
import Pagination from "./components/Pagination";
import { ARTICLE_PER_PAGE } from "@/utils/constants";

interface ArticlesPageProps {
  searchParams?: Promise<{ pageNumber: string | undefined }>;
}

interface ArticlesData {
  articles: ArticleDocument[];
  noOfArticles: number;
}

const ArticlePage = async ({ searchParams }: ArticlesPageProps) => {
  const pageNumber = parseInt((await searchParams)?.pageNumber || "1", 10);
  const { articles, noOfArticles }: ArticlesData = await getArticles(
    pageNumber
  );
  if (!articles) return <p>No articles found</p>;
  
  const noOfPages = Math.ceil(noOfArticles / ARTICLE_PER_PAGE);
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
