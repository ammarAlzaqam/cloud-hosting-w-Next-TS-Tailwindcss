"use client";

import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteArticleBtnProps {
  articleId: string;
}

export default function DeleteArticleBtn({ articleId }: DeleteArticleBtnProps) {
  const router = useRouter();

  const deleteArticleHandler = async () => {
    try {
      if (confirm("You want to delete this article, Are you sure.")) {
        await axios.delete(`${API_DOMAIN}/articles/${articleId}`);
        router.refresh();
        toast.success("Article deleted successfully");
      }
    } catch (e: any) {
      const errorMsg = e?.response?.data.message;
      toast.error(errorMsg);
      console.error(errorMsg);
    }
  };

  return (
    <button
      className="capitalize px-2 py-1 cursor-pointer inline-block text-center bg-red-600 rounded-lg hover:bg-red-800 transition text-white"
      onClick={deleteArticleHandler}
    >
      delete
    </button>
  );
}
