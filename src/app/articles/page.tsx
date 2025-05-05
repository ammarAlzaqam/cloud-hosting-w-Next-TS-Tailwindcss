import React from "react";
import { Article } from "./types";
import ArticleItem from "./components/Item";
import { getPosts } from "./requests";

const ArticlePage = async () => {
  const articles: Article[] = await getPosts();

  return (
    <div className="flex flex-wrap gap-7 justify-center items-stretch my-5">
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlePage;
