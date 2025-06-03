import { API_DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { notFound } from "next/navigation";

// get articles based on pageNumber
export const getArticles = async (pageNumber: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles?pageNumber=${pageNumber}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    // throw new Error("Failed to fetch articles");
  }
};

// get single article based on id
export const getSingleArticle = async (id: string): Promise<SingleArticle> => {
  try {
    const response = await fetch(`${API_DOMAIN}/articles/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      notFound();
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching article:", error);
    notFound();
  }
};

// get articles based on searchText
export const getArticlesBasedOnSearch = async (searchText: string) => {
  try {
    const response = await fetch(
      `${API_DOMAIN}/articles/search?searchText=${searchText}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log("user data after register", data);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};
