import { getArticlesBasedOnSearch } from "@/data/callArticleApi";
import ArticleItem from "../components/ArticleItem";
import { ArticleDocument } from "@/models/article";

interface SearchArticlePageProps {
  searchParams: Promise<{
    searchText: string;
  }>;
}

const SearchArticlePage = async ({ searchParams }: SearchArticlePageProps) => {
  const { searchText } = await searchParams;
  const articles: ArticleDocument[] = await getArticlesBasedOnSearch(
    searchText
  );
  return (
    <section>
      {articles.length === 0 ? (
        <h2 className="text-2xl text-gray-800 font-bold p-5">
          Articles based on
          <span className="text-red-500 mx-1">{searchText}</span>
          not found
        </h2>
      ) : (
        <>
          <h1 className="text-2xl text-gray-800 font-bold mb-2 mt-7">
            Articles based on
            <span className="text-3xl text-green-500 ms-1 capitalize">
              {searchText}
            </span>
          </h1>
          <div className="flex flex-wrap gap-7 justify-center items-stretch my-5">
            {articles.map((article) => (
              <ArticleItem key={article._id as string} article={article} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SearchArticlePage;
