import React from "react";
import { Article } from "./types";
import ArticleItem from "./components/ArticleItem";
import { getPosts } from "./requests";
import { Metadata } from "next";
import SearchArticleInput from "./components/SearchArticleInput";
import Pagination from "./components/Pagination";

const ArticlePage = async () => {
  const articles: Article[] = await getPosts();

  return (
    <>
      <SearchArticleInput />
      <div className="flex flex-wrap gap-7 justify-center items-stretch my-5">
        {articles.slice(0, 6).map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default ArticlePage;

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles about programming, technology, and more",
};
