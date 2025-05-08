import Link from "next/link";
import { Article } from "../types";

interface ArticleItemProps {
  article: Article;
}

export default function ArticleItem({ article }: ArticleItemProps) {
  return (
    <div className=" flex flex-col justify-between flex-[1-1] p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 bg-emerald-200 hover:bg-amber-200 w-full md:w-2/5 lg:w-1/4">
      <div>
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 ">
          {article.title}
        </h3>
        <p className="text-sm text-gray-700 my-2 line-clamp-1">
          {article.body}
        </p>
      </div>
      <Link
        className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-lg"
        href={`/articles/${article.id}`}
      >
        read more
      </Link>
    </div>
  );
}
