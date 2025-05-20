"use client";
import { ArticleDocument } from "@/models/article";
import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";
import * as React from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";

interface EditArticleForm {
    article: ArticleDocument;
}

export default function EditArticleForm({article}: EditArticleForm) {
  const [title, setTitle] = React.useState(article.title);
  const [description, setDescription] = React.useState(article.description);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      return toast.error("Title is required");
    }

    if (!description) {
      return toast.error("Description is required");
    }
    try {
      setLoading(true);
      const response = await axios.patch(`${API_DOMAIN}/articles/${article._id}`, {
        title,
        description,
      });
      setLoading(false);
      toast.success(response?.data?.message);
    } catch (e: any) {
      const errorMsg = e?.response?.data.message;
      console.error(errorMsg);
      return toast.error(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="p-2 rounded-md bg-white focus:bg-gray-100"
        type="text"
        placeholder="Enter Article title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <textarea
        className="p-2 lg:text-xl rounded resize-none bg-white"
        rows={5}
        placeholder="Enter Article Description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
      ></textarea>
      <button
        className="flex disabled:cursor-not-allowed disabled:bg-gray-300 justify-center items-center  text-white hover:text-black bg-green-800 hover:bg-green-300 transition border rounded-md py-1 capitalize tracking-wide cursor-pointer "
        type="submit"
        disabled={loading}
      >
        {loading ? <CgSpinner className="animate-spin text-2xl" /> : "edit"}
      </button>
    </form>
  );
}
