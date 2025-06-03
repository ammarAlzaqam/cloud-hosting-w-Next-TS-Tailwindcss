import { getArticles } from "@/data/callArticleApi";
import { ArticleDocument } from "@/models/article";
import { API_DOMAIN, ARTICLE_PER_PAGE } from "@/utils/constants";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import DeleteArticleBtn from "./DeleteArticleBtn";
import Pagination from "@/app/articles/components/Pagination";

interface AdminArticlesPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}

export default async function AdminArticlesPage({
  searchParams,
}: AdminArticlesPageProps) {
  const { pageNumber } = await searchParams;
  const { articles, noOfArticles } = await getArticles(
    parseInt(pageNumber, 10)
  );
  const noOfPages = Math.ceil(noOfArticles / ARTICLE_PER_PAGE);
  
  //* Get article title with only 2 words and delete extra spaces
  const articleTitle = (title: string): string => {
    const words = title.trim().split(/\s+/);
    return words.length > 2 ? words.slice(0, 2).join(" ") + ".." : title;
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl text-gray-700 mb-10">Articles</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2 hidden lg:inline-block">Created At</th>
            <th className="p-2">Actions</th>
            <th className="p-2 hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {articles.map((article: ArticleDocument) => (
            <tr
              key={article._id as string}
              className="border-t border-gray-300"
            >
              <td className="px-4 py-5">{articleTitle(article.title)}</td>
              <td className="px-4 py-5 hidden lg:inline-block">
                {dayjs(article.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="px-4 py-5">
                <div className="flex flex-col lg:flex-row gap-3">
                  <Link
                    className="px-2 py-1 inline-block text-center bg-green-600 rounded-lg hover:bg-green-800 transition text-white"
                    href={`/admin/articles-table/edit/${article._id}`}
                  >
                    Edit
                  </Link>
                  <DeleteArticleBtn articleId={article._id as string} />
                </div>
              </td>
              <td className="px-4 py-5 hidden lg:inline-block">
                <Link
                  className="capitalize px-1 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-800 transition"
                  href={`/articles/${article._id}`}
                >
                  read more
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="text-center">
            <td colSpan={4} className="p-5"></td>
          </tr>
        </tfoot>
      </table>
      <Pagination
        noOfPages={noOfPages}
        pageNumber={parseInt(pageNumber)}
        route="/admin/articles-table"
      />
    </div>
  );
}
