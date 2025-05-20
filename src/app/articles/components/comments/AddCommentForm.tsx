"use client";
import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentPropsType {
  articleId: string;
}

export default function AddCommentForm({ articleId }: AddCommentPropsType) {
  const [text, setText] = useState("");
  const router = useRouter();
  const fromSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return toast.error("Please write a comment!");
    try {
      await axios.post(`${API_DOMAIN}/comments`, { text, articleId });
      setText("");
      router.refresh();
      toast.success("Comment created successfully")
    } catch (e: any) {
      toast.error(e?.response?.data.message);
    }
  };
  return (
    <form onSubmit={fromSubmitHandler} className="my-7">
      <input
        className="bg-white w-full text-xl p-2 rounded-lg focus:shadow-md"
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      />
      <button
        type="submit"
        className="mt-3 py-2 px-4 bg-green-700 rounded-lg text-white cursor-pointer hover:bg-green-900 transition"
      >
        Comment
      </button>
    </form>
  );
}
